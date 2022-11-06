/* eslint-disable react/jsx-max-depth */
import React from "react"

import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { pick as lodashPick } from "lodash"
import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import Head from "next/head"
import Link from "next/link"

import InlineBadge from "@/components/common/badge/inlineBadge"
import TopBadge from "@/components/common/badge/topBadge"
import StyledBreadcrumbs from "@/components/common/BreadcrumbNavigation/styledBreadcrumbs"
import StyledLink from "@/components/common/styledLink"
import MapPreviewImage from "@/components/map/mapPreview/mapPreviewImage"
import Page from "@/components/page/page"

import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

import { getStagesByZoneId } from "@/models/gamedata/excel/stageTable"
import type { ICustomRoguelikeTopicDetailStageInfo, IStageInfo } from "@/models/gamedata/excel/stageTable"
import { getCustomZoneInfo, zoneIds } from "@/models/gamedata/excel/zoneTable"
import type { IZoneInfo } from "@/models/gamedata/excel/zoneTable"
import { arknightsNameByServer } from "@/models/utils/arknightsNameByServer"
import { getDisplayZoneName } from "@/models/utils/getDisplayZoneName"

interface ZoneProps {
  server: "CN" | "JP" | "KR" | "TW" | "US"
  zoneId: string
  zoneInfo: IZoneInfo
  stages: Pick<ICustomRoguelikeTopicDetailStageInfo, "code" | "difficulty" | "name" | "stageId">[] | Pick<IStageInfo, "code" | "diffGroup" | "difficulty" | "name" | "stageId">[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  // ignore SSR when developing and in build stage
  if (serverRuntimeConfig.NO_DYNAMIC_ROUTES) {
    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { fallback: "blocking", paths: [] }
  } else {
    const _zoneIds = await zoneIds()

    const paths = _zoneIds.map((zoneId) => ({
      params: {
        server: "CN",
        zoneId
      }
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { fallback: "blocking", paths }
  }
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const getStaticProps: GetStaticProps<ZoneProps> = async (context: Readonly<GetStaticPropsContext>) => {
  const _zoneIds = await zoneIds()

  const { params } = context
  const zoneId = String(params?.zoneId)

  try {
    if (_zoneIds.includes(zoneId)) {
      // zoneId exists
      // render page
    } else {
      return {
        notFound: true
      }
    }
  } catch {
    return {
      notFound: true
    }
  }

  const zoneInfo = await getCustomZoneInfo(zoneId)

  const stages = await getStagesByZoneId(zoneId)

  // filter isStoryOnly stages
  const nonStoryOnlyStages = stages.filter((stageInfo) => {
    return "isStoryOnly" in stageInfo ? !stageInfo.isStoryOnly : true
  })

  const pickedStages = nonStoryOnlyStages.map((stageInfo) => {
    if ("diffGroup" in stageInfo) {
      return lodashPick(stageInfo, ["code", "difficulty", "diffGroup", "name", "stageId"])
    } else {
      return lodashPick(stageInfo, ["stageId", "code", "name", "difficulty"])
    }
  })

  return {
    props: {
      server: "CN",
      stages: pickedStages,
      zoneId,
      zoneInfo
    },
    revalidate: 3600
  }
}

class Zone extends React.PureComponent<ZoneProps> {
  public render (): React.ReactNode {
    const { server, zoneId, zoneInfo, stages } = this.props

    const displayZoneName = getDisplayZoneName(zoneInfo)

    return (
      <Page>
        <Head>

          <title>
            {`${displayZoneName} ${server} | Theresa.wiki`}
          </title>

          <meta
            content={zoneInfo.zoneNameSecond}
            name="descirption"
          />

          <meta
            content={[displayZoneName, arknightsNameByServer(server)].join(", ")}
            name="keywords"
          />
        </Head>

        <StyledBreadcrumbs>
          <StyledLink
            color="inherit"
            href="/map"
          >
            地图
          </StyledLink>

          <Typography
            color="text.primary"
            sx={{
              fontWeight: "bold"
            }}
          >
            {displayZoneName}
          </Typography>
        </StyledBreadcrumbs>

        <Typography
          sx={{
            fontFamily: "\"Dream Han Serif CN W27\"",
            my: 2
          }}
          variant="h3"
        >
          <span>
            {displayZoneName}
          </span>

          <TopBadge
            sx={{
              backgroundColor: "warning.main"
            }}
          >
            {server}
          </TopBadge>
        </Typography>

        <Grid
          columns={{ md: 12, sm: 8, xs: 4 }}
          container
          spacing={2}
        >
          {stages.map((stageInfo) => {
            return (
              <Grid
                item
                key={stageInfo.stageId}
                xs={4}
              >
                <Card>
                  <Link
                    href={`/map/${zoneId}/${stageInfo.stageId}`}
                    legacyBehavior
                    passHref
                  >
                    <CardActionArea >
                      <CardMedia
                        sx={{
                          aspectRatio: "16/9",
                          display: "block",
                          margin: "auto",
                          position: "relative",
                          width: "100%"
                        }}
                      >
                        <MapPreviewImage stageId={stageInfo.stageId} />
                      </CardMedia>

                      <CardContent sx={{ padding: "0.75em" }}>
                        {stageInfo.difficulty === "FOUR_STAR" &&
                        <InlineBadge
                          sx={{
                            backgroundColor: "error.main"
                          }}
                        >
                          突袭
                        </InlineBadge>}

                        {"diffGroup" in stageInfo && stageInfo.diffGroup === "EASY" &&
                        <InlineBadge
                          sx={{
                            backgroundColor: "primary.main"
                          }}
                        >
                          剧情体验
                        </InlineBadge>}

                        {"diffGroup" in stageInfo && stageInfo.diffGroup === "TOUGH" &&
                        <InlineBadge
                          sx={{
                            backgroundColor: "error.main"
                          }}
                        >
                          磨难险境
                        </InlineBadge>}

                        {`${stageInfo.code} ${stageInfo.name}`}
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Page>
    )
  }
}

export default Zone
