import { useRef } from "react";

import { useSelector } from "react-redux";
import { Avatar, Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment-jalaali";
import axios from "axios";
import { useRouter } from "next/router";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import ProfileLayout from "components/layout/ProfileLayout";
import { RootState } from "redux/store";
import { useAuthContext } from "context/auth-context";
import AuthContext from "context/AuthContext";
import AccountInfoForm from "components/profile/account-info/AccountInfoForm";
import Icon from "components/shared/Icon";
import useBreakpoints from "hooks/useBreakPoints";

const AccountInfo = () => {
  const { user } = useSelector((state: RootState) => state);
  const { openAccountInfoDialog } = useAuthContext();
  const AccountInfoFormikRef = useRef<any>(null);
  const router = useRouter();
  const { isMd } = useBreakpoints();

  const logout = async () => {
    try {
      await axios.get("/api/auth/logout");
      // dispatch(resetUser());
      // dispatch(resetLocalCart());
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-[56px] flex flex-1 flex-col px-4 md:mb-0 md:items-center md:justify-center">
      {user?.user?.name ? (
        <div className="flex flex-1 flex-col items-start px-[2rem] py-[1rem]">
          <div className="mb-10 flex w-full flex-col items-center">
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: "accent.main",
                fontSize: "2rem",
              }}
              alt="prfile-pic"
              src={user?.user?.profileImage}
            >
              {`${user?.user?.name?.split(" ")[0][0]}${
                user?.user?.name?.split(" ")[1][0]
              }`}
            </Avatar>
            <Typography variant="body1">
              {user?.user?.name}
              حسین عقلایی
            </Typography>
          </div>
          <Button
            variant="text"
            sx={{
              backgroundColor: "secondary.main",
              color: "text.primary",
              fontSize: "22px",
              margin: "8px 0",
              "&:hover": {
                backgroundColor: "secondary.main",
              },
            }}
            onClick={openAccountInfoDialog}
            startIcon={<FontAwesomeIcon icon={faPencil} width={22} />}
          >
            <span className="text-[14px]">ویرایش اطلاعات</span>
          </Button>
          <Button
            variant="text"
            sx={{
              backgroundColor: "secondary.main",
              color: "text.primary",
              fontSize: "22px",
              margin: "8px 0",
              "&:hover": {
                backgroundColor: "secondary.main",
              },
            }}
            onClick={logout}
            startIcon={<Icon className="icon" icon="logout" size={22} />}
          >
            <span className="text-[14px]">خروج</span>
          </Button>
        </div>
      ) : (
        <>
          <Typography variant="body1" className="!mb-8 !mt-4 text-center">
            تکمیل اطلاعات حساب کاربری
          </Typography>
          <AccountInfoForm
            ref={AccountInfoFormikRef}
            onSubmit={({ birthDate, name, phoneNumber }) => {
              console.log(moment(birthDate).format("YYYY/MM/DD"));
            }}
          />
          <Button
            variant="contained"
            fullWidth={!isMd}
            size="small"
            sx={{
              marginTop: isMd ? 0 : "auto",
              marginBottom: "2px",
              backgroundColor: "accent.main",
              "&:hover": {
                backgroundColor: "accent.main",
              },
            }}
            onClick={() => AccountInfoFormikRef?.current?.handleSubmit()}
          >
            ذخیره
          </Button>
        </>
      )}
    </div>
  );
};

AccountInfo.getLayout = function getLayout(page: JSX.Element) {
  return (
    <ProfileLayout>
      <AuthContext>{page}</AuthContext>
    </ProfileLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const cookies = new Cookies(ctx.req, ctx.res);
//   const authorization = cookies.get("authorization");
//   if (!authorization) {
//     return {
//       redirect: {
//         destination: `/auth?returnUrl=${ctx.resolvedUrl}&forceLogout=true`,
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// };

export default AccountInfo;
