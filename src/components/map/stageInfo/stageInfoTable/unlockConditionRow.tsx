import React from "react"

import { Box } from "@mui/material"
import { green } from "@mui/material/colors"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"

import InlineBadge from "@/components/common/badge/inlineBadge"
import StyledLink from "@/components/common/styledLink"
import MissionIcon from "@/components/icon/missionIcon"

import type { ICustomStageInfo, IUnlockCondition } from "@/models/gamedata/excel/stageTable"

import { StageInfoTableRowCell } from "./common"

interface StageInfoTableProps {
  stageInfo: ICustomStageInfo
}

export default class UnlockConditionRow extends React.PureComponent<StageInfoTableProps> {
  public render (): React.ReactNode {
    const { stageInfo } = this.props

    return (
      <>
        <StageInfoTableRowCell sx={{ width: "25%" }} >
          解锁条件
        </StageInfoTableRowCell>

        <Divider
          flexItem
          orientation="vertical"
          variant="middle"
        />

        <StageInfoTableRowCell sx={{ width: "75%" }} >
          {stageInfo.unlockCondition.map((unlockCondition: Readonly<IUnlockCondition>) => {
            const extraStageInfo = stageInfo._unlockConditionStageInfo[unlockCondition.stageId]
            const noStars = 3
            return (
              <Box
                key={unlockCondition.stageId}
              >
                {
                  [...Array(noStars).keys()].map((value, index) => {
                    if (index < unlockCondition.completeState) {
                      return (
                        <MissionIcon
                          key={value}
                          sx={{
                            color: "primary.main",
                            fontSize: "2rem",
                            verticalAlign: "middle"
                          }}
                        />
                      )
                    } else {
                      return (
                        <MissionIcon
                          key={value}
                          sx={{
                            color: "grey",
                            fontSize: "2rem",
                            verticalAlign: "middle"
                          }}
                        />
                      )
                    }
                  })
                }

                {!!extraStageInfo.isStoryOnly &&
                <>
                  <InlineBadge
                    sx={{
                      backgroundColor: green[500],
                      verticalAlign: "middle"
                    }}
                  >
                    剧情
                  </InlineBadge>

                  <Typography
                    component="span"
                    sx={{
                      verticalAlign: "middle"
                    }}
                  >
                    {`${extraStageInfo.code} ${extraStageInfo.name}`}
                  </Typography>
                </>}

                {!extraStageInfo.isStoryOnly &&
                  <StyledLink
                    href={{
                      pathname: "/map/[zoneId]/[stageId]",
                      query: {
                        stageId: extraStageInfo.stageId,
                        zoneId: extraStageInfo.zoneId
                      }
                    }}
                    sx={{
                      cursor: "pointer",
                      ml: 1,
                      verticalAlign: "middle"
                    }}
                    underline="hover"
                  >
                    {`${extraStageInfo.code} ${extraStageInfo.name}`}
                  </StyledLink>}
              </Box>
            )
          })}
        </StageInfoTableRowCell>
      </>
    )
  }
}
