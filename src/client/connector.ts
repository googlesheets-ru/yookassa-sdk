import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { createCache, memoryStore } from 'cache-manager';
import axiosRetry from 'axios-retry';
import * as AxiosLogger from 'axios-logger';
import rateLimit, { RateLimitedAxiosInstance } from 'axios-rate-limit';
import { randomUUID } from 'crypto';
import {
    GetListResponse,
    YooKassaErr,
    YooKassaErrResponse,
} from '../types/api.types';
import { Payments } from '../types/payments/payment.type';

/**
 * Данные для подключения к API YooKassa
 */
export type ConnectorOpts = {
    /**
     * Идентификатор магазина
     */
    shop_id: string;
    /**
     * Секретный ключ
     */
    secret_key: string;
    /**
     * Эндпоинт API
     * @default "https://api.yookassa.ru/v3/"
     */
    endpoint?: string;
    /** Отладочный режим */
    debug: boolean;
    /**  URL для редиректа */
    redirect_url?: string;
    /** Количество запросов в секунду
     * @default 5
     */
    maxRPS?: number;
};

export const endpoints = {
    refunds: {
        create: {
            method: 'POST',
            endpoint: '/refunds',
            description: 'Создание возврата',
        },
        list: {
            method: 'GET',
            endpoint: '/refunds',
            description: 'Список возвратов',
        },
        info: {
            method: 'GET',
            endpoint: '/refunds/{refund_id}',
            description: 'Информация о возврате',
        },
    },
    payments: {
        create: {
            method: 'POST',
            endpoint: '/payments',
        },
        list: {
            method: 'GET',
            endpoint: '/payments',
        },
        info: {
            method: 'GET',
            endpoint: '/payments/{payment_id}',
        },
        capture: {
            method: 'POST',
            endpoint: '/payments/{payment_id}/capture',
        },
        cancel: {
            method: 'POST',
            endpoint: '/payments/{payment_id}/cancel',
        },
    },
    receipts: {
        create: {
            method: 'POST',
            endpoint: '/receipts',
            description: 'Создание чека',
        },
        list: {
            method: 'GET',
            endpoint: '/receipts',
            description: 'Список чеков',
        },
        info: {
            method: 'GET',
            endpoint: '/receipts/{receipt_id}',
            description: 'Информация о чеке',
        },
    },
};
interface IGenReqOpts<P> {
    method: 'GET' | 'POST' | 'DELETE';
    endpoint: string;
    params?: P;
    maxRPS?: number;
    requestId?: string;
    debug?: boolean;
}
export type GetRequestOpts<P = Record<string, any>> = IGenReqOpts<P> & {
    method: 'GET';
};
export type PostRequestOpts<
    P = Record<string, any>,
    D = Record<string, any>,
> = IGenReqOpts<P> & {
    method: 'POST';
    data: D;
};
export type RequestOpts<P = Record<string, any>, D = Record<string, any>> =
    | GetRequestOpts<P>
    | PostRequestOpts<P, D>;

type BadApiResponse = {
    success: 'NO_OK';
    errorData: YooKassaErrResponse;
    requestId: string;
};
type GoodApiResponse<Res> = {
    success: 'OK';
    data: Res;
    requestId: string;
};
export type ApiResponse<Res> = BadApiResponse | GoodApiResponse<Res>;

//Idempotence-Key
export class Connector {
    protected axios: AxiosInstance;
    protected axiosConfig: AxiosRequestConfig;
    protected endpoint = 'https://api.yookassa.ru/v3/';
    protected instanceCache = createCache(memoryStore(), { ttl: 90 * 1000 });
    debug = false;
    maxRPS = 5;
    constructor(init: ConnectorOpts) {
        this.endpoint = init.endpoint || 'https://api.yookassa.ru/v3/';
        this.debug = init.debug;
        this.maxRPS = init.maxRPS || this.maxRPS;
        this.axiosConfig = {
            baseURL: this.endpoint,
            auth: { username: init.shop_id, password: init.secret_key },
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'GoogleSheets.ru/yookassa-sdk',
                // 'Idempotence-Key': '111',
            },
        };
        const instance = axios.create({
            baseURL: this.endpoint,
            auth: { username: init.shop_id, password: init.secret_key },
            headers: {
                'Content-Type': 'application/json',
            },
            'axios-retry': {
                retries: 5,
                retryDelay: (retryCount) => {
                    return 1000 * Math.pow(2, retryCount);
                },
                onRetry(retryCount, error, requestConfig) {
                    console.log(
                        `Retry attempt: ${retryCount}\nreason: ${error}`,
                    );
                },
            },
        });
    }

    protected async getInstance<Res, Data = Record<string, any>>(
        opts: RequestOpts<Data>,
    ) {
        if (opts.requestId) {
            const cachedInstance =
                await this.instanceCache.get<RateLimitedAxiosInstance>(
                    opts.requestId,
                );
            if (cachedInstance) {
                return cachedInstance;
            }
        }
        const requestId = opts.requestId || randomUUID();

        const url = this.endpoint + opts.endpoint;
        const instance = rateLimit(axios.create(this.axiosConfig), {
            maxRPS: opts.maxRPS || this.maxRPS,
        });
        // instance.defaults.validateStatus = statusCode => statusCode < 500;

        //Логгирование запросов и ответов
        if (this.debug || opts.debug) {
            instance.interceptors.request.use(
                AxiosLogger.requestLogger,
                AxiosLogger.errorLogger,
            );
            instance.interceptors.response.use(
                AxiosLogger.responseLogger,
                AxiosLogger.errorLogger,
            );
        }

        instance.interceptors.response.use(
            function (response) {
                const result: GoodApiResponse<Res> = {
                    success: 'OK',
                    requestId: response.config.headers['Idempotence-Key'],
                    data: response.data,
                };
                response.data = result;
                return response;
            },
            function (err: AxiosError) {
                if (err.response?.data) {
                    const result: BadApiResponse = {
                        success: 'NO_OK',
                        errorData: err.response.data as YooKassaErrResponse,
                        requestId:
                            err.response.config.headers['Idempotence-Key'],
                    };
                    err.response.data = result;
                    return Promise.resolve(err.response);
                }
                return Promise.reject(err);
            },
        );

        const requestConfig: AxiosRequestConfig = {
            method: opts.method,
            url: url,
        };

        if (opts.method === 'POST') {
            requestConfig.data = opts.data;
        }
        instance.defaults.headers.common['Idempotence-Key'] = requestId;
        this.instanceCache.set(requestId, instance);

        return instance;
    }

    protected async request<
        Res = Record<string, any>,
        Data = Record<string, any>,
    >(opts: RequestOpts<Data>) {
        opts.requestId ??= randomUUID();
        const requestId = opts.requestId;
        const instance = await this.getInstance(opts);
        const url = this.endpoint + opts.endpoint;
        const requestConfig: AxiosRequestConfig = {
            method: opts.method,
            url: url,
        };
        if (opts.method === 'POST') {
            requestConfig.data = opts.data;
        }

        const response =
            await instance.request<ApiResponse<Res>>(requestConfig);
        const result = response.data;
        return result;
    }
}
