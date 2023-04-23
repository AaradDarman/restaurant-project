import { ComponentType, FC } from "react";

import {
  ButtonBase,
  ButtonBaseProps,
  IconButton,
  Typography,
} from "@mui/material";

import { useRouter } from "next/router";

const ActionButton: FC<
  ButtonBaseProps<any> & {
    isLoading?: boolean;
    onClick?: () => void;
    buttonText: ComponentType | string;
    Icon: ComponentType;
  }
> = ({ isLoading, onClick, buttonText: ButtonText, Icon, ...otherProps }) => {
  let router = useRouter();

  return (
    <ButtonBase
      component="div"
      {...otherProps}
      sx={{
        padding: "4px",
        borderRadius: "9999px",
        backgroundColor: "accent.main",
        "&:hover": {
          backgroundColor: "accent.main",
        },
      }}
      classes={{
        disabled: `${isLoading ? "!bg-accent-500" : "!bg-white/[0.12]"}`,
      }}
      onClick={() => router.push("/checkout/payment")}
    >
      {typeof ButtonText === "string" ? (
        <Typography variant="h6" className="!flex-1 text-center">
          {ButtonText}
        </Typography>
      ) : (
        <ButtonText />
      )}
      <IconButton
        sx={{
          display: "flex",
          justifyContent: "center",
          borderRadius: "9999px",
          backgroundColor: "secondary.main",
          "&:hover": {
            backgroundColor: "secondary.main",
          },
          padding: "8px",
        }}
      >
        <Icon />
      </IconButton>
    </ButtonBase>
  );
};

export default ActionButton;
