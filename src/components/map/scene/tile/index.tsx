import React from "react"

import { grey } from "@mui/material/colors"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"

import type { ITileInfo } from "@/models/gamedata/excel/stageTable"
import type { IMapDataTiles } from "@/models/gamedata/levels/index"
import { TileInfoContext } from "@/models/reactContext/tileInfoContext"

import { TileEmpty, TileForbidden, TileHole } from "./tileNonRoadlike"
import { TileFence, TileFloor, TileIcestr, TileIceturLb, TileIceturLt, TileIceturRb, TileIceturRt, TileRoad, TileWall } from "./tileRoadlike"
import { TileEnd, TileFlystart, TileStart, TileTelin, TileTelout } from "./tileSvglike"
import { TileUndefined } from "./tileUndefined"

interface ITileProps {
  tile: IMapDataTiles
}

const tileElements = {
  tile_empty: <TileEmpty />,
  tile_end: <TileEnd />,
  tile_fence: <TileFence />,
  tile_floor: <TileFloor />,
  tile_flystart: <TileFlystart />,
  tile_forbidden: <TileForbidden />,
  tile_hole: <TileHole />,
  tile_icestr: <TileIcestr />,
  tile_icetur_lb: <TileIceturLb />,
  tile_icetur_lt: <TileIceturLt />,
  tile_icetur_rb: <TileIceturRb />,
  tile_icetur_rt: <TileIceturRt />,
  tile_road: <TileRoad />,
  tile_start: <TileStart />,
  tile_telin: <TileTelin />,
  tile_telout: <TileTelout />,
  tile_wall: <TileWall />
} as Record<string, JSX.Element | undefined>

class Tile extends React.PureComponent<ITileProps> {
  public render (): React.ReactNode {
    const { tile } = this.props

    const tileElement = tileElements[tile.tileKey] ?? <TileUndefined />

    return (
      <TileInfoContext.Consumer>
        {(tileInfo: Readonly<Record<string, Readonly<ITileInfo> | undefined>>): JSX.Element => {
          // for certain tiles, hypergryph do not provide tileInfo.
          // so we can only show the tileKey itself.
          const tooltipContent: JSX.Element = (
            <div>
              {tileInfo[tile.tileKey] !== undefined &&
              <>
                <Typography
                  variant="body1"
                >
                  {tileInfo[tile.tileKey]?.name}
                </Typography>

                <Typography
                  sx={{
                    marginLeft: "1em"
                  }}
                  variant="caption"
                >
                  {tileInfo[tile.tileKey]?.description}
                </Typography>
              </>}

              {tileElement.type === TileUndefined &&
              <Typography
                sx={{
                  color: grey[400],
                  fontSize: "0.8em",
                  marginLeft: "1em"
                }}
              >
                {tile.tileKey}
              </Typography>}
            </div>
          )

          return (
            <Tooltip
              arrow
              placement="top"
              title={tooltipContent}
            >
              {tileElement}
            </Tooltip>
          )
        }}
      </TileInfoContext.Consumer>
    )
  }
}

export default Tile
