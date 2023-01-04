import React from "react"

import { blue, grey, lightBlue } from "@mui/material/colors"
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

export { TileHole }
