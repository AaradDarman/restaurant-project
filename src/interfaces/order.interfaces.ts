import { TBook, TTable } from "types/booking.types";
import { TOrderStatus } from "types/order.types";
import { TPaymentType, TTransactionDetail } from "types/payment.types";
import { ICustomer } from "./customer.interfaces";
import { TFoodItem } from "./food.interfaces";
import { TSize } from "types/food.types";

export interface IOrder {
  _id: string;
  orderNumber: string;
  status: string;
  items: Array<{
    _id: string;
    name: string;
    quantity: number;
    size?: string;
    discount?: number;
    images: string[];
    price: number;
  }>;
  totalPrice: number;
  createAt: string;
  customerId: string;
  paymentMethod: TPaymentType;
  transactionDetails?: Array<TTransactionDetail>;
  bookDetail?: TTable & {
    date: string;
  };
  eatMethod: "سالن" | "بیرون بری";
  table?: TTable;
}

interface ICartStateItem {
  _id: string;
  name: string;
  quantity: number;
  size?: string;
  discount?: number;
  images: string[];
  price: number;
}

export interface ICartState {
  status: string;
  itemsCount: number;
  items: Array<ICartStateItem>;
  totalPrice: number;
  totalPriceWithDiscount: number;
  reserveTable?: TTable & {
    date: string;
  };
}
