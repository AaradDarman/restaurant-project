import { FC, PropsWithChildren, useState } from "react";

import { RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";

import {
  addItemToDbCart,
  addItemToLocalCart,
  removeItemFromLocalCart,
  removeItemFromDbCart,
} from "redux/slices/cart";
import { orderContext } from "context/order-context";
import { ICartItemProp } from "interfaces/food.interfaces";
import { TPaymentType } from "types/payment.types";
import { isEmpty } from "lodash";
import orderApi from "api/orderApi";
import { useRouter } from "next/router";
import { TEatMethod } from "types/order.types";
import { useBookingContext } from "./booking-context";
import SuccessPaymentDialog from "components/checkout/SuccessPaymentDialog";
import { toast } from "react-toastify";
import LoadingComponent from "components/shared/LoadingComponent";

const OrderContext: FC<PropsWithChildren> = ({ children }) => {
  const { cart, user } = useSelector((state: RootState) => state);
  const [eatMethod, setEatMethod] = useState<TEatMethod>("سالن");
  const [paymentMethod, setPaymentMethod] = useState<TPaymentType>("آنلاین");
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { selectedTable } = useBookingContext();
  const [isSuccessPaymentDialogOpen, setIsSuccessPaymentDialogOpen] =
    useState(false);
  const [paymentIsLoading, setPaymentIsLoading] =
    useState(false);

  const handleAddItemToCart = (item: ICartItemProp) => {
    if (isEmpty(user.user)) {
      dispatch(addItemToLocalCart(item));
    } else {
      dispatch(addItemToDbCart({ item }));
    }
  };

  const handleRemoveItemFromCart = (
    item: Pick<ICartItemProp, "_id" | "quantity" | "size">
  ) => {
    if (isEmpty(user.user)) {
      dispatch(removeItemFromLocalCart(item));
    } else {
      dispatch(removeItemFromDbCart(item));
    }
  };

  const handlePlaceOrder = async () => {
    setPaymentIsLoading(true);
    try {
      const { data, status } = await orderApi.placeOrder({
        paymentMethod,
        reserveTable: cart.reserveTable,
        eatMethod,
        table: selectedTable,
      });
      if (status === 200) {
        router.push(data.paymentUrl);
        setPaymentIsLoading(false);
      }
    } catch (error: any) {
      setPaymentIsLoading(false);
      console.log(error);
      if (error.response.status != 500) {
        toast.error(error?.response?.data?.message, {
          position: "bottom-center",
          closeOnClick: true,
        });
      }
    }
  };

  const payBill = async (orderId: string) => {
    setPaymentIsLoading(true);
    try {
      const { data, status } = await orderApi.payBill({
        orderId: orderId,
        paymentMethod: "آنلاین",
      });
      if (status === 200) {
        router.push(data.paymentUrl);
        setPaymentIsLoading(false);
      }
    } catch (error: any) {
      setPaymentIsLoading(false);
      console.log(error);
      if (error.response.status != 500) {
        toast.error(error?.response?.data?.message, {
          position: "bottom-center",
          closeOnClick: true,
        });
      }
      if (error.response.status == 404) {
        router.replace(`/profile/recent-orders`);
      }
    }
  };

  const openSuccessPaymentDialog = () => {
    setIsSuccessPaymentDialogOpen(true);
  };
  const closeSuccessPaymentDialog = () => {
    setIsSuccessPaymentDialogOpen(false);
    router.replace("/profile/recent-orders", undefined, { shallow: true });
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
        handlePlaceOrder,
        payBill,
        openSuccessPaymentDialog,
      }}
    >
      {children}
      <SuccessPaymentDialog
        isOpen={isSuccessPaymentDialogOpen}
        onClose={closeSuccessPaymentDialog}
      />
      <LoadingComponent show={paymentIsLoading} />
    </orderContext.Provider>
  );
};

export default OrderContext;
