import { FC, Dispatch, SetStateAction } from "react";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Theme,
  useTheme,
} from "@mui/material";
import { rgba } from "polished";

import Icon from "components/shared/Icon";
import { TTable } from "types/booking.types";

const TableRadio: FC<{ table: TTable; theme: Theme }> = ({
  table,
  theme,
  ...otherProps
}) => {
  return (
    <Radio
      sx={{
        "&": {
          padding: "8px",
        },
      }}
      className="!duration-300"
      disableRipple
      color="default"
      checkedIcon={
        <div className="flex items-center justify-center">
          <span className="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] text-2xl ">
            {table.name}
          </span>
          <Icon
            size={70}
            icon={`${table.seatingCapacity}-seat-round`}
            color={theme.palette.accent.main}
          />
        </div>
      }
      icon={
        <div className="flex items-center justify-center">
          <span className="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] text-2xl ">
            {table.name}
          </span>
          <Icon size={70} icon={`${table.seatingCapacity}-seat-round`} />
        </div>
      }
      {...otherProps}
    />
  );
};

const TablePicker: FC<{
  value?: TTable;
  onChange?: Dispatch<SetStateAction<TTable | undefined>>;
  values: TTable[];
}> = ({ value, onChange, values }) => {
  const theme = useTheme();

  return (
    <RadioGroup
      aria-labelledby="size-radio-buttons-group"
      name="size-radio-buttons-group"
      row
      value={JSON.stringify(value)}
      onChange={(e) => onChange && onChange(JSON.parse(e.target.value))}
      sx={{
        "&": { flex: 1, alignContent: "flex-start" },
        "& .Mui-checked": {
          color: "accent.main",
        },
        "& .Mui-disabled": {
          color: rgba("#db3131", 0.3),
        },
      }}
    >
      {values?.map((table) => (
        <FormControlLabel
          label=""
          key={table.name}
          value={JSON.stringify(table)}
          control={<TableRadio table={table} theme={theme} />}
          disabled={table.isReserved}
          className="!m-0"
        />
      ))}
    </RadioGroup>
  );
};

export default TablePicker;
