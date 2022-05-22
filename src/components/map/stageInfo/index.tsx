import React from "react"

import type { ICustomStageInfo } from "@/models/gamedata/excel/stageTable"

import StageInfoTable from "./stageInfoTable/index"

interface StageInfoProps{
  stageInfo: ICustomStageInfo
  stageJsonOptions: Record<string, string> | null
}

class StageInfo extends React.PureComponent<StageInfoProps> {
  public render (): React.ReactNode {
    const { stageInfo } = this.props

    return (
      <StageInfoTable
        stageInfo={stageInfo}
      />
    )
  }
}

export default StageInfo
