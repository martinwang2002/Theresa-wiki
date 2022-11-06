/* eslint-disable react/jsx-max-depth */
import React from "react"

import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { groupBy, sortBy } from "lodash"
import type { GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"

import TopBadge from "@/components/common/badge/topBadge"
import StyledBreadcrumbs from "@/components/common/BreadcrumbNavigation/styledBreadcrumbs"
import HeadingAnchor from "@/components/common/ToC/headingAnchor"
import WithTableOfContents from "@/components/common/ToC/withTableOfContents"
import Page from "@/components/page/page"

import { getCustomZones } from "@/models/gamedata/excel/zoneTable"
import type { ICustomZoneInfo } from "@/models/gamedata/excel/zoneTable"
import { arknightsNameByServer } from "@/models/utils/arknightsNameByServer"
import { getDisplayZoneName } from "@/models/utils/getDisplayZoneName"

interface ZoneProps {
  server: "CN" | "JP" | "KR" | "TW" | "US"
  zones: ICustomZoneInfo[]
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

  const zones = await getCustomZones()

  return {
    props: {
      server: "CN",
      zones
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

        <StyledBreadcrumbs>
          <Typography
            color="text.primary"
            sx={{
              fontWeight: "bold"
            }}
          >
            地图
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
            地图
          </span>

          <TopBadge
            sx={{
              backgroundColor: "warning.main"
            }}
          >
            {server}
          </TopBadge>
        </Typography>

        <WithTableOfContents>
          {
            sortedZones.map((groupedZone) => {
              const [zoneType, zonesInSpecificZoneType] = groupedZone
              return (
                <React.Fragment key={zoneType}>
                  <HeadingAnchor
                    id={zoneType}
                    text={zoneType}
                  />

                  <Grid
                    columns={{ md: 12, sm: 8, xs: 4 }}
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
                              legacyBehavior
                              passHref
                              prefetch={false}
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
