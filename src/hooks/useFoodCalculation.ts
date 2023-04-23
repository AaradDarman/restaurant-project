import { IFoodCalcProp, TFoodItem } from "interfaces/food.interfaces";
import { FC, useEffect, useState } from "react";
import { TDiscount, TDiscounts } from "types/food.types";

const getDiscountedPrice = (
  price: number,
  discount: number | undefined
): number => {
  if (discount) return price - (price * discount) / 100;
  return price;
};

const getMaxDiscountObject = (discounts: TDiscount[]): TDiscount => {
  let discountsPercents = discounts.map((obj) => obj.amount);
  if (discounts.length > 1) {
    let max = Math.max(...discountsPercents);
    return discounts.find((obj) => obj.amount === max) ?? discounts[0];
  } else {
    return discounts[0];
  }
};

export const calculateTotalDiscount = (
  totalPrice: number,
  totalDiscountedPrice: number
) => {
  let diff = totalPrice - totalDiscountedPrice;

  return (diff * 100) / totalPrice;
};

const useFoodCalculation = ({
  item: { price, discount },
  selectedSize,
}: IFoodCalcProp): {
  price: number;
  discount?: number;
  discountedPrice: number;
} => {
  if (!discount) {
    if (selectedSize && typeof price === "object") {
      let selectedItemPrice =
        price.find((p) => p.size === selectedSize.label)?.p ?? price[0].p;
      return {
        price: selectedItemPrice,
        discountedPrice: selectedItemPrice,
      };
    } else if (typeof price === "object") {
      return {
        price: price[0].p,
        discountedPrice: price[0].p,
      };
    } else {
      return {
        price,
        discountedPrice: price,
      };
    }
  } else {
    if (
      selectedSize &&
      typeof price === "object" &&
      typeof discount === "object"
    ) {
      let selectedItemPrice =
        price.find((p) => p.size === selectedSize.label)?.p ?? price[0].p;
      let selectedItemDiscount =
        discount.find((d) => d.size === selectedSize.label)?.amount ??
        undefined;
      return {
        price: selectedItemPrice,
        discount: selectedItemDiscount,
        discountedPrice: getDiscountedPrice(
          selectedItemPrice,
          selectedItemDiscount
        ),
      };
    } else if (typeof price === "object" && typeof discount === "object") {
      let maxDiscount = getMaxDiscountObject(discount);
      let itemPrice =
        price.find((p) => p.size === maxDiscount.size)?.p ?? price[0].p;
      let itemDiscount =
        discount.find((d) => d.size === maxDiscount.size)?.amount ??
        discount[0].amount;
      return {
        price: itemPrice,
        discount: itemDiscount,
        discountedPrice: getDiscountedPrice(itemPrice, itemDiscount),
      };
    } else {
      return {
        price: +price,
        discount: +discount,
        discountedPrice: getDiscountedPrice(+price, +discount),
      };
    }
  }
};

export default useFoodCalculation;
