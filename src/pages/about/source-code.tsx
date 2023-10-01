import React from "react"

import Head from "next/head"

import StyledLink from "@/components/common/styledLink"
import Page from "@/components/page/page"

export default function SourceCode (): React.ReactNode {
  return (
    <Page>
      <Head>

        <title>
          源代码 | Theresa.wiki
        </title>

      </Head>

      <p style={{ marginTop: "1rem", overflow: "hidden" }}>
        本项目前端部分开源。请查看
        <StyledLink
          href="https://github.com/martinwang2002/Theresa-wiki"
        >
          https://github.com/martinwang2002/Theresa-wiki
        </StyledLink>
      </p>

      <p>
        欢迎PR，一起表演杂技。~@~!
      </p>

    </Page>
  )
}
