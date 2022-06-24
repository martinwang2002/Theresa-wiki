import React from "react"

import Head from "next/head"

import Page from "@/components/page/page"

export default class Privacy extends React.PureComponent {
  public render (): React.ReactNode {
    return (
      <Page>
        <Head>

          <title>
            关于本站 | Theresa.wiki
          </title>

        </Head>

        <div style={{ marginTop: "1rem", overflow: "hidden" }}>
          在页面底部，有很多连接哦~

          <br />

          摆烂.jpg
        </div>

      </Page>
    )
  }
}
