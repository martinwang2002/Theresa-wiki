import React from "react"

import LinkIcon from "@mui/icons-material/Link"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import Typography from "@mui/material/Typography"
import type { SxProps } from "@mui/system"

import StyledLink from "@/components/common/styledLink"

import { gtagEvent } from "@/models/utils/gtag"

interface HeadingAnchorProps {
  readonly id: string
  readonly text: string
  readonly sx?: SxProps
  // variant: string
}

interface HeadingAnchorState {
  snackbarOpen: boolean
  isCopylinkSuccess: boolean
}

export default class HeadingAnchor extends React.PureComponent<HeadingAnchorProps, HeadingAnchorState> {
  private static readonly defaultProps = {
    sx: {
      marginBottom: "0.5em",
      marginTop: "0.5em"
    }
  }

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  public constructor (props: HeadingAnchorProps) {
    super(props)
    this.state = {
      isCopylinkSuccess: false,
      snackbarOpen: false
    }
  }

  private readonly handleCopyLinkClick = (): void => {
    const url = new URL(window.location.href).toString()
    navigator.clipboard.writeText(url).then(() => {
      gtagEvent({
        action: "click",
        category: "copy_link",
        label: "anchor",
        value: url
      })
      this.setState({
        isCopylinkSuccess: true,
        snackbarOpen: true
      })
    }).catch((err: Readonly<Error>) => {
      console.error(err)
      gtagEvent({
        action: "exception",
        category: "copy_link",
        description: err.message,
        label: "anchor"
      })
      this.setState({
        isCopylinkSuccess: false,
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
    const { text, id, sx } = this.props
    const { snackbarOpen, isCopylinkSuccess } = this.state

    return (
      <>
        <Typography
          id={id}
          sx={{
            "&:hover": {
              // the only anchor element is the LinkIcon
              "& a": {
                opacity: 1
              }
            },
            ...sx
          }}
          variant="h5"
        >
          <StyledLink
            href={`#${id}`}
            onClick={this.handleCopyLinkClick}
            sx={{
              "&:hover": {
                opacity: 1

              },
              cursor: "pointer",
              marginLeft: "-1em",
              opacity: 0,
              verticalAlign: "-10%"
            }}
          >
            <LinkIcon
              sx={{
                rotate: "-45deg"
              }}
            />
          </StyledLink>

          {text}
        </Typography>

        <Snackbar
          autoHideDuration={1500}
          onClose={this.handleSnackbarClose}
          open={snackbarOpen}
        >
          <Alert
            onClose={this.handleSnackbarClose}
            severity={isCopylinkSuccess ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {isCopylinkSuccess ? "链接已复制" : "链接复制失败"}
          </Alert>
        </Snackbar>
      </>
    )
  }
}

export type { HeadingAnchorProps }
