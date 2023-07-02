/* eslint-disable react/no-multi-comp */
import React from "react"

import { blue, brown, grey, lightBlue } from "@mui/material/colors"
import { styled } from "@mui/system"

import { TileBase } from "./tileBase"

export const TileEmpty = TileBase

export const TileForbidden = TileBase

export const TileDeepSea = styled(TileBase)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? lightBlue[300] : lightBlue[500]
}))

export const TileDeepWater = styled(TileBase)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? blue[300] : blue[500]
}))

const Hole = styled("span")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? grey[900] : grey[100],
  height: "33%",
  margin: "auto",
  width: "33%"
}))

const TileHole = React.forwardRef<HTMLSpanElement>((_props, ref) => (
  <TileBase
    ref={ref}
  >
    <Hole />
  </TileBase>
))

TileHole.displayName = "TileHole"

export const WoordRdBaseWood = styled("span")({
  backgroundColor: brown[500],
  borderRadius: "1px",
  height: "25%",
  position: "absolute",
  width: "100%"
})

const TileWoodRd = React.forwardRef<HTMLSpanElement>((_props, ref) => (
  <TileBase
    ref={ref}
    sx={{
      overflow: "hidden",
      position: "relative"
    }}
  >
    <WoordRdBaseWood
      sx={{
        top: "20%",
        transform: "rotate(15deg)"
      }}
    />

    <WoordRdBaseWood
      sx={{
        top: "60%",
        transform: "rotate(10deg)"
      }}
    />

    <WoordRdBaseWood
      sx={{
        left: "5%",
        top: "45%",
        transform: "rotate(-75deg)"
      }}
    />
  </TileBase>
))

TileWoodRd.displayName = "TileWoodRd"

export { TileHole, TileWoodRd }
