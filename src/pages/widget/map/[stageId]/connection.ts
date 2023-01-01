/* eslint-disable @typescript-eslint/no-type-alias */
import type { IMapDataTiles } from "../../../../models/gamedata/levels"
import type { Message } from "../../../../models/utils/messenger"

export type MapReadyMessage = Message<"mapReady">

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
