/* eslint-disable react/jsx-max-depth */
import React from "react"

import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { styled } from "@mui/system"

import BooleanDescriptor from "@/components/common/booleanDescriptor"
import { DataTableRow, DataTableRowCell } from "@/components/common/dataTable"

import type { IEnemyValueEnemyData, IEnemyValueEnemyDataDefined, IEnemyValueEnemyDataPrototype } from "@/models/gamedata/levels/enemyDatabase"

interface EnemyHandbookAttributeProps {
  readonly enemyDataDefined: IEnemyValueEnemyDataDefined
}

const TableCellCustomized = styled(TableCell)({
  borderBottom: "none",
  padding: "0.5em"
})

interface IColumnNameAndKey<T> {
  name: string
  key: {
    [key in keyof IEnemyValueEnemyData["attributes"]]: IEnemyValueEnemyData["attributes"][key] extends IEnemyValueEnemyDataPrototype<T> ? key : never
  }[keyof IEnemyValueEnemyData["attributes"]]
}

const firstColumnNameAndKey = [
  {
    key: "maxHp",
    name: "生命值"
  },
  {
    key: "atk",
    name: "攻击力"
  },
  {
    key: "def",
    name: "防御力"
  },
  {
    key: "magicResistance",
    name: "法术抗性"
  },
  {
    key: "blockCnt",
    name: "阻挡数"
  }
] as IColumnNameAndKey<number>[]

const secondColumnNameAndKey = [
  {
    key: "moveSpeed",
    name: "移动速度"
  },
  {
    key: "attackSpeed",
    name: "攻击速度"
  },
  {
    key: "baseAttackTime",
    name: "攻击间隔"
  },
  {
    key: "respawnTime",
    name: "复活时间"
  },
  {
    key: "hpRecoveryPerSec",
    name: "生命回复/s"
  },
  {
    key: "spRecoveryPerSec",
    name: "技力回复/s"
  }

] as IColumnNameAndKey<number>[]

const thirdColumnNameAndKey = [
  {
    key: "tauntLevel",
    name: "嘲讽等级"
  },
  {
    key: "massLevel",
    name: "重量等级"
  },
  {
    key: "baseForceLevel",
    name: "基础力量等级"
  },
  {
    key: "cost",
    name: "费用"
  },
  {
    key: "maxDeployCount",
    name: "最大部署数"
  }
] as IColumnNameAndKey<number>[]

const fourthColumnNameAndKey = [
  {
    key: "stunImmune",
    name: "眩晕免疫"
  },
  {
    key: "silenceImmune",
    name: "沉默免疫"
  },
  {
    key: "sleepImmune",
    name: "睡眠免疫"
  },
  {
    key: "frozenImmune",
    name: "冰冻免疫"
  }
] as IColumnNameAndKey<boolean>[]

// 高等级引用低等级
class EnemyHandbookAttribute extends React.PureComponent<EnemyHandbookAttributeProps> {
  public render (): React.ReactNode {
    const { enemyDataDefined } = this.props

    return (
      <Paper sx={{ margin: "auto", maxWidth: "100%", width: "max-content" }}>
        <DataTableRow
          sx={{
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          <DataTableRowCell>
            <Table
              size="small"
              sx={{ width: "max-content" }}
            >
              <TableBody>
                {
                  (firstColumnNameAndKey).map((item) => {
                    return (
                      <TableRow key={item.key}>
                        <TableCellCustomized align="left">
                          {item.name}
                        </TableCellCustomized>

                        <TableCellCustomized align="right">
                          {enemyDataDefined.attributes[item.key] ?? "/"}
                        </TableCellCustomized>
                      </TableRow>
                    )
                  })
                }

                <TableRow>
                  <TableCellCustomized align="left">
                    目标价值
                  </TableCellCustomized>

                  <TableCellCustomized align="right">
                    {enemyDataDefined.lifePointReduce ?? "/"}
                  </TableCellCustomized>
                </TableRow>

                <TableRow>
                  <TableCellCustomized align="left">
                    攻击范围
                  </TableCellCustomized>

                  <TableCellCustomized align="right">
                    {enemyDataDefined.rangeRadius ?? "/"}
                  </TableCellCustomized>
                </TableRow>

                <TableRow>
                  <TableCellCustomized align="left">
                    可见范围
                  </TableCellCustomized>

                  <TableCellCustomized align="right">
                    {enemyDataDefined.viewRadius ?? "/"}
                  </TableCellCustomized>
                </TableRow>
              </TableBody>
            </Table>
          </DataTableRowCell>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <DataTableRowCell>
            <Table
              size="small"
              sx={{ width: "max-content" }}
            >
              <TableBody>
                {
                  (secondColumnNameAndKey).map((item) => {
                    return (
                      <TableRow key={item.key}>
                        <TableCellCustomized align="left">
                          {item.name}
                        </TableCellCustomized>

                        <TableCellCustomized align="right">
                          {enemyDataDefined.attributes[item.key] ?? "/"}
                        </TableCellCustomized>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </DataTableRowCell>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <DataTableRowCell>
            <Table
              size="small"
              sx={{ width: "max-content" }}
            >
              <TableBody>
                {
                  (thirdColumnNameAndKey).map((item) => {
                    return (
                      <TableRow key={item.key}>
                        <TableCellCustomized align="left">
                          {item.name}
                        </TableCellCustomized>

                        <TableCellCustomized align="right">
                          {enemyDataDefined.attributes[item.key] ?? "/"}
                        </TableCellCustomized>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </DataTableRowCell>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <DataTableRowCell>
            <Table
              size="small"
              sx={{ width: "max-content" }}
            >
              <TableBody>
                {
                  (fourthColumnNameAndKey).map((item) => {
                    return (
                      <TableRow key={item.key}>
                        <TableCellCustomized align="left">
                          {item.name}
                        </TableCellCustomized>

                        <TableCellCustomized align="right">
                          <BooleanDescriptor value={enemyDataDefined.attributes[item.key] ?? false} />
                        </TableCellCustomized>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </DataTableRowCell>
        </DataTableRow>
      </Paper>
    )
  }
}

export default EnemyHandbookAttribute
