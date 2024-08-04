import { ConnectorOpts } from '../client/connector';
import { YooKassa } from '../client';
import { CurrencyEnum } from '../types/general.types';

const initOpts: ConnectorOpts = {
    debug: true,
    secret_key: 'test_mCqzu8TlMR46mwYJQuQft9xNi_NEdnaIHSgaRAmuNhI',
    shop_id: '909048',
};
async function test() {
    const sdk = YooKassa(initOpts);
    const response = await sdk.payments.create({
        receipt: {
            items: [
                {
                    amount: {
                        currency: CurrencyEnum.RUB,
                        value: '10.00',
                    },
                    description: 'Услуга 1',
                    quantity: 1,
                    vat_code: 1,
                },
            ],
        },
        amount: {
            currency: CurrencyEnum.RUB,
            value: '10.00',
        },
        confirmation: {
            type: 'redirect',
            return_url: 'https://googlesheets.ru',
        },
        description: 'Описание заказа',
    });

    console.log('response in test:', response);
}
// test();

async function testGetPayment() {
    const sdk = YooKassa(initOpts);
    const paymentId = '2e3f90e3-000f-5000-a000-14f0028604a7';
    const payment = await sdk.payments.load(paymentId);
    console.log(JSON.stringify(payment, null, 2));
}
// testGetPayment();
async function testCapturePayment() {
    const sdk = YooKassa(initOpts);
    const paymentId = '2e3f90e3-000f-5000-a000-14f0028604a7';
    const payment = await sdk.payments.capture(paymentId);
    console.log(JSON.stringify(payment, null, 2));
}
// testCapturePayment();

async function testCancelPayment() {
    const sdk = YooKassa(initOpts);
    const paymentId = '2e3f90e3-000f-5000-a000-14f0028604a7';
    const payment = await sdk.payments.cancel(paymentId);
    console.log(JSON.stringify(payment, null, 2));
}
// testCancelPayment();
async function testCreateRefund() {
    const sdk = YooKassa(initOpts);
    const paymentId = '2e3f90e3-000f-5000-a000-14f0028604a7';
    const refund = await sdk.refunds.create({
        payment_id: paymentId,
        amount: {
            currency: CurrencyEnum.RUB,
            value: '7.00',
        },
    });
    console.log(JSON.stringify(refund, null, 2));
}
// testCreateRefund();
async function testGetRefund() {
    const sdk = YooKassa(initOpts);
    const paymentId = '2e3f90e3-000f-5000-a000-14f0028604a7';
    const refundId = '2e40b923-0015-5000-a000-1f4e75af689e';
    const refund = await sdk.refunds.load(refundId);
    console.log(JSON.stringify(refund, null, 2));
}
// testGetRefund();
async function testGetListRefund() {
    const sdk = YooKassa(initOpts);
    const paymentId = '2e3f90e3-000f-5000-a000-14f0028604a7';
    const refundId = '2e40b923-0015-5000-a000-1f4e75af689e';
    const refund = await sdk.refunds.list({
        created_at: {
            gt: new Date('2024-01-01').toISOString(),
        },
        payment_id: paymentId,
    });
    console.log(JSON.stringify(refund, null, 2));
}
// testGetListRefund();
