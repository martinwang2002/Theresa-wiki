import React from "react"

import { Global } from "@emotion/react"
import Container from "@mui/material/Container"
import LinearProgress from "@mui/material/LinearProgress"
import { styled } from "@mui/system"
import Head from "next/head"
import type { NextRouter } from "next/router"
import { withRouter } from "next/router"

import Footer from "./footer"
import Header from "./header"

interface PageProps {
  children: React.ReactNode
  router: NextRouter
}

interface PageState {
  indeterminate: boolean
  progress: number
}

const progress0 = 0
const progress80 = 80
const progress100 = 100

const opacity0 = 0
const opacity025 = 0.25
const opacity1 = 1

const PlaceboDiv = styled("div")({
  backgroundColor: "transparent",
  height: "0.25rem",
  left: 0,
  position: "fixed",
  right: 0,
  top: 0,
  width: "100%",
  zIndex: 1150
})

const PageDiv = styled("div")({
  "&::-webkit-scrollbar": {
    width: 8
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundClip: "content-box",
    backgroundColor: "#12354264",
    borderRadius: "8px"
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#12354296"
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#12354216"
  },
  height: "100vh",
  overflow: "auto"
})

class Page extends React.PureComponent<PageProps, PageState> {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  public constructor (props: Readonly<PageProps>) {
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
    router.events.on("routeChangeStart", this.handleStart)
    router.events.on("routeChangeComplete", this.handleStop)
    router.events.on("routeChangeError", this.handleStop)
  }

  public componentWillUnmount (): void {
    // unregister router event listeners
    const { router } = this.props
    router.events.off("routeChangeStart", this.handleStart)
    router.events.off("routeChangeComplete", this.handleStop)
    router.events.off("routeChangeError", this.handleStop)
  }

  private readonly handleStart = (): void => {
    this.setState({
      indeterminate: true,
      progress: progress80
    })
  }

  private readonly handleStop = (): void => {
    this.setState({
      indeterminate: false,
      progress: progress100
    }, () => {
      this.handleTransitionEnd()
    })
  }

  public handleTransitionEnd (): void {
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
    return (
      <PageDiv>
        <Head>
          <meta charSet="utf-8" />

          <meta
            content="width=device-width, initial-scale=1"
            name="viewport"
          />

          <link
            href="/favicon.svg"
            rel="icon"
            sizes="any"
            type="image/svg+xml"
          />

          <link
            href="/favicon.ico"
            rel="icon"
            sizes="48x48"
            type="image/x-icon"
          />

          <link
            href="/favicon/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />

          <link
            href="/favicon/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />

          <link
            href="/favicon/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />

          <link
            href="/site.webmanifest"
            rel="manifest"
          />

          <Global
            styles={{
              "@font-face": {
                fontDisplay: "swap",
                fontFamily: "Noto Serif SC",
                fontStyle: "normal",
                fontWeight: "400",
                src: "local('Noto Serif SC'), url('/fonts/noto-sans-sc-v26-latin_chinese-simplified-regular.woff2') format('woff2')"
              }
            }}
          />

          <Global
            styles={{
              "@font-face": {
                fontDisplay: "swap",
                fontFamily: "Roboto Mono",
                fontStyle: "normal",
                fontWeight: "400",
                src: "local('Roboto Mono'), url('/fonts/roboto-mono-v21-latin-regular.woff2') format('woff2')"
              }
            }}
          />
        </Head>

        <PlaceboDiv
          suppressHydrationWarning
        >
          {typeof window !== "undefined" &&
            <LinearProgress
              aria-label="Placebo Progress Bar"
              color="secondary"
              onTransitionEnd={this.handleTransitionEnd}
              sx={{
                opacity: progress > progress0 ? opacity1 : opacity0,
                zIndex: 1150
              }}
              value={progress}
              variant="determinate"
            />}
        </PlaceboDiv>

        <Header />

        <Container
          maxWidth="lg"
          sx={{
            "& a": {
              cursor: indeterminate ? "wait" : ""
            },
            cursor: indeterminate ? "wait" : "",
            marginBottom: "1rem",
            marginTop: "1rem",
            minHeight: "calc(100vh - 2rem - 16px - 9rem - 1rem)",
            opacity: indeterminate ? opacity025 : opacity1,
            transition: indeterminate ? "opacity 2s linear" : "",
            userSelect: indeterminate ? "none" : "auto"
          }}
        >
          {children}
        </Container>

        <Footer />
      </PageDiv>
    )
  }
}

export default withRouter(Page)
