import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  SxProps,
  Theme,
  alpha,
  useTheme,
} from "@mui/material";
import { ElementType, FC, ReactNode } from "react";

const DropDown: FC<
  Omit<SelectProps, "onChange"> & {
    items: Array<string>;
    value?: any;
    onChange?: ((val: string) => void) | undefined;
    IconComponent?: ElementType<any> | undefined;
    sx?: SxProps<Theme>;
  }
> = ({
  items,
  value,
  onChange = () => {},
  IconComponent,
  sx,
  ...otherProps
}) => {
  const theme = useTheme();

  const Ic = (props: any) => (
    <FontAwesomeIcon icon={faChevronDown} width={10} {...props} />
  );

  return (
    <Select
      {...otherProps}
      value={value ?? items[0]}
      label=""
      onChange={(e) => onChange(e.target.value)}
      IconComponent={IconComponent ?? Ic}
      autoWidth={false}
      variant="standard"
      sx={[
        {
          "&": {
            fontSize: "14px",
            minWidth: "100px",
          },
          "& .MuiInput-input:focus": {
            backgroundColor: "transparent",
          },
          "&:before": {
            borderBottom: "none",
          },
          "&:after": {
            borderBottom: "none",
          },
          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom: "none",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      MenuProps={{
        PaperProps: {
          sx: {
            bgcolor: "primary.main",
            backgroundImage: "none",
            "& .MuiMenu-list": {
              padding: 0,
              fontSize: "14px",
            },
            "& .MuiMenuItem-root": {
              fontSize: "14px",
            },
            "& .MuiMenuItem-root:hover": {
              bgcolor: alpha(
                theme.palette.accent.main,
                theme.palette.action.activatedOpacity
              ),
            },
            "& .MuiMenuItem-root.Mui-selected": {
              bgcolor: "accent.main",
            },
            "& .MuiMenuItem-root.Mui-selected:hover": {
              bgcolor: alpha(
                theme.palette.accent.main,
                theme.palette.action.activatedOpacity
              ),
            },
          },
        },
      }}
    >
      {items.map((item: string) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
};

export default DropDown;
