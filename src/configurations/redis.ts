import Redis from "ioredis"
import type { RedisOptions } from "ioredis"

import { serverRuntimeConfig } from "./runtimeConfig"

interface ICacheable {
  cacheKey: string
  hashKey?: string
  expiryMode: "EX"
  ttl: number
}

const redisConfig: RedisOptions = {
  autoResubscribe: false,
  keyPrefix: "FRONTEND_",
  lazyConnect: true,
  maxRetriesPerRequest: 1
}

const redisClient = new Redis(serverRuntimeConfig.REDIS_URL, redisConfig)

// ignore redis cache when developing and in build stage
if (process.env.NODE_ENV === "development" || process.env.npm_lifecycle_event === "build") {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  redisClient.on("error", (error: Readonly<Error>) => {
    if (error.message.includes("ECONNREFUSED")) {
      // empty
    } else if (serverRuntimeConfig.REDIS_URL !== "") {
      // log error if REDIS_URL is provided
      console.error(error)
    }
  })
}

const cacheable = <T extends unknown[], U>(fn: (...args: T) => Promise<U> | U, options: Readonly<ICacheable>) => {
  return async (...args: T): Promise<U> => {
    try {
      let result: U
      const cacheKey = options.cacheKey + args.join("_")
      result = await redisClient.get(cacheKey).then(async (redisResult) => {
        if (redisResult !== null) {
          return JSON.parse(redisResult) as U
        } else {
          result = await fn(...args)
          await redisClient.set(cacheKey, JSON.stringify(result), options.expiryMode, options.ttl)
          return result
        }
      })
      return result
    } catch (error) {
      // TODO: Record error
      console.log(error)
      return fn(...args)
    }
  }
}

export default cacheable
export { redisClient }
