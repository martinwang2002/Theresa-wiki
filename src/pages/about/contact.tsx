import React from "react"

import Head from "next/head"
import Script from "next/script"

import Page from "@/components/page/page"

import { publicRuntimeConfig } from "@/configurations/runtimeConfig"

const { CRISP_WEBSITE_ID } = publicRuntimeConfig

export default class Contact extends React.PureComponent {
  public render (): React.ReactNode {
    return (
      <Page>
        <Script
          dangerouslySetInnerHTML={{
            // eslint-disable-next-line @typescript-eslint/naming-convention
            __html: `
              window.$crisp=[]
              window.CRISP_WEBSITE_ID="${CRISP_WEBSITE_ID}"
              window.$crisp.push(['do', 'chat:open'])
            `
          }}
          id="crisp"
          strategy="afterInteractive"
        />

        <Script
          src="https://client.crisp.chat/l.js"
          strategy="afterInteractive"
        />

        <Head>

          <title>
            联系站长 | Theresa.wiki
          </title>

        </Head>

        <div style={{ marginTop: "1rem", overflow: "hidden" }}>
          呼哈。您可以使用crisp对话框。

          <br />

          也可以去企鹅群里找菜马丁~。

          <br />

          什么？你连企鹅群都不知道？(https://penguin-stats.io/)
        </div>

      </Page>
    )
  }
}
