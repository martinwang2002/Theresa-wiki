import React from "react"

import { isEmpty } from "lodash"

import { DataTableRowCell } from "@/components/common/dataTable"

import type { IDisplayDetailReward, IStageInfo } from "@/models/gamedata/excel/stageTable"
import { DropType } from "@/models/gamedata/excel/stageTable.common"

import StageDropInfoRowRewardsRow from "./stageDropInfoRowRewardsRow"

interface StageInfoTableProps {
  readonly stageInfo: IStageInfo
}

// const numberReg = /^[0-9]+$/

// Does not represent Arknights Sort Algorithm
// const sortItem = (displayDetailRewardA: Readonly<IDisplayDetailReward>, displayDetailRewardB: Readonly<IDisplayDetailReward>): number => {
//   return Number(numberReg.exec(displayDetailRewardA.id)) - Number(numberReg.exec(displayDetailRewardB.id))
// }

export default class StageDropInfoRow extends React.PureComponent<StageInfoTableProps> {
  public render (): React.ReactNode {
    const { stageInfo } = this.props
    const { displayDetailRewards } = stageInfo.stageDropInfo

    const diamondRewards = displayDetailRewards.filter((displayDetailReward: Readonly<IDisplayDetailReward>) => {
      return displayDetailReward.dropType === DropType.diamond
    })

    const firstPassRewards = displayDetailRewards.filter((displayDetailReward: Readonly<IDisplayDetailReward>) => {
      return displayDetailReward.dropType === DropType.firstPass
    })

    const normalRewards = displayDetailRewards.filter((displayDetailReward: Readonly<IDisplayDetailReward>) => {
      return displayDetailReward.dropType === DropType.normal
    })

    const specialRewards = displayDetailRewards.filter((displayDetailReward: Readonly<IDisplayDetailReward>) => {
      return displayDetailReward.dropType === DropType.special
    })

    const extraRewards = displayDetailRewards.filter((displayDetailReward: Readonly<IDisplayDetailReward>) => {
      return displayDetailReward.dropType === DropType.extra
    })

    return (
      <DataTableRowCell sx={{ width: "100%" }}>
        {!isEmpty([...diamondRewards, ...firstPassRewards]) &&
          <StageDropInfoRowRewardsRow
            displayDetailRewards={[...diamondRewards, ...firstPassRewards]}
            info="首次掉落"
          />}

        {!isEmpty(normalRewards) &&
          <StageDropInfoRowRewardsRow
            displayDetailRewards={normalRewards}
            info="常规掉落"
          />}

        {!isEmpty(specialRewards) &&
          <StageDropInfoRowRewardsRow
            displayDetailRewards={specialRewards}
            info="特殊掉落"
            isSpecial
          />}

        {!isEmpty(extraRewards) &&
          <StageDropInfoRowRewardsRow
            displayDetailRewards={extraRewards}
            info="额外物资"
          />}
      </DataTableRowCell>
    )
  }
}
