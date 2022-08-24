import React from "react"

import Head from "next/head"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import Page from "@/components/page/page"

import privacyMarkdown from "PRIVACY.md"

export default class Privacy extends React.PureComponent {
  public render (): React.ReactNode {
    return (

      <Page>
        <Head>

          <title>
            隐私权政策 | Theresa.wiki
          </title>

        </Head>

        <div style={{ overflow: "hidden" }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {privacyMarkdown}
          </ReactMarkdown>
        </div>

      </Page>

    )
  }
}
