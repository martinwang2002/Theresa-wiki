import { serialize as serializeUri } from "uri-js"

import cacheable from "@/configurations/redis"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

interface IGamedataConst {
  richTextStyles: Readonly<Record<string, string>>
  [key: string]: unknown
}

const gamedataConst = cacheable(async (): Promise<IGamedataConst> => {
  const url = serializeUri({
    ...serverRuntimeConfig.THERESA_S3,
    path: `${serverRuntimeConfig.THERESA_S3.path ?? ""}/excel/gamedata_const.json`
  })

  const gamedataConstRes = await fetch(url)
  const gamedataConstJson = await gamedataConstRes.json() as IGamedataConst
  return gamedataConstJson
}, { cacheKey: "gamedataConst", expiryMode: "EX", ttl: serverRuntimeConfig.REDIS_EX_TTL })

export { gamedataConst }
export type { IGamedataConst }
