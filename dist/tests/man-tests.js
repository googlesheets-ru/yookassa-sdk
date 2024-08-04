"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../client");
const general_types_1 = require("../types/general.types");
const initOpts = {
    debug: true,
    secret_key: 'test_mCqzu8TlMR46mwYJQuQft9xNi_NEdnaIHSgaRAmuNhI',
    shop_id: '909048',
};
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        const sdk = (0, client_1.YooKassa)(initOpts);
        const response = yield sdk.payments.create({
            receipt: {
                items: [
                    {
                        amount: {
                            currency: general_types_1.CurrencyEnum.RUB,
                            value: '10.00',
                        },
                        description: 'Услуга 1',
                        quantity: 1,
                        vat_code: 1,
                    },
                ],
            },
            amount: {
                currency: general_types_1.CurrencyEnum.RUB,
                value: '10.00',
            },
            confirmation: {
                type: 'redirect',
                return_url: 'https://googlesheets.ru',
            },
            description: 'Описание заказа',
        });
        console.log('response in test:', response);
    });
}
// test();
function testGetPayment() {
    return __awaiter(this, void 0, void 0, function* () {
        const sdk = (0, client_1.YooKassa)(initOpts);
        const paymentId = '2e3f90e3-000f-5000-a000-14f0028604a7';
        const payment = yield sdk.payments.load(paymentId);
        console.log(JSON.stringify(payment, null, 2));
    });
}
// testGetPayment();
function testCapturePayment() {
    return __awaiter(this, void 0, void 0, function* () {
        const sdk = (0, client_1.YooKassa)(initOpts);
        const paymentId = '2e3f90e3-000f-5000-a000-14f0028604a7';
        const payment = yield sdk.payments.capture(paymentId);
        console.log(JSON.stringify(payment, null, 2));
    });
}
// testCapturePayment();
function testCancelPayment() {
    return __awaiter(this, void 0, void 0, function* () {
        const sdk = (0, client_1.YooKassa)(initOpts);
        const paymentId = '2e3f90e3-000f-5000-a000-14f0028604a7';
        const payment = yield sdk.payments.cancel(paymentId);
        console.log(JSON.stringify(payment, null, 2));
    });
}
// testCancelPayment();
function testCreateRefund() {
    return __awaiter(this, void 0, void 0, function* () {
        const sdk = (0, client_1.YooKassa)(initOpts);
        const paymentId = '2e3f90e3-000f-5000-a000-14f0028604a7';
        const refund = yield sdk.refunds.create({
            payment_id: paymentId,
            amount: {
                currency: general_types_1.CurrencyEnum.RUB,
                value: '7.00',
            },
        });
        console.log(JSON.stringify(refund, null, 2));
    });
}
// testCreateRefund();
function testGetRefund() {
    return __awaiter(this, void 0, void 0, function* () {
        const sdk = (0, client_1.YooKassa)(initOpts);
        const paymentId = '2e3f90e3-000f-5000-a000-14f0028604a7';
        const refundId = '2e40b923-0015-5000-a000-1f4e75af689e';
        const refund = yield sdk.refunds.load(refundId);
        console.log(JSON.stringify(refund, null, 2));
    });
}
// testGetRefund();
function testGetListRefund() {
    return __awaiter(this, void 0, void 0, function* () {
        const sdk = (0, client_1.YooKassa)(initOpts);
        const paymentId = '2e3f90e3-000f-5000-a000-14f0028604a7';
        const refundId = '2e40b923-0015-5000-a000-1f4e75af689e';
        const refund = yield sdk.refunds.list({
            created_at: {
                gt: new Date('2024-01-01').toISOString(),
            },
            payment_id: paymentId,
        });
        console.log(JSON.stringify(refund, null, 2));
    });
}
// testGetListRefund();
//# sourceMappingURL=man-tests.js.map