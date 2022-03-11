/* eslint-disable react/jsx-max-depth */
// libs
import React from "react"
import Head from "next/head"
import type { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next"
import { pick as lodashPick } from "lodash"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActionArea from "@mui/material/CardActionArea"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"
import Link from "next/link"

// Components
import Page from "@/components/page/page"
import MapPreviewImage from "@/components/map/mapPreviewImage"

// configs
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

// models
import { getStagesByZoneId } from "@/models/gamedata/excel/stageTable"
import type { IStageInfo } from "@/models/gamedata/excel/stageTable"
import { zoneIds, getZoneInfo } from "@/models/gamedata/excel/zoneTable"
import { getDisplayZoneName } from "@/models/utils/getDisplayZoneName"
import type { IZoneInfo } from "@/models/gamedata/excel/zoneTable"
import { arknightsNameByServer } from "@/models/utils/arknightsNameByServer"

// styles
import style from "./[stageId].module.scss"

interface ZoneProps{
  server: "CN" | "JP" | "KR" | "TW" | "US"
  zoneId: string
  zoneInfo: IZoneInfo
  stages: Pick<IStageInfo, "code" | "difficulty" | "name" | "stageId">[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  // ignore SSR when developing and in build stage
  if (serverRuntimeConfig.NO_DYNAMIC_ROUTES) {
    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths: [], fallback: "blocking" }
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
    return { paths, fallback: "blocking" }
  }
}

// FIXME: eslint
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

  const zoneInfo = await getZoneInfo(zoneId)

  const stages = await getStagesByZoneId(zoneId)
  const pickedStages = stages.map((stageInfo) => {
    return lodashPick(stageInfo, ["stageId", "code", "name", "difficulty"])
  })

  return {
    props: {
      server: "CN",
      zoneId: zoneId,
      zoneInfo: zoneInfo,
      stages: pickedStages
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
            {`${displayZoneName} ${server}`}

            {" "}
            | Theresa.wiki
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

        <h1 className={style["h1-title"]}>
          <span>
            {zoneInfo.zoneNameSecond}
          </span>

          <span className={style["h1-title-badge"]}>
            {server}
          </span>
        </h1>

        <Grid
          columns={{ xs: 4, sm: 8, md: 12 }}
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
                    passHref
                  >
                    <CardActionArea >
                      <CardMedia sx={{
                        aspectRatio: "16/9",
                        display: "block",
                        position: "relative",
                        margin: "auto",
                        width: "100%"
                      }}
                      >
                        <MapPreviewImage stageId={stageInfo.stageId} />
                      </CardMedia>

                      <CardContent sx={{ padding: "0.75em" }}>
                        {stageInfo.difficulty === "FOUR_STAR" &&
                        <span className={style["h1-four-star-badge"]}>
                          突袭
                        </span>}

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
