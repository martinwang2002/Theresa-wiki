import type { IMapData } from "@/models/gamedata/levels"
import { useMessage } from "@/models/utils/messenger"

import type { CheckMapMessage, SetMapStateMessage } from "./connection"

interface MapSceneWidgetAdapterProps {
  mapData: IMapData
  setActiveTiles: (activeTiles: readonly number[]) => void
}

/** The adapter component is for being able to use hooks. */
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export function MapSceneWidgetAdapter ({ mapData, setActiveTiles }: Readonly<MapSceneWidgetAdapterProps>): null {
  useMessage<CheckMapMessage>("*", "checkMap", ({ reply }): void => {
    reply({ type: "mapReady" }).catch(console.error)
  })

  useMessage<SetMapStateMessage>("*", "setMapState", (e): void => {
    const { activeTiles } = e.message.data

    const width = mapData.map[0].length
    const height = mapData.map.length

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const indices = activeTiles.map(({ x, y }) => (height - (y + 1)) * width + x)
    const validIndices = indices.filter(tileIndex => tileIndex >= +"0" && tileIndex < mapData.tiles.length)

    setActiveTiles(validIndices)
  })

  return null
}
