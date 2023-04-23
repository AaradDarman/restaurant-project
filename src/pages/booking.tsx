import { Button, Typography } from "@mui/material";
import moment from "moment-jalaali";
import { toast } from "react-toastify";
import Head from "next/head";
import { useRef } from "react";

import DatePicker from "components/booking/DatePicker";
import TablePickerButton from "components/booking/TablePickerButton";
import TimePicker from "components/booking/TimePicker";
import { useBookingContext } from "context/booking-context";
import NoSSRWraper from "components/NoSSRWraper";
import useBreakpoints from "hooks/useBreakPoints";
import BookingForm from "components/booking/BookingForm";

const Booking = () => {
  const { handleSaveBookingInfo } = useBookingContext();
  const BookingFormikRef = useRef<any>(null);
  const { isMd } = useBreakpoints();

  return (
    <div className="flex flex-1 flex-col ">
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_SITE_NAME} | رزرو میز`}</title>
      </Head>
      <div className="mb-[56px] flex flex-1 flex-col justify-evenly bg-secondary-main px-6 md:mb-0 md:items-start md:px-8">
        <BookingForm ref={BookingFormikRef} onSubmit={handleSaveBookingInfo} />
        <Button
          variant="contained"
          fullWidth={!isMd}
          size="small"
          sx={{
            marginTop: "8px",
            backgroundColor: "accent.main",
            "&:hover": {
              backgroundColor: "accent.main",
            },
          }}
          onClick={() => BookingFormikRef?.current?.handleSubmit()}
        >
          ثبت و ادامه
        </Button>
      </div>
    </div>
  );
};

Booking.getLayout = function getLayout(page: JSX.Element) {
  return <NoSSRWraper>{page}</NoSSRWraper>;
};

export default Booking;
