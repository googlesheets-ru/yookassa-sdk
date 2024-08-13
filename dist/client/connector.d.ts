import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { RateLimitedAxiosInstance } from 'axios-rate-limit';
import { YooKassaErrResponse } from '../types/api.types';
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
export declare const endpoints: {
    refunds: {
        create: {
            method: string;
            endpoint: string;
            description: string;
        };
        list: {
            method: string;
            endpoint: string;
            description: string;
        };
        info: {
            method: string;
            endpoint: string;
            description: string;
        };
    };
    payments: {
        create: {
            method: string;
            endpoint: string;
        };
        list: {
            method: string;
            endpoint: string;
        };
        info: {
            method: string;
            endpoint: string;
        };
        capture: {
            method: string;
            endpoint: string;
        };
        cancel: {
            method: string;
            endpoint: string;
        };
    };
    receipts: {
        create: {
            method: string;
            endpoint: string;
            description: string;
        };
        list: {
            method: string;
            endpoint: string;
            description: string;
        };
        info: {
            method: string;
            endpoint: string;
            description: string;
        };
    };
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
export type PostRequestOpts<P = Record<string, any>, D = Record<string, any>> = IGenReqOpts<P> & {
    method: 'POST';
    data: D;
};
export type RequestOpts<P = Record<string, any>, D = Record<string, any>> = GetRequestOpts<P> | PostRequestOpts<P, D>;
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
export declare class Connector {
    protected axios: AxiosInstance;
    protected axiosConfig: AxiosRequestConfig;
    protected endpoint: string;
    protected instanceCache: import("cache-manager").MemoryCache;
    debug: boolean;
    maxRPS: number;
    constructor(init: ConnectorOpts);
    protected getInstance<Res, Data = Record<string, any>>(opts: RequestOpts<Data>): Promise<RateLimitedAxiosInstance>;
    protected request<Res = Record<string, any>, Data = Record<string, any>>(opts: RequestOpts<Data>): Promise<ApiResponse<Res>>;
}
export {};
