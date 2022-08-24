import { StatusCodes } from "http-status-codes"
import type { NextApiRequest, NextApiResponse } from "next"
import { serialize as serializeUri } from "uri-js"

import { redisClient } from "@/configurations/redis"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const health = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const getRedisHealth = redisClient.get("_get_health")
    const timeout = 1
    const setRedisHealth = redisClient.set("_set_health", "ok", "EX", timeout)
    const getS3HealthByVersion = await fetch(serializeUri({
      ...serverRuntimeConfig.THERESA_S3,
      path: "/api/v0/AK/CN/Android/version"
    }))

    const promises = [getRedisHealth, setRedisHealth, getS3HealthByVersion]
    await Promise.all(promises)

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
