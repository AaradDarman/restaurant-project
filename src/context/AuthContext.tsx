import { FC, PropsWithChildren, useState } from "react";
import { authContext } from "./auth-context";
import { useDispatch } from "react-redux";
import { getOtp, login } from "redux/slices/user";
import { loadState } from "utils/browser-storage-helper";
import { useRouter } from "next/router";
import EditDialog from "components/profile/account-info/EditDialog";
import { TUser } from "types/auth.types";

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
    dispatch(login({ otp }))
      .unwrap()
      .then(async () => {
        if (localBasket?.items) {
          // dispatch(syncCartToDb(localBasket?.items));
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
