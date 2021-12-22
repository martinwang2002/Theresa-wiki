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
    // /* eslint-disable @typescript-eslint/naming-convention */
    // const colorMap: Record<string, React.CSSProperties> = {
    //   tile_empty: {
    //     backgroundColor: "#fafafa"
    //   },
    //   tile_wall: {
    //     backgroundColor: "#bcbcbc"
    //   },
    //   tile_forbidden: {
    //     backgroundColor: "#f5f5f5"
    //   },
    //   tile_road: {
    //     backgroundColor: "#e0e0e0"
    //   },
    //   tile_start: {
    //     backgroundColor: "#ff616f"
    //   },
    //   tile_flystart: {
    //     // backgroundColor: "pink"
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //   },
    //   tile_end: {
    //     // backgroundColor: "#29b6f6"
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //     backgroundImage: tileStartEnd
    //   }
    // }
    // /* eslint-enable @typescript-eslint/naming-convention */

    return (
      <span
        className={style.tile}
      >
        <TileInfoContext.Consumer>
          {(tileInfo: Readonly<Record<string, ITileInfo>>): JSX.Element => {
            console.log(tileInfo)
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
                <div className={style[tile.tileKey]} />
              </TooltipHost>
            )
          }}
        </TileInfoContext.Consumer>

      </span>

    )
  }
}

export default Tile
