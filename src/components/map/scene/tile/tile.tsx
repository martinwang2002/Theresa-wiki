import React from "react"
import Tooltip from "@mui/material/Tooltip"

import type { IMapDataTiles, ITileInfo } from "@/models/stage"
import { TileInfoContext } from "@/models/stage/context"

import style from "./tile.module.scss"

interface ITileProps {
  tile: IMapDataTiles
}

class Tile extends React.PureComponent<ITileProps> {
  public render (): React.ReactNode {
    const { tile } = this.props

    return (
      <span
        className={style.tile}
      >
        <TileInfoContext.Consumer>
          {(tileInfo: Readonly<Record<string, ITileInfo>>): JSX.Element => {
            const tooltipContent: JSX.Element = (
              <div>
                <h3 style={{ margin: 0 }}>
                  {tileInfo[tile.tileKey].name}
                </h3>

                <h5 style={{ margin: 0, marginLeft: "1em" }}>
                  {tileInfo[tile.tileKey].description}
                </h5>

                {!style[tile.tileKey] &&
                <h5 style={{ margin: 0, marginLeft: "1em", color: "grey" }}>
                  {tile.tileKey}
                </h5>}

              </div>
            )
            return (
              <Tooltip
                arrow
                placement="top"
                title={tooltipContent}
              >
                <div className={style[tile.tileKey] ? style[tile.tileKey] : style.tile___undefined__} />
              </Tooltip>
            )
          }}
        </TileInfoContext.Consumer>

      </span>

    )
  }
}

export default Tile
