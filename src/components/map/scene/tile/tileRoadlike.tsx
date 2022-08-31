import { orange, grey, lightBlue } from "@mui/material/colors"
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
