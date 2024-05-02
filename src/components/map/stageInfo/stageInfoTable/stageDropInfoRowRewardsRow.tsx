import React from "react"

import Box from "@mui/material/Box"
import { grey } from "@mui/material/colors"
import { styled } from "@mui/system"

import Item from "@/components/common/Item"

import type { IDisplayDetailReward } from "@/models/gamedata/excel/stageTable"

interface StageInfoTableProps {
  readonly displayDetailRewards: IDisplayDetailReward[]
  readonly info: string
  readonly isSpecial?: boolean
}

const occPercent = {
  ALMOST: "大概率",
  ALWAYS: "固定掉落",
  OFTEN: "概率掉落",
  SOMETIMES: "小概率",
  USUAL: "概率掉落"
}

const occPercentSpecial = {
  ...occPercent,
  4: "罕见"
}

const DropInfoRewardsRowInfo = styled("span")({
  backgroundColor: grey[800],
  borderRadius: "0.5em",
  color: "white",
  lineHeight: 1,
  marginBottom: "auto",
  marginLeft: "0.5em",
  marginRight: "1em",
  marginTop: "1em",
  minWidth: "4em",
  padding: "0.35em"
})

const DropInfoRewardsRowInfoItem = styled("span")({
  display: "flex",
  flexWrap: "wrap",
  maxWidth: "23rem" // five times per row at maximum
})

export default class StageDropInfoRowRewardsRow extends React.PureComponent<StageInfoTableProps> {
  private static readonly defaultProps = {
    isSpecial: false
  }

  public render (): React.ReactNode {
    const { displayDetailRewards, info, isSpecial } = this.props

    return (
      <Box
        sx={{
          display: "flex",
          width: "fit-content"
        }}
      >
        <DropInfoRewardsRowInfo>
          {info}
        </DropInfoRewardsRowInfo>

        <DropInfoRewardsRowInfoItem>
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
                    "& .MuiBadge-badge": {
                      borderRadius: "8px",
                      bottom: "0%",
                      fontSize: "0.5em",
                      height: "16px",
                      right: "50%"
                    },
                    mb: 2,
                    mx: 0.5,
                    whiteSpace: "pre"
                  }}
                />
              )
            })
          }
        </DropInfoRewardsRowInfoItem>
      </Box>
    )
  }
}
