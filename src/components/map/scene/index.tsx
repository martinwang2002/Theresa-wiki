import React from "react"

import type { IMapData, IMapDataTiles } from "@/models/gamedata/levels/index"

import style from "./scene.module.scss"
import Tile from "./tile/tile"

interface IMapSceneProps {
  mapData: IMapData
}

class MapScene extends React.PureComponent<IMapSceneProps> {
  public render (): React.ReactNode {
    const { mapData } = this.props
    const { tiles, width, height } = mapData

    return (
      <div
        className={style.map_scene_container}
        style={{
          "--map-scene-tiles-width": width,
          "--map-scene-tiles-height": height
        } as React.CSSProperties}
      >
        <div className={style.map_scene_tiles}>
          {tiles.map((tile: Readonly<IMapDataTiles>, index) => {
            return (
              <Tile
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                tile={tile}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default MapScene
