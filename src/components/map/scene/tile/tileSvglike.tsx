/* eslint-disable react/no-multi-comp */
import React from "react"

import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"
import { lightBlue } from "@mui/material/colors"
import type { SxProps, Theme } from "@mui/system"

import TileFlystartIcon from "@/components/icon/tile/tileFlystart"
import TileReedIcon from "@/components/icon/tile/tileReed"
import TileStairsIcon from "@/components/icon/tile/tileStairs"
import TileStartEndIcon from "@/components/icon/tile/tileStartEnd"

import { TileBase } from "./tileBase"
import { TileFloor, TileRoad, TileWall } from "./tileRoadlike"

const tileSxProps = {
  aspectRatio: "1",
  height: "100%",
  width: "100%"
} as SxProps<Theme>

export const TileFlystart = React.forwardRef<HTMLSpanElement>((_props, ref) => (
  <TileBase
    ref={ref}
  >
    <TileFlystartIcon
      sx={{ ...tileSxProps, color: "#FF3333" } as SxProps<Theme>}
    />
  </TileBase>
))

TileFlystart.displayName = "TileFlystart"

export const TileStart = React.forwardRef<HTMLSpanElement>((_props, ref) => (
  <TileBase
    ref={ref}
  >
    <TileStartEndIcon
      sx={{ ...tileSxProps, color: "#FF3333" } as SxProps<Theme>}
    />
  </TileBase>
))

TileStart.displayName = "TileStart"

export const TileEnd = React.forwardRef<HTMLSpanElement>((_props, ref) => (
  <TileBase
    ref={ref}
  >
    <TileStartEndIcon
      sx={{ ...tileSxProps, color: "#34A1FF" } as SxProps<Theme>}
    />
  </TileBase>
))

TileEnd.displayName = "TileEnd"

export const TileTelin = React.forwardRef<HTMLSpanElement>((_props, ref) => (
  <TileBase
    ref={ref}
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

export const TileTelout = React.forwardRef<HTMLSpanElement>((_props, ref) => (
  <TileBase
    ref={ref}
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

export const TileReed = React.forwardRef<HTMLSpanElement>((_props, ref) => (
  <TileRoad
    ref={ref}
  >
    <TileReedIcon
      sx={tileSxProps}
    />
  </TileRoad>
))

TileReed.displayName = "TileReed"

export const TileReedWall = React.forwardRef<HTMLSpanElement>((_props, ref) => (
  <TileWall
    ref={ref}
  >
    <TileReedIcon
      sx={tileSxProps}
    />
  </TileWall>
))

TileReedWall.displayName = "TileReedWall"

export const TileReedFloor = React.forwardRef<HTMLSpanElement>((_props, ref) => (
  <TileFloor
    ref={ref}
  >
    <TileReedIcon
      sx={tileSxProps}
    />
  </TileFloor>
))

TileReedFloor.displayName = "TileReedFloor"

export const TileStairs = React.forwardRef<HTMLSpanElement>((_props, ref) => (
  <TileBase
    ref={ref}
  >
    <TileStairsIcon
      sx={{ ...tileSxProps, color: "#34A1FF" } as SxProps<Theme>}
    />
  </TileBase>
))

TileStairs.displayName = "TileStairs"
