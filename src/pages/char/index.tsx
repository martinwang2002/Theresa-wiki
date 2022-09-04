/* eslint-disable react/react-in-jsx-scope */

import React from "react"

import Head from "next/head"
import { useRouter } from "next/router"

export default function Home (): React.FunctionComponentElement<Record<string, never>> {
  const router = useRouter()
  const { server } = router.query

  return (
    <div className="container">
      <Head>
        <title>
          Create Next App
          {server}
        </title>

        <link
          href="/favicon.ico"
          rel="icon"
        />
      </Head>

      <main>

        <h1 className="title">
          Welcome to
          {" "}

          {server}

          {" "}

        </h1>

        <p className="description">
          Get started by editing
          {" "}

          {server}
        </p>

      </main>
    </div>
  )
}
