import { useState, FC, FocusEventHandler } from "react";

import moment from "moment-jalaali";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import persianCalendar from "react-date-object/calendars/jalali";
import persian_fa from "react-date-object/locales/persian_fa";

import DateInput from "./DateInput";

const BirthDatePicker: FC<{
  value?: string;
  onChange?: (val: any) => void;
  onBlur?:
    | FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  error?: boolean;
  helperText?: React.ReactNode;
}> = ({ value, onChange, onBlur, error, helperText }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClearDate = () => {
    onChange ? onChange("") : null;
  };

  return (
    <DatePicker
      calendar={persianCalendar}
      locale={persian_fa}
      className="bg-dark orange"
      render={
        <DateInput
          clearDate={handleClearDate}
          stringDate={
            value != "" ? moment(value).format("jDD jMMMM jYYYY") : ""
          }
          isDatePickerOpen={isOpen}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
        />
      }
      value={value}
      onChange={onChange}
      minDate={new DateObject({ calendar: persianCalendar }).subtract(
        100,
        "year"
      )}
      maxDate={new DateObject({ calendar: persianCalendar }).subtract(
        8,
        "year"
      )}
      onOpen={() =>
        value === "" && onChange
          ? onChange(
              new DateObject({ calendar: persianCalendar }).subtract(8, "year")
            )
          : setIsOpen(false)
      }
      onClose={() => setIsOpen(false)}
    />
  );
};

export default BirthDatePicker;
