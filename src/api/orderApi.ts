import { TTable } from "types/booking.types";
import http from "./xhr";
import { TEatMethod } from "types/order.types";
import { TPaymentType } from "types/payment.types";

const placeOrder = (orderData: {
  paymentMethod: string;
  eatMethod: TEatMethod;
  table?: TTable;
  reserveTable?: TTable & {
    date: string;
  };
}) => {
  return http.post(`/api/order/create`, orderData);
};

const payBill = ({
  orderId,
  paymentMethod,
}: {
  orderId: string;
  paymentMethod: TPaymentType;
}) => {
  return http.get(`/api/order/pay`, { params: { orderId, paymentMethod } });
};

// eslint-disable-next-line
export default {
  placeOrder,
  payBill,
};
