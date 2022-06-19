import React from "react"

import { SvgIcon } from "@mui/material"

import type { IconProps } from "./common"
import { defaultIconProps } from "./common"

export default class CostIcon extends React.PureComponent<IconProps> {
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
        <path d="M64,8,8,64l56,56,56-56ZM79.46,87.08Q73.75,91.27,65,91.27q-10.87,0-17.88-7.18t-7-19.62q0-13.15,7-20.44t18.51-7.28q10,0,16.28,5.71a20.75,20.75,0,0,1,5.59,9.71L76.57,54.69a11.08,11.08,0,0,0-4-6.47,11.88,11.88,0,0,0-7.47-2.38,12.63,12.63,0,0,0-9.85,4.21q-3.78,4.22-3.78,13.63,0,10,3.72,14.24a12.29,12.29,0,0,0,9.69,4.25,11.27,11.27,0,0,0,7.56-2.7q3.16-2.7,4.54-8.49l10.69,3.28Q85.19,82.89,79.46,87.08Z" />
      </SvgIcon>
    )
  }
}
