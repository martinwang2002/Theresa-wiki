// libs
import React from "react"
import Head from "next/head"
import type { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next"
import { pick as lodashPick } from "lodash"

// Components
import Page from "@/components/page/page"
import StageInfo from "@/components/map/stageInfo"
import MapScene from "@/components/map/scene/index"

// models
import { stagesArray, getStageInfo, tileInfo as getTileInfo, stageJson as getStageJson } from "@/models/gamedata/excel/stage"
import type { IStageInfo, ITileInfo, IStageJson } from "@/models/gamedata/excel/stage"
import { gamedataConst as getGamedataConst } from "@/models/gamedata/excel/gamedataConst"
import type { IGamedataConst } from "@/models/gamedata/excel/gamedataConst"

// reactContext
import { TileInfoContext } from "@/models/reactContext/tileInfoContext"
import { GamedataContext } from "@/models/reactContext/gamedataContext"

// styles
import style from "./[stageId].module.scss"

interface MapProps{
  server: "CN" | "JP" | "KR" | "TW" | "US"
  stageId: string
  stageInfo: IStageInfo
  stageJson: IStageJson
  tileInfo: Record<string, ITileInfo>
  gamedataConst: Pick<IGamedataConst, "richTextStyles">
}

export const getStaticPaths: GetStaticPaths = async () => {
  const stageIds = await stagesArray()
  const numPreRender = -5
  const paths = stageIds.slice(numPreRender).map((stageId) => ({
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

export const getStaticProps: GetStaticProps<MapProps> = async (context: Readonly<GetStaticPropsContext>) => {
  const stageIds = await stagesArray()
  const { params } = context
  const stageId = String(params?.stageId)

  try {
    if (stageIds.includes(stageId)) {
      // stage id exists
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

  const stageInfo = await getStageInfo(stageId)

  const { levelId } = stageInfo
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
    const { server, stageInfo, stageJson, tileInfo, gamedataConst } = this.props
    const { mapData } = stageJson
    return (
      <Page>
        <Head>

          <title>
            {`${stageInfo.code} ${stageInfo.name} ${server}`}

            {" "}
            | Theresa.wiki
          </title>

        </Head>

        <h1 className={style["h1-title"]}>
          {`${stageInfo.code} ${stageInfo.name}`}

          <span className={style["h1-title-badge"]}>
            {server}
          </span>
        </h1>

        <GamedataContext.Provider value={gamedataConst}>
          <StageInfo
            stageInfo={stageInfo}
            stageJsonOptions={stageJson.options}
          />
        </GamedataContext.Provider>

        <TileInfoContext.Provider value={tileInfo}>
          <MapScene
            mapData={mapData}
          />
        </TileInfoContext.Provider>

      </Page>
    )
  }
}

export default Map
