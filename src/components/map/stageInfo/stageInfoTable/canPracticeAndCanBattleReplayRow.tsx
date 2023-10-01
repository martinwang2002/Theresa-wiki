import React from "react"

import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"

import BooleanDescriptor from "@/components/common/booleanDescriptor"
import { DataTableRowCell } from "@/components/common/dataTable"

import type { IStageInfo } from "@/models/gamedata/excel/stageTable"

interface StageInfoTableProps {
  readonly stageInfo: IStageInfo
}

export default class CanPracticeAndCanBattleReplayRow extends React.PureComponent<StageInfoTableProps> {
  public render (): React.ReactNode {
    const { stageInfo } = this.props

    return (
      <>
        <DataTableRowCell sx={{ width: "50%" }}>
          <BooleanDescriptor value={stageInfo.canPractice} />

          <Typography
            component="span"
            sx={{
              verticalAlign: "middle"
            }}
          >
            演习
          </Typography>
        </DataTableRowCell>

        <Divider
          flexItem
          orientation="vertical"
          variant="middle"
        />

        <DataTableRowCell sx={{ width: "50%" }}>
          <BooleanDescriptor value={stageInfo.canBattleReplay} />

          <Typography
            component="span"
            sx={{
              verticalAlign: "middle"
            }}
          >
            代理指挥
          </Typography>
        </DataTableRowCell>
      </>
    )
  }
}
