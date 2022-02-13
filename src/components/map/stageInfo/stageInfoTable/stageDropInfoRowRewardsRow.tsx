// libs
import React from "react"

// Components
import Item from "@/components/common/Item"

// models
import type { IDisplayDetailReward } from "@/models/gamedata/excel/stageTable"

// styles
import style from "./stageInfoTable.module.scss"

interface StageInfoTableProps {
  displayDetailRewards: IDisplayDetailReward[]
  info: string
  isSpecial?: boolean
}

const occPercent = {
  0: "固定掉落",
  1: "大概率",
  2: "概率掉落",
  3: "小概率",
  4: "小概率(多物品)"
}

const occPercentSpecial = {
  ...occPercent,
  4: "罕见"
}

export default class StageDropInfoRowRewardsRow extends React.PureComponent<StageInfoTableProps> {
  public render (): React.ReactNode {
    const { displayDetailRewards, info, isSpecial } = this.props

    return (
      <div className={style["stage-dropInfo-row-rewards-row"]}>
        <span className={style["stage-dropInfo-row-rewards-row-info"]}>
          {info}
        </span>

        <div className={style["stage-dropInfo-row-rewards-row-item"]}>
          {
            displayDetailRewards.map((displayDetailReward: Readonly<IDisplayDetailReward>) => {
              let count
              if (isSpecial === true) {
                count = occPercentSpecial[displayDetailReward.occPercent]
              } else {
                count = occPercent[displayDetailReward.occPercent]
              }
              return (
                <Item
                  count={count}
                  itemId={displayDetailReward.id}
                  key={displayDetailReward.id}
                  sx={{
                    whiteSpace: "pre",
                    "& .MuiBadge-badge": {
                      right: "50%",
                      bottom: "0%",
                      fontSize: "0.5em",
                      borderRadius: "8px",
                      height: "16px"
                    }
                  }}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}
