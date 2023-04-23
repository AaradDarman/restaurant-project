import { TFoodItem } from "./food.interfaces";

export interface ICustomer {
  _id: string;
  phoneNumber: string;
  name?: string;
}

export interface IBasket {
  items: Array<{
    _id: string;
    name: string;
    quantity: number;
    size?: number;
    discount?: number;
    images: string[];
    price: number;
  }>;
}
