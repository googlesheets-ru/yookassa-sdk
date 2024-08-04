import { IAmount } from '../general.types';
interface IElectronicCertificate {
    /** Идентификатор корзины возврата, сформированной в НСПК. */
    basket_id: string;
    /** Сумма, которая вернется на электронный сертификат. */
    amount: IAmount;
}
interface IArticle {
    /** Порядковый номер товара в корзине возврата. От 1 до 999 включительно. */
    article_number: number;
    /** Порядковый номер товара в одобренной корзине покупки (`article_number` в объекте платежа). От 1 до 999 включительно. */
    payment_article_number: number;
    /**
     * Код ТРУ. 30 символов, две группы цифр, разделенные точкой.
     * Формат: `NNNNNNNNN.NNNNNNNNNYYYYMMMMZZZ`,
     * где `NNNNNNNNN.NNNNNNNNN` — код вида ТРУ по Перечню ТРУ,
     * `YYYY` — код производителя, `MMMM` — код модели, `ZZZ` — код страны производителя.
     *
     * Пример: `329921120.06001010200080001643`
     *
     * [Как сформировать код ТРУ](https://yookassa.ru/developers/payment-acceptance/integration-scenarios/manual-integration/other/electronic-certificate#payments-preparation-tru-code)
     */
    tru_code: string;
    /** Количество возвращаемых единиц товара. Формат: целое положительное число. */
    quantity: number;
}
type RefundMethodTypeName = 'sbp' | 'electronic_certificate';
interface IRefundMethodGeneral {
    type: RefundMethodTypeName;
}
type SbpRefundMethod = IRefundMethodGeneral & {
    type: 'sbp';
    /** Идентификатор операции в СБП (НСПК).
     * Пример: `1027088AE4CB48CB81287833347A8777`.
     * Обязательный параметр для возвратов в статусе `succeeded`.
     * В остальных случаях может отсутствовать. */
    sbp_operation_id?: string;
};
export type ElectronicCertificateRefundMethod = IRefundMethodGeneral & {
    type: 'electronic_certificate';
    /** Корзина возврата — список возвращаемых товаров, для оплаты которых использовался электронный сертификат.
     * Присутствует, если оплата была на готовой странице ЮKassa.
     */
    articles: IArticle[];
    /** Данные от ФЭС НСПК для возврата на электронный сертификат. */
    electronic_certificate?: IElectronicCertificate;
};
export type RefundMethod = SbpRefundMethod | ElectronicCertificateRefundMethod;
export {};
