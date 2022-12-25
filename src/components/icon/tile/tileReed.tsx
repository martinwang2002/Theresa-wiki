import React from "react"

import { SvgIcon } from "@mui/material"

import type { IconProps } from "../common"
import { defaultIconProps } from "../common"

export default class TileReed extends React.PureComponent<IconProps> {
  private static readonly defaultProps = defaultIconProps

  public render (): React.ReactNode {
    const { sx } = this.props
    return (
      <SvgIcon
        sx={sx}
        viewBox="0 0 1024 1024"
      >
        <path
          d="m128,1024c55.42-108.52,295.39-484.75,432-640,65.51-74.45,208.5-147.5,293.5-147.5l-137.5,298.5c-74,0-296.55,40.37-417,227-91,141-128,186-160,262h-11Z"
          style={{
            fill: "#7b7a5b",
            stroke: "#736b4b",
            strokeMiterlimit: 10,
            strokeWidth: 10
          }}
        />
      </SvgIcon>
    )
  }
}
