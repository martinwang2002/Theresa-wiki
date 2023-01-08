/* eslint-disable @typescript-eslint/no-type-alias */
import type { IMapDataTiles } from "@/models/gamedata/levels"
import type { Message } from "@/models/utils/messenger"

/** Tells that the map is ready. */
export type MapReadyMessage = Message<"mapReady">

/** Checks if the map is ready. The map should reply with a MapReadyMessage. */
export type CheckMapMessage = Message<"checkMap">

export type TileClickMessage = Message<
"tileClick",
{
  index: number
  width: number
  height: number
  maaLocation: [x: number, y: number]
  tile: IMapDataTiles
}
>

export type SetMapStateMessage = Message<
"setMapState",
{ activeTiles: { x: number; y: number }[] }
>
