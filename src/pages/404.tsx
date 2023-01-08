import React, { useEffect } from "react"

import Head from "next/head"

import Error from "@/components/page/error"
import Page from "@/components/page/page"

import { sendMessage } from "@/models/utils/messenger"

function ErrorComponent (): JSX.Element {
  useEffect(() => {
    sendMessage(window.parent, "*", { reason: "notFound", type: "error" }).catch(console.warn)
  }, [])

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
