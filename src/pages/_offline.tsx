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

      <Error errorMessage="无法与泰拉进行神经网络连接" />

    </Page>
  )
}

export default ErrorComponent
