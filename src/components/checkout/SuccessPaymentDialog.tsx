import React, { FC, forwardRef } from "react";

import { useTheme } from "@mui/material/styles";
import { Button, Typography, Grow } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Link from "next/link";

import Dialog from "components/shared/Dialog";
import { useRouter } from "next/router";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

const SuccessPaymentDialog: FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const router = useRouter();

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
          onClick={onClose}
          className="!mx-auto"
        >
          باشه
        </Button>
      )}
      TransitionComponent={Transition}
      TransitionProps={{ easing: theme.transitions.easing.easeInOut }}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <h4 className="success-message text-center">{router.query.status}</h4>
        <h5 className="order-number">{`شماره سفارش: ${router.query.orderNumber}`}</h5>
        <h5 className="tracking-number">
          {router.query.trackId && `شماره پیگیری: ${router.query.trackId}`}
        </h5>
      </div>
    </Dialog>
  );
};

export default SuccessPaymentDialog;
