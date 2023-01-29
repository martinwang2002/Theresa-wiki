import React from "react"

import { styled } from "@mui/system"
import Link from "next/link"

import TitleSvg from "./titleSvg"

const titleIconBreakpoint = 400

const TitleSpan = styled("span")(({ theme }) => ({
  cursor: "pointer",
  height: "32px",
  overflow: "hidden",
  [theme.breakpoints.down(titleIconBreakpoint)]: {
    width: 96
  }
}))

class Title extends React.PureComponent {
  public render (): React.ReactNode {
    return (
      <Link
        href="/"
        passHref
      >
        <TitleSpan>
          <TitleSvg
            sx={{
              color: "text.primary",
              height: "32px",
              width: "260px"
            }}
          />
        </TitleSpan>
      </Link>
    )
  }
}

export default Title
