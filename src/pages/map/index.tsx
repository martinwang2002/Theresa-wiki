/* eslint-disable react/jsx-max-depth */
// libs
import React from "react"
import Head from "next/head"
import type { GetStaticProps } from "next"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActionArea from "@mui/material/CardActionArea"
import Grid from "@mui/material/Grid"

// Components
import Page from "@/components/page/page"

// models
import { getZones } from "@/models/gamedata/excel/zoneTable"
import { getDisplayZoneName } from "@/models/utils/getDisplayZoneName"
import type { IZoneInfo } from "@/models/gamedata/excel/zoneTable"
import { arknightsNameByServer } from "@/models/utils/arknightsNameByServer"

// styles
import style from "./[zoneId]/[stageId].module.scss"

interface ZoneProps{
  server: "CN" | "JP" | "KR" | "TW" | "US"
  zones: IZoneInfo[]
}

export const getStaticProps: GetStaticProps<ZoneProps> = async () => {
  if (process.env.npm_lifecycle_event === "build") {
    return { notFound: true }
  }

  const zones = await getZones()

  return {
    props: {
      server: "CN",
      zones: zones
    },
    revalidate: 3600
  }
}

class Zone extends React.PureComponent<ZoneProps> {
  public render (): React.ReactNode {
    const { server, zones } = this.props

    return (
      <Page>
        <Head>

          <title>
            地图 | Theresa.wiki
          </title>

          <meta
            content={[arknightsNameByServer(server)].join(", ")}
            name="keywords"
          />
        </Head>

        <h1 className={style["h1-title"]}>
          <span>
            地图
          </span>

          <span className={style["h1-title-badge"]}>
            {server}
          </span>
        </h1>

        <Grid
          container
          spacing={2}
        >
          {zones.map((zoneInfo) => {
            return (
              <Grid
                item
                key={zoneInfo.zoneID}
                xs={4}
              >
                <Card
                  sx={{ maxWidth: 375 }}
                >
                  <CardActionArea
                    href={`/map/${zoneInfo.zoneID}`}
                  >

                    <CardContent sx={{ padding: "0.75em" }}>
                      {getDisplayZoneName(zoneInfo)}
                    </CardContent>
                  </CardActionArea>
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
