import  { FC, useRef } from "react";

import { useTheme } from "@mui/material/styles";
import {
  Typography,
  Divider,
} from "@mui/material";

import Dialog from "components/shared/Dialog";
import AccountInfoForm from "./AccountInfoForm";
import { useAuthContext } from "context/auth-context";
import useBreakpoints from "hooks/useBreakPoints";

const EditDialog: FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const AccountInfoFormikRef = useRef<any>(null);
  const { handleEditInfo } = useAuthContext();
  const { isMd } = useBreakpoints();

  return (
    <Dialog
      onClose={onClose}
      open={isOpen}
      fullScreen={!isMd}
      okButtonText="ذخیره"
      cancelButtonText="لغو"
      onOkClick={() => {
        AccountInfoFormikRef.current.handleSubmit();
      }}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: theme.palette.secondary.main,
          backgroundImage: "none",
        },
      }}
      TransitionProps={{ easing: theme.transitions.easing.easeInOut }}
    >
      <Typography className="text-center" variant="h6">
        ویرایش اطلاعات حساب
      </Typography>
      <Divider variant="fullWidth" className="!my-2" />
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <AccountInfoForm ref={AccountInfoFormikRef} onSubmit={handleEditInfo} />
      </div>
    </Dialog>
  );
};

export default EditDialog;
