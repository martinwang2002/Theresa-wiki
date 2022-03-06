// libs
import React from "react"
import Head from "next/head"

// components
import Page from "@/components/page/page"

// models
import changelog from "@/models/changelog"

export default class Changelog extends React.PureComponent {
  public render (): React.ReactNode {
    return (
      <Page>
        <Head>
          <title>
            更新日志 | Theresa.wiki
          </title>
        </Head>

        <div style={{ whiteSpace: "break-spaces", overflow: "hidden" }}>
          {JSON.stringify(changelog, undefined, "\t")}
        </div>
      </Page>
    )
  }
}
