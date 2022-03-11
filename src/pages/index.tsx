// libs
import Head from "next/head"
import React from "react"
import Link from "next/link"

// Components
import Page from "@/components/page/page"

export default function home (): React.ReactNode {
  return (
    <Page>
      <Head>
        <title>
          Theresa.wiki
        </title>
      </Head>

      <p>
        欢迎来到 Theresa.wiki
      </p>

      <p>
        目前应该只有
        <Link
          href="/map"
        >
          地图
        </Link>
        可以使用
      </p>

      <span>
        注意：该项目由于站长立下了不上线就女装的Flag, 所以就上线了x
      </span>

    </Page>
  )
}
