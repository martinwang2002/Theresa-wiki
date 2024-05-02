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

    const completeRewards = displayDetailRewards.filter((displayDetailReward: Readonly<IDisplayDetailReward>) => {
      return displayDetailReward.dropType === DropType.complete
    })

    const onceRewards = displayDetailRewards.filter((displayDetailReward: Readonly<IDisplayDetailReward>) => {
      return displayDetailReward.dropType === DropType.once
    })

    const normalRewards = displayDetailRewards.filter((displayDetailReward: Readonly<IDisplayDetailReward>) => {
      return displayDetailReward.dropType === DropType.normal
    })

    const specialRewards = displayDetailRewards.filter((displayDetailReward: Readonly<IDisplayDetailReward>) => {
      return displayDetailReward.dropType === DropType.special
    })

    const additionalRewards = displayDetailRewards.filter((displayDetailReward: Readonly<IDisplayDetailReward>) => {
      return displayDetailReward.dropType === DropType.additional
    })

    return (
      <DataTableRowCell sx={{ width: "100%" }}>
        {!isEmpty([...completeRewards, ...onceRewards]) &&
          <StageDropInfoRowRewardsRow
            displayDetailRewards={[...completeRewards, ...onceRewards]}
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

        {!isEmpty(additionalRewards) &&
          <StageDropInfoRowRewardsRow
            displayDetailRewards={additionalRewards}
            info="额外物资"
          />}
      </DataTableRowCell>
    )
  }
}
