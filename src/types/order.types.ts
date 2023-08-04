import { ICartItemProp } from "interfaces/food.interfaces";
import { Dispatch, SetStateAction } from "react";
import { TPaymentType } from "./payment.types";

export type TOrderStatus =
  | "wait-for-pay"
  | "in-progress"
  | "served"
  | "cancelled";

export type TEatMethod = "سالن" | "بیرون بری";

export type OrderContextContent = {
  handleAddItemToCart: (item: ICartItemProp) => void;
  handleRemoveItemFromCart: (
    item: Pick<ICartItemProp, "_id" | "quantity" | "size">
  ) => void;
  eatMethod: TEatMethod;
  setEatMethod: Dispatch<SetStateAction<TEatMethod>>;
  paymentMethod: TPaymentType;
  setPaymentMethod: Dispatch<SetStateAction<TPaymentType>>;
  handlePlaceOrder: () => void;
  payBill: (orderId: string) => void;
  openSuccessPaymentDialog: () => void;
};
