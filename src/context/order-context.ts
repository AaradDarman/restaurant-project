import { createContext, useContext } from "react";
import { OrderContextContent } from "types/order.types";

export const orderContext = createContext<OrderContextContent>({
  handleAddItemToCart: () => {},
  handleRemoveItemFromCart: () => {},
  eatMethod: "",
  setEatMethod: () => {},
  paymentMethod: "آنلاین",
  setPaymentMethod: () => {},
});

export const useOrderContext = () => useContext(orderContext);
