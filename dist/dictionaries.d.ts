/**
 * ***Причины отмены платежа***
 *
 * [Документация](https://yookassa.ru/developers/payment-acceptance/after-the-payment/declined-payments#cancellation-details-reason)
 */
export declare const paymentCancelReasonMap: {
    '3d_secure_failed': string;
    call_issuer: string;
    canceled_by_merchant: string;
    card_expired: string;
    country_forbidden: string;
    deal_expired: string;
    expired_on_capture: string;
    expired_on_confirmation: string;
    fraud_suspected: string;
    general_decline: string;
    identification_required: string;
    insufficient_funds: string;
    internal_timeout: string;
    invalid_card_number: string;
    invalid_csc: string;
    issuer_unavailable: string;
    payment_method_limit_exceeded: string;
    payment_method_restricted: string;
    permission_revoked: string;
    unsupported_mobile_operator: string;
};
/**
 * ****Причины отмены возврата****
 *
 * Причина отмены возвращается в параметре `reason` объекта `cancellation_details`.
 * @see https://yookassa.ru/developers/payment-acceptance/after-the-payment/refunds#declined-refunds-cancellation-details-reason
 */
export declare const refundCancelReasonMap: {
    general_decline: string;
    insufficient_funds: string;
    rejected_by_payee: string;
    rejected_by_timeout: string;
    yoo_money_account_closed: string;
    payment_article_number_not_found: string;
    payment_basket_id_not_found: string;
    payment_tru_code_not_found: string;
    some_articles_already_refunded: string;
    too_many_refunding_articles: string;
};
/**
 * ****Признак предмета расчета****
 *
 * Признак предмета расчета передается в параметре `payment_subject`.
 * @see https://yookassa.ru/developers/payment-acceptance/receipts/54fz/yoomoney/parameters-values#payment-subject
 */
export declare const paymentSubjectMap: {
    ling_bet: string;
    gambling_prize: string;
    lottery: string;
    lottery_prize: string;
    intellectual_activity: string;
    agent_commission: string;
    property_right: string;
    non_operating_gain: string;
    insurance_premium: string;
    sales_tax: string;
    resort_fee: string;
    marked: string;
    non_marked: string;
    fine: string;
    tax: string;
    lien: string;
    cost: string;
    agent_withdrawals: string;
    pension_insurance_without_payouts: string;
    pension_insurance_with_payouts: string;
    health_insurance_without_payouts: string;
    health_insurance_with_payouts: string;
    health_insurance: string;
    another: string;
};
/**
 * ****Тип посредника****
 *
 * Тип посредника передается в запросе на создание чека  в массиве `items`, в параметре `agent_type`,
 * если вы отправляете данные для формирования чека по "сценарию Сначала платеж, потом чек".
 * Параметр `agent_type` нужно передавать, начиная с ФФД 1.1.
 * Убедитесь, что ваша онлайн-касса обновлена до этой версии.
 * @see https://yookassa.ru/developers/payment-acceptance/receipts/54fz/other-services/parameters-values#agent-type
 */
export declare const AgentTypeMap: {
    banking_payment_agent: string;
    banking_payment_subagent: string;
    payment_agent: string;
    payment_subagent: string;
    attorney: string;
    commissioner: string;
    agent: string;
};
/**
 * Мера количества предмета расчета, передается в массиве `items`, в параметре `measure`.
 */
export declare const measureTypeMap: {
    piece: string;
    gram: string;
    kilogram: string;
    ton: string;
    centimeter: string;
    decimeter: string;
    meter: string;
    square_centimeter: string;
    square_decimeter: string;
    square_meter: string;
    milliliter: string;
    liter: string;
    cubic_meter: string;
    kilowatt_hour: string;
    gigacalorie: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
    kilobyte: string;
    megabyte: string;
    gigabyte: string;
    terabyte: string;
    another: string;
};
/**
 * Тип расчета передается в запросе на создание чека в массиве 'settlements', в параметре 'type'.
 */
export declare const SettlementTypeMap: {
    cashless: string;
    prepayment: string;
    postpayment: string;
    consideration: string;
};
