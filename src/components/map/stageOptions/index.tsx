import React from "react"

import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import { styled } from "@mui/system"

import CostIcon from "@/components/icon/costIcon"
import LifePointIcon from "@/components/icon/lifePointIcon"

import type { IStageJsonOptions } from "@/models/gamedata/excel/stageTable"

interface StageInfoTableProps {
  stageOptions: IStageJsonOptions
}

const StageOptionsTableRow = styled("div")({
  display: "flex"
})

const StageOptionsTableRowKey = styled("div")({
  display: "inline-block",
  minWidth: "8em",
  padding: "0.75em",
  textAlign: "center",
  width: "25%"
})

const StageOptionsTableRowValue = styled("div")({
  display: "inline-block",
  minWidth: "6em",
  padding: "0.75em",
  width: "75%"
})

class StageOptionsTable extends React.PureComponent<StageInfoTableProps> {
  public render (): React.ReactNode {
    const { stageOptions } = this.props

    return (
      <Paper sx={{ margin: "auto", maxWidth: "100%", width: "max-content" }}>
        <StageOptionsTableRow>
          <StageOptionsTableRowKey >
            初始费用
          </StageOptionsTableRowKey>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <StageOptionsTableRowValue>
            <CostIcon sx={{ marginRight: "0.3em", verticalAlign: "bottom" }} />

            {stageOptions.initialCost}
          </StageOptionsTableRowValue>

        </StageOptionsTableRow>

        <StageOptionsTableRow>
          <StageOptionsTableRowKey>
            费用最大值
          </StageOptionsTableRowKey>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <StageOptionsTableRowValue>
            <CostIcon sx={{ marginRight: "0.3em", verticalAlign: "bottom" }} />

            {stageOptions.maxCost}
          </StageOptionsTableRowValue>

        </StageOptionsTableRow>

        <StageOptionsTableRow>
          <StageOptionsTableRowKey>
            费用回复速度
          </StageOptionsTableRowKey>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <StageOptionsTableRowValue>
            <CostIcon sx={{ marginRight: "0.3em", verticalAlign: "bottom" }} />

            /

            {stageOptions.costIncreaseTime}

            s
          </StageOptionsTableRowValue>

        </StageOptionsTableRow>

        <StageOptionsTableRow>
          <StageOptionsTableRowKey>
            关卡生命值
          </StageOptionsTableRowKey>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <StageOptionsTableRowValue>
            <LifePointIcon sx={{ marginRight: "0.3em", verticalAlign: "bottom" }} />

            {stageOptions.maxLifePoint}
          </StageOptionsTableRowValue>

        </StageOptionsTableRow>

        <StageOptionsTableRow>
          <StageOptionsTableRowKey>
            部署位
          </StageOptionsTableRowKey>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <StageOptionsTableRowValue>
            {stageOptions.characterLimit}
          </StageOptionsTableRowValue>

        </StageOptionsTableRow>

        <StageOptionsTableRow>
          <StageOptionsTableRowKey>
            移速
          </StageOptionsTableRowKey>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <StageOptionsTableRowValue>
            {stageOptions.moveMultiplier}
          </StageOptionsTableRowValue>

        </StageOptionsTableRow>

      </Paper>
    )
  }
}

export default StageOptionsTable
