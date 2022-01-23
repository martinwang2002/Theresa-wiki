import Redis from "ioredis"

interface ICacheable {
  cacheKey: string
  hashKey?: string
  expiryMode?: string | undefined
  ttl?: number | undefined
}

const redisConfig: Redis.RedisOptions = {
  autoResubscribe: false,
  lazyConnect: true,
  keyPrefix: "FRONTEND_"
}

const redisClient = new Redis(process.env.REDIS_URL, redisConfig)

// ignore redis cache when developing and in build stage
if (process.env.NODE_ENV === "development" || process.env.npm_lifecycle_event === "build") {
  redisClient.on("error", (error: Readonly<Error>) => {
    if (error.message.includes("ECONNREFUSED")) {
      // empty
    } else {
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
