import { useEffect, useState } from "react";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { IconButton, Typography } from "@mui/material";

import Icon from "components/shared/Icon";
import Navigation from "./Navigation";
import useBreakpoints from "hooks/useBreakPoints";

const NavigationDrawer = dynamic(() => import("./NavigationDrawer"), {
  ssr: false,
});
const CartIcon = dynamic(() => import("./CartIcon"), { ssr: false });

const headerTitleOptions: { [key: string]: string } = {
  "/booking": "رزرو",
  "/favorites": "پسندیده ها",
  "/profile": "پروفایل",
  "/f/[name]": "جزئیات",
  "/checkout/cart": "سبد خرید",
  "/checkout/payment": "پرداخت",
} as const;

const headerIconOptions: { [key: string]: string } = {
  "/checkout/cart": "arrow-right",
  "/checkout/payment": "arrow-right",
  "/f/[name]": "arrow-right",
} as const;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [offset, setOffset] = useState(0);

  const router = useRouter();
  const { isMd } = useBreakpoints();

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`header min-h-[58px] ${
          offset > 10 ? "bg-primary-800" : "bg-transparent"
        } ${
          router.pathname.includes("/f/")
            ? "fixed top-0 w-full"
            : "sticky top-0"
        }  z-20 transition-all`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          {headerTitleOptions[router.pathname] && !isMd ? (
            <Typography variant="h5" component="h1" className="!order-2">
              {headerTitleOptions[router.pathname]}
            </Typography>
          ) : (
            <Link href="/" className="logo order-2 md:order-1">
              {process.env.NEXT_PUBLIC_SITE_NAME}
            </Link>
          )}
          {/* Navigation */}
          <Navigation />
          <div
            className={`${
              router.pathname.includes("/checkout") ? "invisible" : null
            } order-3 flex items-center md:invisible`}
          >
            <CartIcon />
          </div>
          {/* Drawer Navigation For Mobile */}
          <NavigationDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
          {headerIconOptions[router.pathname] ? (
            <IconButton
              sx={{
                order: 1,
                backgroundColor: "transparent",
                fontSize: "24px",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                padding: "4px",
              }}
              onClick={() => router.back()}
              className="md:!hidden"
            >
              <Icon icon={headerIconOptions[router.pathname]} size={24} />
            </IconButton>
          ) : (
            <IconButton
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                order: 1,
                backgroundColor: "transparent",
                fontSize: "24px",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                padding: "4px",
              }}
              onClick={() => setIsOpen(true)}
              className="md:!hidden"
            >
              <FontAwesomeIcon width={24} icon={faBars} />
            </IconButton>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
