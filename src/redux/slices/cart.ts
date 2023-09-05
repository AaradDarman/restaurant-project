import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ICartItemProp, TFoodItem } from "interfaces/food.interfaces";
import { ICartState } from "interfaces/order.interfaces";
import { isEqual } from "lodash";
import { toast } from "react-toastify";
import { MyKnownError } from "types/error.types";
import { cleanStorage } from "utils/browser-storage-helper";

export const addItemToDbCart = createAsyncThunk<
  { items: ICartState["items"] },
  { item: ICartItemProp },
  {
    rejectValue: MyKnownError;
  }
>("cart/addItemToDbCart", async ({ item }, thunkApi) => {
  try {
    const response = await userApi.addItemToBasket(item);
    return { items: response.data.basket };
  } catch (error: any) {
    if (error.response.status != 500) {
      toast.error(error?.response?.data?.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
    return thunkApi.rejectWithValue(error.response.data as MyKnownError);
  }
});

export const removeItemFromDbCart = createAsyncThunk<
  { items: ICartState["items"] },
  Pick<ICartItemProp, "_id" | "quantity" | "size">,
  {
    rejectValue: MyKnownError;
  }
>("cart/removeItemFromDbCart", async (item, thunkApi) => {
  try {
    const response = await userApi.removeItemFromBasket(item);
    return { items: response.data.basket };
  } catch (error: any) {
    if (error.response.status != 500) {
      toast.error(error?.response?.data?.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
    return thunkApi.rejectWithValue(error.response.data as MyKnownError);
  }
});

export const syncCartToDb = createAsyncThunk<
  { items: ICartState["items"] },
  ICartState["items"],
  {
    rejectValue: MyKnownError;
  }
>("cart/syncCartToDb", async (items, thunkApi) => {
  try {
    const response = await userApi.syncCartToDb(items);
    await cleanStorage('cart');
    return { items: response.data.basket };
  } catch (error: any) {
    if (error.response.status != 500) {
      toast.error(error?.response?.data?.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
    return thunkApi.rejectWithValue(error.response.data as MyKnownError);
  }
});

const initialState: ICartState = {
  status: "idle",
  itemsCount: 0,
  items: [],
  totalPrice: 0,
  totalPriceWithDiscount: 0,
  reserveTable: undefined,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToLocalCart: (state, action) => {
      if (state.itemsCount === 0) {
        state.items.push({ ...action.payload, quantity: 1 });
        state.itemsCount++;
        state.totalPrice = state.items.reduce(
          (total, item) => item.price * item.quantity + total,
          0
        );
        state.totalPriceWithDiscount = state.items.reduce((total, item) => {
          if (item.discount) {
            return (
              (item.price - (item.price * item.discount) / 100) *
                item.quantity +
              total
            );
          } else {
            return item.price * item.quantity + total;
          }
        }, 0);
      } else {
        let isExist = false;
        state.items.map((item) => {
          if (
            item._id === action.payload._id &&
            isEqual(item.size, action.payload.size)
          ) {
            item.quantity += 1;
            state.itemsCount++;
            isExist = true;
            state.totalPrice = state.items.reduce(
              (total, item) => item.price * item.quantity + total,
              0
            );
            state.totalPriceWithDiscount = state.items.reduce((total, item) => {
              if (item.discount) {
                return (
                  (item.price -
                    Math.round((item.price * item.discount) / 100)) *
                    item.quantity +
                  total
                );
              } else {
                return item.price * item.quantity + total;
              }
            }, 0);
            return item;
          }
        });
        if (!isExist) {
          state.items.push({ ...action.payload, quantity: 1 });
          state.itemsCount++;
          state.totalPrice = state.items.reduce(
            (total, item) => item.price * item.quantity + total,
            0
          );
          state.totalPriceWithDiscount = state.items.reduce((total, item) => {
            if (item.discount) {
              return (
                (item.price - Math.round((item.price * item.discount) / 100)) *
                  item.quantity +
                total
              );
            } else {
              return item.price * item.quantity + total;
            }
          }, 0);
        }
      }
    },
    removeItemFromLocalCart(state, action) {
      let itemIndex = state.items.findIndex(
        (item) =>
          item._id === action.payload._id &&
          isEqual(item.size, action.payload.size)
      );
      if (state.items[itemIndex].quantity > 1) {
        state.items[itemIndex].quantity -= 1;
        state.itemsCount--;
        state.totalPrice = state.items.reduce(
          (total, item) => item.price * item.quantity + total,
          0
        );
        state.totalPriceWithDiscount = state.items.reduce((total, item) => {
          if (item.discount) {
            return (
              (item.price - Math.round((item.price * item.discount) / 100)) *
                item.quantity +
              total
            );
          } else {
            return item.price * item.quantity + total;
          }
        }, 0);
      } else {
        state.items = state.items.filter(
          (item) => item != state.items[itemIndex]
        );
        state.itemsCount--;
        state.totalPrice = state.items.reduce(
          (total, item) => item.price * item.quantity + total,
          0
        );
        state.totalPriceWithDiscount = state.items.reduce((total, item) => {
          if (item.discount) {
            return (
              (item.price - Math.round((item.price * item.discount) / 100)) *
                item.quantity +
              total
            );
          } else {
            return item.price * item.quantity + total;
          }
        }, 0);
      }
    },
    setLocalCartItems(state, action) {
      state.items = action.payload;
      state.itemsCount = action.payload
        .map((item: ICartState["items"][0]) => item.quantity)
        .reduce((a: number, b: number) => a + b, 0);
      // state.itemsCount = action.payload.length;
      state.totalPrice = state.items.reduce(
        (total, item) => item.price * item.quantity + total,
        0
      );
      state.totalPriceWithDiscount = state.items.reduce((total, item) => {
        if (item.discount) {
          return (
            (item.price - Math.round((item.price * item.discount) / 100)) *
              item.quantity +
            total
          );
        } else {
          return item.price * item.quantity + total;
        }
      }, 0);
    },
    resetLocalCart: () => initialState,
    reserveTable: (
      state,
      action: {
        payload: ICartState["reserveTable"];
      }
    ) => {
      state.reserveTable = action.payload;
    },
    cancellReserveTable: (state) => {
      state.reserveTable = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToDbCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.itemsCount = action.payload.items
          .map((item) => item.quantity)
          .reduce((a, b) => a + b, 0);
        state.totalPrice = state.items.reduce(
          (total, item) => item.price * item.quantity + total,
          0
        );
        state.totalPriceWithDiscount = state.items.reduce((total, item) => {
          if (item.discount) {
            return (
              (item.price - (item.price * item.discount) / 100) *
                item.quantity +
              total
            );
          } else {
            return item.price * item.quantity + total;
          }
        }, 0);
        state.status = "idle";
      })
      .addCase(addItemToDbCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItemToDbCart.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(removeItemFromDbCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.itemsCount = action.payload.items
          .map((item) => item.quantity)
          .reduce((a, b) => a + b, 0);
        state.totalPrice = state.items.reduce(
          (total, item) => item.price * item.quantity + total,
          0
        );
        state.totalPriceWithDiscount = state.items.reduce((total, item) => {
          if (item.discount) {
            return (
              (item.price - (item.price * item.discount) / 100) *
                item.quantity +
              total
            );
          } else {
            return item.price * item.quantity + total;
          }
        }, 0);
        state.status = "idle";
      })
      .addCase(removeItemFromDbCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeItemFromDbCart.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(syncCartToDb.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.itemsCount = action.payload.items
          .map((item) => item.quantity)
          .reduce((a, b) => a + b, 0);
        state.totalPrice = state.items.reduce(
          (total, item) => item.price * item.quantity + total,
          0
        );
        state.totalPriceWithDiscount = state.items.reduce((total, item) => {
          if (item.discount) {
            return (
              (item.price - (item.price * item.discount) / 100) *
                item.quantity +
              total
            );
          } else {
            return item.price * item.quantity + total;
          }
        }, 0);
        state.status = "idle";
      })
      .addCase(syncCartToDb.pending, (state) => {
        state.status = "loading";
      })
      .addCase(syncCartToDb.rejected, (state) => {
        state.status = "idle";
      });
  },
});
export const {
  addItemToLocalCart,
  removeItemFromLocalCart,
  setLocalCartItems,
  resetLocalCart,
  reserveTable,
  cancellReserveTable,
} = cartSlice.actions;
export default cartSlice.reducer;
