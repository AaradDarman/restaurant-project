import { FC, PropsWithChildren, useState } from "react";
import { authContext } from "./auth-context";
import { useDispatch, useSelector } from "react-redux";
import {
  addFav,
  addFavToLocalDb,
  getOtp,
  login,
  removeFav,
  removeFavFromLocalDb,
  setLocalFavList,
  setUser,
  syncFavListToDb,
} from "redux/slices/user";
import { loadState } from "utils/browser-storage-helper";
import { useRouter } from "next/router";
import EditDialog from "components/profile/account-info/EditDialog";
import { TUser } from "types/auth.types";
import { setLocalCartItems, syncCartToDb } from "redux/slices/cart";
import userApi from "api/userApi";
import { omit } from "lodash";
import LoadingComponent from "components/shared/LoadingComponent";
import { RootState } from "redux/store";

const AuthContext: FC<PropsWithChildren> = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [authState, setAuthState] = useState<"login" | "otp">("login");
  const [otp, setOtp] = useState<string>("");
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const [isAccountInfoDialogOpen, setIsAccountInfoDialogOpen] = useState(false);
  const { status, user, favoriteList } = useSelector(
    (state: RootState) => state.user
  );

  const openAccountInfoDialog = () => {
    setIsAccountInfoDialogOpen(true);
  };
  const closeAccountInfoDialog = () => {
    setIsAccountInfoDialogOpen(false);
  };

  const handleGetOtp = () => {
    let localBasket = loadState();
    if (phoneNumber === "01234567890") {
      dispatch(login({ otp, phoneNumber }))
        .unwrap()
        .then(async () => {
          if (router.query.returnUrl) {
            let path = router.query.returnUrl as string;
            if (localBasket?.cart.items.length) {
              dispatch(syncCartToDb(localBasket?.cart.items));
            }
            if (localBasket?.user.favoriteList.length) {
              dispatch(syncFavListToDb(localBasket?.user.favoriteList));
            }
            router.replace(path);
          } else {
            router.replace("/");
          }
        });
    } else {
      dispatch(getOtp({ phoneNumber: phoneNumber }))
        .unwrap()
        .then(() => {
          setAuthState("otp");
        });
    }
  };

  const handleLogin = () => {
    let localBasket = loadState();
    dispatch(login({ otp, phoneNumber }))
      .unwrap()
      .then(async () => {
        if (localBasket?.cart.items.length) {
          dispatch(syncCartToDb(localBasket?.cart.items));
        }
        if (localBasket?.user.favoriteList.length) {
          dispatch(syncFavListToDb(localBasket?.user.favoriteList));
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

  const handleFav = (item: any) => {
    let isInList = favoriteList.some((obj) => obj._id === item._id);
    if (user) {
      if (isInList) {
        dispatch(removeFav(item));
      } else {
        dispatch(addFav(item));
      }
    } else {
      if (isInList) {
        dispatch(removeFavFromLocalDb(item));
      } else {
        dispatch(addFavToLocalDb(item));
      }
    }
  };

  const getUserData = async () => {
    try {
      const { data, status } = await userApi.getUserData();
      if (status === 200) {
        let user = omit(data.user, "basket");
        dispatch(setUser(user));
        let localBasket = loadState();
        if (localBasket?.cart?.items.length) {
          dispatch(syncCartToDb(localBasket?.cart?.items));
        } else if (data.user.basket.length) {
          dispatch(setLocalCartItems(data.user.basket));
        }
        if (localBasket?.user?.favoriteList.length) {
          dispatch(syncFavListToDb(localBasket?.user.favoriteList));
        } else if (data.user.favoriteList.length) {
          console.log("favoriteList");
          dispatch(setLocalFavList(data.user.favoriteList));
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
        handleFav,
      }}
    >
      {children}
      <EditDialog
        isOpen={isAccountInfoDialogOpen}
        onClose={closeAccountInfoDialog}
      />
      <LoadingComponent show={status === "loading"} />
    </authContext.Provider>
  );
};

export default AuthContext;
