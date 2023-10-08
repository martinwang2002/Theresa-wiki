import React from "react"

import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"

import { DataTableRow, DataTableRowCell } from "@/components/common/dataTable"

import type { ICustomStageInfo } from "@/models/gamedata/excel/stageTable"

import CanPracticeAndCanBattleReplayRow from "./canPracticeAndCanBattleReplayRow"
import SanityRow from "./sanityRow"
import StageDropInfoRow from "./stageDropInfoRow"
import UnlockConditionRow from "./unlockConditionRow"

interface StageInfoTableProps {
  readonly stageInfo: ICustomStageInfo
}

class StageInfoTable extends React.PureComponent<StageInfoTableProps> {
  public render (): React.ReactNode {
    const { stageInfo } = this.props

    return (
      <Paper sx={{ margin: "auto", maxWidth: "100%", width: "max-content" }}>
        <DataTableRow>
          <DataTableRowCell sx={{ width: "25%" }}>
            推荐平均等级
          </DataTableRowCell>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <DataTableRowCell sx={{ width: "75%" }}>
            {stageInfo.dangerLevel}
          </DataTableRowCell>

        </DataTableRow>

        <Divider />

        <DataTableRow>
          <UnlockConditionRow stageInfo={stageInfo} />
        </DataTableRow>

        <Divider />

        <DataTableRow sx={{ flexWrap: "wrap" }}>
          <SanityRow stageInfo={stageInfo} />
        </DataTableRow>

        <Divider />

        <DataTableRow>
          <CanPracticeAndCanBattleReplayRow stageInfo={stageInfo} />
        </DataTableRow>

        <Divider />

        <DataTableRow>
          <StageDropInfoRow stageInfo={stageInfo} />
        </DataTableRow>
      </Paper>
    )
  }
}

export default StageInfoTable
