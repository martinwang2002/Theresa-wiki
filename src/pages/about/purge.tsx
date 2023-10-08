import React from "react"

import SendIcon from "@mui/icons-material/Send"
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import InputAdornment from "@mui/material/InputAdornment"
import Snackbar from "@mui/material/Snackbar"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Head from "next/head"
import type { NextRouter } from "next/router"
import { withRouter } from "next/router"

import Page from "@/components/page/page"

import { gtagEvent } from "@/models/utils/gtag"

import type { PurgeResponse } from "@/pages/api/purge"

interface PurgeProps {
  readonly router: NextRouter
}

interface PurgeState {
  disablePurgeSubmit: boolean
  path: string
  snackbarOpen: boolean
  isPurgeSuccess: boolean
  purgeError: string
  resVersion: string
}

const deleteCacheByCacheName = async (cacheName: string): Promise<void> => {
  await caches.open(cacheName).then(async (cache): Promise<void> => {
    await cache.keys().then(async (keys): Promise<void> => {
      await Promise.all(keys.map(async (key): Promise<void> => {
        await cache.delete(key)
      }))
    })
  })
}

class Purge extends React.PureComponent<PurgeProps, PurgeState> {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  public constructor (props: PurgeProps) {
    super(props)
    this.state = {
      disablePurgeSubmit: false,
      isPurgeSuccess: false,
      path: "",
      purgeError: "",
      resVersion: "",
      snackbarOpen: false
    }
  }

  public componentDidMount (): void {
    const { router } = this.props
    if (router.isReady) {
      const pathFromQuery = router.query.path as string | undefined ?? "/"
      this.setState({
        path: pathFromQuery
      })
    }
  }

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  public componentDidUpdate (prevProps: Readonly<PurgeProps>): void {
    const { router } = this.props
    if (!prevProps.router.isReady && router.isReady) {
      const pathFromQuery = router.query.path as string | undefined ?? "/"
      this.setState({
        path: pathFromQuery
      })
    }
  }

  private readonly handlePurgeLocalCache = (): void => {
    this.setState({
      disablePurgeSubmit: true,
      isPurgeSuccess: false,
      purgeError: ""
    })

    deleteCacheByCacheName("next-data").then((): void => {
      this.setState({
        disablePurgeSubmit: false,
        isPurgeSuccess: true,
        snackbarOpen: true
      })
    }).catch((error: Readonly<Error>): void => {
      console.error(error)

      gtagEvent({
        action: "exception",
        category: "purge_cache",
        description: error.message,
        label: "local_cache"
      })

      this.setState({
        disablePurgeSubmit: false,
        isPurgeSuccess: false,
        purgeError: error.message,
        snackbarOpen: true
      })
    })
  }

  private readonly handlePurgeCache = (): void => {
    this.setState({
      disablePurgeSubmit: true
    })

    const { path } = this.state
    // json fetch
    fetch("/api/purge", {
      body: JSON.stringify({
        path
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    }).then(async (response): Promise<void> => {
      if (response.ok) {
        // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
        return response.json().then((data: Readonly<PurgeResponse>): void => {
          const STATUS_OK = 200
          this.setState({
            disablePurgeSubmit: false,
            isPurgeSuccess: data.code === STATUS_OK,
            purgeError: data.error ?? "",
            resVersion: data.data?.resVersion ?? "",
            snackbarOpen: true
          })
          console.log(data)
        })
      }
      this.setState({
        disablePurgeSubmit: false
      })
      throw new Error("Network response was not ok.")
    }).catch((error: Readonly<Error>) => {
      console.error(error)
      this.setState({
        disablePurgeSubmit: false,
        isPurgeSuccess: false,
        purgeError: error.message,
        snackbarOpen: true
      })
    })
  }

  private readonly handleSnackbarClose = (): void => {
    this.setState({
      snackbarOpen: false
    })
  }

  public render (): React.ReactNode {
    const { router } = this.props

    const { disablePurgeSubmit, snackbarOpen, isPurgeSuccess, path, purgeError, resVersion } = this.state
    return (
      <Page>
        <Head>
          <title>
            刷新缓存 | Theresa.wiki
          </title>
        </Head>

        <Stack
          spacing={2}
        >
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  https://theresa.wiki
                </InputAdornment>
              )
            }}
            disabled={!router.isReady}
            label="网页链接"
            onChange={(event): void => {
              this.setState({
                path: event.target.value
              })
            }}
            sx={{ width: "100%" }}
            value={path}
          />

          <Typography>
            浏览器会对网页内容进行缓存。大多数情况下，刷新浏览器缓存可以获得最新页面。
          </Typography>

          <Button
            disabled={disablePurgeSubmit}
            endIcon={<SendIcon />}
            onClick={this.handlePurgeLocalCache}
            variant="contained"
          >
            清除浏览器缓存
          </Button>

          <Divider />

          <Typography>
            为了提升性能，在服务端也会对网页内容进行缓存。如果游戏本体进行了更新，但是网页内容没有更新，那么你可以尝试刷新服务器缓存。请注意，当游戏更新后，数据处理需要一定时间，因此刷新服务器缓存可能不起作用，敬请谅解。
          </Typography>

          <Button
            color="primary"
            disabled={disablePurgeSubmit}
            onClick={this.handlePurgeCache}
            variant="text"
          >
            刷新服务器缓存
          </Button>
        </Stack>

        <Snackbar
          autoHideDuration={1500}
          onClose={this.handleSnackbarClose}
          open={snackbarOpen}
        >
          <Alert
            onClose={this.handleSnackbarClose}
            severity={isPurgeSuccess ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {isPurgeSuccess ? `缓存清除成功。资源版本：${resVersion}` : purgeError}
          </Alert>
        </Snackbar>
      </Page>
    )
  }
}

export default withRouter(Purge)
