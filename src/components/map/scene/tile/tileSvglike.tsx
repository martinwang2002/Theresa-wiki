/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-multi-comp */
import React from "react"

import type { SxProps, Theme } from "@mui/system"

import TileFlystartIcon from "@/components/icon/tile/tileFlystart"
import TileStartEndIcon from "@/components/icon/tile/tileStartEnd"

import { TileBase } from "./tileBase"

const tileSxProps = {
  aspectRatio: "1",
  height: "100%",
  width: "100%"
} as SxProps<Theme>

const TileFlystart = React.forwardRef<HTMLSpanElement>((props, ref) => (
  <TileBase
    ref={ref}
    {...props}
  >
    <TileFlystartIcon
      sx={{ ...tileSxProps, color: "#FF3333" } as SxProps<Theme>}
    />
  </TileBase>
))

TileFlystart.displayName = "TileFlystart"

const TileStart = React.forwardRef<HTMLSpanElement>((props, ref) => (
  <TileBase
    ref={ref}
    {...props}
  >
    <TileStartEndIcon
      sx={{ ...tileSxProps, color: "#FF3333" } as SxProps<Theme>}
    />
  </TileBase>
))

TileStart.displayName = "TileStart"

const TileEnd = React.forwardRef<HTMLSpanElement>((props, ref) => (
  <TileBase
    ref={ref}
    {...props}
  >
    <TileStartEndIcon
      sx={{ ...tileSxProps, color: "#34A1FF" } as SxProps<Theme>}
    />
  </TileBase>
))

TileEnd.displayName = "TileEnd"

export { TileFlystart, TileStart, TileEnd }
