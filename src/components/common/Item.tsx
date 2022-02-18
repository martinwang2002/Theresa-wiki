/* eslint-disable @next/next/no-img-element */
// libs
import React from "react"
import Badge from "@mui/material/Badge"
import type { SxProps } from "@mui/system"
import { serialize as serializeUri } from "uri-js"

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
      scheme: process.env.NODE_ENV === "production" ? "https" : "http",
      host: publicRuntimeConfig.THERESA_STATIC,
      path: `/api/v0/AK_AB/CN/Android/latest/item/${itemId}`
    })

    return (
      <div style={{
        aspectRatio: "1/1",
        display: "flex",
        width: "4rem",
        height: "4rem"
      }}
      >
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
          <img
            alt={`Item ${itemId}`}
            src={imageSrc}
            style={{
              aspectRatio: "1",
              width: "100%",
              height: "100%"
            }}
          />
        </Badge>
      </div>
    )
  }
}

export default Item
