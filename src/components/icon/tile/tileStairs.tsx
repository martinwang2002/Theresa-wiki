import React from "react"

import { SvgIcon } from "@mui/material"

import type { IconProps } from "../common"
import { defaultIconProps } from "../common"

export default class TileStairs extends React.PureComponent<IconProps> {
  private static readonly defaultProps = defaultIconProps

  public render (): React.ReactNode {
    const { sx } = this.props
    return (
      <SvgIcon
        sx={sx}
        viewBox="0 0 1024 1024"
      >
        <path d="m138.52,827.13c-41.3,0-74.52-33.22-74.52-74.52s33.22-74.52,74.52-74.52h145.44l399.52-455.64c14.81-17.06,35.46-25.59,56.11-25.59h145.9c41.3,0,74.52,33.22,74.52,74.52s-33.22,74.52-74.52,74.52h-112.68l-395.48,451.14c-13.92,18.4-35.46,30.08-60.15,30.08h-178.66Z" />
      </SvgIcon>
    )
  }
}
