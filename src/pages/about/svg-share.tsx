/* eslint-disable react/jsx-max-depth */
import React from "react"

import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Head from "next/head"

import StyledLink from "@/components/common/styledLink"
import CostIcon from "@/components/icon/costIcon"
import LifePointIcon from "@/components/icon/lifePointIcon"
import MissionIcon from "@/components/icon/missionIcon"
import BattleIcon from "@/components/icon/ui_home/battleIcon"
import Page from "@/components/page/page"

export default function SvgShare (): React.ReactNode {
  return (
    <Page>
      <Head>

        <title>
          SVG图标共享计划 | Theresa.wiki
        </title>

      </Head>

      <Typography
        sx={{
          fontFamily: "\"Dream Han Serif CN W27\"",
          my: 2
        }}
        variant="h3"
      >
        SVG 共享计划
      </Typography>

      <Typography
        variant="subtitle1"
      >
        为何要重新绘制 SVG 图标？请参考
        <StyledLink
          href="https://github.blog/2016-02-22-delivering-octicons-with-svg/"
        >
          Delivering Octicons with SVG | The Github Blog
        </StyledLink>
      </Typography>

      <Typography
        variant="subtitle1"
      >
        图标源代码以及 illustrator 文件 请前往
        <StyledLink
          href="https://github.com/martinwang2002/Theresa-wiki/tree/master/src/arts"
        >
          martinwang2002/Theresa-wiki/tree/master/src/arts
        </StyledLink>
      </Typography>

      <Grid
        columns={{ md: 12, sm: 8, xs: 4 }}
        container
        spacing={2}
      >
        <Grid
          item
          xs={3}
        >
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <MissionIcon sx={{ color: "primary.main", fontSize: "h3.fontSize" }} />

              <Typography>
                三星通关
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={3}
        >
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <CostIcon sx={{ fontSize: "h3.fontSize" }} />

              <Typography>
                费用
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={3}
        >
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <LifePointIcon sx={{ fontSize: "h3.fontSize" }} />

              <Typography>
                生命值
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={3}
        >
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <BattleIcon sx={{ fontSize: "h3.fontSize" }} />

              <Typography>
                作战
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  )
}
