import { serialize as serializeUri } from "uri-js"

import cacheable from "@/configurations/redis"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

interface IEnemyHandbook {
  enemyId: string
  enemyIndex: string
  enemyTags: string[]
  sortId: number
  name: string
  enemyRace: string
  enemyLevel: string
  description: string
  attackType: string
  endure: string
  attack: string
  defence: string
  resistance: string
  ability: string | null
  isInvalidKilled: boolean
  overrideKillCntInfos: unknown
  hideInHandbook: boolean
}

// eslint-disable-next-line @typescript-eslint/no-type-alias
type IEnemyHandbookTable = Record<string, IEnemyHandbook>

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
  return Object.keys(enemyHandbookTableJson)
}, { cacheKey: "enemyIds", expiryMode: "EX", ttl: serverRuntimeConfig.REDIS_EX_TTL })

export const getEnemyHandbookByEnemyId = cacheable(async (enemyId: string): Promise<IEnemyHandbook> => {
  const enemyHandbookTableJson = await enemyHandbookTable()
  return enemyHandbookTableJson[enemyId]
}, { cacheKey: "getEnemyHandbookByEnemyId", expiryMode: "EX", ttl: serverRuntimeConfig.REDIS_EX_TTL })

export type { IEnemyHandbookTable, IEnemyHandbook }
