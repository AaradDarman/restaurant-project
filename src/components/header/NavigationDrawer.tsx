import React, { FC } from "react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";


const NavigationDrawer: FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  return (
    <div
      className={
        " fixed inset-0 z-10 transform overflow-hidden bg-gray-900 bg-opacity-25 ease-in-out " +
        (isOpen
          ? " translate-x-0 opacity-100 transition-opacity duration-200  "
          : " translate-x-full opacity-0  transition-all delay-150 duration-200  ")
      }
    >
      <section
        className={`${clsx(
          "absolute right-0 h-full w-screen max-w-[200px]",
          "transform  bg-primary-800 transition-all duration-300 ease-in-out"
        )} ${isOpen ? "translate-x-0 " : "translate-x-full"}`}
      >
        <article className="relative flex h-full w-screen max-w-[200px] flex-col space-y-6 pb-10">
          <header className="flex justify-end p-2 text-lg font-bold">
            <button className="flex h-8 w-8 items-center justify-center">
              <FontAwesomeIcon
                fixedWidth
                size="lg"
                icon={faXmark}
                onClick={onClose}
              />
            </button>
          </header>
          <nav>
            <ul className="flex flex-col">
              <li className="flex flex-1">
                <Link
                  href="/"
                  onClick={onClose}
                  className={`w-full px-8 py-2 font-bold ${
                    router.pathname === "/"
                      ? "bg-gray-500 text-slate-900 dark:bg-primary-900 dark:text-slate-50"
                      : "text-slate-400"
                  }`}
                >
                  صفحه اصلی
                </Link>
              </li>
              <li className="flex flex-1">
                <Link
                  href="/about"
                  onClick={onClose}
                  className={`w-full px-8 py-2 font-bold ${
                    router.pathname === "/about"
                      ? "bg-gray-500 text-slate-900 dark:bg-primary-900 dark:text-slate-50"
                      : "text-slate-400"
                  }`}
                >
                  درباره ما
                </Link>
              </li>
              <li className="flex flex-1">
                <Link
                  href="/contact-us"
                  onClick={onClose}
                  className={`w-full px-8 py-2 font-bold ${
                    router.pathname === "/contact-us"
                      ? "bg-gray-500 text-slate-900 dark:bg-primary-900 dark:text-slate-50"
                      : "text-slate-400"
                  }`}
                >
                  ارتباط با ما
                </Link>
              </li>
            </ul>
          </nav>
          <div className="!mt-auto flex justify-center px-8 py-2">
            <Link
              href="/auth"
              onClick={onClose}
              className={clsx(
                "rounded-full bg-accent-600 px-4 py-2 text-white",
                "transition-colors ease-in-out hover:bg-accent-900 hover:text-white"
              )}
            >
              ورود/ثبت نام
            </Link>
          </div>
        </article>
      </section>
      <section
        className=" h-full w-screen cursor-pointer "
        onClick={onClose}
      ></section>
    </div>
  );
};

export default NavigationDrawer;
