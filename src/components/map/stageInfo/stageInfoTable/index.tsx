// libs
import React from "react"
import Paper from "@mui/material/Paper"
import Divider from "@mui/material/Divider"

// Components
import SanityRow from "./sanityRow"
import UnlockConditionRow from "./unlockConditionRow"
import CanPracticeAndCanBattleReplayRow from "./canPracticeAndCanBattleReplayRow"
import StageDropInfoRow from "./stageDropInfoRow"

// models
import type { ICustomStageInfo } from "@/models/gamedata/excel/stageTable"

// styles
import style from "./stageInfoTable.module.scss"

interface StageInfoTableProps {
  stageInfo: ICustomStageInfo
}

class StageInfoTable extends React.PureComponent<StageInfoTableProps> {
  public render (): React.ReactNode {
    const { stageInfo } = this.props

    return (
      <Paper sx={{ width: "max-content", margin: "auto", maxWidth: "100%" }}>
        <div className={style.stageInfoRow}>
          <span style={{ width: "25%", textAlign: "center", minWidth: "6em" }} >
            推荐平均等级
          </span>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <span style={{ width: "75%" }} >
            {stageInfo.dangerLevel}
          </span>

        </div>

        <Divider />

        <div className={style.stageInfoRow}>
          <UnlockConditionRow stageInfo={stageInfo} />
        </div>

        <Divider />

        <div className={style.stageInfoRow}>
          <SanityRow stageInfo={stageInfo} />
        </div>

        <Divider />

        <div className={style.stageInfoRow}>
          <CanPracticeAndCanBattleReplayRow stageInfo={stageInfo} />
        </div>

        <Divider />

        <div className={style.stageInfoRow}>
          <StageDropInfoRow stageInfo={stageInfo} />
        </div>
      </Paper>
    )
  }
}

export default StageInfoTable
