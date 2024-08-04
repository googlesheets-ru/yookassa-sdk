import { refundCancelReasonMap } from '../../dictionaries';
import { IAmount } from '../general.types';
import { Payments } from '../payments/payment.type';
import { Receipts } from '../receipt/';
import { ElectronicCertificateRefundMethod, RefundMethod } from './refundMethod.type';
export declare namespace Refunds {
    type RefundDealType = {
        /** Идентификатор сделки. Берется из возвращаемого платежа. */
        id: string;
        /**Данные о распределении денег. */
        refund_settlements: Payments.DealType['settlements'];
    };
    type RefundCancelReason = keyof typeof refundCancelReasonMap;
    export interface IRefundCancellationDetails {
        /**Инициатор отмены возврата
         * @see https://yookassa.ru/developers/payment-acceptance/after-the-payment/refunds#declined-refunds-cancellation-details-party
         */
        party: 'yoo_money' | 'payment_network';
        /**Причина отмены возврата
         * @see https://yookassa.ru/developers/payment-acceptance/after-the-payment/refunds#declined-refunds-cancellation-details-reason
         */
        reason: RefundCancelReason;
    }
    export interface IRefundSource {
        /**
         * Идентификатор магазина, для которого вы хотите провести возврат. Выдается ЮKassa, отображается в разделе Продавцы личного кабинета (столбец shopId).
         */
        account_id: string;
        /**Сумма возврата. */
        amount: IAmount;
        /** Комиссия, которую вы удержали при оплате, и хотите вернуть. */
        platform_fee_amount?: IAmount;
    }
    export type RefundStatus = 'pending' | 'succeeded' | 'canceled';
    /**
     * ****Объект возврата****
     * Объект возврата (`Refund`) содержит актуальную информацию о возврате успешного платежа.
     * Он приходит в ответ на любой запрос, связанный с возвратами.
     * Объект может содержать параметры и значения, не описанные в этом Справочнике API. Их следует игнорировать.
     */
    export interface IRefund {
        /** Идентификатор возврата платежа в ЮKassa. */
        id: string;
        /** Идентификатор платежа в ЮKassa. */
        payment_id: string;
        /**
         * Статус возврата платежа. Возможные значения:
         * - `pending` — возврат создан, но пока еще обрабатывается;
         * - `succeeded` — возврат успешно завершен, указанная в запросе сумма переведена на платежное средство пользователя (финальный и неизменяемый статус);
         * - `canceled` — возврат отменен, инициатор и причина отмены указаны в объекте cancellation_details (финальный и неизменяемый статус).
         *
         * В зависимости от вашего процесса часть статусов может быть пропущена, но их последовательность не меняется.
         *
         * Чтобы узнать статус возврата, периодически отправляйте запросы, чтобы получить информацию о возврате, или подождите, когда придет уведомление от ЮKassa.
         * @see https://yookassa.ru/developers/payment-acceptance/after-the-payment/refunds#status
         */
        status: RefundStatus;
        /** Комментарий к статусу `canceled`: кто отменил возврат и по какой причине. */
        cancellation_details?: IRefundCancellationDetails;
        /**
         * Статус регистрации чека. Возможные значения:
         * - `pending` — данные в обработке;
         * - `succeeded` — чек успешно зарегистрирован;
         * - `canceled` — чек зарегистрировать не удалось; если используете Чеки от ЮKassa, обратитесь в техническую поддержку, в остальных случаях сформируйте чек вручную.
         * Присутствует, если вы используете [решения ЮKassa для отправки чеков](https://yookassa.ru/developers/payment-acceptance/receipts/basics) в налоговую.
         */
        receipt_registration?: Receipts.ReceiptRegistrationStatus;
        /**
         * Время создания возврата. Указывается по UTC и передается в формате ISO 8601, например `2017-11-03T11:52:31.827Z`
         */
        created_at: string;
        /** Сумма, возвращенная пользователю. */
        amount: IAmount;
        /** Основание для возврата денег пользователю. */
        description?: string;
        /**
         * Данные о том, с какого магазина и какую сумму нужно удержать для проведения возврата.
         * Присутствует, если вы используете [Сплитование платежей](https://yookassa.ru/developers/solutions-for-platforms/split-payments/basics).
         */
        sources?: IRefundSource[];
        /** Данные о сделке, в составе которой проходит возврат.
         * Присутствует, если вы проводите [Безопасную сделку](https://yookassa.ru/developers/solutions-for-platforms/safe-deal/basics).
         */
        deal?: RefundDealType;
        /**Детали возврата. Зависят от способа оплаты, который использовался при проведении платежа. */
        refund_method?: RefundMethod;
    }
    export type CreateRefundRequest = Pick<IRefund, 'payment_id' | 'amount' | 'description' | 'sources' | 'deal'> & {
        /**
         * ***Данные для формирования чека.***
         *
         * Необходимо передавать в этих случаях:
         * - вы компания или ИП и для оплаты с соблюдением требований 54-ФЗ используете [Чеки от ЮKassa](1);
         * - вы компания или ИП, для оплаты с соблюдением требований 54-ФЗ используете [стороннюю онлайн-кассу](2) и отправляете данные для чеков по одному из сценариев: [Платеж и чек одновременно](3) или [Сначала чек, потом платеж](4) ;
         * - вы самозанятый и используете решение ЮKassa для [автоотправки чеков](5)
         *
         * [1]: https://yookassa.ru/developers/payment-acceptance/receipts/54fz/yoomoney/basics
         * [2]: https://yookassa.ru/developers/payment-acceptance/receipts/54fz/other-services/basics
         * [3]: https://yookassa.ru/developers/payment-acceptance/receipts/54fz/other-services/basics#payment-and-receipt
         * [4]: https://yookassa.ru/developers/payment-acceptance/receipts/54fz/other-services/basics#payment-after-receipt
         * [5]: https://yookassa.ru/developers/payment-acceptance/receipts/self-employed/basics
         */
        receipt?: Receipts.CreateReceiptType;
        /** Детали возврата. Зависят от способа оплаты, который использовался при проведении платежа. */
        refund_method_data?: ElectronicCertificateRefundMethod;
    };
    export {};
}
