/* eslint-disable react/jsx-max-depth */
// libs
import React from "react"
import Paper from "@mui/material/Paper"
import Divider from "@mui/material/Divider"

// Components
import Item from "@/components/common/Item"

// models
import type { IStageInfo } from "@/models/gamedata/excel/stage"

// style
import style from "./stageInfo.module.scss"

interface StageInfoTableProps {
  stageInfo: IStageInfo
}

class StageInfoTable extends React.PureComponent<StageInfoTableProps> {
  public render (): React.ReactNode {
    const { stageInfo } = this.props

    return (
      <Paper sx={{ width: "max-content", margin: "auto", maxWidth: "100%" }}>
        <div className={style.stageInfoRow}>
          <span style={{ width: "25%", textAlign: "center", minWidth: "6em" }} >
            推荐平均等级
          </span>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <span style={{ width: "75%" }} >
            {stageInfo.dangerLevel}
          </span>

        </div>

        <Divider />

        <div className={style.stageInfoRow}>
          <span style={{ width: "25%", textAlign: "center", minWidth: "6em" }} >
            解锁条件
          </span>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <span style={{ width: "75%" }} >
            {/* {stageInfo.unlockCondition} */}
            ahh
          </span>

        </div>

        <Divider />

        <div className={style.stageInfoRow}>
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
                count={stageInfo.apFailReturn}
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

        </div>

        <Divider />

        <div className={style.stageInfoRow}>
          <span style={{ width: "50%", textAlign: "center" }} >
            {stageInfo.canPractice ? "yes" : "no"}
          </span>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <span style={{ width: "50%" }} >
            {stageInfo.canBattleReplay ? "yes" : "no"}
          </span>

        </div>

        <Divider />

        <div className={style.stageInfoRow}>
          <span style={{ width: "25%", textAlign: "center", minWidth: "6em" }} >
            stageDropInfo
          </span>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <span style={{ width: "75%" }} >
            {stageInfo.dangerLevel}
          </span>

        </div>
      </Paper>
    )
  }
}

export default StageInfoTable
