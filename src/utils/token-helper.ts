import jwt from "jsonwebtoken";
import * as jose from "jose";
import { TUser } from "types/auth.types";

export const decodeToken = async (
  token: string
): Promise<jose.JWTPayload & { user?: TUser }> => {
  const { payload } = await jose.jwtVerify(
    token,
    new TextEncoder().encode(`sokolows`)
  );
  return payload;
  //   try {
  // } catch (error) {
  //   console.log(error);
  // }
};

export const getToken = (key: string) => {
  if (typeof window !== "undefined") {
    // return localStorage.getItem(key);
    return new Promise((resolve, reject) => {
      try {
        const value = localStorage.getItem(key);
        if (value !== null) {
          resolve(value);
        }
      } catch (e) {
        reject.apply(e);
      }
    });
  }
};
