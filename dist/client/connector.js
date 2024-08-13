"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connector = exports.endpoints = void 0;
const axios_1 = __importDefault(require("axios"));
const cache_manager_1 = require("cache-manager");
const AxiosLogger = __importStar(require("axios-logger"));
const axios_rate_limit_1 = __importDefault(require("axios-rate-limit"));
const crypto_1 = require("crypto");
exports.endpoints = {
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
//Idempotence-Key
class Connector {
    constructor(init) {
        this.endpoint = 'https://api.yookassa.ru/v3/';
        this.instanceCache = (0, cache_manager_1.createCache)((0, cache_manager_1.memoryStore)(), { ttl: 90 * 1000 });
        this.debug = false;
        this.maxRPS = 5;
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
        const instance = axios_1.default.create({
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
                    console.log(`Retry attempt: ${retryCount}\nreason: ${error}`);
                },
            },
        });
    }
    getInstance(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (opts.requestId) {
                const cachedInstance = yield this.instanceCache.get(opts.requestId);
                if (cachedInstance) {
                    return cachedInstance;
                }
            }
            const requestId = opts.requestId || (0, crypto_1.randomUUID)();
            const url = this.endpoint + opts.endpoint;
            const instance = (0, axios_rate_limit_1.default)(axios_1.default.create(this.axiosConfig), {
                maxRPS: opts.maxRPS || this.maxRPS,
            });
            // instance.defaults.validateStatus = statusCode => statusCode < 500;
            //Логгирование запросов и ответов
            if (this.debug || opts.debug) {
                instance.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
                instance.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);
            }
            instance.interceptors.response.use(function (response) {
                const result = {
                    success: 'OK',
                    requestId: response.config.headers['Idempotence-Key'],
                    data: response.data,
                };
                response.data = result;
                return response;
            }, function (err) {
                var _a;
                if ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data) {
                    const result = {
                        success: 'NO_OK',
                        errorData: err.response.data,
                        requestId: err.response.config.headers['Idempotence-Key'],
                    };
                    err.response.data = result;
                    return Promise.resolve(err.response);
                }
                return Promise.reject(err);
            });
            const requestConfig = {
                method: opts.method,
                url: url,
            };
            if (opts.method === 'POST') {
                requestConfig.data = opts.data;
            }
            instance.defaults.headers.common['Idempotence-Key'] = requestId;
            this.instanceCache.set(requestId, instance);
            return instance;
        });
    }
    request(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            (_a = opts.requestId) !== null && _a !== void 0 ? _a : (opts.requestId = (0, crypto_1.randomUUID)());
            const requestId = opts.requestId;
            const instance = yield this.getInstance(opts);
            const url = this.endpoint + opts.endpoint;
            const requestConfig = {
                method: opts.method,
                url: url,
            };
            if (opts.method === 'POST') {
                requestConfig.data = opts.data;
            }
            const response = yield instance.request(requestConfig);
            const result = response.data;
            return result;
        });
    }
}
exports.Connector = Connector;
//# sourceMappingURL=connector.js.map