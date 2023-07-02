import React from "react"

import { Global } from "@emotion/react"
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import LinearProgress from "@mui/material/LinearProgress"
import Snackbar from "@mui/material/Snackbar"
import { styled } from "@mui/system"
import Head from "next/head"
import type { NextRouter } from "next/router"
import { withRouter } from "next/router"
import type { Workbox } from "workbox-window"

import Footer from "./footer"
import Header from "./header"

declare global {
  interface Window {
    workbox?: Workbox
  }
}

interface PageProps {
  children: React.ReactNode
  router: NextRouter
}

interface PageState {
  indeterminate: boolean
  progress: number
  showServiceWorkerSnackbar: boolean
  showProgressBar: boolean
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
      progress: 0,
      showProgressBar: false,
      showServiceWorkerSnackbar: false
    }

    // initialize ref
    this.headerRef = React.createRef()

    // prevent this.state undefined error
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this)
  }

  public componentDidMount (): void {
    // this should be called on client side
    this.setState({ showProgressBar: true })
    // register router event listeners
    const { router } = this.props
    router.events.on("routeChangeStart", this.handleStart)
    router.events.on("routeChangeComplete", this.handleStop)
    router.events.on("routeChangeError", this.handleStop)
    this.registerServiceWorker()
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

  public readonly handleTransitionEnd = (): void => {
    const { progress } = this.state
    if (progress === progress100) {
      this.setState({
        progress: 0
      })
    }
  }

  private readonly headerRef: React.RefObject<HTMLDivElement>

  private readonly registerServiceWorker = (): void => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && window.workbox !== undefined) {
      const wb = window.workbox

      // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
      // NOTE: MUST set skipWaiting to false in next.config.js pwa object
      // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
      wb.addEventListener("waiting", () => {
        this.setState({
          showServiceWorkerSnackbar: true
        })
      })
      wb.addEventListener("installed", event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      wb.addEventListener("controlling", event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      wb.addEventListener("activated", event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      wb.addEventListener("message", event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })
      wb.register().catch(error => {
        console.error(error)
      })
    }
  }

  private readonly handleServiceWorkerSnackbarClose = (): void => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && window.workbox !== undefined) {
      const wb = window.workbox

      // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
      // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
      // You may want to customize the UI prompt accordingly.
      wb.addEventListener("controlling", () => {
        window.location.reload()
      })

      // Send a message to the waiting service worker, instructing it to activate.
      wb.messageSkipWaiting()

      this.setState({
        showServiceWorkerSnackbar: false
      })
    }
  }

  public render (): React.ReactNode {
    const { children } = this.props
    const { indeterminate, progress, showServiceWorkerSnackbar, showProgressBar } = this.state
    const { current: headerRefCurrent } = this.headerRef
    const minimumAppBarHeight = 56

    return (
      <PageDiv
        sx={{
          scrollPaddingTop: headerRefCurrent ? headerRefCurrent.clientHeight : minimumAppBarHeight
        }}
      >
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
                fontWeight: 400,
                src: "local(\"Noto Serif SC\"), url(\"/fonts/noto-sans-sc-v26-latin_chinese-simplified-regular.woff2\") format(\"woff2\")"
              }
            }}
          />

          <Global
            styles={{
              "@font-face": {
                fontDisplay: "swap",
                fontFamily: "Roboto Mono",
                fontStyle: "normal",
                fontWeight: 400,
                src: "local(\"Roboto Mono\"), url(\"/fonts/roboto-mono-v21-latin-regular.woff2\") format(\"woff2\")"
              }
            }}
          />

          <Global
            styles={{
              "@font-face": {
                fontDisplay: "swap",
                fontFamily: "Dream Han Serif CN W27",
                fontStyle: "normal",
                fontWeight: 900,
                src: "local(\"Dream Han Serif CN W27\"), url(\"/fonts/DreamHanSerifCN-W27.woff2\") format(\"woff2\")"
              }
            }}
          />
        </Head>

        <PlaceboDiv >
          {!!showProgressBar &&
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

        <Header ref={this.headerRef} />

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
          {/* FIXME */}
          {/* <Alert
            severity="error"
            sx={{ width: "100%" }}
          >
            由于技术原因，解包程序失效了。请等待解包程序更新。()
          </Alert> */}

          {children}
        </Container>

        <Footer />

        <Snackbar
          autoHideDuration={6000}
          open={showServiceWorkerSnackbar}
        >
          <Alert
            action={
              <Button
                color="secondary"
                onClick={this.handleServiceWorkerSnackbarClose}
                size="small"
              >
                闪断
              </Button>
            }
            severity="info"
            sx={{ width: "100%" }}
          >
            闪断更新了，请刷新页面。
          </Alert>
        </Snackbar>
      </PageDiv>
    )
  }
}

export default withRouter(Page)
