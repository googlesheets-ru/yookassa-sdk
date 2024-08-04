/** пассажир */
interface IAirlinePassenger {
    /** Имя пассажира. Необходимо использовать латинские буквы, например `SERGEI`. */
    first_name: string;
    /** Фамилия пассажира. Необходимо использовать латинские буквы, например `IVANOV`. */
    last_name: string;
}
/** Данные о перелете */
interface IAirlineLeg {
    /** Код аэропорта вылета по справочнику [IATA](https://www.iata.org/publications/Pages/code-search.aspx), например `LED`. */
    departure_airport: string;
    /** Код аэропорта вылета по справочнику [IATA](https://www.iata.org/publications/Pages/code-search.aspx), например `AMS`. */
    destination_airport: string;
    /** Дата вылета в формате YYYY-MM-DD по стандарту [ISO 8601:2004](http://www.iso.org/iso/catalogue_detail?csnumber=40874).
     *
     * Пример: `2018-12-24`
     */
    departure_date: string;
    /** Код авиакомпании по справочнику [IATA](https://www.iata.org/publications/Pages/code-search.aspx). */
    carrier_code?: string;
}
/**
 * Объект с данными для продажи авиабилетов. Используется только для платежей банковской картой.
 */
interface IAirlineGeneral {
    /**
     * Уникальный номер билета. Если при создании платежа вы уже знаете номер билета, тогда `ticket_number` — обязательный параметр.
     * Если не знаете, тогда вместо `ticket_number` необходимо передать `booking_reference` с номером бронирования.
     *
     * Длина: от 1 до 150
     * Пример:`5554916004417`
     * Паттерн:`[0-9]{1,150}`
     */
    ticket_number?: string;
    /** Номер бронирования. Обязателен, если не передан `ticket_number`.*/
    booking_reference?: string;
    /**Список пассажиров. */
    passengers?: IAirlinePassenger[];
    /**Список перелетов. */
    legs?: IAirlineLeg[];
}
interface IAirlineWithTicketNumber extends IAirlineGeneral {
    ticket_number: string;
}
interface IAirlineWithBookingReference extends IAirlineGeneral {
    booking_reference: string;
}
/**
 * Объект с данными для продажи авиабилетов. Используется только для платежей банковской картой.
 */
export type IAirline = IAirlineWithTicketNumber | IAirlineWithBookingReference;
export {};
