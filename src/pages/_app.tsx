import { ReactElement, ReactNode, useEffect } from "react";
import type { AppProps } from "next/app";

import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { ThemeProvider } from "next-themes";
import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useRouter } from "next/router";

import RTL from "components/RTL";
import store from "redux/store";
import MainLayout from "components/layout/MainLayout";
import { muiTheme } from "styles/themes/mui-theme";
import createEmotionCache from "utils/createEmotionCache";
import "styles/globals.css";
import { NextPage } from "next";

const clientSideEmotionCache = createEmotionCache();

NProgress.configure({ showSpinner: false });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout & any) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  const router = useRouter();

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={muiTheme}>
          <ThemeProvider
            defaultTheme="dark"
            enableSystem={false}
            attribute="class"
          >
            <RTL>
              <Provider store={store}>
                <ToastContainer theme="dark" />
                <CssBaseline />
                <MainLayout>
                  {getLayout(<Component {...pageProps} />)}
                </MainLayout>
              </Provider>
            </RTL>
          </ThemeProvider>
        </MuiThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
}

export default App;
