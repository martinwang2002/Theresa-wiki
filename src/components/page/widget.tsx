import React from "react"

import { Global } from "@emotion/react"
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Snackbar from "@mui/material/Snackbar"
import { styled } from "@mui/system"
import Head from "next/head"
import type { Workbox } from "workbox-window"

import Styledlink from "@/components/common/styledLink"
import MissionIcon from "@/components/icon/missionIcon"
declare global {
  interface Window {
    workbox?: Workbox
  }
}

interface WidgetProps {
  children: React.ReactNode
}

interface WidgetState {

  showServiceWorkerSnackbar: boolean
}

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

class PageWidget extends React.PureComponent<WidgetProps, WidgetState> {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  public constructor (props: Readonly<WidgetProps>) {
    super(props)
    this.state = {
      showServiceWorkerSnackbar: false
    }
  }

  public componentDidMount (): void {
    this.registerServiceWorker()
  }

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
    const { showServiceWorkerSnackbar } = this.state
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

        <Styledlink
          href="/"
        >
          <MissionIcon
            sx={{
              color: "primary.main",
              fontSize: "2rem",
              left: "1rem",
              position: "absolute",
              top: "1rem",
              verticalAlign: "middle",
              zIndex: 1000
            }}
          />
        </Styledlink>

        { children }

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

export default PageWidget
