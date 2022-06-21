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

        <p style={{ marginTop: "1rem", overflow: "hidden" }}>
          本项目开源。请查看
          <Link
            href="https://github.com/martinwang2002/Theresa-wiki"
          >
            https://github.com/martinwang2002/Theresa-wiki
          </Link>
        </p>

        <p>
          欢迎PR
        </p>

      </Page>
    )
  }
}
