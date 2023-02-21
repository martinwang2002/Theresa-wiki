import React, { useEffect } from "react"

import type { NextPageContext } from "next"
import Head from "next/head"

import Error from "@/components/page/error"
import Page from "@/components/page/page"

import { gtagEvent } from "@/models/utils/gtag"
import { sendMessage } from "@/models/utils/messenger"

interface ErrorComponentProps {
  err: string | undefined
  statusCode?: number
  statusMessage?: string
}

function ErrorComponent ({ statusCode, statusMessage, err }: Readonly<ErrorComponentProps>): JSX.Element {
  useEffect(() => {
    sendMessage(window.parent, "*", { reason: "internalServerError", type: "error" }).catch(console.warn)
    gtagEvent({
      action: "exception",
      category: "error",
      description: statusMessage,
      fatal: true,
      label: "error"
    })
  }, [statusMessage])

  return (
    <Page>
      <Head>
        <title>
          {statusCode}

          {statusMessage}

          {" "}
          | Theresa.wiki
        </title>
      </Head>

      <Error
        errorMessage={(statusCode != null)
          ? `An error ${statusCode} ${statusMessage ?? ""} occurred on server`
          : err !== undefined ? err : "An error occurred on client"}
      />

    </Page>
  )
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
ErrorComponent.getInitialProps = ({ asPath, err, res }: Readonly<NextPageContext>): ErrorComponentProps => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  const statusMessage = res ? res.statusMessage : ""

  console.error("Error for path: ", asPath, " statusCode: ", statusCode, " statusMessage: ", statusMessage, " err: ", err)

  return { err: err?.name, statusCode, statusMessage }
}

export default ErrorComponent
