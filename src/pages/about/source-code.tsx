import React from "react"

import Head from "next/head"
import Link from "next/link"

import Page from "@/components/page/page"

export default class Privacy extends React.PureComponent {
  public render (): React.ReactNode {
    return (
      <Page>
        <Head>

          <title>
            源代码 | Theresa.wiki
          </title>

        </Head>

        <div style={{ overflow: "hidden", marginTop: "1rem" }}>
          本项目开源。请查看
          <Link
            href="/about/contact"
          >
            联系站长
          </Link>
        </div>

      </Page>
    )
  }
}
