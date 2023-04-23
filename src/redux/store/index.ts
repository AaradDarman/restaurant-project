import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";

import products from "redux/slices/foods";
import cart from "redux/slices/cart";
import { debounce, isEmpty } from "lodash";
import { loadState, saveState } from "utils/browser-storage-helper";
import user from "redux/slices/user";
// import { loadState } from "utils/browser-storage";
// import { getInitialInfo } from "redux/slices/products";

// const reducer = combineReducers({
//   products,
//   cart,
//   user,
// });

const store = configureStore({
  reducer: {
    products,
    cart,
    user,
  },
  devTools: true,
  preloadedState: { cart: loadState() },
});

store.subscribe(
  debounce(() => {
    // if (isEmpty(store.getState().user?.user)) {
    if (true) {
      saveState(store.getState().cart);
    }
  }, 800)
);

// store.dispatch(getInitialInfo());
export type RootState = ReturnType<typeof store.getState>;
export default store;
