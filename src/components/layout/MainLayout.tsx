import React, { PropsWithChildren, useEffect } from "react";

import { useRouter } from "next/router";

import Header from "components/header";
import BottomNavigation from "components/footer/BottomNavigation";
import BookingContext from "context/BookingContext";
import SideNavigation from "components/SideNavigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import userApi from "api/userApi";
import { setUser } from "redux/slices/user";
import { loadState } from "utils/browser-storage-helper";
import { setLocalCartItems, syncCartToDb } from "redux/slices/cart";
import { isEmpty } from "lodash";
import { useAuthContext } from "context/auth-context";

const MainLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { getUserData } = useAuthContext();
  const { user } = useSelector((state: RootState) => state);

  useEffect(() => {
    const onResize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    onResize();

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (isEmpty(user?.user)) {
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.user]);

  return (
    <>
      <Header />
      <div
        id="main-layout"
        className="main-layout flex flex-col md:w-full md:flex-row"
      >
        {router.pathname.includes("/f/") ? null : (
          <SideNavigation className="sticky top-[58px] hidden h-[calc(100vh_-_58px)] md:flex" />
        )}
        <BookingContext>{children}</BookingContext>
      </div>

      {router.pathname.includes("/f/") ? null : (
        <BottomNavigation className="fixed bottom-0 left-0 right-0 md:hidden" />
      )}
    </>
  );
};

export default MainLayout;
