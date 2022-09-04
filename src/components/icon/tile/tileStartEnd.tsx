import React from "react"

import { SvgIcon } from "@mui/material"

import type { IconProps } from "../common"
import { defaultIconProps } from "../common"

export default class TileStartEnd extends React.PureComponent<IconProps> {
  private static readonly defaultProps = defaultIconProps

  public render (): React.ReactNode {
    const { sx } = this.props
    return (
      <SvgIcon
        sx={sx}
        viewBox="0 0 128 128"
      >
        <path d="M31.55,31.67,10.33,10.45l2.12-2.12L33.67,29.55ZM128,0H0V128H128ZM2.93,2.93H125.07V125.07H2.93Zm28.62,91.4L10.33,115.55l2.12,2.12L33.67,96.45Zm84-84L94.33,31.55l2.12,2.12,21.22-21.22Zm2.12,105.22L96.45,94.33l-2.12,2.12,21.22,21.22ZM64,37,33.69,89.5H94.31Zm0,6L89.12,86.5H38.89Zm2.5,8h-5V77h5Zm0,27.5h-5v5h5Z" />
      </SvgIcon>
    )
  }
}
