import React from "react"

import { styled } from "@mui/system"

import { publicRuntimeConfig } from "@/configurations/runtimeConfig"

import FooterAbout from "./footerAbout"

const FooterDiv = styled("div")({
  backgroundColor: "#18191a",
  color: "#d2dbd9",
  display: "flex",
  flexDirection: "column",
  textAlign: "center"
})

const FooterVersion = styled("div")({
  fontFamily: "\"Roboto Mono\", monospace",
  fontSize: "x-small",
  marginBottom: "1em",
  textTransform: "uppercase"
})

class Footer extends React.PureComponent {
  public render (): React.ReactNode {
    return (
      <FooterDiv>
        <FooterAbout />

        <FooterVersion>
          {publicRuntimeConfig.THERESA_WIKI_VERSION}

          {" "}

          {publicRuntimeConfig.GIT_COMMIT}
        </FooterVersion>
      </FooterDiv>
    )
  }
}

export default Footer
