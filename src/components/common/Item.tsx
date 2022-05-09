// libs
import React from "react"
import Badge from "@mui/material/Badge"
import type { SxProps } from "@mui/system"
import { serialize as serializeUri } from "uri-js"
import Image from "next/image"

// models
import { publicRuntimeConfig } from "@/configurations/runtimeConfig"

interface ItemProps{
  itemId: number | string
  count?: number | string
  sx?: SxProps
}

class Item extends React.PureComponent<ItemProps> {
  public render (): React.ReactNode {
    const { itemId, count, sx } = this.props
    const imageSrc = serializeUri({
      ...publicRuntimeConfig.THERESA_STATIC,
      path: `/api/v0/AK/CN/Android/item/${itemId}`
    })

    return (
      <Badge
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        badgeContent={count}
        color="info"
        overlap="circular"
        sx={sx}
      >
        <div style={{
          aspectRatio: "1/1",
          display: "flex",
          width: "4rem",
          height: "4rem",
          position: "relative"
        }}
        >
          <Image
            alt={`Item ${itemId}`}
            layout="fill"
            src={imageSrc}
            unoptimized
          />
        </div>
      </Badge>
    )
  }
}

export default Item
