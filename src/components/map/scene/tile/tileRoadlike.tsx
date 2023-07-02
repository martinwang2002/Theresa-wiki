/* eslint-disable react/no-multi-comp */
import React from "react"

import ScaleIcon from "@mui/icons-material/Scale"
import { amber, green, grey, lightBlue, orange } from "@mui/material/colors"
import { styled } from "@mui/system"

import { TileBase } from "./tileBase"

const TileRoadlike = styled(TileBase)({
  borderRadius: "5%",
  height: "95%",
  margin: "2.5%",
  width: "95%"
})

export const TileFloor = styled(TileRoadlike)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? grey[200] : grey[800]
}))

export const TileRoad = styled(TileRoadlike)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? orange[100] : orange[300]
}))

export const TileFence = styled(TileRoad)({
  borderColor: grey[500],
  borderRadius: "5%",
  borderStyle: "solid"
})

export const TileFenceBound = TileFence

export const TileWall = styled(TileRoadlike)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? orange[200] : orange[600]
}))

export const TileIcestr = styled(TileRoadlike)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? lightBlue[100] : lightBlue[300]
}))

export const TileIceturLt = styled(TileIcestr)({
  borderTopLeftRadius: "85%"
})

export const TileIceturRt = styled(TileIcestr)({
  borderTopRightRadius: "85%"
})

export const TileIceturLb = styled(TileIcestr)({
  borderBottomLeftRadius: "85%"
})

export const TileIceturRb = styled(TileIcestr)({
  borderBottomRightRadius: "85%"
})

export const TileMire = styled(TileRoadlike)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? green[500] : green[900]
}))

export const TileRistarRoad = styled(TileRoadlike)({
  background: `linear-gradient(to bottom, ${amber[200]} 0, ${amber[800]} 33%, ${amber[200]} 34%, ${amber[800]} 66%, ${amber[200]} 67%, ${amber[800]} 100%)`
})

export const RistarRoadForbiddenCross = styled("span")({
  backgroundColor: "black",
  borderRadius: "1px",
  height: "5%",
  left: "0",
  position: "absolute",
  top: "50%",
  width: "100%"
})

const TileRistarRoadForbidden = React.forwardRef<HTMLSpanElement>((_props, ref) => (
  <TileRistarRoad
    ref={ref}
  >
    <RistarRoadForbiddenCross
      sx={{
        transform: "rotate(45deg)"
      }}
    />

    <RistarRoadForbiddenCross
      sx={{
        top: "50%",
        transform: "rotate(-45deg)"
      }}
    />
  </TileRistarRoad>
))

TileRistarRoadForbidden.displayName = "TileRistarRoadForbidden"

const TileGrvtyBtn = React.forwardRef<HTMLSpanElement>((_props, ref) => (
  <TileRoad
    ref={ref}
  >
    <ScaleIcon
      sx={{
        color: "black",
        height: "75%",
        margin: "auto",
        width: "75%"
      }}
    />
  </TileRoad>
))

TileGrvtyBtn.displayName = "TileGrvtyBtn"

export { TileRistarRoadForbidden, TileGrvtyBtn }
