import React from "react"

import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

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

      <div style={{ textAlign: "center" }}>
        <Image
          alt="Theresa"
          height={512}
          src="/theresa.webp"
          unoptimized
          width={512}
        />
      </div>
    </Page>
  )
}
