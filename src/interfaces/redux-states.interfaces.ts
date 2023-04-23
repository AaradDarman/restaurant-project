import { IProductsState } from "redux/slices/foods";
import { ICartState } from "./order.interfaces";
import { IUserState } from "./auth.interfaces";

export interface IRootState {
  products: IProductsState;
  cart: ICartState;
  user: IUserState;
}
