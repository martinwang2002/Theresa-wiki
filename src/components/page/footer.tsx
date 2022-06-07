import React from "react"

import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory"
import CodeIcon from "@mui/icons-material/Code"
import SecurityIcon from "@mui/icons-material/Security"
import SupportIcon from "@mui/icons-material/Support"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"
import { styled } from "@mui/system"

import { publicRuntimeConfig } from "@/configurations/runtimeConfig"

import FooterLink from "./footerLink"
import style from "./page.module.scss"

const iconSx = {
  fontSize: "1.25em",
  marginRight: "0.25em",
  verticalAlign: "bottom"
}

const FooterDiv = styled("div")({
  backgroundColor: "#18191a",
  display: "flex",
  flexDirection: "column",
  minHeight: "13rem",
  textAlign: "center"
})

const FooterVersion = styled("div")({
  color: "#d2dbd9",
  fontFamily: "\"Roboto Mono\", monospace",
  fontSize: "x-small",
  marginBottom: "1em",
  textTransform: "uppercase"
})

class Footer extends React.PureComponent {
  public render (): React.ReactNode {
    return (
      <FooterDiv>
        <div className={style.footer_links}>

          <FooterLink
            href="/about/privacy"
            icon={<SecurityIcon sx={iconSx} />}
            text="隐私权政策"
          />

          <FooterLink
            href="/about/credits"
            icon={<VerifiedOutlinedIcon sx={iconSx} />}
            text="内容来源"
          />

          <FooterLink
            href="/about/changelog"
            icon={<ChangeHistoryIcon sx={iconSx} />}
            text="更新记录"
          />

          <FooterLink
            href="/about/source-code"
            icon={<CodeIcon sx={iconSx} />}
            text="源代码"
          />

          <FooterLink
            href="/about/contact"
            icon={<SupportIcon sx={iconSx} />}
            text="联系站长"
          />

        </div>

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
