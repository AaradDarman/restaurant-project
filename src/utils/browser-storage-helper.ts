import { ICartState } from "interfaces/order.interfaces";

const KEY = "cart";
export const loadState = (): ICartState | undefined => {
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

export const cleanStorage = async () => {
  try {
    localStorage.removeItem(KEY);
  } catch (e) {
    // Ignore
  }
};
