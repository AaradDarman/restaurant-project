import React, { FC, forwardRef } from "react";

import { useTheme } from "@mui/material/styles";
import { Button, Typography, Grow } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Link from "next/link";

import Dialog from "components/shared/Dialog";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

const AlertDialog: FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const theme = useTheme();

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
        <Typography variant="h5">
          لطفا ابتدا از منو غذای خود را انتخاب کنید
        </Typography>
        <Link
          href="/"
          className="mt-3 text-accent-main underline"
          onClick={onClose}
        >
          مشاهده منو
        </Link>
      </div>
    </Dialog>
  );
};

export default AlertDialog;
