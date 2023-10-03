import { serialize as serializeUri } from "uri-js"

import cacheable from "@/configurations/cache"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

interface IEnemyHandbookEnemyData {
  enemyId: string
  enemyIndex: string
  enemyTags: string[]
  sortId: number
  name: string
  enemyLevel: string
  description: string
  attackType: string
  ability: string | null
  isInvalidKilled: boolean
  overrideKillCntInfos: unknown
  hideInHandbook: boolean
  hideInStage: boolean
  abilityList: unknown[]
  linkEnemies: unknown[]
  damageType: string[]
  invisibleDetail: boolean
}

interface IEnemyHandbookTable {
  enemyData: Record<string, IEnemyHandbookEnemyData>
}

export const enemyHandbookTable = cacheable(async (): Promise<IEnemyHandbookTable> => {
  const url = serializeUri({
    ...serverRuntimeConfig.THERESA_S3,
    path: `${serverRuntimeConfig.THERESA_S3.path ?? ""}/excel/enemy_handbook_table.json`
  })

  const enemyHandbookTableRes = await fetch(url)
  const enemyHandbookTableJson = await enemyHandbookTableRes.json() as IEnemyHandbookTable
  return enemyHandbookTableJson
}, { cacheKey: "enemyHandbookTable", expiryMode: "EX", ttl: serverRuntimeConfig.REDIS_EX_TTL })

export const enemyIds = cacheable(async (): Promise<string[]> => {
  const enemyHandbookTableJson = await enemyHandbookTable()
  return Object.keys(enemyHandbookTableJson.enemyData)
}, { cacheKey: "enemyIds", expiryMode: "EX", ttl: serverRuntimeConfig.REDIS_EX_TTL })

export const getEnemyHandbookByEnemyId = cacheable(async (enemyId: string): Promise<IEnemyHandbookEnemyData> => {
  const enemyHandbookTableJson = await enemyHandbookTable()
  return enemyHandbookTableJson.enemyData[enemyId]
}, { cacheKey: "getEnemyHandbookByEnemyId", expiryMode: "EX", ttl: serverRuntimeConfig.REDIS_EX_TTL })

export type { IEnemyHandbookTable, IEnemyHandbookEnemyData }
