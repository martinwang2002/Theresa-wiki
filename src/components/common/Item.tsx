/* eslint-disable @next/next/no-img-element */
// libs
import React from "react"
import Badge from "@mui/material/Badge"

// models
import { publicRuntimeConfig } from "@/configurations/runtimeConfig"

interface ItemProps{
  itemId: number | string
  count: number
}

class Item extends React.PureComponent<ItemProps> {
  public render (): React.ReactNode {
    const { itemId, count } = this.props
    const imageSrc = `${publicRuntimeConfig.THERESA_STATIC}api/v0/AK_AB/CN/Android/latest/item/${itemId}`

    return (
      <div style={{
        aspectRatio: "1/1",
        display: "flex",
        width: "3rem",
        height: "3rem"
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