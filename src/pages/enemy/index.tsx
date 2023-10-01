/* eslint-disable react/jsx-max-depth */
import React from "react"

import Alert from "@mui/material/Alert"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableFooter from "@mui/material/TableFooter"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { pick as lodashPick } from "lodash"
import type { GetStaticProps } from "next"
import Head from "next/head"

import { descriptionParser, descriptionParserServerSide } from "@/components/common/arknightsDescription/richTextStyles"
import TopBadge from "@/components/common/badge/topBadge"
import StyledBreadcrumbs from "@/components/common/BreadcrumbNavigation/styledBreadcrumbs"
import EnemyAvatar from "@/components/common/enemy/avatar"
import StyledLink from "@/components/common/styledLink"
import TablePaginationActions from "@/components/common/tablePaginationActions"
import Page from "@/components/page/page"

import { enemyHandbookTable } from "@/models/gamedata/excel/enemyHandbookTable"
import type { IEnemyHandbook } from "@/models/gamedata/excel/enemyHandbookTable"
import { gamedataConst as getGamedataConst } from "@/models/gamedata/excel/gamedataConst"
import { SettingsContext } from "@/models/reactContext/settingsContext"

interface EnemiesProps {
  readonly server: "CN" | "JP" | "KR" | "TW" | "US"
  readonly enemies: readonly Pick<Readonly<IEnemyHandbook>, "ability" | "attack" | "defence" | "endure" | "enemyId" | "enemyRace" | "name" | "resistance">[]
}

interface EnemiesState {
  page: number
  rowsPerPage: number
}

export const getStaticProps: GetStaticProps<EnemiesProps> = async () => {
  if (process.env.npm_lifecycle_event === "build") {
    return {
      props: {
        enemies: [],
        gamedataConst: {
          richTextStyles: {}
        },
        server: "CN"
      },
      revalidate: 1
    }
  }
  const _enemyHandbookTable = await enemyHandbookTable()

  const gamedataConst = await getGamedataConst()

  // FIXME: remove this
  descriptionParserServerSide("", gamedataConst)

  const enemies = Object.values(_enemyHandbookTable)
    .map((enemy) => lodashPick(enemy, "ability", "attack", "endure", "enemyId", "enemyRace", "name", "defence", "resistance"))
    .map((enemy) => ({
      ...enemy,
      // ability: enemy.ability !== null ? descriptionParserServerSide(enemy.ability, gamedataConst) : null
      // FIXME：new ability format
      ability: null
    }))

  return {
    props: {
      enemies,
      server: "CN"
    },
    revalidate: 86400
  }
}

class Enemies extends React.PureComponent<EnemiesProps, EnemiesState> {
  public constructor (props: Readonly<EnemiesProps>) {
    super(props)
    this.state = {
      page: 0,
      rowsPerPage: 25
    }
  }

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  private readonly handlePageChange = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
    this.setState({
      page: newPage
    })
  }

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  private readonly handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10)
    })
  }

  public render (): React.ReactNode {
    const { enemies, server } = this.props
    const { page, rowsPerPage } = this.state

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const rowsPerPageOptions = [5, 10, 25, 50]

    return (
      <Page>
        <Head>
          <title>
            {`敌人一览 ${server} | Theresa.wiki`}
          </title>
        </Head>

        <StyledBreadcrumbs>
          <Typography
            color="text.primary"
            sx={{
              fontWeight: "bold"
            }}
          >
            敌人一览
          </Typography>
        </StyledBreadcrumbs>

        <Typography
          sx={{
            fontFamily: "\"Dream Han Serif CN W27\"",
            my: 2
          }}
          variant="h3"
        >
          敌人一览

          <TopBadge
            sx={{
              backgroundColor: "warning.main",
              ml: 1
            }}
          >
            {server}
          </TopBadge>
        </Typography>

        <SettingsContext.Consumer>
          {({ paletteMode }): React.ReactNode => {
            if (paletteMode === "light") {
              return (
                <Alert severity="warning">
                  亮色模式下，部分敌人能力的文本内容可能显示不全，建议切换至暗色模式查看。
                </Alert>
              )
            }
          }}
        </SettingsContext.Consumer>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    minWidth: "3em"
                  }}
                >
                  头像
                </TableCell>

                <TableCell
                  sx={{
                    minWidth: "6em"
                  }}
                >
                  名字
                </TableCell>

                <TableCell
                  sx={{
                    minWidth: "4em"
                  }}
                >
                  种族
                </TableCell>

                <TableCell
                  sx={{
                    minWidth: "4em"
                  }}
                >
                  耐久
                </TableCell>

                <TableCell
                  sx={{
                    minWidth: "4em"
                  }}
                >
                  攻击力
                </TableCell>

                <TableCell
                  sx={{
                    minWidth: "4em"
                  }}
                >
                  防御力
                </TableCell>

                <TableCell
                  sx={{
                    minWidth: "4em"
                  }}
                >
                  法术抗性
                </TableCell>

                <TableCell>
                  能力
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {([...enemies].reverse().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)).map((enemy) => (
                <TableRow
                  key={enemy.enemyId}
                >
                  <TableCell
                    sx={{
                      py: 0
                    }}
                  >
                    <StyledLink
                      href={`/enemy/${enemy.enemyId}`}
                      key={enemy.enemyId}
                    >
                      <EnemyAvatar
                        boxSx={{
                          height: "3em",
                          width: "3em"
                        }}
                        enemyId={enemy.enemyId}
                      />
                    </StyledLink>
                  </TableCell>

                  <TableCell>
                    <StyledLink
                      href={`/enemy/${enemy.enemyId}`}
                      key={enemy.enemyId}
                      sx={{
                        textDecoration: "none"
                      }}
                    >
                      {enemy.name}
                    </StyledLink>
                  </TableCell>

                  <TableCell>
                    {enemy.enemyRace}
                  </TableCell>

                  <TableCell>
                    {enemy.endure}
                  </TableCell>

                  <TableCell>
                    {enemy.attack}
                  </TableCell>

                  <TableCell>
                    {enemy.defence}
                  </TableCell>

                  <TableCell>
                    {enemy.resistance}
                  </TableCell>

                  <TableCell>
                    {enemy.ability !== null ? descriptionParser(enemy.ability) : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  ActionsComponent={TablePaginationActions}
                  count={enemies.length}
                  labelDisplayedRows={({ from, to, count }): string => `第 ${from}-${to} 个 总计 ${count}`}
                  labelRowsPerPage="行数"
                  onPageChange={this.handlePageChange}
                  onRowsPerPageChange={this.handleRowsPerPageChange}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={rowsPerPageOptions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Page>
    )
  }
}

export default Enemies
