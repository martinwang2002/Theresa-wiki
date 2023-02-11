import React from "react"

import Typography from "@mui/material/Typography"
import { pick as lodashPick } from "lodash"
import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import Head from "next/head"

import ArknightsDescription, { arknightsDescriptionToPlainTextParser } from "@/components/common/arknightsDescription/index"
import TopBadge from "@/components/common/badge/topBadge"
import StyledBreadcrumbs from "@/components/common/BreadcrumbNavigation/styledBreadcrumbs"
import EnemyAvatar from "@/components/common/enemy/avatar"
import StyledLink from "@/components/common/styledLink"
import HeadingAnchor from "@/components/common/ToC/headingAnchor"
import WithTableOfContents from "@/components/common/ToC/withTableOfContents"
import EnemyHandbookAttribute from "@/components/enemy/handbook/attribute"
import EnemyHandbookRadar from "@/components/enemy/handbook/radar"
import Page from "@/components/page/page"

import { enemyIds, getEnemyHandbookByEnemyId } from "@/models/gamedata/excel/enemyHandbookTable"
import type { IEnemyHandbook } from "@/models/gamedata/excel/enemyHandbookTable"
import { gamedataConst as getGamedataConst } from "@/models/gamedata/excel/gamedataConst"
import type { IGamedataConst } from "@/models/gamedata/excel/gamedataConst"
import { enemyValueByEnemyId, enemyValueEnemyDataDefined } from "@/models/gamedata/levels/enemyDatabase"
import type { IEnemyValueEnemyDataDefined } from "@/models/gamedata/levels/enemyDatabase"
import { GamedataContext } from "@/models/reactContext/gamedataContext"
import { arknightsNameByServer } from "@/models/utils/arknightsNameByServer"

interface EnemyProps {
  server: "CN" | "JP" | "KR" | "TW" | "US"
  enemyId: string
  enemyDataDefinedByLevel: Record<number, IEnemyValueEnemyDataDefined>
  enemyHandbook: IEnemyHandbook
  gamedataConst: Pick<IGamedataConst, "richTextStyles">
}

export const getStaticPaths: GetStaticPaths = () => {
  return { fallback: "blocking", paths: [] }
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const getStaticProps: GetStaticProps<EnemyProps> = async (context: Readonly<GetStaticPropsContext>) => {
  const _enemyIds = await enemyIds()

  const enemyId = context.params?.enemyId as string
  if (!_enemyIds.includes(enemyId)) {
    return { notFound: true }
  }

  const enemyHandbook = await getEnemyHandbookByEnemyId(enemyId)
  const enemyDataValue = await enemyValueByEnemyId(enemyId)

  const enemyDataDefinedByLevel = enemyDataValue.reduce<Record<number, IEnemyValueEnemyDataDefined>>((accumulator, currentValue, currentIndex) => {
    const offset = 1
    accumulator[currentValue.level] = enemyValueEnemyDataDefined(enemyDataValue.slice(undefined, currentIndex + offset).map(enemyValue => enemyValue.enemyData))
    return accumulator
  }, {})

  const gamedataConst = await getGamedataConst()

  return {
    props: {
      enemyDataDefinedByLevel,
      enemyHandbook,
      enemyId,
      gamedataConst: lodashPick(gamedataConst, "richTextStyles"),
      server: "CN"
    },
    revalidate: 86400
  }
}

class Enemy extends React.PureComponent<EnemyProps> {
  public render (): React.ReactNode {
    const { enemyDataDefinedByLevel, enemyHandbook, enemyId, gamedataConst, server } = this.props
    return (
      <Page>
        <Head>
          <title>
            {`${enemyHandbook.name} ${server} | Theresa.wiki`}
          </title>

          <meta
            content={
              arknightsDescriptionToPlainTextParser(enemyHandbook.description) +
              (enemyHandbook.ability !== null ? arknightsDescriptionToPlainTextParser(enemyHandbook.ability) : "")
            }
            name="descirption"
          />

          <meta
            content={[enemyHandbook.name, arknightsNameByServer(server)].join(", ")}
            name="keywords"
          />
        </Head>

        <StyledBreadcrumbs>
          <StyledLink
            color="inherit"
            href="/enemy"
          >
            敌人
          </StyledLink>

          <Typography
            color="text.primary"
            sx={{
              fontWeight: "bold"
            }}
          >
            {enemyHandbook.name}
          </Typography>
        </StyledBreadcrumbs>

        <Typography
          sx={{
            fontFamily: "\"Dream Han Serif CN W27\"",
            my: 2
          }}
          variant="h3"
        >
          <EnemyAvatar
            boxSx={{
              height: "6rem",
              width: "6rem"
            }}
            enemyId={enemyId}
            enemyIndex={enemyHandbook.enemyIndex}
          />

          <span>
            {enemyHandbook.name}
          </span>

          {
            !!enemyHandbook.enemyRace &&
            <TopBadge
              sx={{
                backgroundColor: "primary.main",
                ml: 1
              }}
            >
              {enemyHandbook.enemyRace}
            </TopBadge>
          }

          <TopBadge
            sx={{
              backgroundColor: "warning.main",
              ml: 1
            }}
          >
            {server}
          </TopBadge>
        </Typography>

        <GamedataContext.Provider value={gamedataConst}>
          <ArknightsDescription
            description={enemyHandbook.description}
          />

          {
            enemyHandbook.ability !== null &&
            <ArknightsDescription
              description={enemyHandbook.ability}
            />
          }
        </GamedataContext.Provider>

        <WithTableOfContents>
          <HeadingAnchor
            id="enemyInfo"
            text="敌人信息"
          />

          <EnemyHandbookRadar enemyHandbook={enemyHandbook} />

          {
            Object.entries(enemyDataDefinedByLevel).map(([level, enemyDataDefined]) => (
              <React.Fragment key={level}>
                <HeadingAnchor
                  id={`enemyLevel${level}`}
                  text={`等级${level}`}
                />

                <EnemyHandbookAttribute enemyDataDefined={enemyDataDefined} />
              </React.Fragment>
            ))
          }

        </WithTableOfContents>

      </Page>
    )
  }
}

export default Enemy
