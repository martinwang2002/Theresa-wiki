import React from "react"

import Divider from "@mui/material/Divider"
/* eslint-disable import/no-named-default */
import { default as MuiLink } from "@mui/material/Link"
import { default as NextLink } from "next/link"
/* eslint-enable import/no-named-default */

import type { ICustomStageInfo, IUnlockCondition } from "@/models/gamedata/excel/stageTable"

import style from "./stageInfoTable.module.scss"

interface StageInfoTableProps {
  stageInfo: ICustomStageInfo
}

export default class UnlockConditionRow extends React.PureComponent<StageInfoTableProps> {
  public render (): React.ReactNode {
    const { stageInfo } = this.props

    return (
      <>
        <span style={{ width: "25%", textAlign: "center", minWidth: "6em", margin: "auto" }} >
          解锁条件
        </span>

        <Divider
          flexItem
          orientation="vertical"
          variant="middle"
        />

        <span style={{ width: "75%" }} >
          {stageInfo.unlockCondition.map((unlockCondition: Readonly<IUnlockCondition>) => {
            const extraStageInfo = stageInfo._unlockConditionStageInfo[unlockCondition.stageId]
            const noStars = 3
            return (
              <div
                className={style["unlock-condition-row"]}
                key={unlockCondition.stageId}
              >
                {
                  [...Array(noStars).keys()].map((value, index) => {
                    if (index < unlockCondition.completeState) {
                      return (
                        <span
                          className={style["mission-star"]}
                          key={value}
                        />
                      )
                    } else {
                      return (
                        <span
                          className={style["mission-star-grey"]}
                          key={value}
                        />
                      )
                    }
                  })
                }

                <NextLink
                  href={{
                    pathname: "/map/[zoneId]/[stageId]",
                    query: {
                      zoneId: extraStageInfo.zoneId,
                      stageId: extraStageInfo.stageId
                    }
                  }}
                  passHref
                >
                  <MuiLink
                    sx={{ marginLeft: "0.5em", cursor: "pointer" }}
                    underline="hover"
                  >
                    {`${extraStageInfo.code} ${extraStageInfo.name}`}
                  </MuiLink>
                </NextLink>
              </div>
            )
          })}
        </span>
      </>
    )
  }
}
