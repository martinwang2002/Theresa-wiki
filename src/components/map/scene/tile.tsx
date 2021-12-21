import React from "react"
import { TooltipHost, TooltipDelay, DirectionalHint } from "@fluentui/react"

import type { IMapDataTiles, ITileInfo } from "@/models/stage"
import { TileInfoContext } from "@/models/stage/context"

import style from "./tile.module.scss"

interface ITileProps {
  tile: IMapDataTiles
}

class Tile extends React.PureComponent<ITileProps> {
  public render (): React.ReactNode {
    const { tile } = this.props
    const colorMap = new Map([
      ["tile_empty", "#fafafa"],
      ["tile_wall", "#bcbcbc"],
      ["tile_forbidden", "#f5f5f5"],
      ["tile_road", "#e0e0e0"],
      ["tile_start", "#ff616f"],
      ["tile_flystart", "pink"],
      ["tile_end", "#29b6f6"]
    ])
    return (
      <span
        className={style.tile}
        // TODO tile style
        style={{
          backgroundColor: colorMap.get(tile.tileKey)
        }}
      >
        <TileInfoContext.Consumer>
          {(tileInfo: Readonly<Record<string, ITileInfo>>): JSX.Element => {
            const content: JSX.Element = (
              <div>
                <h3 style={{ margin: 0 }}>
                  {tileInfo[tile.tileKey].name}
                </h3>

                <h5 style={{ margin: 0, marginLeft: "1em" }}>
                  {tileInfo[tile.tileKey].description}
                </h5>
              </div>
            )
            return (
              <TooltipHost
                content={content}
                delay={TooltipDelay.medium}
                directionalHint={DirectionalHint.topCenter}
              >
                <div style={{ width: "100%", height: "100%" }} />
              </TooltipHost>
            )
          }}
        </TileInfoContext.Consumer>

      </span>

    )
  }
}

export default Tile
