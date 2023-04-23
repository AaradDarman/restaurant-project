import Link from "next/link";
import { useRouter } from "next/router";

const Navigation = () => {
  const router = useRouter();

  return (
    <nav className="order-3 hidden md:order-2 md:block">
      <ul className="flex">
        <li className="flex">
          <Link
            href="/"
            className={`px-3 py-2 font-bold ${
              router.pathname === "/"
                ? " border-b-solid border-b-2 border-b-accent-400 text-slate-900 dark:text-slate-50"
                : "text-slate-400 hover:text-accent-700"
            }`}
          >
            صفحه اصلی
          </Link>
        </li>
        <li className="flex">
          <Link
            href="/about"
            className={`px-3 py-2 font-bold ${
              router.pathname === "/about"
                ? " border-b-solid border-b-2 border-b-accent-400 text-slate-900 dark:text-slate-50"
                : "text-slate-400 hover:text-accent-700"
            }`}
          >
            درباره ما
          </Link>
        </li>
        <li className="flex">
          <Link
            href="/contact-us"
            className={`px-3 py-2 font-bold ${
              router.pathname === "/contact-us"
                ? " border-b-solid border-b-2 border-b-accent-400 text-slate-900 dark:text-slate-50"
                : "text-slate-400 hover:text-accent-700"
            }`}
          >
            ارتباط با ما
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
