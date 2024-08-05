# YooKassa SDK

Этот модуль предоставляет интерфейс для интеграции с YooKassa, позволяя выполнять различные операции, такие как создание платежей, возвратов и управление ими. Написан на TypeScript.

## Установка

Для установки используйте npm или yarn:

```sh
npm install yookassa-sdk
# или
yarn add yookassa-sdk
```

## Использование

### Параметры подключения

```ts
interface ConnectorOpts {
    debug?: boolean;
    secret_key: string;
    shop_id: string;
}
```

- `debug`: Опциональный параметр для включения режима отладки.
- `secret_key`: Секретный ключ вашего магазина.
- `shop_id`: Идентификатор вашего магазина.

### Инициализация SDK

Для начала работы необходимо инициализировать SDK с использованием параметров подключения.

```ts
import { YooKassa, ConnectorOpts } from 'yookassa-sdk';

const initOpts: ConnectorOpts = {
    debug: true,
    secret_key: 'ваш_секретный_ключ',
    shop_id: 'ваш_идентификатор_магазина',
};

const sdk = YooKassa(initOpts);
```

### Платежи

#### Создание платежа

Для создания платежа необходимо вызвать метод `create` с необходимыми параметрами.

```ts
import { CurrencyEnum } from 'yookassa-sdk';

async function createPayment() {
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
            return_url: 'https://example.com',
        },
        description: 'Описание заказа',
    });

    console.log('Payment created:', response);
}

createPayment();
```

