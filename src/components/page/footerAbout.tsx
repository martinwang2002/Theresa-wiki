import React from "react"

import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory"
import CodeIcon from "@mui/icons-material/Code"
import RefreshIcon from "@mui/icons-material/Refresh"
import SecurityIcon from "@mui/icons-material/Security"
import SupportIcon from "@mui/icons-material/Support"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"
import WidgetsIcon from "@mui/icons-material/Widgets"
import Grid from "@mui/material/Grid"
import { styled } from "@mui/system"
import { useRouter } from "next/router"

import MissionIcon from "@/components/icon/missionIcon"

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

export function FooterAbout (): JSX.Element {
  const router = useRouter()

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
              textUnderlineOffset: 2
            }}
            target="_blank"
          >
            署名-非商业性使用-

            <br />

            相同方式共享 4.0 国际

            <br />

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

        <FooterLink
          href="/about/svg-share"
          icon={<MissionIcon sx={{ ...iconSx, color: "primary.main", verticalAlign: "middle" }} />}
          text="SVG 图标共享"
        />

        <FooterLink
          href="/about/widget"
          icon={<WidgetsIcon sx={{ ...iconSx, color: "primary.main", verticalAlign: "middle" }} />}
          text="小组件"
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

        <FooterLink
          href={{
            pathname: "/about/purge",
            query: {
              path: router.pathname
            }
          }}
          icon={<RefreshIcon sx={iconSx} />}
          text="刷新此页面"
        />
      </Grid>
    </Grid>
  )
}

export default FooterAbout
