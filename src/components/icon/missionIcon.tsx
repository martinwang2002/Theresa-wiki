import React from "react"

import { SvgIcon } from "@mui/material"

import type { IconProps } from "./common"

const defaultMissionIconProps = {
  sx: {
    color: "primary.main"
  }
} as IconProps

export default class MissionIcon extends React.PureComponent<IconProps> {
  private static readonly defaultProps = defaultMissionIconProps

  public render (): React.ReactNode {
    const { sx } = this.props
    return (
      <SvgIcon
        height={128}
        sx={sx}
        viewBox="0 0 128 128"
        width={128}
      >
        <path d="M64,15,20.7,40V90L64,115l43.3-25V40ZM53.34,40.54,60,36.69V29a4,4,0,0,1,8,0v7.69l6.66,3.85a4,4,0,0,1-4,6.92L64,43.62l-6.66,3.84a4,4,0,1,1-4-6.92Zm21.32,25a4,4,0,1,1-4,6.92L64,68.62l-6.66,3.84a4,4,0,1,1-4-6.92L60,61.69V54a4,4,0,0,1,8,0v7.69ZM31.69,53l6.66-3.85V41.5a4,4,0,0,1,8,0v7.69L53,53A4,4,0,0,1,49,60l-6.66-3.84L35.69,60a4,4,0,1,1-4-6.92ZM49,85l-6.66-3.84L35.69,85a4,4,0,1,1-4-6.92l6.66-3.85V66.5a4,4,0,0,1,8,0v7.69L53,78A4,4,0,0,1,49,85ZM76.12,96a4,4,0,0,1-5.46,1.46L64,93.62l-6.66,3.84a4,4,0,1,1-4-6.92L60,86.69V79a4,4,0,0,1,8,0v7.69l6.66,3.85A4,4,0,0,1,76.12,96ZM97.77,83.5A4,4,0,0,1,92.31,85l-6.66-3.84L79,85A4,4,0,1,1,75,78l6.66-3.85V66.5a4,4,0,0,1,8,0v7.69L96.31,78A4,4,0,0,1,97.77,83.5Zm0-25A4,4,0,0,1,92.31,60l-6.66-3.84L79,60A4,4,0,0,1,75,53l6.66-3.85V41.5a4,4,0,0,1,8,0v7.69L96.31,53A4,4,0,0,1,97.77,58.5Z" />
      </SvgIcon>
    )
  }
}
