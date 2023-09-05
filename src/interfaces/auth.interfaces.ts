import { TUser } from "types/auth.types";
import { IOrder } from "./order.interfaces";

export interface IUserState {
  status: string;
  user?: TUser;
  otpCreateDate: string;
  orders: IOrder[];
  favoriteList: Array<{
    _id: string;
    name: string;
    images: string[];
    description: string;
  }>;
}
