// libs
import React from "react"
import Divider from "@mui/material/Divider"

// Components
import Item from "@/components/common/Item"

// models
import type { IStageInfo } from "@/models/gamedata/excel/stageTable"

interface StageInfoTableProps {
  stageInfo: IStageInfo
}

export default class SanityRow extends React.PureComponent<StageInfoTableProps> {
  public render (): React.ReactNode {
    const { stageInfo } = this.props

    return (
      <>
        <span style={{ width: "33%", textAlign: "center" }} >
          <span>
            理智消耗
          </span>

          <span style={{ display: "flex", justifyContent: "center" }}>
            <Item
              count={stageInfo.apCost}
              itemId="AP_GAMEPLAY"
            />
          </span>
        </span>

        <Divider
          flexItem
          orientation="vertical"
          variant="middle"
        />

        <span style={{ width: "33%", textAlign: "center" }} >
          <span>
            理智返还
          </span>

          <span style={{ display: "flex", justifyContent: "center" }}>
            <Item
              count={-stageInfo.apFailReturn}
              itemId="AP_GAMEPLAY"
            />
          </span>
        </span>

        <Divider
          flexItem
          orientation="vertical"
          variant="middle"
        />

        <span style={{ width: "33%", textAlign: "center" }} >
          <span>
            演习消耗
          </span>

          <span style={{ display: "flex", justifyContent: "center" }}>
            <Item
              count={stageInfo.practiceTicketCost}
              itemId={6001}
            />
          </span>
        </span>
      </>
    )
  }
}
