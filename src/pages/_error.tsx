/* eslint-disable react/jsx-max-depth */
import React from "react"

import type { NextPageContext } from "next"
import Head from "next/head"
import Link from "next/link"

import Page from "@/components/page/page"

import style from "./_error.module.scss"

interface ErrorComponentProps {
  statusCode?: number
  statusMessage?: string
}

// eslint-disable-next-line @typescript-eslint/naming-convention
function ErrorComponent ({ statusCode, statusMessage }: Readonly<ErrorComponentProps>): JSX.Element {
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

      <Link
        href="/"
        passHref
      >
        <div className={style["breathe-mission-star-container"]}>
          <div className={style["breathe-mission-star"]} />

          {(statusCode != null)
            ? `An error ${statusCode} ${statusMessage ?? ""} occurred on server`
            : "An error occurred on client"}

          <p className={style["back-to-home"]}>
            单击以回到首页
          </p>
        </div>
      </Link>

    </Page>
  )
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
ErrorComponent.getInitialProps = ({ res, err }: Readonly<NextPageContext>): ErrorComponentProps => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  const statusMessage = res ? res.statusMessage : ""
  return { statusCode, statusMessage }
}

export default ErrorComponent
