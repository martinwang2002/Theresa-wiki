import React from "react"
import Head from "next/head"

import type { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next"
// import type { ParsedUrlQuery } from "querystring"
import { stagesArray, getStageInfo } from "@/models/stages"

import StageInfo from "@/components/map/stageInfo"

interface MapProps{
  server: "CN" | "JP" | "KR" | "TW" | "US"
  stageId: string
  stageInfo: Record<string, string>
  stageJson: {
    options: Record<string, string>
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const stageIds = await stagesArray()
  const numPreRender = -50
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
  levelId: string
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
    const stageRes = await fetch(`https://s3-torappu.martinwang2002.com/api/v0/CN/Android/latest/unpacked_assetbundle/gamedata/levels/${String(levelId).toLowerCase()}.json`)
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
          <title>
            {stageId}
          </title>

          <link
            href="/favicon.ico"
            rel="icon"
          />
        </Head>

        <main>

          <h1 className="title">

            {server}

            {" "}

            {stageId}
          </h1>

          <div>
            {/* {Object.entries(this.props.stageJson.options).map(
            ([key, value]) => {
              return value
            }
          )} */}
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
