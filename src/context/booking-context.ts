import { createContext, useContext } from "react";
import { BookingContextContent } from "types/booking.types";

export const bookingContext = createContext<BookingContextContent>({
  selectedDate: undefined,
  setSelectedDate: () => {},
  selectedTime: "",
  setSelectedTime: () => {},
  selectedTable: undefined,
  setSelectedTable: () => {},
  openSelectTableDialog: () => {},
  openReserveEditDialog: () => {},
  handleSaveBookingInfo: () => {},
  handleEditBookingInfo: () => {},
  handleCancelbooking: () => {},
});

export const useBookingContext = () => useContext(bookingContext);
