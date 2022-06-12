import React from "react"

import { styled } from "@mui/system"

import ByIcon from "./ByIcon"
import CcIcon from "./CcIcon"
import NcIcon from "./NcIcon"
import SaIcon from "./SaIcon"

const LinkItem = styled("a")({
  "&:hover": {
    color: "#fff",
    cursor: "pointer"
  },
  color: "inherit",
  margin: "0.2em auto",
  textDecoration: "none",
  transition: "color 500ms ease"
})

class CcByNcSaSvgLink extends React.PureComponent {
  public render (): React.ReactNode {
    return (
      <LinkItem
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
        rel="noreferrer"
        sx={{
          "& svg": {
            marginLeft: "0.05em",
            marginRight: "0.05em"
          },
          margin: "auto"

        }}
        target="_blank"
      >
        <CcIcon />

        <ByIcon />

        <NcIcon />

        <SaIcon />
      </LinkItem>
    )
  }
}

export default CcByNcSaSvgLink
