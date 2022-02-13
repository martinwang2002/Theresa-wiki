// FIXME: @next/next/no-document-import-in-page is fixed in 11.1.3-canary.7 https://github.com/vercel/next.js/issues/29021
/* eslint-disable @next/next/no-document-import-in-page */
import React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"
import type { DocumentContext } from "next/document"
import createEmotionServer from "@emotion/server/create-instance"

import createCache from "@emotion/cache"

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
const key = "cache"

interface MyDocumentProps {
  emotionStyleTags: JSX.Element
}

export default class MyDocument extends Document<MyDocumentProps> {
  public render (): JSX.Element {
    const { emotionStyleTags } = this.props
    return (
      <Html>
        <Head>
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

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
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
  const cache = createCache({ key, prepend: true })

  const { extractCriticalToChunks } = createEmotionServer(cache)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/prefer-readonly-parameter-types
      enhanceApp: (App) =>
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/prefer-readonly-parameter-types
        function myEnhanceApp (props) {
          return (
            <App
              // FIXME: emotionCache
              // emotionCache={cache}
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
      // eslint-disable-next-line react/no-danger, @typescript-eslint/naming-convention
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
