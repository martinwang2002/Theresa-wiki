import React from "react"
import Head from "next/head"

import Page from "@/components/page/page"

export default class Privacy extends React.PureComponent {
  public render (): React.ReactNode {
    return (
      <Page>
        <Head>

          <title>
            联系站长 | Theresa.wiki
          </title>

        </Head>

        <div style={{ overflow: "hidden", marginTop: "1rem" }}>
          呼哈。

          去企鹅群里找菜马丁~。

          什么？

          你连企鹅群都不知道？
        </div>

      </Page>
    )
  }
}
