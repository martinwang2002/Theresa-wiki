import React from "react"

import Typography from "@mui/material/Typography"
import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import Head from "next/head"

import ArknightsDescription, { arknightsDescriptionToPlainTextParser, descriptionParserServerSide } from "@/components/common/arknightsDescription/richTextStyles"
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
import { enemyValueByEnemyId, enemyValueEnemyDataDefined } from "@/models/gamedata/levels/enemyDatabase"
import type { IEnemyValueEnemyDataDefined } from "@/models/gamedata/levels/enemyDatabase"
import { arknightsNameByServer } from "@/models/utils/arknightsNameByServer"

interface EnemyProps {
  readonly server: "CN" | "JP" | "KR" | "TW" | "US"
  readonly enemyId: string
  readonly enemyDataDefinedByLevel: Record<number, IEnemyValueEnemyDataDefined>
  readonly enemyHandbook: IEnemyHandbook
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

  const patchedEnemyHandbook = {
    ...enemyHandbook,
    ability: enemyHandbook.ability !== null
      ? descriptionParserServerSide(
        enemyHandbook.ability, gamedataConst
      )
      : null
  }

  return {
    props: {
      enemyDataDefinedByLevel,
      enemyHandbook: patchedEnemyHandbook,
      enemyId,
      server: "CN"
    },
    revalidate: 86400
  }
}

class Enemy extends React.PureComponent<EnemyProps> {
  public render (): React.ReactNode {
    const { enemyDataDefinedByLevel, enemyHandbook, enemyId, server } = this.props

    console.log(enemyDataDefinedByLevel)
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

        <ArknightsDescription
          description={enemyHandbook.description}
        />

        {
          enemyHandbook.ability !== null &&
            <ArknightsDescription
              description={enemyHandbook.ability}
            />
        }

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

                <Typography>
                  {enemyDataDefined.description}
                </Typography>

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
