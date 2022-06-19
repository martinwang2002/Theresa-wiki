import React from "react"

import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory"
import CodeIcon from "@mui/icons-material/Code"
import SecurityIcon from "@mui/icons-material/Security"
import SupportIcon from "@mui/icons-material/Support"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"
import Grid from "@mui/material/Grid"
import { styled } from "@mui/system"

import CcByNcSaSvgLink from "./creativecommons/CcByNcSaSvgLink"
import FooterLink from "./footerLink"

const iconSx = {
  fontSize: "1.25em",
  marginRight: "0.25em",
  verticalAlign: "bottom"
}

const CcByNcSaLink = styled("a")({
  "&:hover": {
    color: "#fff",
    cursor: "pointer"
  },
  color: "inherit",
  margin: "0.2em auto",
  textDecoration: "none",
  transition: "color 500ms ease"
})

class Footer extends React.PureComponent {
  public render (): React.ReactNode {
    return (
      <Grid
        container
        spacing={2}
        sx={{
          marginY: "1em"
        }}
      >
        <Grid
          item
          sm={4}
          xs={12}
        >
          <div style={{ fontSize: "small", margin: "auto", maxWidth: "13em" }}>
            <CcByNcSaSvgLink />

            <br />

            本站采用

            <br />

            <CcByNcSaLink
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              rel="noreferrer"
              sx={{
                textDecorationColor: "#fff",
                textDecorationLine: "underline",
                textDecorationStyle: "dashed",
                textUnderlineOffset: 2,
                whiteSpace: "break-spaces"
              }}
              target="_blank"
            >
              署名-非商业性使用-

              {"\n"}

              相同方式共享 4.0 国际

              {"\n"}

              (CC BY-NC-SA 4.0)
            </CcByNcSaLink>

            <br />

            协议进行许可。
          </div>
        </Grid>

        <Grid
          item
          sm={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "auto"
          }}
          xs={12}
        >
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
        </Grid>

        <Grid
          item
          sm={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "auto"
          }}
          xs={12}
        >
          <FooterLink
            href="/about/source-code"
            icon={<CodeIcon sx={iconSx} />}
            text="源代码"
          />

          <FooterLink
            href="/about/changelog"
            icon={<ChangeHistoryIcon sx={iconSx} />}
            text="更新记录"
          />

          <FooterLink
            href="/about/contact"
            icon={<SupportIcon sx={iconSx} />}
            text="联系站长"
          />
        </Grid>
      </Grid>
    )
  }
}

export default Footer
