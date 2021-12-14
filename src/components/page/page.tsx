import React from "react"
import Header from "./header"
import type { NextRouter } from "next/router"
import { withRouter } from "next/router"

import style from "./page.module.scss"

interface PageProps{
  children: React.ReactNode
  router: NextRouter
}

interface PageState {
  indeterminate: boolean
  progress: number
}

class Page extends React.PureComponent<PageProps, PageState> {
  public constructor (props: PageProps | Readonly<PageProps>) {
    super(props)
    this.state = {
      indeterminate: false,
      progress: 0
    }
    // prevent this.state undefined error
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this)
  }

  public componentDidMount (): void {
    // register router event listeners
    const { router } = this.props
    router.events.on("routeChangeStart", () => {
      this.handleStart()
    })
    router.events.on("routeChangeComplete", () => {
      this.handleStop()
    })
    router.events.on("routeChangeError", () => {
      this.handleStop()
    })
  }

  public componentWillUnmount (): void {
    // unregister router event listeners
    const { router } = this.props
    router.events.off("routeChangeStart", () => {
      this.handleStart()
    })
    router.events.off("routeChangeComplete", () => {
      this.handleStop()
    })
    router.events.off("routeChangeError", () => {
      this.handleStop()
    })
  }

  private handleStart (): void {
    this.setState({
      indeterminate: true,
      progress: 80
    })
  }

  private handleStop (): void {
    this.setState({
      indeterminate: false,
      progress: 100
    })
  }

  public handleTransitionEnd (): void {
    const progress100 = 100
    const { progress } = this.state
    if (progress === progress100) {
      this.setState({
        progress: 0
      })
    }
  }

  public render (): React.ReactNode {
    const { children } = this.props
    const { indeterminate, progress } = this.state
    const progress0 = 0
    const opacity0 = 0
    const opacity1 = 1
    return (
      <>
        <div className={style.placebo}>
          <div
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={progress}
            className={style.placebo_bar}
            onTransitionEnd={this.handleTransitionEnd}
            role="progressbar"
            style={{
              width: String(progress) + "%",
              opacity: progress === progress0 ? opacity0 : opacity1
            }}
          />
        </div>

        <Header />

        <main className={!indeterminate ? style.main_container : style.main_container_fadeout}>
          {children}
        </main>
      </>

    )
  }
}

export default withRouter(Page)
