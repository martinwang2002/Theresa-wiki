// libs
import getConfig from "next/config"
import type { URIComponents } from "uri-js"

interface IPublicRuntimeConfig {
  /* eslint-disable @typescript-eslint/naming-convention */
  GIT_COMMIT: string
  GTAG_ID: string
  THERESA_STATIC: URIComponents
  THERESA_WIKI_VERSION: string
  /* eslint-enable @typescript-eslint/naming-convention */
}

interface IServerRuntimeConfig {
  /* eslint-disable @typescript-eslint/naming-convention */
  NO_DYNAMIC_ROUTES: boolean
  REDIS_URL: string
  THERESA_S3: URIComponents
  /* eslint-enable @typescript-eslint/naming-convention */
}

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig() as {
  publicRuntimeConfig: IPublicRuntimeConfig
  serverRuntimeConfig: IServerRuntimeConfig
}

export { publicRuntimeConfig, serverRuntimeConfig }
