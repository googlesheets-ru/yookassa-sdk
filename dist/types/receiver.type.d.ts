type BankReceiver = {
    type: 'bank_account';
    /** Номер банковского счета. Формат — 20 символов. */
    account_number: string;
    /** Банковский идентификационный код (БИК) банка, в котором открыт счет. Формат — 9 символов. */
    bic: string;
};
type PhoneReceiver = {
    type: 'mobile_balance';
    /** Номер телефона для пополнения. Максимум 15 символов. Указывается в формате [ITU-T E.164](https://ru.wikipedia.org/wiki/E.164).
     *
     * Пример: `79000000000`. */
    phone: string;
};
type DigitalWalletReceiver = {
    type: 'digital_wallet';
    /** Идентификатор электронного кошелька для пополнения. Максимум 20 символов. */
    account_number: string;
};
export type Receiver = BankReceiver | PhoneReceiver | DigitalWalletReceiver;
export {};
