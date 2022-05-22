import React from "react"

import { isEmpty } from "lodash"

import type { IStageInfo, IDisplayDetailReward } from "@/models/gamedata/excel/stageTable"

import StageDropInfoRowRewardsRow from "./stageDropInfoRowRewardsRow"

interface StageInfoTableProps {
  stageInfo: IStageInfo
}

const dropType = {
  firstPass: 1,
  normal: 2,
  special: 3,
  extra: 4,
  diamond: 8
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
      return displayDetailReward.dropType === dropType.diamond
    })

    const firstPassRewards = displayDetailRewards.filter((displayDetailReward: Readonly<IDisplayDetailReward>) => {
      return displayDetailReward.dropType === dropType.firstPass
    })

    const normalRewards = displayDetailRewards.filter((displayDetailReward: Readonly<IDisplayDetailReward>) => {
      return displayDetailReward.dropType === dropType.normal
    })

    const specialRewards = displayDetailRewards.filter((displayDetailReward: Readonly<IDisplayDetailReward>) => {
      return displayDetailReward.dropType === dropType.special
    })

    const extraRewards = displayDetailRewards.filter((displayDetailReward: Readonly<IDisplayDetailReward>) => {
      return displayDetailReward.dropType === dropType.extra
    })

    return (
      <span style={{ width: "100%" }} >
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
      </span>
    )
  }
}
