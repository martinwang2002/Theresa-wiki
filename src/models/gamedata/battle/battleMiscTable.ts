
import { serialize as serializeUri } from "uri-js"

import cacheable from "@/configurations/redis"
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
    path: "/api/v0/AK/CN/Android/assets/latest/unpacked_assetbundle/assets/torappu/dynamicassets/gamedata/battle/battle_misc_table.json"
  })

  const battleMiscTableRes = await fetch(url)
  const battleMiscTableJson = await battleMiscTableRes.json() as IBattleMiscTable
  return battleMiscTableJson
}, { cacheKey: "battleMiscTable", expiryMode: "EX", ttl: 86400 })

export { battleMiscTable }
