import React from "react"

import Typography from "@mui/material/Typography"
import { pick as lodashPick } from "lodash"
import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import Head from "next/head"

import ArknightsDescription, { arknightsDescriptionToPlainTextParser, descriptionParserServerSide } from "@/components/common/arknightsDescription/richTextStyles"
import TopBadge from "@/components/common/badge/topBadge"
import StyledBreadcrumbs from "@/components/common/BreadcrumbNavigation/styledBreadcrumbs"
import StyledLink from "@/components/common/styledLink"
import HeadingAnchor from "@/components/common/ToC/headingAnchor"
import WithTableOfContents from "@/components/common/ToC/withTableOfContents"
import Map3DIndex from "@/components/map/3d/index"
import BgmBank from "@/components/map/bgmBank/index"
import MapPreview from "@/components/map/mapPreview"
import MapScene from "@/components/map/scene/index"
import StageInfo from "@/components/map/stageInfo/index"
import StageOptions from "@/components/map/stageOptions/index"
import Page from "@/components/page/page"

import { getBattleOnGameReadyBgmBankByBgmEventKey } from "@/models/gamedata/excel/audioData"
import type { IBgmBank } from "@/models/gamedata/excel/audioData"
import { gamedataConst as getGamedataConst } from "@/models/gamedata/excel/gamedataConst"
import type { IHandbookInfoTableStageInfo } from "@/models/gamedata/excel/handbookInfoTable"
import { getCustomStageInfo, getStageIdsByZoneId, tileInfo as getTileInfo } from "@/models/gamedata/excel/stageTable"
import type { ICustomRoguelikeTopicDetailStageInfo, ICustomStageInfo, ITileInfo } from "@/models/gamedata/excel/stageTable"
import { getCustomZoneInfo, zoneIds } from "@/models/gamedata/excel/zoneTable"
import type { IZoneInfo } from "@/models/gamedata/excel/zoneTable"
import { stageJson as getStageJson } from "@/models/gamedata/levels/index"
import type { IStageJson } from "@/models/gamedata/levels/index"
import { TileInfoContext } from "@/models/reactContext/tileInfoContext"
import { arknightsNameByServer } from "@/models/utils/arknightsNameByServer"
import { getDisplayZoneName } from "@/models/utils/getDisplayZoneName"

interface MapProps {
  server: "CN" | "JP" | "KR" | "TW" | "US"
  stageId: string
  stageInfo: ICustomRoguelikeTopicDetailStageInfo | ICustomStageInfo | IHandbookInfoTableStageInfo
  stageJson: Pick<IStageJson, "mapData" | "options" | "runes">
  tileInfo: Record<string, ITileInfo>
  zoneId: string
  zoneInfo: IZoneInfo
  bgmBank: IBgmBank
}

