import React from "react"

import { Box } from "@mui/material"
import Badge from "@mui/material/Badge"
import { grey } from "@mui/material/colors"
import type { SxProps } from "@mui/system"
import { styled } from "@mui/system"
import Image from "next/image"
import { serialize as serializeUri } from "uri-js"

import { publicRuntimeConfig } from "@/configurations/runtimeConfig"

interface ItemProps {
  badgeSx?: SxProps
  boxSx?: SxProps
  enemyId: number | string
  enemyIndex?: string
}

enum SpriteBackend {
  NOT_INITIALIZED = 0,
  SPRITE = 1,
  STATIC = 2
}

interface ItemState {
  col: number
  cols: number
  itemBackend: SpriteBackend
  row: number
  rows: number
}

const Sprite = styled("div")({
  backgroundImage: "url(\"" + serializeUri({
    ...publicRuntimeConfig.THERESA_STATIC,
    path: "/api/v0/AK/CN/Android/enemy/avatar/sprite"
  }) + "\")",
  height: "100%",
  width: "100%"
})

interface SpriteData {
  cols: number
  enemyIds: readonly string[]
  rows: number
}

const spriteDataMap = new Map<string, Promise<SpriteData>>()

class EnemyAvatar extends React.PureComponent<ItemProps, ItemState> {
  private static readonly defaultProps = {
    badgeSx: {
      "& > .MuiBadge-badge": {
        backgroundColor: grey[800],
        borderRadius: 1
      }
    },
    boxSx: null,
    enemyIndex: null
  }

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  public constructor (props: Readonly<ItemProps>) {
    super(props)
    this.state = {
      col: 0,
      cols: 0,
      itemBackend: SpriteBackend.NOT_INITIALIZED,
      row: 0,
      rows: 0
    }
  }

  public async componentDidMount (): Promise<void> {
    const { enemyId } = this.props
    const spriteUri = serializeUri({
      ...publicRuntimeConfig.THERESA_STATIC,
      path: "/api/v0/AK/CN/Android/enemy/avatar/sprite"
    })
    let spriteData
    spriteData = spriteDataMap.get(spriteUri)
    if (!spriteData) {
      spriteData = fetch(spriteUri).then((response): SpriteData => {
        const _spriteData = {
          cols: parseInt(response.headers.get("X-Cols") ?? ""),
          enemyIds: JSON.parse(response.headers.get("X-Item-Ids") ?? "") as string[],
          rows: parseInt(response.headers.get("X-Rows") ?? "")
        } as SpriteData
        return _spriteData
      })
      spriteDataMap.set(spriteUri, spriteData)
    }
    await spriteData.then((data) => {
      const index = data.enemyIds.indexOf(enemyId.toString())
      const notFound = -1
      if (index !== notFound) {
        this.setState({
          col: index % data.cols,
          cols: data.cols,
          itemBackend: SpriteBackend.SPRITE,
          row: Math.floor(index / data.cols),
          rows: data.rows
        })
      } else {
        this.setState({
          itemBackend: SpriteBackend.STATIC
        })
      }
    })
  }

  public render (): React.ReactNode {
    const { badgeSx, boxSx, enemyId, enemyIndex } = this.props
    const { itemBackend, col, cols, row, rows } = this.state
    const indexOffset = 1

    return (
      <Badge
        anchorOrigin={{
          horizontal: "left",
          vertical: "top"
        }}
        badgeContent={enemyIndex}
        color="primary"
        overlap="circular"
        sx={badgeSx}
      >
        <Box
          sx={{
            aspectRatio: "1/1",
            display: "flex",
            height: "4rem",
            position: "relative",
            width: "4rem",
            ...boxSx
          }}
        >
          {itemBackend === SpriteBackend.SPRITE &&
          <Sprite
            sx={{
              backgroundPosition: `calc(100% / ${cols - indexOffset} * ${col}) calc(100% / ${rows - indexOffset} * ${row})`,
              backgroundSize: `calc(100% * ${cols})`
            }}
          />}

          {itemBackend === SpriteBackend.STATIC &&
          <Image
            alt={`Enemy ${enemyId}`}
            fill
            src={serializeUri({
              ...publicRuntimeConfig.THERESA_STATIC,
              path: `/api/v0/AK/CN/Android/enemy/avatar/id/${enemyId}`
            })}
            unoptimized
          />}
        </Box>
      </Badge>
    )
  }
}

export default EnemyAvatar
