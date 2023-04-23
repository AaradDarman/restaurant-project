import { FC, useEffect } from "react";

import { Button, useTheme } from "@mui/material";
import { rgba } from "polished";

import { BookingContextContent, TTable } from "types/booking.types";
import { useBookingContext } from "context/booking-context";

const TablePickerButton: FC<{
  value: BookingContextContent["selectedTable"];
  onClick: () => void;
  className?: string;
  onChange?: (val: TTable | undefined) => void;
}> = ({ value, onClick, className, onChange }) => {
  const theme = useTheme();
  const { selectedTable } = useBookingContext();

  useEffect(() => {
    onChange && onChange(selectedTable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTable]);

  return (
    <Button
      variant="outlined"
      color="primary"
      className={className}
      sx={{
        "&": {
          minWidth: "unset",
          minHeight: "unset",
          color: rgba(theme.palette.text.primary, 0.7),
          zIndex: 1,
          padding: "6px",
          margin: "8px 0",
          borderRadius: "6px",
          border: "1px solid",
          borderColor: "primary.main",
          backgroundColor: rgba(theme.palette.primary.main, 0.1),
          opacity: "unset",
        },
        "&:hover": {
          backgroundColor: rgba(theme.palette.primary.main, 0.1),
        },
      }}
      onClick={onClick}
    >
      {value
        ? `میز شماره ${value.name} - تعداد صندلی: ${value.seatingCapacity}`
        : "انتخاب میز"}
    </Button>
  );
};

export default TablePickerButton;
