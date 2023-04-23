import {
  createSlice,
  createAsyncThunk,
  ActionCreator,
  PayloadAction,
} from "@reduxjs/toolkit";

//   import api from "services/index.services";

import { toast } from "react-toastify";

export const getInitialInfo = createAsyncThunk(
  "products/initialIntel",
  async () => {
    try {
      // const { status, data } = await api.getInitialIntel();
      // if (status === 200) {
      //   return data;
      // }
    } catch (e: any) {
      toast.error(e?.response?.data?.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
      return "";
    }
  }
);

// export const getProducts = createAsyncThunk(
//   "products/get",
//   async ({ page, sortBy }) => {
//     try {
//       const { status, data } = await api.getProducts(page, sortBy);
//       if (status === 200) {
//         return data;
//       }
//     } catch (e) {
//       toast.error(e?.response?.data?.message, {
//         position: "bottom-center",
//         closeOnClick: true,
//       });
//     }
//   }
// );

// export const addNewProduct = createAsyncThunk(
//   "products/addProduct",
//   async (formData) => {
//     try {
//       const { status, data } = await api.createProduct(formData);
//       if (status === 201) {
//         toast.success("محصول با موفقیت ذخیره شد", {
//           position: "bottom-center",
//           closeOnClick: true,
//         });
//         return data.product;
//       }
//     } catch (e) {
//       toast.error(e?.response?.data?.message, {
//         position: "bottom-center",
//         closeOnClick: true,
//       });
//     }
//   }
// );

// export const editProduct = createAsyncThunk(
//   "products/editProduct",
//   async (editedProduct) => {
//     try {
//       const { status, data } = await api.editProduct(editedProduct);
//       if (status === 200) {
//         toast.success("محصول با موفقیت ویرایش شد", {
//           position: "bottom-center",
//           closeOnClick: true,
//         });
//         return data.product;
//       }
//     } catch (e) {
//       toast.error(e?.response?.data?.message, {
//         position: "bottom-center",
//         closeOnClick: true,
//       });
//     }
//   }
// );

// export const deleteProduct = createAsyncThunk(
//   "products/deleteProduct",
//   async (id) => {
//     try {
//       const { status, data } = await api.deleteProduct(id);
//       if (status === 200) {
//         toast.success("محصول با موفقیت حذف شد", {
//           position: "bottom-center",
//           closeOnClick: true,
//         });
//         return data.product._id;
//       }
//     } catch (e) {
//       toast.error(e?.response?.data?.message, {
//         position: "bottom-center",
//         closeOnClick: true,
//       });
//     }
//   }
// );

// Define a type for the slice state
export interface IProductsState {
  status: string;
  cheapest: number;
  mostExpensive: number;
  categories: any;
  sizes: any;
}
// Define the initial state using that type
const initialState: IProductsState = {
  status: "idle",
  cheapest: 0,
  mostExpensive: 0,
  categories: [],
  sizes: [],
};
// Slice
const slice = createSlice({
  name: "foods",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // [getProducts.fulfilled]: (state, action) => {
    //   state.entity = action.payload.products;
    //   state.count = action.payload.productsCount;
    //   state.status = "idle";
    // },
    // [getProducts.pending]: (state) => {
    //   state.status = "loading";
    // },
    // [addNewProduct.fulfilled]: (state, action) => {
    //   state.entity.unshift(action.payload);
    //   state.status = "idle";
    // },
    // [addNewProduct.pending]: (state) => {
    //   state.status = "creating";
    // },
    // [editProduct.fulfilled]: (state, action) => {
    //   let productIndex = state?.entity?.findIndex(
    //     (p) => p?._id === action.payload?._id
    //   );
    //   state.entity[productIndex] = action.payload;
    //   state.status = "idle";
    // },
    // [editProduct.pending]: (state) => {
    //   state.status = "editing";
    // },
    // [deleteProduct.fulfilled]: (state, action) => {
    //   state.entity = state.entity.filter((p) => p._id !== action.payload);
    //   state.status = "idle";
    // },
    // [deleteProduct.pending]: (state) => {
    //   state.status = "deleting";
    // },
    //   builder
    //     .addCase(getInitialInfo.fulfilled, (state, action) => {
    //       state.cheapest = action.payload?.cheapest;
    //       state.mostExpensive = action.payload?.mostExpensive;
    //       state.categories = action.payload?.categories;
    //       state.sizes = action.payload?.sizes;
    //       state.status = "idle";
    //     })
    //     .addCase(getInitialInfo.pending, (state) => {
    //       state.status = "loading";
    //     });
  },
});
export default slice.reducer;
