import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";

import AuthContext from "context/AuthContext";
import { useAuthContext } from "context/auth-context";
import NoSSRWraper from "components/NoSSRWraper";
import { resetUser } from "redux/slices/user";
import { IRootState } from "interfaces/redux-states.interfaces";
import LoginSection from "components/auth/LoginSection";
import OtpSection from "components/auth/OtpSection";
import { resetLocalCart } from "redux/slices/cart";

const Auth = () => {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: IRootState) => state);
  const { authState } = useAuthContext();

  useEffect(() => {
    if (user?.user && router.query.forceLogout) {
      dispatch(resetUser());
      dispatch(resetLocalCart());
    } else if (user?.user) {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardVariants: Variants = {
    offscreen: {
      scale: 0.8,
      opacity: 0,
      transition: {
        type: "keyframes",
      },
    },
    onscreen: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
      },
    },
  };

  return (
    <div className="relative mb-[56px] flex flex-1 flex-col items-center justify-center px-6 md:px-8 ">
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_SITE_NAME} | ورود | ثبت نام`}</title>
      </Head>
      <AnimatePresence mode="popLayout">
        {authState === "login" ? (
          <motion.div
            layout
            variants={cardVariants}
            initial="offscreen"
            animate="onscreen"
            exit="offscreen"
            key="login"
          >
            <LoginSection />
          </motion.div>
        ) : (
          <motion.div
            layout
            variants={cardVariants}
            initial="offscreen"
            animate="onscreen"
            exit="offscreen"
            key="otp"
          >
            <OtpSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Auth.getLayout = function getLayout(page: JSX.Element) {
  return (
    <AuthContext>
      <NoSSRWraper>{page}</NoSSRWraper>
    </AuthContext>
  );
};

export default Auth;
