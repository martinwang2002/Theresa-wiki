// libs
import getConfig from "next/config"

interface IPublicRuntimeConfig {
  /* eslint-disable @typescript-eslint/naming-convention */
  THERESA_WIKI_VERSION: string
  GIT_COMMIT: string
  THERESA_STATIC: string
  /* eslint-enable @typescript-eslint/naming-convention */
}

interface IServerRuntimeConfig {
  /* eslint-disable @typescript-eslint/naming-convention */
  THERESA_S3: string
  /* eslint-enable @typescript-eslint/naming-convention */
}

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig() as {
  publicRuntimeConfig: IPublicRuntimeConfig
  serverRuntimeConfig: IServerRuntimeConfig
}

export { publicRuntimeConfig, serverRuntimeConfig }
