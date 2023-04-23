import { TBookedTable } from "types/booking.types";

export interface IBookedList {
  date: Date;
  bookedTables: TBookedTable[];
}
