import React from "react"
import Head from "next/head"
import dynamic from "next/dynamic"

import type { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next"
// import type { ParsedUrlQuery } from "querystring"
import { stagesArray, getStageInfo } from "@/models/stages"

import StageInfo from "@/components/map/stageInfo"
// import LoadingPic from "@/components/map/loadingPic"
import type { IMapData } from "@/components/map/mapScene"
import LoadingPict from "@/components/map/loadingPic"

interface MapProps{
  server: "CN" | "JP" | "KR" | "TW" | "US"
  stageId: string
  stageInfo: Record<string, string>
  stageJson: IStageJson
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

interface IStageJson {
  [key: string]: unknown
  options: Record<string, string>
  levelId: string
  loadingPicId: string
  mapData: IMapData
}

export const getStaticProps: GetStaticProps = async (context: Readonly<GetStaticPropsContext>) => {
  // const stageTableRes = await fetch('https://s3-torappu.martinwang2002.com/api/v0/CN/Android/latest/unpacked_assetbundle/gamedata/excel/stage_table.json')
  // const stageTableRes = await fetch('http://localhost:3000/api/stage_table')
  // const stageTableJson = await stageTableRes.json()
  // const { stages } = stageTableJson
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
  // const stageJson = await stageRes.json()
  const { levelId } = stageInfo

  let stageJson
  if (levelId != null) {
    const stageUrl = `https://s3-torappu.martinwang2002.com/api/v0/CN/Android/latest/unpacked_assetbundle/assets/torappu/dynamicassets/gamedata/levels/${String(levelId).toLowerCase()}.json`
    console.log(stageUrl)
    const stageRes = await fetch(stageUrl)
    stageJson = await stageRes.json() as IStageJson
  } else {
    stageJson = {}
  }
  return {
    props: {
      server: "CN",
      stageId: stageId,
      stageInfo: stageInfo,
      stageJson: stageJson
    },
    revalidate: 3600
  }
}

class Map extends React.PureComponent<MapProps> {
  public render (): React.ReactNode {
    const { server, stageId, stageInfo, stageJson } = this.props
    const { loadingPicId } = stageInfo
    const { mapData } = stageJson
    console.log(stageJson)
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const CsrMapScene = dynamic(async () => import("@/components/map/mapScene"), {
      ssr: false,
      loading: () => <LoadingPict loadingPicId={loadingPicId}></LoadingPict>
    })
    // const router = this.props.router
    // // const { server} = router.query
    // const { server, mapid} = router.query
    // // const mapid = "act12side_01"

    // // const zoneId = "act12side"
    // // const levelId = "01"

    // try {
    //   var stages = this.props.stage_json['stages']
    //   if ( Object.keys(stages).includes(String(mapid))){
    //     e
    //   }else{

    //   }

    // }catch{

    // }

    return (
      <div className="container">
        <Head>
          <meta charSet="utf-8" />

          <title>
            {`${stageInfo.code} ${stageInfo.name} ${server}`}
          </title>

        </Head>

        <main>

          <h1 className="title">
            {`${stageInfo.code} ${stageInfo.name} ${server}`}
          </h1>

          {stageId}

          <span style={{
            width: 100,
            height: 100,
            backgroundImage: "linear-graident(45deg,red,green)",
            transform: "rotateX(30deg) translateZ(20px)"
          }}/>
          <div
            style={{
              aspectRatio: "16/9",
              display: "block",
              width: "100%",
              overflow: "hidden",
              position: "relative"
            }}
          >
            <CsrMapScene mapData={mapData} />
            {/* <CsrMapScene mapData={mapData} /> */}
          </div>
          <StageInfo
            stageInfo={stageInfo}
            stageJsonOptions={stageJson.options}
          />

        </main>

      </div>
    )
  }
}

export default Map
