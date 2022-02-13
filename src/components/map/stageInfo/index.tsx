// libs
import React from "react"

// Components
import StageInfoDescription from "./stageInfoDescription"
import StageInfoTable from "./stageInfoTable/index"

// models
import type { ICustomStageInfo } from "@/models/gamedata/excel/stageTable"

interface StageInfoProps{
  stageInfo: ICustomStageInfo
  stageJsonOptions: Record<string, string> | null
}

class StageInfo extends React.PureComponent<StageInfoProps> {
  public render (): React.ReactNode {
    const { stageInfo } = this.props

    // FIXME: eslint
    /* eslint-disable react/jsx-max-depth */
    return (
      <>
        <StageInfoDescription
          description={stageInfo.description}
        />

        <h2 id="stageInfo">
          作战信息
        </h2>

        <StageInfoTable
          stageInfo={stageInfo}
        />

        <a href="#stageInfo">
          stageInfo anchor
        </a>
      </>
    )
  }
}

export default StageInfo
