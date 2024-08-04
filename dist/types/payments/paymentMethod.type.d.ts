import { IAmount } from '../general.types';
/** Способы оплаты */
export type IPaymentMethod = IPaymentMethodAlfabank | IPaymentMethodMobileBalance | IPaymentMethodCard | IPaymentMethodInstallments | IPaymentMethodCash | IPaymentMethodSbp | IPaymentMethodB2b_sberbank | IPaymentMethodTinkoff_bank | IPaymentMethodYooMoney | IPaymentMethodQiwi | IPaymentMethodSberbank | IPaymentMethodSberLoan;
export declare enum PaymentMethodsEnum {
    /** Банковская карта или карта МИР */
    bank_card = "bank_card",
    /** ЮMoney */
    yoo_money = "yoo_money",
    /** QIWI Кошелек */
    qiwi = "qiwi",
    /** SberPay */
    sberbank = "sberbank",
    /** Альфа-Клик */
    alfabank = "alfabank",
    /** Тинькофф */
    tinkoff_bank = "tinkoff_bank",
    /** СберБанк Бизнес Онлайн */
    b2b_sberbank = "b2b_sberbank",
    /** СБП (Система быстрых платежей) */
    sbp = "sbp",
    /** Баланс телефона */
    mobile_balance = "mobile_balance",
    /** Наличные */
    cash = "cash",
    /** Заплатить по частям */
    installments = "installments",
    /** "Покупки в кредит" от Сбербанка" */
    sber_loan = "sber_loan"
}
interface IGeneralPayMethod {
    type: PaymentMethodsEnum;
    /** Идентификатор способа оплаты. */
    id: string;
    /** С помощью сохраненного способа оплаты можно проводить [безакцептные списания](https://yookassa.ru/developers/payment-acceptance/scenario-extensions/recurring-payments)  */
    saved: boolean;
    /** Название способа оплаты. */
    title?: string;
}
/** Банковская карта */
export interface IPaymentMethodCard extends IGeneralPayMethod {
    /** Код способа оплаты. */
    type: PaymentMethodsEnum.bank_card;
    /** Данные банковской карты (необходимы, если вы собираете данные карты пользователей на своей стороне). */
    card?: {
        /** Номер банковской карты. */
        number: string;
        /** Срок действия, год, YYYY. */
        expiry_year?: string;
        /** Срок действия, месяц, MM. */
        expiry_month: string;
        /** Код CVC2 или CVV2, 3 или 4 символа, печатается на обратной стороне карты. */
        csc?: string;
        /** Имя владельца карты. */
        cardholder?: string;
    };
}
/** Баланс телефона */
export interface IPaymentMethodMobileBalance extends IGeneralPayMethod {
    /** Код способа оплаты. */
    type: PaymentMethodsEnum.mobile_balance;
    /** Телефон, с баланса которого осуществляется платеж. Указывается в формате ITU-T E.164, например 79000000000. */
    phone: string;
}
/** ЮMoney */
export interface IPaymentMethodYooMoney {
    type: PaymentMethodsEnum.yoo_money;
}
/** QIWI Кошелек */
export interface IPaymentMethodQiwi {
    type: PaymentMethodsEnum.qiwi;
    /** Телефон, на который зарегистрирован аккаунт в QIWI. Указывается в формате ITU-T E.164, например 79000000000. */
    phone?: string;
}
/** SberPay */
export interface IPaymentMethodSberbank {
    type: PaymentMethodsEnum.sberbank;
    /** Телефон пользователя, на который зарегистрирован аккаунт в SberPay. Необходим для подтверждения оплаты по смс (сценарий подтверждения external). Указывается в формате ITU-T E.164, например 79000000000. */
    phone?: string;
}
/** Альфа-Клик */
export interface IPaymentMethodAlfabank {
    type: PaymentMethodsEnum.alfabank;
    /** Логин пользователя в Альфа-Клике (привязанный телефон или дополнительный логин). Обязателен для сценария External . */
    login?: string;
}
/** Тинькофф */
export interface IPaymentMethodTinkoff_bank {
    type: PaymentMethodsEnum.tinkoff_bank;
}
/** СберБанк Бизнес Онлайн */
export interface IPaymentMethodB2b_sberbank {
    type: PaymentMethodsEnum.b2b_sberbank;
    /** Назначение платежа (не больше 210 символов). */
    payment_purpose: string;
    /** Данные о налоге на добавленную стоимость (НДС). Платеж может облагаться или не облагаться НДС. Товары могут облагаться по одной ставке НДС или по разным. */
    vat_data: {
        /** Код способа расчета НДС. */
        type: 'mixed' | 'calculated' | 'untaxed';
        /** Сумма НДС. */
        amount?: IAmount;
    };
}
/** СБП (Система быстрых платежей) */
export interface IPaymentMethodSbp {
    type: PaymentMethodsEnum.sbp;
}
/** Наличные */
export interface IPaymentMethodCash {
    type: PaymentMethodsEnum.cash;
    /** Телефон пользователя, на который придет смс с кодом платежа (для внесения наличных). Указывается в формате ITU-T E.164, например 79000000000. Поле можно оставить пустым: пользователь сможет заполнить его при оплате на стороне ЮKassa. */
    phone?: string;
}
/** Заплатить по частям */
export interface IPaymentMethodInstallments {
    type: PaymentMethodsEnum.installments;
}
/** "Покупки в кредит" от Сбербанка" */
export interface IPaymentMethodSberLoan extends IGeneralPayMethod {
    type: PaymentMethodsEnum.sber_loan;
    /** Сумма скидки для рассрочки. Присутствует для платежей в статусе `waiting_for_capture` и `succeeded`, если пользователь выбрал рассрочку. */
    discount_amount?: IAmount;
    /** Тариф кредита, который пользователь выбрал при оплате.
     *
     * Возможные значения:
     * -`loan` — кредит;
     * `installments_XX` — рассрочка, где `XX` — количество месяцев для выплаты рассрочки. Например, `installments_3` — рассрочка на 3 месяца.
     * Присутствует для платежей в статусе `waiting_for_capture` и `succeeded`.
     */
    loan_option?: 'loan' | `installments_${number}`;
}
export {};
