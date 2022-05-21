// libs
import React from "react"
import SecurityIcon from "@mui/icons-material/Security"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory"
import CodeIcon from "@mui/icons-material/Code"
import SupportIcon from "@mui/icons-material/Support"

// components
import FooterLink from "./footerLink"

// models
import { publicRuntimeConfig } from "@/configurations/runtimeConfig"

// styles
import style from "./page.module.scss"

const iconSx = {
  verticalAlign: "bottom",
  marginRight: "0.25em",
  fontSize: "1.25em"
}

class Footer extends React.PureComponent {
  public render (): React.ReactNode {
    return (
      <div className={style.footer}>
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

        <div className={style.version}>
          {publicRuntimeConfig.THERESA_WIKI_VERSION}

          {" "}

          {publicRuntimeConfig.GIT_COMMIT}
        </div>
      </div>
    )
  }
}

export default Footer
