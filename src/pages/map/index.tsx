/* eslint-disable react/jsx-max-depth */
import React from "react"

import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import { groupBy, sortBy } from "lodash"
import type { GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"

import HeadingAnchor from "@/components/common/ToC/headingAnchor"
import WithTableOfContents from "@/components/common/ToC/withTableOfContents"
import Page from "@/components/page/page"

import { getZones } from "@/models/gamedata/excel/zoneTable"
import type { IZoneInfo } from "@/models/gamedata/excel/zoneTable"
import { arknightsNameByServer } from "@/models/utils/arknightsNameByServer"
import { getDisplayZoneName } from "@/models/utils/getDisplayZoneName"

import style from "./[zoneId]/[stageId].module.scss"

interface ZoneProps {
  server: "CN" | "JP" | "KR" | "TW" | "US"
  zones: IZoneInfo[]
}

export const getStaticProps: GetStaticProps<ZoneProps> = async () => {
  if (process.env.npm_lifecycle_event === "build") {
    return {
      props: {
        server: "CN",
        zones: []
      },
      revalidate: 1
    }
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

const zoneOrder = ["MAINLINE", "BRANCHLINE", "SIDESTORY", "WEEKLY", "CAMPAIGN", "ROGUELIKE"]

class Zone extends React.PureComponent<ZoneProps> {
  public render (): React.ReactNode {
    const { server, zones } = this.props

    // const groupedZones = mapValues(groupBy(zones, "type"),
    //   clist => clist.map(car => omit(car, "make")))
    const groupedZones = groupBy(zones, "type")

    const notPresentIndex = -1
    const lenGroupedZones = Object.keys(groupedZones).length

    const sortedZones = sortBy(Object.entries(groupedZones), [(entry): number => {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const key = entry[0]

      const order = zoneOrder.indexOf(key)
      return order !== notPresentIndex ? order : lenGroupedZones
    }])

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

        <WithTableOfContents>
          {
            sortedZones.map((groupedZone) => {
              const [zoneType, zonesInSpecificZoneType] = groupedZone
              return (
                <React.Fragment key={zoneType}>
                  <HeadingAnchor
                    id={zoneType}
                    sx={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                    text={zoneType}
                  />

                  <Grid
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    container
                    spacing={2}
                  >
                    {zonesInSpecificZoneType.map((zoneInfo) => {
                      return (
                        <Grid
                          item
                          key={zoneInfo.zoneID}
                          xs={4}
                        >
                          <Card>
                            <Link
                              href={`/map/${zoneInfo.zoneID}`}
                              passHref
                            >
                              <CardActionArea>
                                <CardContent sx={{ padding: "0.75em" }}>
                                  {getDisplayZoneName(zoneInfo)}
                                </CardContent>
                              </CardActionArea>
                            </Link>
                          </Card>
                        </Grid>
                      )
                    })}
                  </Grid>
                </React.Fragment>
              )
            })
          }
        </WithTableOfContents>

      </Page>
    )
  }
}

export default Zone
