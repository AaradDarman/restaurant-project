import { FC, PropsWithChildren, useState } from "react";
import { authContext } from "./auth-context";
import { useDispatch } from "react-redux";
import { getOtp, login, setUser } from "redux/slices/user";
import { loadState } from "utils/browser-storage-helper";
import { useRouter } from "next/router";
import EditDialog from "components/profile/account-info/EditDialog";
import { TUser } from "types/auth.types";
import { setLocalCartItems, syncCartToDb } from "redux/slices/cart";
import userApi from "api/userApi";
import { omit } from "lodash";

const AuthContext: FC<PropsWithChildren> = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [authState, setAuthState] = useState<"login" | "otp">("login");
  const [otp, setOtp] = useState<string>("");
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const [isAccountInfoDialogOpen, setIsAccountInfoDialogOpen] = useState(false);

  const openAccountInfoDialog = () => {
    setIsAccountInfoDialogOpen(true);
  };
  const closeAccountInfoDialog = () => {
    setIsAccountInfoDialogOpen(false);
  };

  const handleGetOtp = () => {
    dispatch(getOtp({ phoneNumber: phoneNumber }))
      .unwrap()
      .then(() => {
        setAuthState("otp");
      });
  };

  const handleLogin = () => {
    let localBasket = loadState();
    dispatch(login({ otp, phoneNumber }))
      .unwrap()
      .then(async () => {
        if (localBasket?.items.length) {
          dispatch(syncCartToDb(localBasket?.items));
        }
        if (router.query.returnUrl) {
          let path = router.query.returnUrl as string;
          router.replace(path);
        } else {
          router.replace("/");
        }
      });
  };

  const handleEditInfo = (
    values: Required<Omit<TUser, "_id" | "profileImage">>
  ) => {
    console.log("edit");
    let { birthDate } = values;
    closeAccountInfoDialog();
  };

  const getUserData = async () => {
    try {
      const { data, status } = await userApi.getUserData();
      if (status === 200) {
        let user = omit(data.user, "basket");
        dispatch(setUser(user));
        let localBasket = loadState();
        if (localBasket?.items.length) {
          dispatch(syncCartToDb(localBasket?.items));
        } else if (data.user.basket.length) {
          dispatch(setLocalCartItems(data.user.basket));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <authContext.Provider
      value={{
        phoneNumber,
        setPhoneNumber,
        name,
        setName,
        birthDate,
        setBirthDate,
        authState,
        setAuthState,
        otp,
        setOtp,
        handleGetOtp,
        handleLogin,
        openAccountInfoDialog,
        handleEditInfo,
        getUserData,
      }}
    >
      {children}
      <EditDialog
        isOpen={isAccountInfoDialogOpen}
        onClose={closeAccountInfoDialog}
      />
    </authContext.Provider>
  );
};

export default AuthContext;
