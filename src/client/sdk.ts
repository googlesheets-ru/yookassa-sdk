import {
    CreatePaymentResponse,
    GetListResponse,
    GetPaymentListFilter,
    GetReceiptListFilter,
    GetRefundListFilter,
    YooKassaErr,
} from '../types/api.types';
import { Payments } from '../types/payments';
import { Connector, ConnectorOpts, RequestOpts } from './connector';
import { Refunds } from '../types/refunds';
import { Receipts } from '../types/receipt';

export class YooKassaSdk extends Connector {
    constructor(opts: ConnectorOpts) {
        super(opts);
    }
    // ========== Payments ========== //
    protected getPaymentById = async (id: string) => {
        const response = await this.request<Payments.IPayment>({
            method: 'GET',
            endpoint: `/payments/${id}`,
        });
        if (response.success == 'NO_OK') {
            throw new YooKassaErr(response.errorData);
        }
        const payment = response.data;
        return payment;
    };
    /** ****Получить список платежей****
     *
     * Запрос позволяет получить список платежей, отфильтрованный по заданным критериям. [Подробнее о работе со списками](https://yookassa.ru/developers/using-api/lists)
     */
    protected getPaymentList = async (
        filter?: Omit<GetPaymentListFilter, 'cursor'>,
    ): Promise<Payments.IPayment[]> => {
        filter ??= {};
        const payments: Payments.IPayment[] = [];
        const params: GetPaymentListFilter = filter;
        const opts: RequestOpts<GetPaymentListFilter> = {
            method: 'GET',
            endpoint: '/payments',
            params,
        };
        do {
            const response =
                await this.request<GetListResponse<Payments.IPayment>>(opts);
            if (response.success == 'NO_OK') {
                throw new YooKassaErr(response.errorData);
            }
            opts.requestId = response.requestId;
            payments.push(...response.data.items);
            if (!response.data.next_cursor) {
                break;
            }
            params.cursor = response.data.next_cursor;
        } while (true);
        return payments;
    };
    /** Создать платеж */
    protected createPayment = async (
        newPayment: Payments.CreatePaymentRequest,
    ) => {
        const response = await this.request<CreatePaymentResponse>({
            method: 'POST',
            endpoint: '/payments',
            data: newPayment,
        });
        if (response.success == 'NO_OK') {
            throw new YooKassaErr(response.errorData);
        }
        const createdPayment = response.data;
        return createdPayment;
    };

    /** Подтвердить платеж по идентификатору */
    protected capturePaymentById = async (
        paymentId: string,
    ): Promise<Payments.IPayment> => {
        const response = await this.request<Payments.IPayment>({
            method: 'POST',
            endpoint: `/payments/${paymentId}/capture`,
            data: {},
        });
        if (response.success == 'NO_OK') {
            throw new YooKassaErr(response.errorData);
        }
        const capturedPayment = response.data;
        return capturedPayment;
    };

    protected cancelPaymentById = async (
        paymentId: string,
    ): Promise<Payments.IPayment> => {
        const response = await this.request<Payments.IPayment>({
            method: 'POST',
            endpoint: `/payments/${paymentId}/cancel`,
            data: {},
        });
        if (response.success == 'NO_OK') {
            throw new YooKassaErr(response.errorData);
        }
        const canceledPayment = response.data;
        return canceledPayment;
    };
    // ========== Payments end========== //
    // ========== Refunds ========== //
    protected getRefundById = async (refundId: string) => {
        const response = await this.request<Refunds.IRefund>({
            method: 'GET',
            endpoint: `/refunds/${refundId}`,
        });
        if (response.success == 'NO_OK') {
            throw new YooKassaErr(response.errorData);
        }
        const refund = response.data;
        return refund;
    };

    protected getRefundList = async (
        filter?: Omit<GetRefundListFilter, 'cursor'>,
    ): Promise<Refunds.IRefund[]> => {
        filter ??= {};
        const refunds: Refunds.IRefund[] = [];
        const params: GetPaymentListFilter = filter;
        const opts: RequestOpts<GetPaymentListFilter> = {
            method: 'GET',
            endpoint: '/refunds',
            params,
        };
        do {
            const response =
                await this.request<GetListResponse<Refunds.IRefund>>(opts);
            if (response.success == 'NO_OK') {
                throw new YooKassaErr(response.errorData);
            }
            opts.requestId = response.requestId;
            refunds.push(...response.data.items);
            if (!response.data.next_cursor) {
                break;
            }
            params.cursor = response.data.next_cursor;
        } while (true);
        return refunds;
    };

    protected createRefund = async (newRefund: Refunds.CreateRefundRequest) => {
        const response = await this.request<Refunds.IRefund>({
            method: 'POST',
            endpoint: '/refunds',
            data: newRefund,
        });
        if (response.success == 'NO_OK') {
            throw new YooKassaErr(response.errorData);
        }
        const createdRefund = response.data;
        return createdRefund;
    };
    // ========== Refunds end ========== //
    // ========== Receipts ========== //
    protected getReceiptById = async (receiptId: string) => {
        const response = await this.request<Receipts.ReceiptType>({
            method: 'GET',
            endpoint: `/receipts/${receiptId}`,
        });
        if (response.success == 'NO_OK') {
            throw new YooKassaErr(response.errorData);
        }
        const receipt = response.data;
        return receipt;
    };

