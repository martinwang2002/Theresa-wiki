/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-multi-comp */
import React from "react"

import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"
import { lightBlue } from "@mui/material/colors"
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

const TileTelin = React.forwardRef<HTMLSpanElement>((props, ref) => (
  <TileBase
    ref={ref}
    {...props}
  >
    <LoginIcon
      sx={{
        ...tileSxProps,
        color: (theme) => theme.palette.mode === "light" ? lightBlue[600] : lightBlue[300],
        padding: "12.5%"
      } as SxProps<Theme>}
    />
  </TileBase>
))

TileTelin.displayName = "TileTelout"

const TileTelout = React.forwardRef<HTMLSpanElement>((props, ref) => (
  <TileBase
    ref={ref}
    {...props}
  >
    <LogoutIcon
      sx={{
        ...tileSxProps,
        color: (theme) => theme.palette.mode === "light" ? lightBlue[600] : lightBlue[300],
        padding: "12.5%"
      } as SxProps<Theme>}
    />
  </TileBase>
))

TileTelout.displayName = "TileTelout"

export { TileFlystart, TileStart, TileEnd, TileTelin, TileTelout }
