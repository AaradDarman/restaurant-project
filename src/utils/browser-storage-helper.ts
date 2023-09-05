import { IUserState } from "interfaces/auth.interfaces";
import { ICartState } from "interfaces/order.interfaces";

const KEY = "localDb";
export const loadState = ():
  | { cart: ICartState; user: IUserState }
  | undefined => {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export const saveState = async (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore
  }
};

export const cleanStorage = async (key: "cart" | "favList") => {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (serializedState) {
      let parsedState = JSON.parse(serializedState);
      localStorage.removeItem(KEY);
      if (key === "cart") {
        localStorage.setItem(KEY, JSON.stringify({ user: parsedState.user }));
      } else {
        localStorage.setItem(KEY, JSON.stringify({ cart: parsedState.cart }));
      }
    }
  } catch (e) {
    // Ignore
  }
};
