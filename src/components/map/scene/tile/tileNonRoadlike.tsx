/* eslint-disable react/jsx-props-no-spreading */
import React from "react"

import { grey } from "@mui/material/colors"
import { styled } from "@mui/system"

import { TileBase } from "./tileBase"

export const TileEmpty = TileBase

export const TileForbidden = TileBase

const Hole = styled("span")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? grey[900] : grey[100],
  height: "33%",
  margin: "auto",
  width: "33%"
}))

const TileHole = React.forwardRef<HTMLSpanElement>((props, ref) => (
  <TileBase
    ref={ref}
    {...props}
  >
    <Hole />
  </TileBase>
))

TileHole.displayName = "TileHole"

export { TileHole }
