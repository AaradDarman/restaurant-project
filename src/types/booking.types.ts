import { Dispatch, SetStateAction } from "react";

export type TTable = {
  _id: string;
  name: string;
  seatingCapacity: number;
  isReserved?: boolean;
};

export type TBook = {
  _id: string;
  table: string;
  date: Date;
  orderNumber: string;
};

export type TBookedTable = {
  tableName: string;
  bookedList: Array<TBook>;
};

export type BookingContextContent = {
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
  selectedTime: string;
  setSelectedTime: Dispatch<SetStateAction<string>>;
  selectedTable: TTable | undefined;
  setSelectedTable: Dispatch<SetStateAction<TTable | undefined>>;
  openSelectTableDialog: () => void;
  openReserveEditDialog: () => void;
  handleSaveBookingInfo: () => void;
  handleEditBookingInfo: () => void;
  handleCancelbooking: () => void;
};
