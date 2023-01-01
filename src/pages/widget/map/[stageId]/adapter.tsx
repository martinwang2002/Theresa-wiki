import type { IMapData } from "../../../../models/gamedata/levels"
import { useMessage } from "../../../../models/utils/messenger"

import type { SetMapStateMessage } from "./connection"

interface MapSceneWidgetAdapterProps {
  mapData: IMapData
  setActiveTiles: (activeTiles: readonly number[]) => void
}

/** The adapter component is for being able to use hooks. */
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export function MapSceneWidgetAdapter ({ mapData, setActiveTiles }: Readonly<MapSceneWidgetAdapterProps>): null {
  useMessage<SetMapStateMessage>("*", "setMapState", (e): void => {
    const { activeTiles } = e.message.data

    const indices = activeTiles.map(({ x, y }) => (mapData.height - y) * mapData.width + x)
    const validIndices = indices.filter(tileIndex => tileIndex >= +"0" && tileIndex < mapData.tiles.length)

    setActiveTiles(validIndices)
  })

  return null
}
