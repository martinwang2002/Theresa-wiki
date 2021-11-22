import Redis from "ioredis"

const redisConfig: Redis.RedisOptions = {
  autoResubscribe: false,
  lazyConnect: true,
  maxRetriesPerRequest: 0
}

const redisClient = new Redis(process.env.REDIS_URL, redisConfig)

if (process.env.REDIS_URL === "") {
  redisClient.on("error", (error: Readonly<Error>) => {
    if (error.message.includes("ECONNREFUSED")) {
      // empty
    } else {
      console.error(error)
    }
  })
}

export default redisClient
