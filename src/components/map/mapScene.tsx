/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable react/jsx-max-depth */
import type { KonvaEventObject } from "konva/lib/Node"
import React from "react"
// import Image from "next/image"

// import type { ImageLoaderProps } from "next/image"
// import * as Konva from "konva"

import { Stage, Layer, Rect, Text } from "react-konva"

interface IIMapDataTiles {
  blackboard: unknown
  buildableType: unknown
  effects: unknown
  heightType: unknown
  passableMask: unknown
  tileKey: string
}

interface IMapData {
  height: number
  map: [number[]]
  tiles: [IIMapDataTiles]
  width: number
}

interface IState {
  stageHeight: number
  stageWidth: number
}

class MapScene extends React.PureComponent<{ mapData: IMapData }, IState> {
  public constructor (props: Readonly<{ mapData: IMapData }> | { mapData: IMapData }) {
    super(props)
    this.divContainer = React.createRef()
    this.state = {
      stageHeight: this.defaultHeight,
      stageWidth: this.defaultWidth
    }
  }

  private readonly divContainer: React.RefObject<HTMLInputElement>

  private readonly defaultHeight = 900

  private readonly defaultWidth = 1600

  private resizeDiv (): void {
    this.setState({
      stageHeight: this.divContainer.current?.offsetHeight ?? this.defaultHeight,
      stageWidth: this.divContainer.current?.offsetWidth ?? this.defaultWidth
    })
  }

  public componentDidMount (): void {
    this.resizeDiv()
    window.addEventListener("resize", () => {
      this.resizeDiv()
    })
  }

  public render (): React.ReactNode {
    const { mapData } = this.props
    const { stageHeight, stageWidth } = this.state
    // console.log(mapData.tiles)
    const { tiles, width, height } = mapData

    // content maximum fill size
    const fillRate = 0.85
    // tile size (100, 100) in canvas
    const tileSize = 100

    const scale = Math.min(stageHeight * fillRate / tileSize / height, stageWidth * fillRate / tileSize / width, 1)
    // offset of origin to make content located in center
    const offsetX = tileSize * (width / 2) - stageWidth / scale / 2
    const offsetY = tileSize * (height / 2) - stageHeight / scale / 2
    return (
      <div
        ref={this.divContainer}
        style={{
          aspectRatio: "16/9",
          display: "block",
          width: "100%",
          overflow: "hidden",
          position: "relative"
        }}
      >
        <Stage
          height={stageHeight}
          width={stageWidth}
          // scale={(1, 1)}
          scaleX={scale}
          scaleY={scale}
          // scaleX={1}
          // scaleY={1}
          offsetX={offsetX}
          offsetY={offsetY}
        >
          <Layer>
            {tiles.map((tile: Readonly<IIMapDataTiles>, index) => {
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
                <React.Fragment
                  key={index}
                >
                  <Rect
                    fill={colorMap.get(tile.tileKey)}
                    height={tileSize}
                    width={tileSize}
                    x={tileSize * (index % width)}
                    y={tileSize * (height - Math.floor(index / width) - 1)}
                    onClick={(): void => {
                      // console.log(tile.tileKey)
                    }}
                    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
                    onMouseOver={(event: KonvaEventObject<MouseEvent>): void => {
                      // console.log(event)
                    }}
                  />
                  <Text
                    fontSize={15}
                    text={tile.tileKey}
                    x={tileSize * (index % width)}
                    y={tileSize * (height - Math.floor(index / width) - 1)}
                  />
                </React.Fragment>
              )
            })}
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default MapScene
export type { IMapData }
