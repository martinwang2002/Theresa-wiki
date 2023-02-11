import { StatusCodes } from "http-status-codes"
import type { NextApiRequest, NextApiResponse } from "next"
import { serialize as serializeUri } from "uri-js"

import { clearAllCache, redisClient } from "@/configurations/cache"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

import { getStagesByZoneId } from "@/models/gamedata/excel/stageTable"
import { getZones } from "@/models/gamedata/excel/zoneTable"

const addRevalidatePaths = async (): Promise<void> => {
  const zones = await getZones()

  const urls: string[] = []

  for (const zone of zones.reverse()) {
    const stages = await getStagesByZoneId(zone.zoneID)

    const stageUrls = stages.filter((stageInfo) => {
      return "isStoryOnly" in stageInfo ? !stageInfo.isStoryOnly : true
    }).map((stageInfo) => {
      return [`/map/${zone.zoneID}/${stageInfo.stageId}`, `/widget/map/${stageInfo.stageId}/scene`]
    }).flat()
    urls.push(...stageUrls)
  }

  const revalidatePaths = ["/map", ...urls]
  await redisClient.rpush("_revalidatePaths", ...revalidatePaths)
}

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

    const numPendingRevalidation = redisClient.llen("_revalidatePaths")

    await Promise.all([s3Version, cachedVersion, numPendingRevalidation]).then(async ([s3VersionString, cachedVersionString, numPendingRevalidationNumber]) => {
      if (s3VersionString !== cachedVersionString) {
        // purge data
        await clearAllCache()

        await redisClient.set("_s3Version", s3VersionString, "EX", timeout)
          .then(() => {
            // trigger revalidtion of all paths
            addRevalidatePaths().catch((reason) => {
              console.warn("failed to add revalidate paths", reason)
            })
          })
          .catch((reason) => {
            console.warn("failed to set s3Version in redis cache", reason)
          })
        return
      }

      const batchRevalidate = 25
      if (numPendingRevalidationNumber) {
        const revalidationPromise = Promise.resolve().then(async () => {
        // trigger revalidation of all paths
          const revalidatePaths = await redisClient.lpop("_revalidatePaths", Math.min(batchRevalidate, numPendingRevalidationNumber))

          if (!revalidatePaths) {
            return
          }

          for (const revalidatePath of revalidatePaths) {
            console.log("revalidating", revalidatePath)
            await res.revalidate(revalidatePath).catch((reason) => {
              console.warn("failed to revalidate", revalidatePath, reason)
            })
          }
        })
        revalidationPromise.catch((reason) => {
          console.warn("failed to revalidate", reason)
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

export { addRevalidatePaths }
export default health
