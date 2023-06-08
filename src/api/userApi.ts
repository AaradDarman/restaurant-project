import { ICartItemProp, TFoodItem } from "interfaces/food.interfaces";
import http from "./xhr";
import { ICartState } from "interfaces/order.interfaces";

const getOtp = (phoneNumber: string) => {
  return http.post(`${process.env.NEXT_PUBLIC_SERVICE_URL}/user/auth/get-otp`, {
    phoneNumber,
  });
};

const login = (phoneNumber: string, otp: string) => {
  return http.post(`/api/auth/login`, {
    phoneNumber,
    otp,
  });
};

const addItemToBasket = (item: ICartItemProp) => {
  return http.post(`/api/user/basket/add-item`, {
    item,
  });
};

const removeItemFromBasket = (
  item: Pick<ICartItemProp, "_id" | "quantity" | "size">
) => {
  return http.post(`/api/user/basket/remove-item`, {
    item,
  });
};

const syncCartToDb = (items: ICartState["items"]) => {
  return http.post(`/api/user/basket/sync`, {
    items,
  });
};

const getUserData = () => {
  return http.get(`/api/user/user-data`);
};

const getOrders = () => {
  return http.get(`/api/user/orders`);
};

const getOrder = (orderNumber: string) => {
  return http.get(`/api/user/orders/${orderNumber}`);
};

// eslint-disable-next-line
export default {
  getOtp,
  login,
  addItemToBasket,
  removeItemFromBasket,
  syncCartToDb,
  getUserData,
  getOrders,
  getOrder,
};
