import React from "react"

import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"

import MapScene from "@/components/map/scene/index"
import PageWidget from "@/components/page/widget"

import type { ITileInfo } from "@/models/gamedata/excel/stageTable"
import { getCustomStageInfo, getStageByStageId, tileInfo as getTileInfo } from "@/models/gamedata/excel/stageTable"
import type { IStageJson } from "@/models/gamedata/levels/index"
import { stageJson as getStageJson } from "@/models/gamedata/levels/index"
import { TileInfoContext } from "@/models/reactContext/tileInfoContext"

import { sendMessage } from "../../../../models/utils/messenger"

import { MapSceneWidgetAdapter } from "./adapter"
import type { MapReadyMessage, TileClickMessage } from "./connection"

interface MapSceneWidgetProps {
  stageJson: IStageJson
  tileInfo: Record<string, ITileInfo>
}

interface MapSceneWidgetState {
  activeTiles: readonly number[]
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
    revalidate: 86400
  }
}

class MapSceneWidget extends React.PureComponent<MapSceneWidgetProps, MapSceneWidgetState> {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  public constructor (props: Readonly<MapSceneWidgetProps>) {
    super(props)

    this.state = {
      activeTiles: []
    }
  }

  public componentDidMount (): void {
    sendMessage<MapReadyMessage>(window.parent, "*", { type: "mapReady" }).catch(console.warn)
  }

  public render (): React.ReactNode {
    const { stageJson, tileInfo } = this.props
    const { activeTiles } = this.state

    const { mapData } = stageJson

    return (
      <PageWidget>
        <TileInfoContext.Provider value={tileInfo}>
          <MapSceneWidgetAdapter
            mapData={mapData}
            setActiveTiles={(tiles): void => {
              this.setState(
                { activeTiles: tiles }
              )
            }}
          />

          <MapScene
            activeTiles={activeTiles}
            mapData={mapData}
            onTileClick={(_event, tile, index, width, height): void => {
              const x = index % width
              const y = height - Math.floor(index / width)
              console.log(`tileClick ${tile.tileKey}-maa-coordinate-${x}-${y}`)

              const tileClickMessage: TileClickMessage = {
                data: {
                  height,
                  index,
                  maaLocation: [x, y],
                  tile,
                  width
                },
                type: "tileClick"
              }

              sendMessage(window.parent, "*", tileClickMessage).catch(console.warn)
            }}
          />
        </TileInfoContext.Provider>
      </PageWidget>
    )
  }
}

export default MapSceneWidget
