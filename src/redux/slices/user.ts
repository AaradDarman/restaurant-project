import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// import api from "adapters/user-adapter";
// import { decodeToken } from "utils/token-helper";
import { IUserState } from "interfaces/auth.interfaces";
import { TUser } from "types/auth.types";
import moment from "moment-jalaali";
import { IRootState } from "interfaces/redux-states.interfaces";
import userApi from "api/userApi";
import { decodeToken } from "utils/token-helper";
import { MyKnownError } from "types/error.types";
import { IOrder } from "interfaces/order.interfaces";

export const getOtp = createAsyncThunk<
  { otpCreateDate: string },
  { phoneNumber: string },
  {
    rejectValue: MyKnownError;
  }
>("user/get-otp", async (userData, thunkApi) => {
  try {
    const { phoneNumber } = userData;
    const { data } = await userApi.getOtp(phoneNumber);
    toast.success(data?.message, {
      position: "bottom-center",
      closeOnClick: true,
    });

    return {
      otpCreateDate: moment(data.tokenCreateDate).toDate().toISOString(),
    };
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

export const login = createAsyncThunk<
  { user: TUser | undefined },
  { otp: string; phoneNumber: string },
  {
    rejectValue: MyKnownError;
  }
>("user/login", async (userData, thunkApi) => {
  try {
    const { otp, phoneNumber } = userData;
    const { data } = await userApi.login(phoneNumber, otp);
    let decodedToken = await decodeToken(data.token);

    return {
      user: decodedToken?.user,
    };
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

export const getOrders = createAsyncThunk<
  { orders: IOrder[] },
  undefined,
  {
    rejectValue: MyKnownError;
  }
>("user/get-orders", async (_, thunkApi) => {
  try {
    const { data } = await userApi.getOrders();
    
    return {
      orders: data.orders,
    };
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

const initialState: IUserState = {
  status: "idle",
  otpCreateDate: "",
  orders: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOtp.fulfilled, (state, action) => {
        state.otpCreateDate = action.payload.otpCreateDate;
        state.status = "idle";
      })
      .addCase(getOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOtp.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "idle";
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.status = "idle";
      })
      .addCase(getOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrders.rejected, (state) => {
        state.status = "idle";
      });
  },
});
export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