export const getStaticPaths: GetStaticPaths = () => {
  return { fallback: "blocking", paths: [] }
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const getStaticProps: GetStaticProps<MapProps> = async (context: Readonly<GetStaticPropsContext>) => {
  const _zoneIds = await zoneIds()

  const { params } = context
  const zoneIdFromParams = String(params?.zoneId)
  const stageId = String(params?.stageId)

  if (_zoneIds.includes(zoneIdFromParams)) {
    const _stageIds = await getStageIdsByZoneId(zoneIdFromParams)

    if (_stageIds.includes(stageId)) {
      // zoneId and stageId exists
      // render page
    } else {
      return {
        notFound: true
      }
    }
  } else {
    return {
      notFound: true
    }
  }

  const permanent = zoneIdFromParams.startsWith("permanent")

  const stageInfo = await getCustomStageInfo(zoneIdFromParams, stageId, permanent)

  if (stageInfo === undefined) {
    return {
      notFound: true
    }
  }

  const { levelId, zoneId } = stageInfo

  // return notFound when zoneId mismatch
  if (zoneId !== zoneIdFromParams) {
    return {
      notFound: true
    }
  }

  // return notFound when stage isStoryOnly
  if ("isStoryOnly" in stageInfo && stageInfo.isStoryOnly) {
    return {
      notFound: true
    }
  }

  const gamedataConst = await getGamedataConst()

  const patchedStageInfo = {
    ...stageInfo,
    description: descriptionParserServerSide(stageInfo.description, gamedataConst)
  }

  const stageJson = await getStageJson(levelId)

  const tileInfo = await getTileInfo()

  const zoneInfo = await getCustomZoneInfo(zoneId)

  const { bgmEvent: bgmEventKey } = stageJson

  const bgmBank = await getBattleOnGameReadyBgmBankByBgmEventKey(bgmEventKey)

  return {
    props: {
      bgmBank,
      gamedataConst: lodashPick(gamedataConst, "richTextStyles"),
      server: "CN",
      stageId,
      stageInfo: patchedStageInfo,
      stageJson: lodashPick(stageJson, "mapData", "options", "runes"),
      tileInfo,
      zoneId,
      zoneInfo
    },
    revalidate: 86400
  }
}

class Map extends React.PureComponent<MapProps> {
  public render (): React.ReactNode {
    const { bgmBank, server, stageInfo, stageJson, tileInfo, stageId, zoneId, zoneInfo } = this.props
    const difficulty = "difficulty" in stageInfo ? stageInfo.difficulty : undefined
    const { mapData, options, runes } = stageJson

    const displayZoneName = getDisplayZoneName(zoneInfo)

    return (
      <Page>
        <Head>

          <title>
            {`${stageInfo.code} ${stageInfo.name} ${server} | Theresa.wiki`}
          </title>

          <meta
            content={arknightsDescriptionToPlainTextParser(stageInfo.description)}
            name="descirption"
          />

          <meta
            content={[stageInfo.code, stageInfo.name, arknightsNameByServer(server)].join(", ")}
            name="keywords"
          />

        </Head>

        <StyledBreadcrumbs>
          <StyledLink
            color="inherit"
            href="/map"
          >
            地图
          </StyledLink>

          <StyledLink
            color="inherit"
            href={{
              pathname: "/map/[zoneId]",
              query: {
                zoneId
              }
            }}
          >
            {displayZoneName}
          </StyledLink>

          <Typography
            color="text.primary"
            sx={{
              fontWeight: "bold"
            }}
          >
            {`${stageInfo.code} ${stageInfo.name}`}
          </Typography>
        </StyledBreadcrumbs>

        <Typography
          sx={{
            fontFamily: "\"Dream Han Serif CN W27\"",
            my: 2
          }}
          variant="h3"
        >
          <span>
            {`${stageInfo.code} ${stageInfo.name}`}
          </span>

          {difficulty === "FOUR_STAR" &&
          <TopBadge
            sx={{
              backgroundColor: "error.main"
            }}
          >
            突袭
          </TopBadge>}

          {"diffGroup" in stageInfo && stageInfo.diffGroup === "EASY" &&
          <TopBadge
            sx={{
              backgroundColor: "primary.main"
            }}
          >
            剧情体验
          </TopBadge>}

          {"diffGroup" in stageInfo && stageInfo.diffGroup === "TOUGH" &&
          <TopBadge
            sx={{
              backgroundColor: "error.main"
            }}
          >
            磨难险境
          </TopBadge>}

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
          description={stageInfo.description}
        />

        <WithTableOfContents>
          {
            "diffGroup" in stageInfo &&
            <>
              <HeadingAnchor
                id="stageInfo"
                text="作战信息"
              />

              <StageInfo
                stageInfo={stageInfo}
              />

              <HeadingAnchor
                id="stageOptions"
                text="作战配置"
              />

              <StageOptions
                diffGroup={stageInfo.diffGroup}
                difficulty={difficulty ?? "NONE"}
                runes={runes}
                stageOptions={options}
              />
            </>
          }

          <HeadingAnchor
            id="bgmBank"
            text="背景音乐"
          />

          <BgmBank
            bgmBank={bgmBank}
          />

          <HeadingAnchor
            id="mapPreview"
            text="地图预览"
          />

          <MapPreview stageId={stageId} />

          <TileInfoContext.Provider value={tileInfo}>
            <MapScene
              mapData={mapData}
            />
          </TileInfoContext.Provider>

          <HeadingAnchor
            id="map3d"
            text="3D场景地图"
          />

          <Map3DIndex
            stageId={stageId}
          />
        </WithTableOfContents>

      </Page>
    )
  }
}

export default Map
