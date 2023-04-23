import React, { FC } from "react";

import {
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@mui/material";

import { TSize } from "types/food.types";

const SizeRadio: FC<{ size: TSize }> = ({ size, ...otherProps }) => {
  return (
    <Radio
      sx={{
        "&": {
          padding: "4px",
          border: "1px solid transparent",
          borderRadius: "0.5rem",
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<div>{size.label}</div>}
      icon={<div>{size.label}</div>}
      {...otherProps}
    />
  );
};

const SizeSelector: FC<
  RadioGroupProps & {
    sizes: TSize[];
    selectedSize?: TSize;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  }
> = ({ sizes, selectedSize, onChange, ...otherProps }) => {
  return (
    <RadioGroup
      aria-labelledby="size-radio-buttons-group"
      defaultValue={JSON.stringify(sizes[0])}
      name="size-radio-buttons-group"
      row
      value={JSON.stringify(selectedSize ? selectedSize : sizes[0])}
      onChange={onChange}
      sx={{
        "& .Mui-checked": {
          border: "1px solid",
          borderColor: "accent.main",
          borderRadius: "0.5rem",
        },
      }}
      {...otherProps}
    >
      {sizes?.map((size) => (
        <FormControlLabel
          label=""
          key={size.label}
          value={JSON.stringify(size)}
          control={<SizeRadio size={size} />}
          className="!m-0"
        />
      ))}
    </RadioGroup>
  );
};

export default SizeSelector;
