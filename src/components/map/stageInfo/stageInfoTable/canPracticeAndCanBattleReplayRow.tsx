import React from "react"

import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import Divider from "@mui/material/Divider"

import type { IStageInfo } from "@/models/gamedata/excel/stageTable"

import { StageInfoTableRowCell } from "./common"

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
        <StageInfoTableRowCell sx={{ width: "50%" }}>
          {stageInfo.canPractice
            ? canElement("演习")
            : notCanElement("演习")}
        </StageInfoTableRowCell>

        <Divider
          flexItem
          orientation="vertical"
          variant="middle"
        />

        <StageInfoTableRowCell sx={{ width: "50%" }}>
          {stageInfo.canBattleReplay
            ? canElement("代理指挥")
            : notCanElement("代理指挥")}
        </StageInfoTableRowCell>
      </>
    )
  }
}
