import { ICartItemProp } from "interfaces/food.interfaces";
import { Dispatch, SetStateAction } from "react";
import { TPaymentType } from "./payment.types";

export type TOrderStatus = "in-progress" | "served" | "canceled";

export type OrderContextContent = {
  handleAddItemToCart: (item: ICartItemProp) => void;
  handleRemoveItemFromCart: (item: Pick<ICartItemProp, "size" | "_id">) => void;
  eatMethod: string;
  setEatMethod: Dispatch<SetStateAction<string>>;
  paymentMethod: TPaymentType;
  setPaymentMethod: Dispatch<SetStateAction<TPaymentType>>;
};
