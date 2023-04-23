import React, { FC } from "react";

import {
  ToggleButtonGroup,
  ToggleButton as MuiToggleButton,
  ToggleButtonProps,
  useTheme,
} from "@mui/material";
import { rgba } from "polished";

const ToggleButton: FC<
  ToggleButtonProps & {
    value: any;
    onChange?:
      | ((event: React.MouseEvent<HTMLElement, MouseEvent>, value: any) => void)
      | undefined;
    values: Array<{ label: string; isDisabled?: boolean; [key: string]: any }>;
    className: string;
  }
> = ({ size, value, onChange, values, className }) => {
  const theme = useTheme();

  return (
    <ToggleButtonGroup
      value={value}
      size={size ?? "small"}
      exclusive
      onChange={onChange}
      sx={{
        "& .MuiToggleButton-root.Mui-selected": {
          color: "accent.main",
          backgroundColor: "transparent",
          borderColor: theme.palette.accent.main,
          height: "100%",
          transitionDuration: "300ms",
        },
        "& .MuiToggleButton-root": {
          transitionDuration: "300ms",
          color: rgba(theme.palette.text.primary, 0.7),
        },
        "& .MuiToggleButton-root:hover": {
          backgroundColor: "transparent",
        },
        "& .Mui-disabled": {
          textDecoration: "line-through",
        },
        "& .MuiTab-root": {
          minWidth: "unset",
          minHeight: "unset",
          zIndex: 1,
          padding: 0,
          marginLeft: "6px",
          borderRadius: "6px",
          border: "1px solid",
          borderColor: "primary.main",
        },
      }}
      className={className}
    >
      {values.map((item) => (
        <MuiToggleButton
          key={item.label}
          disabled={item.isDisabled}
          value={item.label}
        >
          {item.label}
        </MuiToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ToggleButton;
