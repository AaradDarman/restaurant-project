import { FC, PropsWithChildren, useState } from "react";

import { RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";

import {
  addItemToLocalCart,
  removeItemFromLocalCart,
} from "redux/slices/cart";
import { orderContext } from "context/order-context";
import { ICartItemProp } from "interfaces/food.interfaces";
import { TPaymentType } from "types/payment.types";

const OrderContext: FC<PropsWithChildren> = ({ children }) => {
  const { cart } = useSelector((state: RootState) => state);
  const [eatMethod, setEatMethod] = useState<string>("سالن");
  const [paymentMethod, setPaymentMethod] = useState<TPaymentType>('آنلاین');
  const dispatch = useDispatch();

  const handleAddItemToCart = (item: ICartItemProp) => {
    // if (isEmpty(user)) {
    if (true) {
      dispatch(addItemToLocalCart(item));
    } else {
      //   dispatch(addItemToDbCart({ item: product, userId: user._id }));
    }
  };

  const handleRemoveItemFromCart = (
    item: Pick<ICartItemProp, "_id" | "size">
  ) => {
    // if (isEmpty(user)) {
    if (true) {
      dispatch(removeItemFromLocalCart(item));
    } else {
      //   dispatch(remove({ item: product, userId: user._id }));
    }
  };

  return (
    <orderContext.Provider
      value={{
        handleAddItemToCart,
        handleRemoveItemFromCart,
        eatMethod,
        setEatMethod,
        paymentMethod,
        setPaymentMethod,
      }}
    >
      {children}
    </orderContext.Provider>
  );
};

export default OrderContext;
