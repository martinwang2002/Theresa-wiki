// libs
import getConfig from "next/config"
import type { URIComponents } from "uri-js"

interface IPublicRuntimeConfig {
  /* eslint-disable @typescript-eslint/naming-convention */
  GIT_COMMIT: string
  THERESA_STATIC: URIComponents
  /* eslint-enable @typescript-eslint/naming-convention */
}

interface IServerRuntimeConfig {
  /* eslint-disable @typescript-eslint/naming-convention */
  THERESA_S3: URIComponents
  /* eslint-enable @typescript-eslint/naming-convention */
}

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig() as {
  publicRuntimeConfig: IPublicRuntimeConfig
  serverRuntimeConfig: IServerRuntimeConfig
}

export { publicRuntimeConfig, serverRuntimeConfig }
