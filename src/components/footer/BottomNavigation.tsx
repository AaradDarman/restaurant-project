import { FC } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import Icon from "components/shared/Icon";

const BottomNavigation: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}: any) => {
  const router = useRouter();

  return (
    <nav className={`${className} z-[2]`}>
      <div className="flex">
        <div className="-ml-[25px] flex flex-1 justify-evenly rounded-tl-[30px] bg-secondary-main">
          <Link
            className={`z-[2] px-3 py-4 ${
              (router.pathname.includes("/[category]") ||
                router.pathname === "/") &&
              "text-accent-600"
            }`}
            href="/"
          >
            <Icon
              icon={`${
                router.pathname.includes("/[category]") ||
                router.pathname === "/"
                  ? "home-filled"
                  : "home"
              }`}
              size={24}
            />
          </Link>
          <Link
            className={`z-[2] px-3 py-4 ${
              router.pathname === "/booking" && "text-accent-600"
            }`}
            // href="/booking"
            href={{}}
          >
            <Icon
              icon={`${
                router.pathname === "/booking" ? "schedule-filled" : "schedule"
              }`}
              size={24}
            />
          </Link>
        </div>
        <div className="box">
          <Link
            // href="/checkout/cart"
            href={{}}
            className="absolute -top-[50px] left-[50%] z-10 -translate-x-[50%] rounded-full bg-accent-main p-2"
          >
            <Icon icon="shopping-bag" size={24} />
          </Link>
        </div>
        <div className="-mr-[25px] flex flex-1 justify-evenly rounded-tr-[30px] bg-secondary-main">
          <Link
            className={`z-[2] px-3 py-4 ${
              router.pathname === "/favorites" && "text-accent-600"
            }`}
            // href="/favorites"
            href={{}}
          >
            <Icon
              icon={`${
                router.pathname === "/favorites" ? "heart-filled" : "heart"
              }`}
              size={24}
            />
          </Link>
          <Link
            className={`z-[2] px-3 py-4 ${
              router.pathname.includes("profile") && "text-accent-600"
            }`}
            // href="/profile/recent-orders"
            href={{}}
          >
            <Icon
              icon={`${
                router.pathname.includes("profile")
                  ? "profile-filled"
                  : "profile"
              }`}
              size={24}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
