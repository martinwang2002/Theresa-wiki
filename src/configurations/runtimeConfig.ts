import getConfig from "next/config"
import { parse as parseUri } from "uri-js"
import type { URIComponents } from "uri-js"

interface IPublicRuntimeConfig {
  GIT_COMMIT: string
  GTAG_ID: string
  THERESA_STATIC: URIComponents
  THERESA_WIKI_VERSION: string
  CRISP_WEBSITE_ID: string
}

interface IServerRuntimeConfig {
  CLOUDFLARE_API_TOKEN: string
  CLOUDFLARE_ZONE_ID: string
  NO_DYNAMIC_ROUTES: boolean
  REDIS_EX_TTL: number
  REDIS_URL: string
  THERESA_S3: URIComponents
}

const { publicRuntimeConfig } = getConfig() as {
  publicRuntimeConfig: IPublicRuntimeConfig
}

const defaultRedisExTtl = 3600

const serverRuntimeConfig = {
  CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN ?? "",
  CLOUDFLARE_ZONE_ID: process.env.CLOUDFLARE_ZONE_ID ?? "",
  NO_DYNAMIC_ROUTES: process.env.NODE_ENV === "development" || process.env.THERESA_WIKI_NO_BUILD_DYNAMIC_ROUTES?.toLowerCase() === "true",
  REDIS_EX_TTL: parseInt(process.env.REDIS_EX_TTL ?? "") || defaultRedisExTtl,
  REDIS_URL: process.env.REDIS_URL ?? "",
  THERESA_S3: parseUri(process.env.THERESA_S3 ?? "http://s3.theresa.wiki")
} as IServerRuntimeConfig

export { publicRuntimeConfig, serverRuntimeConfig }
