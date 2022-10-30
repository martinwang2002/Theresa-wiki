import React from "react"

import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"

import MapScene from "@/components/map/scene/index"

import { getCustomStageInfo, getStageByStageId, tileInfo as getTileInfo } from "@/models/gamedata/excel/stageTable"
import type { ITileInfo } from "@/models/gamedata/excel/stageTable"
import { stageJson as getStageJson } from "@/models/gamedata/levels/index"
import type { IStageJson } from "@/models/gamedata/levels/index"
import { TileInfoContext } from "@/models/reactContext/tileInfoContext"

interface MapSceneWidgetProps {
  stageJson: IStageJson
  tileInfo: Record<string, ITileInfo>
}

export const getStaticPaths: GetStaticPaths = () => {
  return { fallback: "blocking", paths: [] }
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const getStaticProps: GetStaticProps<MapSceneWidgetProps> = async (context: Readonly<GetStaticPropsContext>) => {
  const { params } = context
  const stageId = String(params?.stageId)

  const stage = await getStageByStageId(stageId)
  if (stage === undefined) {
    return { notFound: true }
  }

  const stageInfo = await getCustomStageInfo(stage.zoneId, stageId, false)

  const { levelId } = stageInfo

  const stageJson = await getStageJson(levelId)

  const tileInfo = await getTileInfo()

  return {
    props: {
      stageJson,
      tileInfo
    },
    revalidate: 3600
  }
}

class MapSceneWidget extends React.PureComponent<MapSceneWidgetProps> {
  public render (): React.ReactNode {
    const { stageJson, tileInfo } = this.props
    const { mapData } = stageJson

    return (
      <TileInfoContext.Provider value={tileInfo}>
        <MapScene
          mapData={mapData}
          onTileClick={(_event, tile, index, width, height): void => {
            const x = index % width
            const y = height - Math.ceil(index / width)
            console.log(`tileClick ${tile.tileKey}-maa-coordinate-${x}-${y}`)

            const postMessage = {
              data: {
                height,
                index,
                maaLocation: [x, y],
                tile,
                width
              },
              type: "tileClick"
            }

            console.log("window.postMessage", postMessage)

            window.postMessage(postMessage)
          }}
        />
      </TileInfoContext.Provider>
    )
  }
}

export default MapSceneWidget
