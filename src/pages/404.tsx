import React from "react"

import Head from "next/head"

import Error from "@/components/page/error"
import Page from "@/components/page/page"

function ErrorComponent (): JSX.Element {
  return (
    <Page>
      <Head>
        <title>
          404 Not Found | Theresa.wiki
        </title>
      </Head>

      <Error errorMessage="博士，您的作战记录找不到了呜呜呜" />

    </Page>
  )
}

export default ErrorComponent
