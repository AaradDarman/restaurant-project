import React, { FC } from "react";

import { useTheme } from "@mui/material/styles";
import { Typography, Divider } from "@mui/material";
import moment from "moment-jalaali";

import Dialog from "components/shared/Dialog";
import Icon from "components/shared/Icon";
import { BookingContextContent, TTable } from "types/booking.types";
import { useBookingContext } from "context/booking-context";
import TablePicker from "./TablePicker";
import useBreakpoints from "hooks/useBreakPoints";

import _tables from "data/tables.json";
const tables: TTable[] = _tables as TTable[];

const SelectTableDialog: FC<{
  isOpen: boolean;
  onClose: () => void;
  selectedTable: BookingContextContent["selectedTable"];
  setSelectedTable: BookingContextContent["setSelectedTable"];
}> = ({ isOpen, onClose, selectedTable, setSelectedTable }) => {
  const theme = useTheme();
  const { selectedDate, selectedTime } = useBookingContext();
  const { isMd } = useBreakpoints();

  return (
    <Dialog
      onClose={onClose}
      open={isOpen}
      fullScreen={!isMd}
      okButtonText="تایید"
      onOkClick={onClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: theme.palette.secondary.main,
          backgroundImage: "none",
        },
      }}
    >
      <div className="flex flex-col items-start">
        <Typography variant="h6">
          <Icon icon="calendar" size={18} className="ml-1" />
          {moment(selectedDate)?.format("dddd jDD jMMMM")}
        </Typography>
        <Typography variant="h6">
          <Icon icon="clock" size={18} className="ml-1" />
          {selectedTime}
        </Typography>
      </div>
      <Divider variant="fullWidth" className="!my-2" />
      <TablePicker
        values={tables}
        value={selectedTable}
        onChange={setSelectedTable}
      />
      <div className="flex">
        <Typography variant="h6">{`میز شماره ${
          selectedTable?.name ?? ""
        }`}</Typography>
        <Divider orientation="vertical" className="!mx-2" flexItem />
        <Icon icon="seat" size={20} className="ml-1" />
        <Typography variant="h6">{`تعداد صندلی: ${
          selectedTable?.seatingCapacity ?? ""
        }`}</Typography>
      </div>
    </Dialog>
  );
};

export default SelectTableDialog;
