import { createContext, useContext } from "react";
import { OrderContextContent } from "types/order.types";

export const orderContext = createContext<OrderContextContent>({
  handleAddItemToCart: () => {},
  handleRemoveItemFromCart: () => {},
  eatMethod: "سالن",
  setEatMethod: () => {},
  paymentMethod: "آنلاین",
  setPaymentMethod: () => {},
  handlePlaceOrder: () => {},
  payBill: () => {},
  openSuccessPaymentDialog: () => {},
});

export const useOrderContext = () => useContext(orderContext);