    protected createReceipt = async (
        newReceipt: Receipts.CreateReceiptType,
    ) => {
        const response = await this.request<Receipts.ReceiptType>({
            method: 'POST',
            endpoint: '/receipts',
            data: newReceipt,
        });
        if (response.success == 'NO_OK') {
            throw new YooKassaErr(response.errorData);
        }
        const createdReceipt = response.data;
        return createdReceipt;
    };

    protected getReceiptList = async (
        filter?: Omit<GetReceiptListFilter, 'cursor'>,
    ): Promise<Receipts.ReceiptType[]> => {
        filter ??= {};
        const receipts: Receipts.ReceiptType[] = [];
        const params: GetReceiptListFilter = filter;
        const opts: RequestOpts<GetReceiptListFilter> = {
            method: 'GET',
            endpoint: '/receipts',
            params,
        };
        do {
            const response =
                await this.request<GetListResponse<Receipts.ReceiptType>>(opts);
            if (response.success == 'NO_OK') {
                throw new YooKassaErr(response.errorData);
            }
            opts.requestId = response.requestId;
            receipts.push(...response.data.items);
            if (!response.data.next_cursor) {
                break;
            }
            params.cursor = response.data.next_cursor;
        } while (true);
        return receipts;
    };
    // ========== Receipts end ========== //
    /** Методы для работы с платежами */
    public readonly payments = {
        /**
         * [****Создание платежа****](https://yookassa.ru/developers/api#create_payment)
         *
         * Чтобы принять оплату, необходимо создать объект платежа — `Payment`.
         * Он содержит всю необходимую информацию для проведения оплаты (сумму, валюту и статус).
         * У платежа линейный жизненный цикл, он последовательно переходит из статуса в статус.
         */
        create: this.createPayment,
        /**
         * ****Информация о платеже****
         *
         * Запрос позволяет получить информацию о текущем состоянии платежа по его уникальному идентификатору.
         *
         * [Документация](https://yookassa.ru/developers/api#get_payment)
         */
        load: this.getPaymentById,

        /**
         * ****Список платежей****
         *
         * Запрос позволяет получить список платежей, отфильтрованный по заданным критериям.
         *
         * Retrieves a list of payments filtered by the specified criteria.
         *
         * @param {Omit<GetPaymentListFilter, 'cursor'>} params - The parameters for filtering the payments.
         * @return {Promise<Payments.IPayment[]>} A promise that resolves to the list of payments.
         *
         * [API Documentation](https://yookassa.ru/developers/api#get_payment)
         *
         * [Working with lists documentation](https://yookassa.ru/developers/using-api/lists)
         *
         * **PaymentListParams**
         *
         * These are the parameters that can be used to filter the payments.
         *
         * **created_at**
         * - `gte` (optional): Filter by the creation time. The time should be greater than or equal to the specified value. Format: ISO 8601. Example: `created_at.gte=2018-07-18T10:51:18.139Z`
         * - `gt` (optional): Filter by the creation time. The time should be greater than the specified value. Format: ISO 8601. Example: `created_at.gt=2018-07-18T10:51:18.139Z`
         * - `lte` (optional): Filter by the creation time. The time should be less than or equal to the specified value. Format: ISO 8601. Example: `created_at.lte=2018-07-18T10:51:18.139Z`
         * - `lt` (optional): Filter by the creation time. The time should be less than the specified value. Format: ISO 8601. Example: `created_at.lt=2018-07-18T10:51:18.139Z`
         *
         * **captured_at**
         * - `gte` (optional): Filter by the time of payment confirmation. The time should be greater than or equal to the specified value. Format: ISO 8601. Example: `captured_at.gte=2018-07-18T10:51:18.139Z`
         * - `gt` (optional): Filter by the time of payment confirmation. The time should be greater than the specified value. Format: ISO 8601. Example: `captured_at.gt=2018-07-18T10:51:18.139Z`
         * - `lte` (optional): Filter by the time of payment confirmation. The time should be less than or equal to the specified value. Format: ISO 8601. Example: `captured_at.lte=2018-07-18T10:51:18.139Z`
         * - `lt` (optional): Filter by the time of payment confirmation. The time should be less than the specified value. Format: ISO 8601. Example: `captured_at.lt=2018-07-18T10:51:18.139Z`
         *
         * **payment_method**
         * - `string` (optional): Filter by payment method code. Example: `payment_method=bank_card`
         *
         * **status**
         * - `string` (optional): Filter by payment status. Example: `status=succeeded`
         *
         * **limit**
         * - `number` (optional): The number of objects returned in the response. Possible values: from 1 to 100. Example: `limit=50`
         * - Default value: `10`
         *
         * **cursor**
         * - `string` (optional): Used to retrieve the next fragment of the list. Example: `cursor=37a5c87d-3984-51e8-a7f3-8de646d39ec15`
         * - Used as an indicator to retrieve the next fragment of the list. This should be used if there are more objects in the list than the number specified in the limit parameter. An example of how to use it is provided in the "Working with lists" documentation.
         *
         * **PaymentList**
         *
         * This is the response structure for the list of payments.
         *
         * **next_cursor**
         * - `string` (optional): Used to retrieve the next fragment of the list.
         *
         * **payments**
         * - `Payments.Payment[]` (optional): The list of payments.
         */
        list: this.getPaymentList,

        /**
         * ****Подтверждение платежа***
         *
         * Подтверждает вашу готовность принять платеж.
         * После подтверждения платеж перейдет в статус `succeeded`.
         * Это значит, что вы можете выдать товар или оказать услугу пользователю.
         * Подтвердить можно только платеж в статусе `waiting_for_capture`
         * и только в течение определенного времени (зависит от способа оплаты).
         * Если вы не подтвердите платеж в отведенное время, он автоматически
         * перейдет в статус `canceled`, и деньги вернутся пользователю.
         *
         * [Подробнее о подтверждении и отмене платежей](https://yookassa.ru/developers/payment-acceptance/getting-started/payment-process#capture-and-cancel)
         */
        capture: this.capturePaymentById,
        /**
         * ****Отмена платежа****
         *
         * Отменяет платеж, находящийся в статусе `waiting_for_capture`.
         * Отмена платежа значит, что вы не готовы выдать пользователю товар или оказать услугу.
         * Как только вы отменяете платеж, мы начинаем возвращать деньги на счет плательщика.
         * Для платежей банковскими картами, из кошелька ЮMoney или через SberPay отмена происходит мгновенно.
         * Для остальных способов оплаты возврат может занимать до нескольких дней.
         *
         * [Подробнее о подтверждении и отмене платежей](https://yookassa.ru/developers/payment-acceptance/getting-started/payment-process#capture-and-cancel)
         */
        cancel: this.cancelPaymentById,
    };
    /** Методы для работы с возвратами */
    public readonly refunds = {
        /**
         * ****Создание возврата****
         *
         * Создает возврат успешного платежа на указанную сумму.
         * Платеж можно вернуть только в течение трех лет с момента его создания.
         * Комиссия ЮKassa за проведение платежа не возвращается.
         * @see https://yookassa.ru/developers/api#create_refund
         */
        create: this.createRefund,
        /**
         * ****Информация о возврате****
         *
         * Запрос позволяет получить информацию о текущем состоянии возврата по его уникальному идентификатору.
         * @see https://yookassa.ru/developers/api#get_refund
         */
        load: this.getRefundById,
        /**
         * ****Список возвратов****
         *
         * Запрос позволяет получить список возвратов, отфильтрованный по заданным критериям.
         *
         * [Подробнее о работе со списками](https://yookassa.ru/developers/using-api/lists)
         * @see https://yookassa.ru/developers/api#get_refunds_list
         */
        list: this.getRefundList,
    };
    /**
     * ****Методы для работы с чеками****
     *
     * С помощью API можно получать информацию о чеках, для которых вы отправили данные через ЮKassa.
     * @see https://yookassa.ru/developers/api#receipt
     */
    public readonly receipts = {
        /**
         * ****Создание чека****
         *
         * Используйте этот запрос при оплате с соблюдением требований 54-ФЗ, чтобы создать чек зачета предоплаты.
         * Если вы работаете по сценарию [Сначала платеж, потом чек](https://yookassa.ru/developers/payment-acceptance/receipts/54fz/other-services/basics#receipt-after-payment),
         * в запросе также нужно передавать данные для формирования чека прихода и чека возврата прихода.
         * @see https://yookassa.ru/developers/api#create_receipt
         */
        create: this.createReceipt,
        /**
         * ****Информация о чеке****
         *
         * Запрос позволяет получить информацию о текущем состоянии чека по его уникальному идентификатору.
         */
        load: this.getReceiptById,
        /**
         * ****Список чеков****
         *
         * Запрос позволяет получить список чеков, отфильтрованный по заданным критериям.
         * Можно запросить чеки по конкретному платежу, чеки по конкретному возврату или все чеки магазина.
         *
         * [Подробнее о работе со списками](https://yookassa.ru/developers/using-api/lists)
         * @see https://yookassa.ru/developers/api#get_receipts_list
         */
        list: this.getReceiptList,
    };
}

let client: YooKassaSdk;
/**
 * Creates a singleton instance of YooKassaSdk with the given initialization options.
 *
 * @param {ConnectorOpts} init - Initialization options for the YooKassaSdk instance.
 * @return {YooKassaSdk} The singleton instance of YooKassaSdk.
 */
export function YooKassa(init: ConnectorOpts) {
    if (!client) {
        client = new YooKassaSdk(init);
    }
    return client;
}
