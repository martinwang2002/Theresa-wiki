import React from "react"

import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

import { DataTableRow, DataTableRowCell } from "@/components/common/dataTable"

import type { IEnemyHandbookEnemyData } from "@/models/gamedata/excel/enemyHandbookTable"

interface EnemyHandbookProps {
  readonly enemyHandbook: IEnemyHandbookEnemyData
}

class EnemyHandbookRadar extends React.PureComponent<EnemyHandbookProps> {
  public render (): React.ReactNode {
    const { enemyHandbook } = this.props
    console.log(enemyHandbook)

    return (
      <Paper sx={{ margin: "auto", maxWidth: "100%", width: "max-content" }}>
        <DataTableRow sx={{ flexWrap: "wrap" }}>
          <DataTableRowCell sx={{ flex: 1 }} >
            <Typography>
              耐久
            </Typography>

            <Typography
              variant="h3"
            >
              /
              {/* {enemyHandbook.endure} */}
            </Typography>
          </DataTableRowCell>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <DataTableRowCell sx={{ flex: 1 }} >
            <Typography>
              攻击力
            </Typography>

            <Typography
              variant="h3"
            >
              /
              {/* {enemyHandbook.attack} */}
            </Typography>
          </DataTableRowCell>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <DataTableRowCell sx={{ flex: 1 }} >
            <Typography>
              防御力
            </Typography>

            <Typography
              variant="h3"
            >
              /
              {/* {enemyHandbook.defence} */}
            </Typography>
          </DataTableRowCell>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <DataTableRowCell sx={{ flex: 1 }} >
            <Typography>
              法术抗性
            </Typography>

            <Typography
              variant="h3"
            >
              /
              {/* {enemyHandbook.resistance} */}
            </Typography>
          </DataTableRowCell>
        </DataTableRow>
      </Paper>
    )
  }
}

export default EnemyHandbookRadar
