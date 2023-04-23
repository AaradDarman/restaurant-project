import {
  TCategory,
  TDiscount,
  TIsOutOfStock,
  TPrice,
  TSize,
} from "types/food.types";

interface FoodItem {
  _id: string;
  name: string;
  description: string;
  images: string[];
  isOutOfStock?: TIsOutOfStock;
  category: TCategory["_id"];
}

interface FoodItemWithoutSize extends FoodItem {
  sizes?: undefined;
  price: number;
  discount?: number;
}

interface FoodItemWithSize extends FoodItem {
  sizes: TSize[];
  price: TPrice[];
  discount?: TDiscount[];
}

export type TFoodItem = FoodItemWithoutSize | FoodItemWithSize;

export interface IFoodCalcProp {
  item: Pick<TFoodItem, "price" | "discount">;
  selectedSize?: TSize;
}

export interface ICartItemProp {
  _id: string;
  name: string;
  quantity: number;
  size?: TSize;
  price: number;
  discount?: number;
  image: string;
}
