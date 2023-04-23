import React, { FC, useRef, forwardRef } from "react";

import { useTheme } from "@mui/material/styles";
import { Button, Grow } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import Dialog from "components/shared/Dialog";
import { useBookingContext } from "context/booking-context";
import BookingForm from "components/booking/BookingForm";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

const ReserveEditDialog: FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const BookingFormikRef = useRef<any>(null);

  const { handleEditBookingInfo } = useBookingContext();

  return (
    <Dialog
      onClose={onClose}
      open={isOpen}
      OkButton={() => (
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "accent.main",
            "&:hover": {
              backgroundColor: "accent.main",
            },
          }}
          onClick={() => {
            BookingFormikRef?.current?.handleSubmit();
            onClose();
          }}
        >
          ذخیره
        </Button>
      )}
      cancelButtonText="لغو"
      TransitionComponent={Transition}
      TransitionProps={{ easing: theme.transitions.easing.easeInOut }}
      classes={{
        paper: "relative-unset",
      }}
    >
      <div className="flex flex-col">
        <div className="flex flex-col">
          <BookingForm
            ref={BookingFormikRef}
            onSubmit={handleEditBookingInfo}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ReserveEditDialog;
