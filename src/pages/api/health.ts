import { StatusCodes } from "http-status-codes"
import type { NextApiRequest, NextApiResponse } from "next"
import { serialize as serializeUri } from "uri-js"

import { redisClient } from "@/configurations/redis"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

import { getZones, isZoneValid } from "@/models/gamedata/excel/zoneTable"

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const health = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const timeout = 3600

  try {
    // redis cache handling
    const s3Version = fetch(serializeUri({
      ...serverRuntimeConfig.THERESA_S3,
      path: "/api/v0/AK/CN/Android/version"
    })).then(async (response) => response.text())

    const cachedVersion = redisClient.get("_s3Version")

    await Promise.all([s3Version, cachedVersion]).then(([s3VersionString, cachedVersionString]) => {
      if (s3VersionString !== cachedVersionString) {
        redisClient.set("_s3Version", s3VersionString, "EX", timeout)
          .then(async () => {
            // purge data
            await redisClient.flushdb()

            const zones = await getZones()

            const isZoneValids = await Promise.all(zones.map(async (zone) => {
              if (zone.type === "ACTIVITY") {
                return isZoneValid(zone.zoneID)
              }

              return false
            }))

            const zonesUrls = zones.filter((_zone, index) => {
              return isZoneValids[index]
            }).map((zone) => {
              return `/map/${zone.zoneID}`
            })

            const revalidatePaths = ["/map", ...zonesUrls]

            await Promise.all(
              revalidatePaths.map(async (path) => {
                return res.revalidate(path)
              })
            ).catch((error) => {
              console.warn("failed to purge page data", error)
            })
          })
          .catch((reason) => {
            console.warn("failed to set s3Version in redis cache", reason)
          })
      }
    })

    res.status(StatusCodes.OK).json({
      health: "ok"
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error,
      health: "error"
    })
  }
}

export default health
