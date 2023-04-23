import { ComponentType, FC, PropsWithChildren, forwardRef } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  Slide,
  useTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

type TDialogPorps = {
  open: boolean;
  onClose: () => void;
  okButtonText?: string;
  OkButton?: ComponentType<{ onOkClick: () => void }> | undefined;
  onOkClick?: () => void;
  cancelButtonText?: string;
  CancelButton?: ComponentType<{ onClose: () => void }> | undefined;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyDialog: FC<DialogProps & PropsWithChildren<TDialogPorps>> = ({
  open,
  onClose,
  children,
  fullScreen,
  TransitionComponent,
  okButtonText,
  OkButton,
  onOkClick,
  cancelButtonText,
  CancelButton,
  ...otherProps
}) => {
  const theme = useTheme();
  return (
    <Dialog
      dir="ltr"
      onClose={onClose}
      open={open}
      fullScreen={fullScreen}
      TransitionComponent={TransitionComponent ?? Transition}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: theme.palette.secondary.main,
          backgroundImage: "none",
          boxShadow: "none",
        },
      }}
      {...otherProps}
    >
      <DialogContent
        dir="rtl"
        sx={{ display: "flex", flexDirection: "column", overflowX: "hidden" }}
      >
        {children}
      </DialogContent>
      <DialogActions>
        {cancelButtonText ? (
          <Button variant="text" color="inherit" size="small" onClick={onClose}>
            {cancelButtonText}
          </Button>
        ) : CancelButton ? (
          <CancelButton onClose={onClose} />
        ) : null}
        {okButtonText ? (
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "accent.main",
              "&:hover": {
                backgroundColor: "accent.main",
              },
            }}
            onClick={onOkClick}
          >
            {okButtonText}
          </Button>
        ) : OkButton ? (
          <OkButton onOkClick={onClose} />
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

export default MyDialog;
