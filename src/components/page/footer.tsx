// libs
import React from "react"
import SecurityIcon from "@mui/icons-material/Security"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"
// import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory"

// components
import FooterLink from "./footerLink"

// models
import { publicRuntimeConfig } from "@/configurations/runtimeConfig"
import { THERESA_WIKI_VERSION } from "@/models/changelog"

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

          {/* <FooterLink
            href="/about/changelog"
            icon={<ChangeHistoryIcon sx={iconSx} />}
            text="更新记录"
          /> */}

        </div>

        <div className={style.version}>
          {THERESA_WIKI_VERSION}

          {" "}

          {publicRuntimeConfig.GIT_COMMIT}
        </div>
      </div>
    )
  }
}

export default Footer
