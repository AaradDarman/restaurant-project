import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "utils/createEmotionCache";

interface DocumentProps extends DocumentInitialProps {
  emotionStyleTags: React.ReactNode[];
}

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<any> {
    const initialProps = await Document.getInitialProps(ctx);
    // locale is in ctx.locale

    return { ...initialProps, locale: ctx?.locale || "es" };
  }

  render = () => (
    <Html dir={"rtl"}>
      <Head>
        {this.props?.emotionStyleTags ?? null}
        {/* <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="assets/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="assets/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="assets/favicon-16x16.png"
        />
        <link rel="manifest" href="assets/site.webmanifest" />
        <link
          rel="mask-icon"
          href="assets/safari-pinned-tab.svg"
          color="#D6663C"
        /> */}
        <meta name="msapplication-TileColor" content="#010101" />
      </Head>
      <body style={{ direction: "rtl" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<DocumentProps> => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props: any) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};

export default MyDocument;
