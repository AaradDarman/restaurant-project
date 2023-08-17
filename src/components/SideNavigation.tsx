import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import Icon from "./shared/Icon";
import clsx from "clsx";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import useBreakpoints from "hooks/useBreakPoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { resetUser } from "redux/slices/user";
import { isEmpty } from "lodash";

const activeStyle = `active text-accent-600 after:h-[24px] after:absolute
 after:left-0 after:mr-2 after:block after:w-[6px] after:rounded-r-[6px]
 after:bg-accent-500 after:content-['']`;

const navigationList = [
  { title: "صفحه اصلی", href: "/", icon: "home" },
  {
    title: "رزرو میز",
    href: "/booking",
    icon: "schedule",
  },
  {
    title: "سبد خرید",
    href: "/checkout/cart",
    icon: "shopping-bag",
  },
  {
    title: "پسندیده ها",
    href: "/favorites",
    icon: "heart",
  },
  {
    title: "پروفایل",
    href: "/profile/recent-orders",
    icon: "profile",
    children: [
      {
        title: "سفارش های اخیر",
        href: "/profile/recent-orders",
      },
      {
        title: "اطلاعات حساب کاربری",
        href: "/profile/account-info",
      },
    ],
  },
];

const NavItem = ({ item, className }: any) => {
  const router = useRouter();
  const { cart } = useSelector((state: RootState) => state);
  const { isLg } = useBreakpoints();
  let categoryPath = router.pathname.includes("/[category]");
  const indexRouteCondition =
    (router.pathname === "/" || categoryPath) && item.title === "صفحه اصلی";

  const cartRouteCondition =
    router.pathname.includes("checkout") && item.title === "سبد خرید";

  const profileRouteCondition =
    router.pathname.includes("profile") && item.title === "پروفایل" && !isLg;

  return (
    <Link
      key={item.title}
      className={clsx(
        cartRouteCondition
          ? activeStyle
          : indexRouteCondition
          ? activeStyle
          : profileRouteCondition
          ? activeStyle
          : router.pathname.includes(item.href) &&
            item.href != "/" &&
            activeStyle,
        className,
        `relative flex items-center rounded-xl`,
        `[&:not(.active)]:hover:bg-primary-main/20`
      )}
      href={item.href}
    >
      {item.icon && item.title === "سبد خرید" ? (
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          variant={isLg ? "standard" : "dot"}
          invisible={item.title != "سبد خرید"}
          badgeContent={item.title === "سبد خرید" && isLg && cart?.itemsCount}
          color="error"
        >
          <Icon
            icon={`${item.icon}${
              cartRouteCondition
                ? "-filled"
                : profileRouteCondition
                ? "-filled"
                : indexRouteCondition
                ? "-filled"
                : router.pathname === item.href
                ? "-filled"
                : ""
            }`}
            size={24}
            className="ml-2"
          />
        </Badge>
      ) : (
        <Icon
          icon={`${item.icon}${
            cartRouteCondition
              ? "-filled"
              : profileRouteCondition
              ? "-filled"
              : indexRouteCondition
              ? "-filled"
              : router.pathname === item.href
              ? "-filled"
              : ""
          }`}
          size={24}
          className="ml-2"
        />
      )}
      <span className="hidden whitespace-nowrap lg:inline-block">
        {item.title}
      </span>
    </Link>
  );
};

const SideNavigation: FC<{ className: string }> = ({ className }) => {
  const { isLg } = useBreakpoints();
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: RootState) => state);

  const logout = async () => {
    try {
      await axios.get("/api/auth/logout");
      dispatch(resetUser());
      router.replace("/auth?returnUrl=/&forceLogout=true");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <aside
      className={`${className} z-[2] flex-col bg-secondary-main text-[14px] lg:w-[180px]`}
    >
      {navigationList.map((item) =>
        item.children && isLg ? (
          <Accordion
            key={item.title}
            sx={{
              "&": {
                background: "transparent",
                boxShadow: "none",
              },
              "& .MuiAccordionSummary-root , .MuiAccordionSummary-root.Mui-expanded":
                {
                  padding: "16px 12px",
                  minHeight: 0,
                },
              "& .MuiAccordionSummary-content": {
                margin: 0,
              },
              "& .MuiAccordionSummary-content.Mui-expanded": {
                margin: 0,
                minHeight: 0,
              },
            }}
          >
            <AccordionSummary
              key={item.title}
              expandIcon={<FontAwesomeIcon icon={faChevronUp} />}
              className={clsx(
                `relative !my-2 flex items-center !rounded-xl !py-2`,
                `[&:not(.active)]:hover:bg-primary-main/20`
              )}
            >
              <Icon icon={item.icon} size={24} />
              <span className="mr-2">{item.title}</span>
            </AccordionSummary>
            <AccordionDetails
              className="before:bg-pr imary-main relative
               before:absolute before:right-4 before:block
             before:h-[calc(100%_-_24px)] before:w-[1px] before:content-['']"
            >
              {item.children.map((child) => (
                <NavItem
                  key={child.title}
                  item={child}
                  className="child my-2 px-1 py-2"
                />
              ))}
            </AccordionDetails>
          </Accordion>
        ) : (
          <NavItem key={item.title} item={item} className="my-2 px-3 py-2" />
        )
      )}
      {isEmpty(user.user) ? null : (
        <Button
          variant="text"
          sx={{
            color: "text.primary",
            "& .MuiButton-startIcon": {
              margin: 0,
            },
          }}
          className={clsx(
            `relative !my-2 !mt-auto flex items-center !justify-start rounded-xl !px-3 !py-2`,
            `[&:not(.active)]:hover:bg-primary-main/20`
          )}
          onClick={logout}
          startIcon={
            <Icon className="icon !ml-2 !mr-0" icon="logout" size={22} />
          }
        >
          <span className="leading-[21px]">خروج</span>
        </Button>
      )}
    </aside>
  );
};

export default SideNavigation;
