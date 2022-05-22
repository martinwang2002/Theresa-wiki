import React from "react"

import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"

import type { ICustomStageInfo } from "@/models/gamedata/excel/stageTable"

import CanPracticeAndCanBattleReplayRow from "./canPracticeAndCanBattleReplayRow"
import SanityRow from "./sanityRow"
import StageDropInfoRow from "./stageDropInfoRow"
import style from "./stageInfoTable.module.scss"
import UnlockConditionRow from "./unlockConditionRow"

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
