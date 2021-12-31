// FIXME: @next/next/no-document-import-in-page is fixed in 11.1.3-canary.7 https://github.com/vercel/next.js/issues/29021
/* eslint-disable @next/next/no-document-import-in-page */
import React from "react"
import Document, { Head, Html, Main, NextScript } from "next/document"
import type { DocumentContext } from "next/document"
import { Stylesheet, resetIds, InjectionMode } from "@fluentui/react"

const stylesheet = Stylesheet.getInstance()

stylesheet.setConfig({
  injectionMode: InjectionMode.none,
  namespace: "server"
})

interface MyDocumentProps {
  styleTags: string
  serializedStylesheet: string
}

export default class MyDocument extends Document<MyDocumentProps> {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
  public static async getInitialProps (ctx: DocumentContext) {
    // Flunet UI reset to make react hydration working
    resetIds()
    stylesheet.reset()

    const { renderPage } = ctx
    // eslint-disable-next-line @typescript-eslint/naming-convention, react/display-name, react/require-optimization, @typescript-eslint/prefer-readonly-parameter-types
    const page = renderPage((App) => function (props): JSX.Element {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <App {...props} />
    })
    return { ...page, styleTags: stylesheet.getRules(true), serializedStylesheet: stylesheet.serialize() }
  }

  public render (): JSX.Element {
    const { styleTags, serializedStylesheet } = this.props
    return (
      <Html>
        <Head>
          <style
            // eslint-disable-next-line react/no-danger, @typescript-eslint/naming-convention
            dangerouslySetInnerHTML={{ __html: styleTags }}
            type="text/css"
          />

          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              // eslint-disable-next-line @typescript-eslint/naming-convention
              __html: `
            window.FabricConfig = window.FabricConfig || {};
            window.FabricConfig.serializedStylesheet = ${serializedStylesheet};
          `
            }}
            type="text/javascript"
          />
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    )
  }
}
