import React from "react"

import Typography from "@mui/material/Typography"
import type { SxProps } from "@mui/system"

interface HeadingAnchorProps {
  id: string
  text: string
  sx?: SxProps
  // variant: string
}

export default class HeadingAnchor extends React.PureComponent<HeadingAnchorProps> {
  private static readonly defaultProps = {
    sx: { marginBottom: "0.5em", marginTop: "0.5em" }
  }

  public render (): React.ReactNode {
    const { text, id, sx } = this.props
    return (
      <Typography
        id={id}
        sx={sx}
        variant="h5"
      >
        {text}
      </Typography>
    )
  }
}

export type { HeadingAnchorProps }
