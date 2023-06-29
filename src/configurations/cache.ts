import Redis from "ioredis"
import type { RedisOptions } from "ioredis"
import { LRUCache } from "lru-cache"

import { serverRuntimeConfig } from "./runtimeConfig"

const oneMinute = 60_000

const lruCache = new LRUCache({
  max: 25,
  ttl: oneMinute
})

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

const cacheable = <FunctionArguments extends unknown[], FunctionReturn extends object | undefined>(
  fn: (...args: FunctionArguments) => FunctionReturn | Promise<FunctionReturn>,
  options: Readonly<ICacheable>
) => {
  return async (...args: FunctionArguments): Promise<FunctionReturn> => {
    try {
      let result: FunctionReturn
      const cacheKey = options.cacheKey + args.join("_")

      const callFunctionAndCache = async (): Promise<FunctionReturn> => {
        try {
          result = await fn(...args)
        } catch (error) {
          console.error("cachable function error", error, fn.name)
        }
        if (result === undefined) {
          throw new Error("cachable function result is undefined")
        }
        lruCache.set(cacheKey, result)
        redisClient.set(cacheKey, JSON.stringify(result), options.expiryMode, options.ttl).catch((error) => {
          console.error("redis set error", error)
        })
        return result
      }

      if (lruCache.has(cacheKey) && lruCache.get(cacheKey) !== undefined) {
        return lruCache.get(cacheKey) as FunctionReturn
      } else {
        result = await redisClient.get(cacheKey).then(async (redisResult) => {
          if (redisResult !== null) {
            try {
              const parsedResult = JSON.parse(redisResult) as Exclude<FunctionReturn, undefined>
              lruCache.set(cacheKey, parsedResult)
              return parsedResult
            } catch (error) {
              console.log("cachekey", cacheKey, "redisResult", redisResult)
              return callFunctionAndCache()
            }
          } else {
            return callFunctionAndCache()
          }
        }).catch(async (error) => {
          console.error("redis get fatal error", error)
          return fn(...args)
        })
        return result
      }
    } catch (error) {
      // TODO: Record error
      console.log(error)
      return fn(...args)
    }
  }
}

export const clearAllCache = async (): Promise<void> => {
  lruCache.clear()
  await redisClient.flushall()
}

export default cacheable
export { redisClient }
