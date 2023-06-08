import { Tab, Tabs } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

const ProfileLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    router.replace(newValue);
  };

  return (
    <div className="flex flex-1 flex-col">
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_SITE_NAME} | پروفایل | ${
          router.pathname.includes("recent-orders")
            ? "سفارش های اخیر"
            : "اطلاعات حساب کاربری"
        }`}</title>
      </Head>
      <Tabs
        variant="fullWidth"
        sx={{
          "& .MuiTab-root.Mui-selected": {
            color: "text.primary",
          },
          "& .MuiTab-root": {},
          "& .MuiTabs-indicator": {
            backgroundColor: "accent.main",
          },
        }}
        value={router.pathname}
        onChange={handleChange}
        className="lg:!hidden"
      >
        <Tab value="/profile/recent-orders" label="سفارش های اخیر" />
        <Tab value="/profile/account-info" label="اطلاعات حساب کاربری" />
      </Tabs>
      {children}
    </div>
  );
};

export default ProfileLayout;
