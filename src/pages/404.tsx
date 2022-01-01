/* eslint-disable react/jsx-max-depth */
import React from "react"
import Head from "next/head"
import Link from "next/link"

import Page from "@/components/page/page"
import style from "./_error.module.scss"

// eslint-disable-next-line @typescript-eslint/naming-convention
function ErrorComponent (): JSX.Element {
  return (
    <Page>
      <Head>
        <title>
          404 Not Found | Theresa.wiki
        </title>
      </Head>

      <Link
        href="/"
        passHref
      >
        <div className={style["breathe-mission-star-container"]}>
          <div className={style["breathe-mission-star"]} />

          博士，您的作战记录找不到了呜呜呜

          <p className={style["back-to-home"]}>
            单击以回到首页
          </p>
        </div>
      </Link>

    </Page>
  )
}

export default ErrorComponent
