import React from "react"

import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import Divider from "@mui/material/Divider"

import { DataTableRowCell } from "@/components/common/dataTable"

import type { IStageInfo } from "@/models/gamedata/excel/stageTable"

interface StageInfoTableProps {
  stageInfo: IStageInfo
}

const canElement = (text: string): JSX.Element => {
  return (
    <>
      <CheckIcon
        htmlColor="#00c853"
        sx={{ verticalAlign: "middle" }}
      />

      <span
        style={{
          verticalAlign: "middle"
        }}
      >
        {text}
      </span>
    </>
  )
}

const notCanElement = (text: string): JSX.Element => {
  return (
    <>
      <CloseIcon
        htmlColor="#d50000"
        sx={{ verticalAlign: "middle" }}
      />

      <span
        style={{
          verticalAlign: "middle"
        }}
      >
        {text}
      </span>
    </>
  )
}

export default class CanPracticeAndCanBattleReplayRow extends React.PureComponent<StageInfoTableProps> {
  public render (): React.ReactNode {
    const { stageInfo } = this.props

    return (
      <>
        <DataTableRowCell sx={{ width: "50%" }}>
          {stageInfo.canPractice
            ? canElement("演习")
            : notCanElement("演习")}
        </DataTableRowCell>

        <Divider
          flexItem
          orientation="vertical"
          variant="middle"
        />

        <DataTableRowCell sx={{ width: "50%" }}>
          {stageInfo.canBattleReplay
            ? canElement("代理指挥")
            : notCanElement("代理指挥")}
        </DataTableRowCell>
      </>
    )
  }
}
