import React from "react"

import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"

import Item from "@/components/common/Item"

import type { IStageInfo } from "@/models/gamedata/excel/stageTable"

import { StageInfoTableRowCell } from "./common"

interface StageInfoTableProps {
  stageInfo: IStageInfo
}

export default class SanityRow extends React.PureComponent<StageInfoTableProps> {
  public render (): React.ReactNode {
    const { stageInfo } = this.props

    return (
      <>
        <StageInfoTableRowCell sx={{ width: "33%" }} >
          <span>
            理智消耗
          </span>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Item
              count={stageInfo.apCost}
              itemId="AP_GAMEPLAY"
            />
          </Box>
        </StageInfoTableRowCell>

        <Divider
          flexItem
          orientation="vertical"
          variant="middle"
        />

        <StageInfoTableRowCell sx={{ width: "33%" }} >
          <span>
            理智返还
          </span>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Item
              count={-stageInfo.apFailReturn}
              itemId="AP_GAMEPLAY"
            />
          </Box>
        </StageInfoTableRowCell>

        <Divider
          flexItem
          orientation="vertical"
          variant="middle"
        />

        <StageInfoTableRowCell sx={{ width: "33%" }} >
          <span>
            演习消耗
          </span>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Item
              count={stageInfo.practiceTicketCost}
              itemId={6001}
            />
          </Box>
        </StageInfoTableRowCell>
      </>
    )
  }
}
