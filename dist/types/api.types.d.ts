import { Payments } from './payments/payment.type';
import { PaymentMethodsEnum } from './payments/paymentMethod.type';
import { Refunds } from './refunds/refund.type';
/** Фильтр по времени
 *
 * Время указывается в формате ISO 8601. Пример: `created_at.gte=2018-07-18T10:51:18.139Z`
 */
export type DateFilter = {
    /** время должно быть больше указанного значения или равно ему («с такого-то момента включительно»). */
    gte?: string;
    /** время должно быть больше указанного значения */
    gt?: string;
    /** время должно быть меньше указанного значения или равно ему */
    lte?: string;
    /** Время должно быть меньше указанного значения */
    lt?: string;
};
export type GetPaymentListFilter = {
    /** Фильтр по времени создания */
    created_at?: DateFilter;
    /** Фильтр по времени подтверждения  */
    captured_at?: DateFilter;
    /** Фильтр по коду [способа оплаты](https://yookassa.ru/developers/payment-acceptance/getting-started/payment-methods#all).
     *
     * @example Пример: `payment_method=bank_card`
     */
    payment_method?: PaymentMethodsEnum;
    /**Фильтр по статусу платежа.
     * @example status=succeeded */
    status?: Payments.PaymentStatus;
    /**
     * Размер выдачи результатов запроса — количество объектов, передаваемых в ответе.
     * Возможные значения: от 1 до 100.
     * @example Пример: limit=50
     * @default 10 Значение по умолчанию: 10
     */
    limit?: number;
    /**
     * Указатель на следующий фрагмент списка.
     * @description В качестве указателя необходимо использовать значение параметра `next_cursor`,
     * полученное в ответе на предыдущий запрос. Используется, если в списке больше объектов,
     * чем может поместиться в выдаче (`limit`), и конец выдачи не достигнут.
     * @example Пример: `cursor=37a5c87d-3984-51e8-a7f3-8de646d39ec15`
     * @see [Пример использования](https://yookassa.ru/developers/using-api/lists#pagination)
     */
    cursor?: string;
};
export type GetRefundListFilter = Omit<GetPaymentListFilter, 'captured_at' | 'payment_method'> & {
    /**
     * Фильтр по идентификатору платежа (получить все возвраты по платежу).
     * @example payment_id=1da5c87d-0984-50e8-a7f3-8de646dd9ec9
     */
    payment_id?: string;
    /**
     * Статус возврата платежа. Возможные значения:
     * - `pending` — возврат создан, но пока еще обрабатывается;
     * - `succeeded` — возврат успешно завершен, указанная в запросе сумма переведена на платежное средство пользователя (финальный и неизменяемый статус);
     * - `canceled` — возврат отменен, инициатор и причина отмены указаны в объекте cancellation_details (финальный и неизменяемый статус).
     */
    status?: Refunds.RefundStatus;
};
export type GetReceiptListFilter = Pick<GetRefundListFilter, 'payment_id' | 'cursor'> & {
    /** Фильтр по идентификатору возврата (получить все чеки для указанного возврата).
     * В запросе можно передать только что-то одно: или идентификатор платежа, или идентификатор возврата.
     * @example Пример: refund_id=1da5c87d-0984-50e8-a7f3-8de646dd9ec9
     */
    refund_id?: string;
};
export type GetListResponse<T> = {
    type: 'list';
    /** Массив объектов. */
    items: T[];
    /** Указатель на следующий фрагмент списка. */
    next_cursor?: string;
};
/** В ответ на запрос придет [объект платежа](https://yookassa.ru/developers/api#payment_object) в актуальном статусе. */
export type CreatePaymentResponse = Payments.IPayment;
export type YooKassaErrResponse = {
    type: 'error';
    id: string;
    code: string;
    description: string;
};
export declare class YooKassaErr extends Error {
    id: string;
    constructor(err: YooKassaErrResponse);
}
