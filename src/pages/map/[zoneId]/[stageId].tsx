import React from "react"

import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded"
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import { pick as lodashPick } from "lodash"
import type { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next"
import Head from "next/head"
import Link from "next/link"

import HeadingAnchor from "@/components/common/ToC/headingAnchor"
import WithTableOfContents from "@/components/common/ToC/withTableOfContents"
import Map3DIndex from "@/components/map/3d/index"
import MapPreview from "@/components/map/mapPreview"
import MapScene from "@/components/map/scene/index"
import StageInfo from "@/components/map/stageInfo/index"
import StageInfoDescription, { stageInfoDescriptionToPlainTextParser } from "@/components/map/stageInfo/stageInfoDescription"
import Page from "@/components/page/page"

import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

import { gamedataConst as getGamedataConst } from "@/models/gamedata/excel/gamedataConst"
import type { IGamedataConst } from "@/models/gamedata/excel/gamedataConst"
import { stageIds, getCustomStageInfo, tileInfo as getTileInfo, stageJson as getStageJson } from "@/models/gamedata/excel/stageTable"
import type { ICustomStageInfo, ITileInfo, IStageJson } from "@/models/gamedata/excel/stageTable"
import { zoneIds } from "@/models/gamedata/excel/zoneTable"
import { GamedataContext } from "@/models/reactContext/gamedataContext"
import { TileInfoContext } from "@/models/reactContext/tileInfoContext"
import { arknightsNameByServer } from "@/models/utils/arknightsNameByServer"

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

  const permanent = zoneIdFromParams.startsWith("permanent")

  const stageInfo = await getCustomStageInfo(stageId, permanent)

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
            sx={{ marginTop: "0.5em", marginBottom: "0.5em" }}
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
            sx={{ marginTop: "0.5em", marginBottom: "0.5em" }}
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
            sx={{ marginTop: "0.5em", marginBottom: "0.5em" }}
            text="3D场景地图"
          />

          <Alert
            iconMapping={{
              info: <ScienceRoundedIcon fontSize="inherit" />
            }}
            severity="info"
            sx={{
              marginY: "1em"
            }}
          >
            <AlertTitle>
              目前3D场景地图已经支持贴图；暂未支持光源、精确相机位置等。
            </AlertTitle>
            部分地图暂时无法查看（包括但不限于突袭、剧情体验环境、磨难险地环境）

            <br />

            并且暂时没有错误提示信息，敬请谅解。

            <br />

            您可以向
            <Link
              href="/about/contact"
            >
              站长提交反馈
            </Link>
            ，（开真银斩杀源石虫啦~~~
          </Alert>

          <Map3DIndex
            stageId={stageId}
          />
        </WithTableOfContents>

      </Page>
    )
  }
}

export default Map
