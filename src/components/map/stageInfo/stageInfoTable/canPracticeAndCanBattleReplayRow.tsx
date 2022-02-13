// libs
import React from "react"
import Divider from "@mui/material/Divider"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"

// models
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
        <span style={{ width: "50%", textAlign: "center" }} >
          {stageInfo.canPractice
            ? canElement("演习")
            : notCanElement("演习")}
        </span>

        <Divider
          flexItem
          orientation="vertical"
          variant="middle"
        />

        <span style={{ width: "50%", textAlign: "center" }} >
          {stageInfo.canBattleReplay
            ? canElement("代理指挥")
            : notCanElement("代理指挥")}
        </span>
      </>
    )
  }
}
