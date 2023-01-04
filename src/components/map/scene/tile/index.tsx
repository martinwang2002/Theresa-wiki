import React from "react"

import PlaceIcon from "@mui/icons-material/Place"
import type { SxProps, Theme } from "@mui/material"
import { alpha } from "@mui/material"
import { grey } from "@mui/material/colors"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"

import type { ITileInfo } from "@/models/gamedata/excel/stageTable"
import type { IMapDataTiles } from "@/models/gamedata/levels/index"
import { TileInfoContext } from "@/models/reactContext/tileInfoContext"

import { TileDeepSea, TileDeepWater, TileEmpty, TileForbidden, TileHole } from "./tileNonRoadlike"
import { TileFence, TileFenceBound, TileFloor, TileIcestr, TileIceturLb, TileIceturLt, TileIceturRb, TileIceturRt, TileMire, TileRoad, TileWall } from "./tileRoadlike"
import { TileEnd, TileFlystart, TileReed, TileReedFloor, TileReedWall, TileStart, TileTelin, TileTelout } from "./tileSvglike"
import { TileUndefined } from "./tileUndefined"

interface ITileProps {
  active?: boolean
  tile: IMapDataTiles
}

const tileElements = {
  tile_deepsea: <TileDeepSea />,
  tile_deepwater: <TileDeepWater />,
  tile_empty: <TileEmpty />,
  tile_end: <TileEnd />,
  tile_fence: <TileFence />,
  tile_fence_bound: <TileFenceBound />,
  tile_floor: <TileFloor />,
  tile_flystart: <TileFlystart />,
  tile_forbidden: <TileForbidden />,
  tile_hole: <TileHole />,
  tile_icestr: <TileIcestr />,
  tile_icetur_lb: <TileIceturLb />,
  tile_icetur_lt: <TileIceturLt />,
  tile_icetur_rb: <TileIceturRb />,
  tile_icetur_rt: <TileIceturRt />,
  tile_mire: <TileMire />,
  tile_reed: <TileReed />,
  tile_reedf: <TileReedFloor />,
  tile_reedw: <TileReedWall />,
  tile_road: <TileRoad />,
  tile_start: <TileStart />,
  tile_telin: <TileTelin />,
  tile_telout: <TileTelout />,
  tile_wall: <TileWall />
} as Record<string, JSX.Element | undefined>

class Tile extends React.PureComponent<ITileProps> {
  private static readonly defaultProps = {
    active: false
  }

  public render (): React.ReactNode {
    const { active, tile } = this.props

    const tileElement = tileElements[tile.tileKey] ?? <TileUndefined />

    const activeIconStyles: SxProps<Theme> = theme => ({
      backgroundColor: alpha(theme.palette.primary.light, +"0.5"),
      bottom: 0,
      color: "white",
      height: "100%",
      left: 0,
      padding: "20%",
      position: "absolute",
      right: 0,
      top: 0,
      width: "100%"
    })

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
                    fontSize: "0.8em",
                    marginLeft: "2em",
                    whiteSpace: "pre-wrap"
                  }}
                  variant="body1"
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
              PopperProps={{
                sx: {
                  pointerEvents: "none"
                }
              }}
              arrow
              placement="top"
              title={tooltipContent}
            >
              <div style={{ position: "relative" }}>
                {tileElement}

                {active ? <PlaceIcon sx={activeIconStyles} /> : null}
              </div>
            </Tooltip>
          )
        }}
      </TileInfoContext.Consumer>
    )
  }
}

export default Tile
