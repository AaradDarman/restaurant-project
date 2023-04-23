import { TUser } from "types/auth.types";

export interface IUserState {
  status: string;
  user?: TUser;
  otpCreateDate: string;
}
