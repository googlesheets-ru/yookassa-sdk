import { AgentTypeMap, measureTypeMap, paymentSubjectMap } from '../../dictionaries';
import { IAmount } from '../general.types';
export declare namespace Items {
    /**
     * Отраслевой реквизит предмета расчета (тег в 54 ФЗ — 1260). Можно передавать, если используете Чеки от ЮKassa или онлайн-кассу, обновленную до ФФД 1.2.
     */
    export interface PaymentSubjectIndustryDetails {
        /** Идентификатор федерального органа исполнительной власти (тег в 54 ФЗ — 1262). */
        federal_id: string;
        /** Дата документа основания (тег в 54 ФЗ — 1263). Передается в формате [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
         *
         * Пример: `2020-11-18`
         */
        document_date: string;
        /** Номер нормативного акта федерального органа исполнительной власти, регламентирующего порядок заполнения реквизита «значение отраслевого реквизита» (тег в 54 ФЗ — 1264).
         *
         * Длина: до 32
         */
        document_number: string;
        /** Значение отраслевого реквизита (тег в 54 ФЗ — 1265).
         *
         * Длина: до 256. Пример:`123/43`
         */
        value: string;
    }
    /** ***Код товара (тег в 54 ФЗ — 1163).**-
     *
     * Обязательный параметр, если одновременно выполняются эти условия:
     * - вы используете Чеки от ЮKassa или онлайн-кассу, обновленную до ФФД 1.2;
     * - товар нужно маркировать.
     *
     * _Должно быть заполнено хотя бы одно поле._
     */
    interface MarkCodeInfo {
        /** Код товара в том виде, в котором он был прочитан сканером (тег в 54 ФЗ — 2000).
         * Нужно передавать, если используете онлайн-кассу Orange Data.
         *
         * Пример: `010460406000590021N4N57RTCBUZTQ\u001d2403054002410161218\u001d1424010191ffd0\u001g92tIAF/YVpU4roQS3M/m4z78yFq0nc/WsSmLeX6QkF/YVWwy5IMYAeiQ91Xa2m/fFSJcOkb2N+uUUtfr4n0mOX0Q==`
         */
        mark_code_raw?: string;
        /** Нераспознанный код товара (тег в 54 ФЗ — 1300). */
        unknown?: string;
        /** Код товара в формате EAN-8 (тег в 54 ФЗ — 1301). */
        ean_8?: string;
        /** Код товара в формате EAN-13 (тег в 54 ФЗ — 1302). */
        ean_13?: string;
        /** Код товара в формате ITF-14 (тег в 54 ФЗ — 1303). */
        itf_14?: string;
        /** Код товара в формате GS1.0 (тег в 54 ФЗ — 1304).
         *
         * Можно передавать, если используете онлайн-кассу Orange Data, aQsi, Кит Инвест.
         */
        gs_10?: string;
        /** Код товара в формате GS1.M (тег в 54 ФЗ — 1305). */
        gs_1m?: string;
        /** Код товара в формате короткого кода маркировки (тег в 54 ФЗ — 1306). */
        short?: string;
        /** Контрольно-идентификационный знак мехового изделия (тег в 54 ФЗ — 1307). */
        fur?: string;
        /** Код товара в формате ЕГАИС-2.0 (тег в 54 ФЗ — 1308). */
        egais_20?: string;
        /** Код товара в формате ЕГАИС-3.0 (тег в 54 ФЗ — 1309). */
        egais_30?: string;
    }
    /**
     * ****Тип посредника****
     *
     * Тип посредника передается в запросе на создание чека  в массиве `items`, в параметре `agent_type`,
     * если вы отправляете данные для формирования чека по "сценарию Сначала платеж, потом чек".
     * Параметр `agent_type` нужно передавать, начиная с ФФД 1.1.
     * Убедитесь, что ваша онлайн-касса обновлена до этой версии.
     * @see https://yookassa.ru/developers/payment-acceptance/receipts/54fz/other-services/parameters-values#agent-type
     */
    export type AgentType = keyof typeof AgentTypeMap;
    /**
     * Информация о поставщике товара или услуги (тег в 54 ФЗ — 1224).
     * Можно передавать, если вы отправляете данные для формирования чека
     * по сценарию [Сначала платеж, потом чек](https://yookassa.ru/developers/payment-acceptance/receipts/54fz/other-services/basics#receipt-after-payment).
     */
    export type Supplier = {
        /** Наименование поставщика (тег в 54 ФЗ — 1225). Параметр предусмотрен форматом фискальных документов (ФФД) и является обязательным, начиная с версии 1.1. */
        name: string;
        /** Телефон поставщика (тег в 54 ФЗ — 1171).
         * Указывается в формате ITU-T E.164,
         * Параметр предусмотрен форматом фискальных документов (ФФД) и является обязательным, начиная с версии 1.1.
         * @example `79000000000`.
         */
        phone?: string;
        /** ИНН поставщика в маскированном виде (тег в 54 ФЗ — 1226). Пример: ***. Параметр предусмотрен форматом фискальных документов (ФФД) и является обязательным, начиная с версии 1.05. */
        inn?: string;
    };
    /**
     * Признак способа расчета. Передается в параметре `payment_mode`
     *
     * !_Частичная предоплата, аванс и кредит не поддерживаются._
     */
    export type PaymentMode = 'full_prepayment' | 'full_payment';
    /**
     * Признак предмета расчета, передается в параметре `payment_subject`
     */
    export type PaymentSubject = keyof typeof paymentSubjectMap;
    /**
     * Мера количества предмета расчета, передается в массиве `items`, в параметре `measure`.
     */
    export type MeasureType = keyof typeof measureTypeMap;
    /**
     * Дробное количество маркированного товара (тег в 54 ФЗ — 1291).
     *
     * Обязательный параметр, если одновременно выполняются эти условия:
     * - вы используете Чеки от ЮKassa или онлайн-кассу, обновленную до ФФД 1.2;
     * - товар нужно маркировать;
     * - поле measure имеет значение piece.
     *
     * Пример: вы продаете поштучно карандаши. Они поставляются пачками по 100 штук с одним кодом маркировки. При продаже одного карандаша нужно в numerator передать 1, а в denominator — 100.
     */
    interface MarkQuantity {
        /** Числитель — количество продаваемых товаров из одной потребительской упаковки (тег в 54 ФЗ — 1293). Не может превышать `denominator`. */
        numerator: number;
        /** Знаменатель — общее количество товаров в потребительской упаковке (тег в 54 ФЗ — 1294). */
        denominator: number;
    }
    /**
     * Список товаров в заказе. Для чеков по 54-ФЗ можно передать не более 100 товаров, для чеков самозанятых — не более шести.
     */
    export interface Item {
        /** Название товара (от 1 до 128 символов). Тег в 54 ФЗ — 1030. */
        description: string;
        /** Цена товара (тег в 54 ФЗ — 1079). */
        amount: IAmount;
        /** ***Ставка НДС (тег в 54 ФЗ — 1199).***
         *
         * Для чеков по 54-ФЗ — перечень возможных значений:
         * - [для Чеков от ЮKassa](1)
         * - [для сторонних онлайн-касс](2)
         * - Для чеков самозанятых — фиксированное значение: `1`
         *
         * [1]: https://yookassa.ru/developers/payment-acceptance/receipts/54fz/yoomoney/parameters-values#vat-codes
         * [2]: https://yookassa.ru/developers/payment-acceptance/receipts/54fz/other-services/parameters-values#vat-codes
         */
        vat_code: number;
        /** ***Количество товара (тег в 54 ФЗ — 1023).***
         *
         * Для чеков по 54-ФЗ: можно передать целое или дробное число. Разделитель дробной части — точка, разделитель тысяч отсутствует. Максимально возможное значение и максимальное количество знаков после точки (для дробных значений) зависят от модели вашей онлайн-кассы.
         *
         * Для чеков от ЮKassa максимально возможное значение — 99999.999, не более 3 знаков после точки.
         *
         * Для чеков самозанятых: только целые положительные числа (без точки и дробной части). Пример: `1`. */
        quantity: number;
        /** ***Мера количества предмета расчета (тег в 54 ФЗ — 2108)*** — единица измерения товара, например штуки, граммы.
         *
         * Обязательный параметр, если используете Чеки от ЮKassa или онлайн-кассу, обновленную до ФФД 1.2.
         *
         * Перечень возможных значений:
         * - [для Чеков от ЮKassa](1)
         * - [для сторонних онлайн-касс](2)
         *
         * [1]: https://yookassa.ru/developers/payment-acceptance/receipts/54fz/yoomoney/parameters-values#measure
         * [2]: https://yookassa.ru/developers/payment-acceptance/receipts/54fz/other-services/parameters-values#measure
         */
        measure?: MeasureType;
        /**
         * Дробное количество маркированного товара (тег в 54 ФЗ — 1291).
         *
         * Обязательный параметр, если одновременно выполняются эти условия:
         * - вы используете Чеки от ЮKassa или онлайн-кассу, обновленную до ФФД 1.2;
         * - товар нужно маркировать;
         * - поле measure имеет значение piece.
         *
         * Пример: вы продаете поштучно карандаши. Они поставляются пачками по 100 штук с одним кодом маркировки. При продаже одного карандаша нужно в numerator передать 1, а в denominator — 100.
         */
        mark_quantity?: MarkQuantity;
        /** ***Признак предмета расчета (тег в 54 ФЗ — 1212)*** — это то, за что принимается оплата, например товар, услуга.
         *
         * Перечень возможных значений:
         * - [для Чеков от ЮKassa](1)
         * - [для сторонних онлайн-касс](2)
         *
         * [1]: https://yookassa.ru/developers/payment-acceptance/receipts/54fz/yoomoney/parameters-values#payment-subject
         * [2]: https://yookassa.ru/developers/payment-acceptance/receipts/54fz/other-services/parameters-values#payment-subject
         */
        payment_subject?: PaymentSubject;
        /** ***Признак способа расчета (тег в 54 ФЗ — 1214)*** — отражает тип оплаты и факт передачи товара.
         *
         * Пример: покупатель полностью оплачивает товар и сразу получает его. В этом случае нужно передать значение `full_payment` (полный расчет).
         *
         * Перечень возможных значений:
         * - [для Чеков от ЮKassa](1)
         * - [для сторонних онлайн-касс](2)
         *
         * [1]: https://yookassa.ru/developers/payment-acceptance/receipts/54fz/yoomoney/parameters-values#payment-mode
         * [2]: https://yookassa.ru/developers/payment-acceptance/receipts/54fz/other-services/parameters-values#payment-mode
         */
        payment_mode?: PaymentMode;
        /** Код страны происхождения товара по общероссийскому классификатору стран мира ([OК (MК (ИСО 3166) 004-97) 025-2001](http://docs.cntd.ru/document/842501280)).
         *
         * Тег в 54 ФЗ — 1230.
         *
         * Пример: `RU`.
         *
         * Можно передавать, если используете онлайн-кассу Orange Data, Кит Инвест.
         */
        country_of_origin_code?: string;
        /** Номер таможенной декларации (от 1 до 32 символов).
         *
         * Тег в 54 ФЗ — 1231.
         *
         * Можно передавать, если используете онлайн-кассу Orange Data, Кит Инвест.
         */
        customs_declaration_number?: string;
        /** Сумма акциза товара с учетом копеек (тег в 54 ФЗ — 1229). Десятичное число с точностью до 2 знаков после точки.
         *
         * Можно передавать, если используете онлайн-кассу Orange Data, Кит Инвест.
         */
        excise?: string;
        /**Информация о поставщике товара или услуги (тег в 54 ФЗ — 1224). Можно передавать, если вы отправляете данные для формирования чека по сценарию "Сначала платеж, потом чек". */
        supplier?: Supplier;
        /**
         * Тип посредника, реализующего товар или услугу.
         * Параметр предусмотрен форматом фискальных документов (ФФД) и является обязательным, начиная с версии 1.1.
         * [Перечень возможных значений.](https://yookassa.ru/developers/payment-acceptance/receipts/54fz/other-services/parameters-values#agent-type)
         * Можно передавать, если ваша онлайн-касса обновлена до ФФД 1.1 и вы отправляете
         * данные для формирования чека по сценарию [Сначала платеж, потом чек](https://yookassa.ru/developers/payment-acceptance/receipts/54fz/other-services/basics#receipt-after-payment)
         */
        agent_type?: AgentType;
        /** ***Код товара (тег в 54 ФЗ — 1162)*** — уникальный номер, который присваивается экземпляру товара при маркировке.
         *
         * Формат: число в шестнадцатеричном представлении с пробелами. Максимальная длина — 32 байта.
         *
         * Обязательный параметр, если одновременно выполняются эти условия:
         * - вы используете онлайн-кассу, обновленную до ФФД 1.05;
         * - товар нужно маркировать.
         *
         * Пример: `00 00 00 01 00 21 FA 41 00 23 05 41 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 12 00 AB 00`.
         */
        product_code?: string;
        /** ***Код товара (тег в 54 ФЗ — 1163).**-
         *
         * Обязательный параметр, если одновременно выполняются эти условия:
         * - вы используете Чеки от ЮKassa или онлайн-кассу, обновленную до ФФД 1.2;
         * - товар нужно маркировать.
         *
         * _Должно быть заполнено хотя бы одно поле._
         */
        mark_code_info?: MarkCodeInfo;
        /** ***Режим обработки кода маркировки (тег в 54 ФЗ — 2102).***
         *
         * Обязательный параметр, если одновременно выполняются эти условия:
         * - вы используете Чеки от ЮKassa или онлайн-кассу Атол Онлайн или BusinessRu, обновленную до ФФД 1.2;
         * - товар нужно маркировать.
         *
         * _Должен принимать значение равное «0»_.
         */
        mark_mode?: '0';
        /**
         * Отраслевой реквизит предмета расчета (тег в 54 ФЗ — 1260). Можно передавать, если используете Чеки от ЮKassa или онлайн-кассу, обновленную до ФФД 1.2.
         */
        payment_subject_industry_details?: PaymentSubjectIndustryDetails[];
    }
    export {};
}
