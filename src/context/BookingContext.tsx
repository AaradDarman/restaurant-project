import { FC, PropsWithChildren, useEffect, useState } from "react";
import { bookingContext } from "./booking-context";
import { TTable } from "types/booking.types";
import SelectTableDialog from "components/booking/SelectTableDialog";
import { RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AlertDialog from "components/booking/AlertDialog";
import { cancellReserveTable, reserveTable } from "redux/slices/cart";
import moment from "moment-jalaali";
import { useRouter } from "next/router";
import ReserveEditDialog from "components/checkout/ReserveEditDialog";

const BookingContext: FC<PropsWithChildren> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedTable, setSelectedTable] = useState<TTable>();

  const [isSelectTableDialogOpen, setIsSelectTableDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isReserveEditDialogOpen, setIsReserveEditDialogOpen] = useState(false);
  const { cart } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const router = useRouter();

  const openSelectTableDialog = () => {
    setIsSelectTableDialogOpen(true);
  };
  const closeSelectTableDialog = () => {
    setIsSelectTableDialogOpen(false);
  };

  const openAlertDialog = () => {
    setIsAlertDialogOpen(true);
  };
  const closeAlertDialog = () => {
    setIsAlertDialogOpen(false);
  };

  const openReserveEditDialog = () => {
    if (cart.reserveTable) {
      setSelectedDate(moment(cart.reserveTable.date).startOf("day").toDate());
      setSelectedTime(moment(cart.reserveTable.date).format("HH:mm"));
      setSelectedTable({
        _id: cart.reserveTable._id,
        name: cart.reserveTable.name,
        seatingCapacity: cart.reserveTable.seatingCapacity,
      });
    }
    setIsReserveEditDialogOpen(true);
  };
  const closeReserveEditDialog = () => {
    setIsReserveEditDialogOpen(false);
  };

  const handleSaveBookingInfo = () => {
    if (selectedTable) {
      let rawSelectedDate = moment(selectedDate).format("jYYYY-jMM-jDD");

      let date = moment(
        `${rawSelectedDate} ${selectedTime}`,
        "jYYYY/jM/jD HH:mm"
      ).toDate();

      dispatch(
        reserveTable({
          _id: selectedTable._id,
          name: selectedTable.name,
          seatingCapacity: selectedTable.seatingCapacity,
          date: date.toISOString(),
        })
      );

      if (cart.itemsCount === 0) {
        openAlertDialog();
      } else {
        router.push("/checkout/cart");
      }
    }
  };

  const handleEditBookingInfo = () => {
    if (selectedTable) {
      let rawSelectedDate = moment(selectedDate).format("jYYYY-jMM-jDD");

      let date = moment(
        `${rawSelectedDate} ${selectedTime}`,
        "jYYYY/jM/jD HH:mm"
      ).toDate();

      dispatch(
        reserveTable({
          _id: selectedTable._id,
          name: selectedTable.name,
          seatingCapacity: selectedTable.seatingCapacity,
          date: date.toISOString(),
        })
      );
    }
  };

  const handleCancelbooking = () => {
    dispatch(cancellReserveTable());
    setSelectedDate(undefined);
    setSelectedTime("");
    setSelectedTable(undefined);
  };

  useEffect(() => {
    if (cart.reserveTable) {
      if (
        moment(cart.reserveTable.date).isBefore(moment().add(1, "day"), "day")
      ) {
        dispatch(reserveTable(undefined));
      } else {
        setSelectedDate(moment(cart.reserveTable.date).startOf("day").toDate());
        setSelectedTime(moment(cart.reserveTable.date).format("HH:mm"));
        setSelectedTable({
          _id: cart.reserveTable._id,
          name: cart.reserveTable.name,
          seatingCapacity: cart.reserveTable.seatingCapacity,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.reserveTable]);

  return (
    <bookingContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        selectedTable,
        setSelectedTable,
        openSelectTableDialog,
        handleSaveBookingInfo,
        handleCancelbooking,
        openReserveEditDialog,
        handleEditBookingInfo,
      }}
    >
      {children}
      <SelectTableDialog
        isOpen={isSelectTableDialogOpen}
        onClose={closeSelectTableDialog}
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
      />
      <AlertDialog isOpen={isAlertDialogOpen} onClose={closeAlertDialog} />
      <ReserveEditDialog
        isOpen={isReserveEditDialogOpen}
        onClose={closeReserveEditDialog}
      />
    </bookingContext.Provider>
  );
};

export default BookingContext;
