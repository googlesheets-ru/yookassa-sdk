import { LocaleEnum } from '../general.types';
export type IConfirmation = IConfirmationRedirect | IConfirmationEmbedded | IConfirmationQR | IConfirmationExternal | IConfirmationMobileApp;
export declare enum ConfirmationTypesEnum {
    embedded = "embedded",
    external = "external",
    mobile_application = "mobile_application",
    qr = "qr",
    redirect = "redirect"
}
export type ConfirmationTypes = 'embedded' | 'external' | 'mobile_application' | 'qr' | 'redirect';
interface IGeneralConfirmation {
    /** Код сценария подтверждения. */
    type: ConfirmationTypes;
    /** Язык интерфейса, писем и смс, которые будет видеть или получать пользователь. Формат соответствует ISO/IEC 15897. Возможные значения: ru_RU, en_US. Регистр важен. */
    locale?: LocaleEnum;
}
/**
 * ***Сценарий подтверждения Embedded***
 *
 * действия, необходимые для подтверждения платежа, будут зависеть от способа оплаты, который пользователь выберет в виджете ЮKassa. Подтверждение от пользователя получит ЮKassa — вам необходимо только встроить виджет к себе на страницу.
 */
export interface IConfirmationEmbedded extends IGeneralConfirmation {
    type: 'embedded';
    /** Токен для инициализации [платежного виджета ЮKassa](https://yookassa.ru/developers/payment-acceptance/integration-scenarios/widget/basics)  */
    confirmation_token: string;
}
/**
 * ***Сценарий подтверждения `Redirect`***
 *
 * пользователю необходимо что-то сделать на странице ЮKassa или ее партнера (например, ввести данные банковской карты или пройти аутентификацию по 3-D Secure). Вам нужно перенаправить пользователя на confirmation_url, полученный в платеже . При успешной оплате (и если что-то пойдет не так) ЮKassa вернет пользователя на return_url, который вы отправите в запросе на создание платежа
 */
export interface IConfirmationRedirect extends IGeneralConfirmation {
    /** Код сценария подтверждения. */
    type: 'redirect';
    /** URL, на который необходимо перенаправить пользователя для подтверждения оплаты. */
    confirmation_url?: string;
    /** Запрос на проведение платежа с аутентификацией по 3-D Secure. Будет работать, если оплату банковской картой вы по умолчанию принимаете без подтверждения платежа пользователем. В остальных случаях аутентификацией по 3-D Secure будет управлять ЮKassa. Если хотите принимать платежи без дополнительного подтверждения пользователем, напишите вашему менеджеру ЮKassa. */
    enforce?: boolean;
    /** URL, на который вернется пользователь после подтверждения или отмены платежа на веб-странице. Не более 2048 символов. */
    return_url: string;
}
/**
 * ***Сценарий подтверждения `QR-код`***
 *
 * для подтверждения платежа пользователю необходимо просканировать QR-код. От вас требуется сгенерировать QR-код, используя любой доступный инструмент, и отобразить его на странице оплаты.
 */
export interface IConfirmationQR extends IGeneralConfirmation {
    type: 'qr';
    /** Данные для генерации QR-кода. */
    confirmation_data: string;
}
/**
 * ***Сценарий подтверждения `Mobile application`***
 *
 * для подтверждения платежа пользователю необходимо совершить действия в мобильном приложении (например, в приложении интернет-банка). Вам нужно перенаправить пользователя на confirmation_url, полученный в платеже
 */
export interface IConfirmationMobileApp {
    type: 'mobile_application';
    /** Диплинк на мобильное приложение, в котором пользователь подтверждает платеж. */
    confirmation_url: string;
}
/**
 * ***Сценарий подтверждения `External`***
 *
 *  для подтверждения платежа пользователю необходимо совершить действия во внешней системе (например, ответить на смс). От вас требуется только сообщить пользователю о дальнейших шагах.
 */
export interface IConfirmationExternal extends IGeneralConfirmation {
    type: 'external';
}
export {};