[Документация по созданию платежа](https://yookassa.ru/developers/api#create_payment)

#### Получение информации о платеже

Для получения информации о конкретном платеже используйте метод `load`.

```ts
async function getPayment(paymentId: string) {
    const response = await sdk.payments.load(paymentId);
    console.log('Payment details:', response);
}

getPayment('paymentId');
```

[Документация по получению информации о платеже](https://yookassa.ru/developers/api#get_payment)

#### Список платежей

Для получения списка платежей используйте метод `list`.

```ts
async function listPayments() {
    const response = await sdk.payments.list({
        created_at: { gte: '2022-01-01T00:00:00.000Z' },
        limit: 10,
    });
    console.log('Payments list:', response);
}

listPayments();
```

[Документация по получению списка платежей](https://yookassa.ru/developers/api#get_payments_list)

#### Подтверждение платежа

Для подтверждения платежа используйте метод `capture`.

```ts
async function capturePayment(paymentId: string) {
    const response = await sdk.payments.capture(paymentId);
    console.log('Payment captured:', response);
}

capturePayment('paymentId');
```

[Документация по подтверждению платежа](https://yookassa.ru/developers/payment-acceptance/getting-started/payment-process#capture-and-cancel)

#### Отмена платежа

Для отмены платежа используйте метод `cancel`.

```ts
async function cancelPayment(paymentId: string) {
    const response = await sdk.payments.cancel(paymentId);
    console.log('Payment canceled:', response);
}

cancelPayment('paymentId');
```

[Документация по отмене платежа](https://yookassa.ru/developers/payment-acceptance/getting-started/payment-process#capture-and-cancel)

### Возвраты

#### Создание возврата

Для создания возврата используйте метод `create`.

```ts
import { CurrencyEnum } from 'yookassa-sdk';

async function createRefund(paymentId: string) {
    const response = await sdk.refunds.create({
        payment_id: paymentId,
        amount: {
            value: '10.00',
            currency: CurrencyEnum.RUB,
        },
    });

    console.log('Refund created:', response);
}

createRefund('paymentId');
```

[Документация по созданию возврата](https://yookassa.ru/developers/api#create_refund)

#### Получение информации о возврате

Для получения информации о конкретном возврате используйте метод `load`.

```ts
async function getRefund(refundId: string) {
    const response = await sdk.refunds.load(refundId);
    console.log('Refund details:', response);
}

getRefund('refundId');
```

[Документация по получению информации о возврате](https://yookassa.ru/developers/api#get_refund)

#### Список возвратов

Для получения списка возвратов используйте метод `list`.

```ts
async function listRefunds() {
    const response = await sdk.refunds.list({
        created_at: { gte: '2022-01-01T00:00:00.000Z' },
        limit: 10,
    });
    console.log('Refunds list:', response);
}

listRefunds();
```

[Документация по получению списка возвратов](https://yookassa.ru/developers/api#get_refunds_list)

### Чеки

#### Создание чека

Для создания чека используйте метод `create`.

```ts
async function createReceipt() {
    const response = await sdk.receipts.create({
        customer: {
            full_name: 'Иван Иванов',
            inn: '1234567890',
            email: 'ivanov@example.com',
            phone: '79000000000',
        },
        items: [
            {
                description: 'Товар 1',
                quantity: 1.0,
                amount: {
                    value: '100.00',
                    currency: CurrencyEnum.RUB,
                },
                vat_code: 1,
                payment_mode: 'full_prepayment',
                payment_subject: 'commodity',
            },
        ],
        payments: [
            {
                type: 'cashless',
                amount: {
                    value: '100.00',
                    currency: CurrencyEnum.RUB,
                },
            },
        ],
        type: 'payment',
        send: true,
    });

    console.log('Receipt created:', response);
}

createReceipt();
```

[Документация по созданию чека](https://yookassa.ru/developers/api#create_receipt)

#### Получение информации о чеке

Для получения информации о конкретном чеке используйте метод `load`.

```ts
async function getReceipt(receiptId: string) {
    const response = await sdk.receipts.load(receiptId);
    console.log('Receipt details:', response);
}

getReceipt('receiptId');
```

[Документация по получению информации о чеке](https://yookassa.ru/developers/api#get_receipt)

#### Список чеков

Для получения списка чеков используйте метод `list`.

```ts
async function listReceipts() {
    const response = await sdk.receipts.list({
        created_at: { gte: '2022-01-01T00:00:00.000Z' },
        limit: 10,
    });
    console.log('Receipts list:', response);
}

listReceipts();
```

[Документация по получению списка чеков](https://yookassa.ru/developers/api#get_receipts_list)


## Методы SDK

### Payments

- `create(data: CreatePaymentPayload): Promise<Payment>`
  - Создание нового платежа. [Документация](https://yookassa.ru/developers/api#create_payment)
- `load(paymentId: string): Promise<Payment>`
  - Получение информации о платеже по его идентификатору. [Документация](https://yookassa.ru/developers/api#get_payment)
- `list(params: GetPaymentListFilter): Promise<Payments.IPayment[]>`
  - Получение списка платежей с возможностью фильтрации по различным параметрам. [Документация](https://yookassa.ru/developers/api#get_payments_list)
- `capture(paymentId: string): Promise<Payment>`
  - Подтверждение платежа, переводящего его в статус `succeeded`. [Документация](https://yookassa.ru/developers/payment-acceptance/getting-started/payment-process#capture-and-cancel)
- `cancel(paymentId: string): Promise<Payment>`
  - Отмена платежа, переводящего его в статус `canceled`. [Документация](https://yookassa.ru/developers/payment-acceptance/getting-started/payment-process#capture-and-cancel)

### Refunds

- `create(data: CreateRefundPayload): Promise<Refund>`
  - Создание нового возврата для указанного платежа. [Документация](https://yookassa.ru/developers/api#create_refund)
- `load(refundId: string): Promise<Refund>`
  - Получение информации о возврате по его идентификатору. [Документация](https://yookassa.ru/developers/api#get_refund)
- `list(params: GetRefundListFilter): Promise<Refunds.IRefund[]>`
  - Получение списка возвратов с возможностью фильтрации по различным параметрам. [Документация](https://yookassa.ru/developers/api#get_refunds_list)

### Receipts

- `create(data: CreateReceiptPayload): Promise<Receipt>`
  - Создание нового чека. [Документация](https://yookassa.ru/developers/api#create_receipt)
- `load(receiptId: string): Promise<Receipt>`
  - Получение информации о чеке по его идентификатору. [Документация](https://yookassa.ru/developers/api#get_receipt)
- `list(params: GetReceiptListFilter): Promise<Receipts.IReceipt[]>`
  - Получение списка чеков с возможностью фильтрации по различным параметрам. [Документация](https://yookassa.ru/developers/api#get_receipts_list)

## Заключение

Этот SDK предоставляет удобный интерфейс для работы с YooKassa API, позволяя легко интегрировать платежные функции в ваше приложение. Для получения дополнительной информации обратитесь к официальной документации YooKassa.