import React from "react"

import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"

import type { ICustomStageInfo } from "@/models/gamedata/excel/stageTable"

import CanPracticeAndCanBattleReplayRow from "./canPracticeAndCanBattleReplayRow"
import { StageInfoTableRow, StageInfoTableRowCell } from "./common"
import SanityRow from "./sanityRow"
import StageDropInfoRow from "./stageDropInfoRow"
import UnlockConditionRow from "./unlockConditionRow"

interface StageInfoTableProps {
  stageInfo: ICustomStageInfo
}

class StageInfoTable extends React.PureComponent<StageInfoTableProps> {
  public render (): React.ReactNode {
    const { stageInfo } = this.props

    return (
      <Paper sx={{ margin: "auto", maxWidth: "100%", width: "max-content" }}>
        <StageInfoTableRow>
          <StageInfoTableRowCell sx={{ width: "25%" }}>
            推荐平均等级
          </StageInfoTableRowCell>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <StageInfoTableRowCell sx={{ width: "75%" }}>
            {stageInfo.dangerLevel}
          </StageInfoTableRowCell>

        </StageInfoTableRow>

        <Divider />

        <StageInfoTableRow>
          <UnlockConditionRow stageInfo={stageInfo} />
        </StageInfoTableRow>

        <Divider />

        <StageInfoTableRow>
          <SanityRow stageInfo={stageInfo} />
        </StageInfoTableRow>

        <Divider />

        <StageInfoTableRow>
          <CanPracticeAndCanBattleReplayRow stageInfo={stageInfo} />
        </StageInfoTableRow>

        <Divider />

        <StageInfoTableRow>
          <StageDropInfoRow stageInfo={stageInfo} />
        </StageInfoTableRow>
      </Paper>
    )
  }
}

export default StageInfoTable
