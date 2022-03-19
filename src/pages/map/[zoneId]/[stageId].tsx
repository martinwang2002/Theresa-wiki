// libs
import React from "react"
import Head from "next/head"
import type { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next"
import { pick as lodashPick } from "lodash"

// Components
import Page from "@/components/page/page"
import StageInfo from "@/components/map/stageInfo/index"
import MapScene from "@/components/map/scene/index"
import MapPreview from "@/components/map/mapPreview"
import WithTableOfContents from "@/components/common/ToC/withTableOfContents"
import HeadingAnchor from "@/components/common/ToC/headingAnchor"
import StageInfoDescription, { stageInfoDescriptionToPlainTextParser } from "@/components/map/stageInfo/stageInfoDescription"

// configs
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

// models
import { stageIds, getCustomStageInfo, tileInfo as getTileInfo, stageJson as getStageJson } from "@/models/gamedata/excel/stageTable"
import type { ICustomStageInfo, ITileInfo, IStageJson } from "@/models/gamedata/excel/stageTable"
import { zoneIds } from "@/models/gamedata/excel/zoneTable"
import { gamedataConst as getGamedataConst } from "@/models/gamedata/excel/gamedataConst"
import type { IGamedataConst } from "@/models/gamedata/excel/gamedataConst"
import { arknightsNameByServer } from "@/models/utils/arknightsNameByServer"

// reactContext
import { TileInfoContext } from "@/models/reactContext/tileInfoContext"
import { GamedataContext } from "@/models/reactContext/gamedataContext"

// styles
import style from "./[stageId].module.scss"

interface MapProps{
  server: "CN" | "JP" | "KR" | "TW" | "US"
  stageId: string
  stageInfo: ICustomStageInfo
  stageJson: IStageJson
  tileInfo: Record<string, ITileInfo>
  gamedataConst: Pick<IGamedataConst, "richTextStyles">
}

export const getStaticPaths: GetStaticPaths = async () => {
  // ignore SSR when developing and in build stage
  if (serverRuntimeConfig.NO_DYNAMIC_ROUTES) {
    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths: [], fallback: "blocking" }
  } else {
    const _stageIds = await stageIds()

    const paths = _stageIds.map((stageId) => ({
      params: {
        server: "CN",
        stageId
      }
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: "blocking" }
  }
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const getStaticProps: GetStaticProps<MapProps> = async (context: Readonly<GetStaticPropsContext>) => {
  const _zoneIds = await zoneIds()
  const _stageIds = await stageIds()

  const { params } = context
  const zoneIdFromParams = String(params?.zoneId)
  const stageId = String(params?.stageId)

  try {
    if (_zoneIds.includes(zoneIdFromParams) && _stageIds.includes(stageId)) {
      // zoneId and stageId exists
      // render page
    } else {
      return {
        notFound: true
      }
    }
  } catch {
    return {
      notFound: true
    }
  }

  const stageInfo = await getCustomStageInfo(stageId)

  const { levelId, zoneId } = stageInfo

  // return notFound when zoneId mismatch
  if (zoneId !== zoneIdFromParams) {
    return {
      notFound: true
    }
  }

  const stageJson = await getStageJson(levelId)

  const tileInfo = await getTileInfo()

  const gamedataConst = await getGamedataConst()

  return {
    props: {
      server: "CN",
      stageId: stageId,
      stageInfo: stageInfo,
      stageJson: stageJson,
      tileInfo: tileInfo,
      gamedataConst: lodashPick(gamedataConst, "richTextStyles")
    },
    revalidate: 3600
  }
}

class Map extends React.PureComponent<MapProps> {
  public render (): React.ReactNode {
    const { server, stageInfo, stageJson, tileInfo, gamedataConst, stageId } = this.props
    const { mapData } = stageJson
    return (
      <Page>
        <Head>

          <title>
            {`${stageInfo.code} ${stageInfo.name} ${server}`}

            {" "}
            | Theresa.wiki
          </title>

          <meta
            content={stageInfoDescriptionToPlainTextParser(stageInfo.description)}
            name="descirption"
          />

          <meta
            content={[stageInfo.code, stageInfo.name, arknightsNameByServer(server)].join(", ")}
            name="keywords"
          />

        </Head>

        <h1 className={style["h1-title"]}>
          {stageInfo.difficulty === "FOUR_STAR" &&
          <span className={style["h1-four-star-badge"]}>
            突袭
          </span>}

          <span>
            {`${stageInfo.code} ${stageInfo.name}`}
          </span>

          <span className={style["h1-title-badge"]}>
            {server}
          </span>
        </h1>

        <GamedataContext.Provider value={gamedataConst}>
          <StageInfoDescription
            description={stageInfo.description}
          />
        </GamedataContext.Provider>

        <WithTableOfContents>
          <HeadingAnchor
            id="stageInfo"
            text="作战信息"
          />

          <GamedataContext.Provider value={gamedataConst}>
            <StageInfo
              stageInfo={stageInfo}
              stageJsonOptions={stageJson.options}
            />
          </GamedataContext.Provider>

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
        </WithTableOfContents>

      </Page>
    )
  }
}

export default Map
