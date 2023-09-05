import { createContext, useContext } from "react";

import { AuthContextContent, TUser } from "types/auth.types";

export const authContext = createContext<AuthContextContent>({
  phoneNumber: "",
  setPhoneNumber: () => {},
  name: "",
  setName: () => {},
  birthDate: "",
  setBirthDate: () => {},
  authState: "login",
  setAuthState: () => {},
  otp: "",
  setOtp: () => {},
  handleGetOtp: () => {},
  handleLogin: () => {},
  openAccountInfoDialog: () => {},
  handleEditInfo: () => {},
  getUserData: () => {},
  handleFav: (item: any) => {},
});

export const useAuthContext = () => useContext(authContext);
