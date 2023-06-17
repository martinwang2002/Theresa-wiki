import { serialize as serializeUri } from "uri-js"

import cacheable from "@/configurations/cache"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

interface IBattleMiscTableStage {
  levelId: string
  sceneId: string
  hookedMapPreviewId: string
}

interface IBattleMiscTable {
  levelScenePairs: Record<string, IBattleMiscTableStage>
}

const battleMiscTable = cacheable(async (): Promise<IBattleMiscTable> => {
  const url = serializeUri({
    ...serverRuntimeConfig.THERESA_S3,
    path: `${serverRuntimeConfig.THERESA_S3.path ?? ""}/battle/battle_misc_table.json`
  })

  const battleMiscTableRes = await fetch(url)
  const battleMiscTableJson = await battleMiscTableRes.json() as IBattleMiscTable
  return battleMiscTableJson
}, { cacheKey: "battleMiscTable", expiryMode: "EX", ttl: serverRuntimeConfig.REDIS_EX_TTL })

export { battleMiscTable }
