import React from "react"
import Header from "./header"

import style from "./page.module.scss"

interface PageProps{
  children: React.ReactNode
}

class Page extends React.PureComponent<PageProps> {
  public render (): React.ReactNode {
    const { children } = this.props
    return (
      <>
        <Header />

        <main className={style["container-lg"]}>
          {children}
        </main>
      </>

    )
  }
}

export default Page
