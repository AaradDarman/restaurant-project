import { Dispatch, SetStateAction } from "react";

export type TUser = {
  _id: string;
  phoneNumber: string;
  name?: string;
  birthDate?: string;
  gender?: string;
  profileImage?: string;
};

export type AuthContextContent = {
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  birthDate: string;
  setBirthDate: Dispatch<SetStateAction<string>>;
  authState: "login" | "otp";
  setAuthState: Dispatch<SetStateAction<"login" | "otp">>;
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
  handleGetOtp: () => void;
  handleLogin: () => void;
  openAccountInfoDialog: () => void;
  handleEditInfo: (
    values: Required<Omit<TUser, "_id" | "profileImage">>
  ) => void;
};
