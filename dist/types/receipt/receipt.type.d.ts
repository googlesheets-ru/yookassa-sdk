import { SettlementTypeMap } from '../../dictionaries';
import { Customer } from '../customer.type';
import { IAmount } from '../general.types';
import { Items } from './item.type';
export declare namespace Receipts {
    /**
     * Статус регистрации чека. Возможные значения:
     * - `pending` — данные в обработке;
     * - `succeeded` — чек успешно зарегистрирован;
     * - `canceled` — чек зарегистрировать не удалось; если используете Чеки от ЮKassa, обратитесь в техническую поддержку, в остальных случаях сформируйте чек вручную.
     * Присутствует, если вы используете [решения ЮKassa для отправки чеков](https://yookassa.ru/developers/payment-acceptance/receipts/basics) в налоговую.
     */
    export type ReceiptRegistrationStatus = 'pending' | 'succeeded' | 'canceled';
    /**Тип чека в онлайн-кассе: приход (payment) или возврат прихода (refund). */
    export type ReceiptType = 'payment' | 'refund';
    /**
     * Статус доставки данных для чека в онлайн-кассу.
     *
     * Возможные значения:
     * - `pending` — данные в обработке;
     * - `succeeded` — чек успешно зарегистрирован;
     * - `canceled` — чек зарегистрировать не удалось; если используете Чеки от ЮKassa, обратитесь в техническую поддержку, в остальных случаях сформируйте чек вручную.
     */
    export type ReceiptStatus = 'pending' | 'succeeded' | 'canceled';
    /** Возможные типы расчетов */
    export type SettlementType = keyof typeof SettlementTypeMap;
    /** Расчет */
    export type Settlement = {
        /**Тип расчета. */
        type: SettlementType;
        /**Сумма. */
        amount: IAmount;
    };
    interface IReceiptGeneral {
        /**Идентификатор чека в ЮKassa. */
        id: string;
        /**Тип чека в онлайн-кассе: приход (`payment`) или возврат прихода (`refund`). */
        type: ReceiptType;
        /** Идентификатор платежа, для которого был сформирован чек. */
        payment_id?: string;
        /**Идентификатор возврата, для которого был сформирован чек. Отсутствует в чеке платежа. */
        refund_id?: string;
        /**
         * Статус доставки данных для чека в онлайн-кассу.
         *
         * Возможные значения:
         * - `pending` — данные в обработке;
         * - `succeeded` — чек успешно зарегистрирован;
         * - `canceled` — чек зарегистрировать не удалось; если используете Чеки от ЮKassa, обратитесь в техническую поддержку, в остальных случаях сформируйте чек вручную.
         */
        status: ReceiptStatus;
        /** Номер фискального документа. */
        fiscal_document_number?: string;
        /** Номер фискального накопителя в кассовом аппарате. */
        fiscal_storage_number?: string;
        /** Фискальный признак чека. Формируется фискальным накопителем на основе данных, переданных для регистрации чека. */
        fiscal_attribute?: string;
        /** Дата и время формирования чека в фискальном накопителе. Указывается в формате ISO 8601. */
        registered_at?: string;
        /** Идентификатор чека в онлайн-кассе. Присутствует, если чек удалось зарегистрировать. */
        fiscal_provider_id?: string;
        /** Список товаров в чеке (не более 100 товаров). */
        items: Items.Item[];
        /** Перечень совершенных расчетов. */
        settlements?: Settlement[];
        /** Идентификатор магазина, от имени которого нужно отправить чек. Выдается ЮKassa. Присутствует, если вы используете Сплитование платежей . */
        on_behalf_of?: string;
        /** ***Система налогообложения магазина (тег в 54 ФЗ — 1055).***
         *
         * Для сторонних онлайн-касс: обязательный параметр, если вы используете онлайн-кассу Атол Онлайн, обновленную до ФФД 1.2, или у вас несколько систем налогообложения, в остальных случаях не передается.
         * [Перечень возможных значений](https://yookassa.ru/developers/payment-acceptance/receipts/54fz/other-services/parameters-values#tax-systems)
         *
         * Для Чеков от ЮKassa: параметр передавать не нужно, ЮKassa его проигнорирует. */
        tax_system_code?: number;
        /** Отраслевой реквизит чека (тег в 54 ФЗ — 1261). Можно передавать, если используете Чеки от ЮKassa или онлайн-кассу, обновленную до ФФД 1.2. */
        receipt_industry_details?: Items.PaymentSubjectIndustryDetails[];
        /** Операционный реквизит чека (тег в 54 ФЗ — 1270). Можно передавать, если используете Чеки от ЮKassa или онлайн-кассу, обновленную до ФФД 1.2. */
        receipt_operational_details?: {
            /** Идентификатор операции (тег в 54 ФЗ — 1271). Число от 0 до 255. */
            operation_id: number;
            /** Данные операции (тег в 54 ФЗ — 1272). */
            value: string;
            /** Время создания операции (тег в 54 ФЗ — 1273).
             *
             * Указывается по [UTC](https://ru.wikipedia.org/wiki/%D0%92%D1%81%D0%B5%D0%BC%D0%B8%D1%80%D0%BD%D0%BE%D0%B5_%D0%BA%D0%BE%D0%BE%D1%80%D0%B4%D0%B8%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5_%D0%B2%D1%80%D0%B5%D0%BC%D1%8F) и передается в формате [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601).
             *
             * Пример: `2017-11-03T11:52:31.827Z`
             */
            created_at: string;
        };
    }
    export type CreateReceiptType = Pick<IReceiptGeneral, 'type' | 'payment_id' | 'refund_id' | 'items' | 'tax_system_code' | 'receipt_industry_details' | 'receipt_operational_details' | 'on_behalf_of'> & {
        /** Информация о пользователе.
         *
         * Необходимо указать как минимум контактные данные: для Чеков от ЮKassa — электронную почту (`customer.email`),
         * в остальных случаях — электронную почту (`customer.email`) или номер телефона (`customer.phone`).
         */
        customer: Customer;
        /**
         * Формирование чека в онлайн-кассе сразу после создания объекта чека. Сейчас можно передать только значение `true`.
         */
        send: true;
        /**Дополнительный реквизит пользователя (тег в 54 ФЗ — 1084).
         * Можно передавать, если вы отправляете данные для формирования чека по сценарию Сначала платеж, потом чек
         */
        additional_user_props?: {
            /** Наименование дополнительного реквизита пользователя (тег в 54 ФЗ — 1085). Не более 64 символов. */
            name: string;
            /** Значение дополнительного реквизита пользователя (тег в 54 ФЗ — 1086). Не более 234 символов. */
            value: string;
        };
        /** Перечень совершенных расчетов. */
        settlements: Settlement[];
    };
    /**
     * ***Данные для формирования чека,*** которые передаются при создании платежа.
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
    export type ReceiptinPaymentType = Partial<Pick<CreateReceiptType, 'customer' | 'tax_system_code' | 'receipt_industry_details' | 'receipt_operational_details'>> & Required<Pick<CreateReceiptType, 'items'>>;
    export {};
}
