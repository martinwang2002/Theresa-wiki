import { serialize as serializeUri } from "uri-js"

import cacheable from "@/configurations/cache"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

interface ITowerInfo {
  id: string
  sortId: number
  name: string
  subName: string
  desc: string
  towerType: string
  levels: readonly string[]
  taskInfo: null
  preTowerId: null
  medalId: string | null
  hiddenMedalId: string | null
  bossId: string | null
}

interface IRoguelikeTopicTable {
  towers: Record<string, ITowerInfo>
}

export const climbTowerTable = cacheable(async (): Promise<IRoguelikeTopicTable> => {
  const url = serializeUri({
    ...serverRuntimeConfig.THERESA_S3,
    path: `${serverRuntimeConfig.THERESA_S3.path ?? ""}/excel/climb_tower_table.json`
  })

  const climbTowerTableRes = await fetch(url)
  const climbTowerTableJson = await climbTowerTableRes.json() as IRoguelikeTopicTable
  return climbTowerTableJson
}, { cacheKey: "climbTowerTable", expiryMode: "EX", ttl: serverRuntimeConfig.REDIS_EX_TTL })

export const getTowerByZoneId = async (zoneId: string): Promise<ITowerInfo> => {
  const { towers } = await climbTowerTable()

  if (zoneId in towers) {
    return towers[zoneId]
  } else {
    return {
      bossId: null,
      desc: "",
      hiddenMedalId: null,
      id: "",
      levels: [],
      medalId: null,
      name: "",
      preTowerId: null,
      sortId: 0,
      subName: "",
      taskInfo: null,
      towerType: ""
    } as ITowerInfo
  }
}

export type { ITowerInfo }
