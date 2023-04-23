import React, { FC } from "react";

import { Typography } from "@mui/material";

import useFoodCalculation from "hooks/useFoodCalculation";
import { TFoodItem } from "interfaces/food.interfaces";
import { TSize } from "types/food.types";
import { numberWithCommas } from "utils/number-helper";

const Price: FC<{
  item: TFoodItem;
  priceClassName?: string;
  discountedPriceClassName?: string;
  selectedSize?: TSize;
}> = ({ item, priceClassName, discountedPriceClassName, selectedSize }) => {
  const { price, discount, discountedPrice } = useFoodCalculation({
    item,
    selectedSize,
  });

  return (
    <div className="flex flex-col">
      <Typography variant="caption" className={discountedPriceClassName}>{`${
        discount ? numberWithCommas(discountedPrice) : numberWithCommas(price)
      } تومان`}</Typography>
      {discount && (
        <Typography
          variant="caption"
          className={`${priceClassName} text-gray-400 line-through`}
        >
          {numberWithCommas(price)}
        </Typography>
      )}
    </div>
  );
};

export default Price;
