import React from "react"

import createEmotionServer from "@emotion/server/create-instance"
import Document, { Head, Html, Main, NextScript } from "next/document"
import type { DocumentContext, DocumentInitialProps } from "next/document"
import Script from "next/script"

import { publicRuntimeConfig } from "@/configurations/runtimeConfig"

import createEmotionCache from "@/models/createEmotionCache"

const { GTAG_ID } = publicRuntimeConfig

interface MyDocumentProps {
  emotionStyleTags: JSX.Element[]
}

if (process.env.NEXT_MANUAL_SIG_HANDLE != null) {
  process.on("SIGTERM", () => {
    console.log("Received SIGTERM: cleaning up")
    const SIGTERM_EXIT_CODE = 143
    process.exit(SIGTERM_EXIT_CODE)
  })
  process.on("SIGINT", () => {
    console.log("Received SIGINT: cleaning up")
    const SIGINT_EXIT_CODE = 130
    process.exit(SIGINT_EXIT_CODE)
  })
}

// setup emotion cache
// see https://github.com/mui/material-ui/tree/298627c7339d1a5809518b0dbc212fe95c40a4e9/examples/nextjs-with-typescript

export default class MyDocument extends Document<MyDocumentProps> {
  // `getInitialProps` belongs to `_document` (instead of `_app`),
  // it's compatible with static-site generation (SSG).
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  public static readonly getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps & MyDocumentProps> => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

    const originalRenderPage = ctx.renderPage

    // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.
    const cache = createEmotionCache()

    const { extractCriticalToChunks } = createEmotionServer(cache)

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ctx.renderPage = async () =>
      originalRenderPage({
      // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/no-explicit-any
        enhanceApp: (App: any) =>
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/prefer-readonly-parameter-types
          function myEnhanceApp (props) {
            return (
              <App
                emotionCache={cache}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
              />
            )
          }
      })

    const initialProps = await Document.getInitialProps(ctx)
    // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html)
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    const emotionStyleTags = emotionStyles.styles.map((style): JSX.Element => (
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
        data-emotion={`${style.key} ${style.ids.join(" ")}`}
        key={style.key}
      />
    ))

    return {
      ...initialProps,
      emotionStyleTags
    }
  }

  public render (): JSX.Element {
    const { emotionStyleTags } = this.props
    return (
      <Html>
        <Head>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
            strategy="afterInteractive"
          />

          <Script
            id="gtag-init"
            strategy="beforeInteractive"
          >
            {(`window.dataLayer=window.dataLayer||[];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag(
                'config',
                '${GTAG_ID}',
                {
                  ${process.env.NODE_ENV === "development" ? "'debug_mode':true," : ""}
                  'page_path':window.location.pathname,
                  'cookie_prefix':'theresaGa',
                }
              );
              `).replace(/\n\s*/g, "")}
          </Script>

          {/* Inject MUI styles first to match with the prepend: true configuration. */}

          {emotionStyleTags}
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    )
  }
}
