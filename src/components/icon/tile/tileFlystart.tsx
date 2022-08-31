import React from "react"

import { SvgIcon } from "@mui/material"

import type { IconProps } from "../common"
import { defaultIconProps } from "../common"

export default class TileFlystart extends React.PureComponent<IconProps> {
  private static readonly defaultProps = defaultIconProps

  public render (): React.ReactNode {
    const { sx } = this.props
    return (
      <SvgIcon
        sx={sx}
        viewBox="0 0 128 128"
      >
        <path d="M36,36,64,52.69,92,36,75.31,64,92,92,64,75.31,36,92,52.69,64Zm5.3,14.57-1-2.82a12.49,12.49,0,1,1,7.48-7.48l2.82,1a15.49,15.49,0,1,0-9.27,9.27ZM107.5,92A15.51,15.51,0,0,0,92,76.5a15.22,15.22,0,0,0-5.3.94l1,2.81a12.49,12.49,0,1,1-7.48,7.48l-2.81-1A15.22,15.22,0,0,0,76.5,92a15.5,15.5,0,0,0,31,0Zm-56,0a15.45,15.45,0,0,0-.93-5.3l-2.82,1a12.49,12.49,0,1,1-7.48-7.48l1-2.81A15.22,15.22,0,0,0,36,76.5,15.5,15.5,0,1,0,51.5,92Zm56-56a15.5,15.5,0,0,0-31,0,15.22,15.22,0,0,0,.94,5.3l2.81-1a12.49,12.49,0,1,1,7.48,7.48l-1,2.82A15.51,15.51,0,0,0,107.5,36ZM18,6H6V18H18Zm0,104H6v12H18Zm104,0H110v12h12ZM122,6H110V18h12Z" />
      </SvgIcon>
    )
  }
}
