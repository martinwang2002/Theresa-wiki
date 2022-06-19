import React from "react"

import { SvgIcon } from "@mui/material"

import type { IconProps } from "./common"
import { defaultIconProps } from "./common"

export default class LifePointIcon extends React.PureComponent<IconProps> {
  private static readonly defaultProps = defaultIconProps

  public render (): React.ReactNode {
    const { sx } = this.props
    return (
      <SvgIcon
        height={128}
        sx={sx}
        viewBox="0 0 128 128"
        width={128}
      >
        <path d="M48,42H80V70H94v5H86v5l14,26v7H28v-7L42,80V75H34V70H48Z" />

        <path d="M37,15V25a16,16,0,0,0,9,13H82a16.69,16.69,0,0,0,6-5,19.47,19.47,0,0,0,3-8V15H80a13.51,13.51,0,0,1-3,9,10.48,10.48,0,0,1-1,1H73V15H55V25H52a10.48,10.48,0,0,1-1-1,13.51,13.51,0,0,1-3-9Z" />

        <g fill="#3fa9f5">
          <path d="M28,70v5h7v4L20,106v7H10v-5L25,79V75H18V70Z" />

          <path d="M102,70v5H95v4l15,27v7h10v-5L105,79V75h7V70Z" />

          <path d="M20,14H30V25a17.59,17.59,0,0,0,4,10,17.35,17.35,0,0,0,7,5q-1,15-2,30H30l2-30a20.58,20.58,0,0,1-7-5,20.87,20.87,0,0,1-5-10Z" />

          <path d="M109,14H99V25a17.59,17.59,0,0,1-4,10,17.35,17.35,0,0,1-7,5q1,15,2,30h9L97,40a20.58,20.58,0,0,0,7-5,20.87,20.87,0,0,0,5-10Z" />
        </g>

        {" "}

      </SvgIcon>
    )
  }
}
