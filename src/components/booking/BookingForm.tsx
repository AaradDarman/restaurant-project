import React from "react";

import { Divider, FormHelperText, Typography, useTheme } from "@mui/material";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import moment from "moment-jalaali";

import Icon from "components/shared/Icon";
import { TTable } from "types/booking.types";
import { useBookingContext } from "context/booking-context";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import TablePickerButton from "./TablePickerButton";
import useBreakpoints from "hooks/useBreakPoints";
import _tables from "data/tables.json";
import TablePicker from "./TablePicker";
const tables: TTable[] = _tables as TTable[];

const BookingForm = React.forwardRef<
  FormikProps<{
    date: string | undefined;
    time: string;
    table: TTable | undefined;
  }>,
  {
    onSubmit: (values: {
      date: string | undefined;
      time: string;
      table: TTable | undefined;
    }) => void;
  }
>(({ onSubmit }, ref) => {
  const { isMd } = useBreakpoints();
  const {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    selectedTable,
    setSelectedTable,
    openSelectTableDialog,
  } = useBookingContext();

  let weekArray: moment.Moment[] = [];
  for (let i = 1; i <= 7; i++) {
    let day = moment().add(i, "day").startOf("day");
    weekArray.push(day);
  }

  const times = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ];

  const BookingSchema = Yup.object().shape({
    date: Yup.string().required("پر کردن این فیلد الزامی می باشد"),
    time: Yup.string().required("پر کردن این فیلد الزامی می باشد"),
    table: Yup.object().required("پر کردن این فیلد الزامی می باشد"),
  });

  const initialValues: {
    date: string | undefined;
    time: string;
    table: TTable | undefined;
  } = {
    date: selectedDate?.toISOString(),
    time: selectedTime,
    table: selectedTable,
  };

  return (
    <Formik
      innerRef={ref}
      initialValues={initialValues}
      enableReinitialize={false}
      validationSchema={BookingSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, setFieldValue, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Typography variant="h6">تاریخ</Typography>
          <DatePicker
            value={selectedDate}
            values={weekArray}
            onChange={(val) => {
              setSelectedDate(val);
              setFieldValue("date", val);
            }}
          />
          <FormHelperText
            error={!!errors.date && touched.date}
            className="!ml-[14px] !mr-[14px]"
          >
            {errors.date && touched.date ? errors.date : " "}
          </FormHelperText>
          <Typography variant="h6">ساعت</Typography>
          <TimePicker
            value={selectedTime}
            onChange={(val) => {
              setSelectedTime(val);
              setFieldValue("time", val);
            }}
            values={times}
            className="py-2"
          />
          <FormHelperText
            error={!!errors.time && touched.time}
            className="!ml-[14px] !mr-[14px]"
          >
            {errors.time && touched.time ? errors.time : " "}
          </FormHelperText>
          <Typography variant="h6">میز</Typography>
          {isMd ? (
            <TablePicker
              values={tables}
              value={selectedTable}
              onChange={(val) => {
                setSelectedTable(val);
                setFieldValue("table", val);
              }}
            />
          ) : (
            <TablePickerButton
              value={selectedTable}
              onClick={openSelectTableDialog}
              onChange={(val) => {
                setFieldValue("table", val);
              }}
            />
          )}
          <FormHelperText
            error={!!errors.table && touched.table}
            className="!ml-[14px] !mr-[14px]"
          >
            {errors.table && touched.table ? errors.table : " "}
          </FormHelperText>
          <div className="hidden md:flex">
            <Typography variant="body1">{`میز شماره ${
              selectedTable?.name ?? ""
            }`}</Typography>
            <Divider orientation="vertical" className="!mx-2" flexItem />
            <Icon icon="seat" size={20} className="ml-1" />
            <Typography variant="body1">{`تعداد صندلی: ${
              selectedTable?.seatingCapacity ?? ""
            }`}</Typography>
          </div>
        </Form>
      )}
    </Formik>
  );
});

BookingForm.displayName = "BookingForm";

export default BookingForm;
