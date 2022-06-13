import { serialize as serializeUri } from "uri-js"

import cacheable from "@/configurations/redis"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

interface IRoguelikeTopicInfo {
  id: string
  name: string
  startTime: number
  disappearTimeOnMainScreen: number
  sort: number
  showMedalId: string
  medalGroupId: string
  fullStoredTime: number
  lineText: string
  homeEntryDisplayData: unknown
}

interface IRoguelikeTopicTable {
  topics: Record<string, IRoguelikeTopicInfo>
}

export const roguelikeTopicTable = cacheable(async (): Promise<IRoguelikeTopicTable> => {
  const url = serializeUri({
    ...serverRuntimeConfig.THERESA_S3,
    path: "/api/v0/AK/CN/Android/assets/latest/unpacked_assetbundle/assets/torappu/dynamicassets/gamedata/excel/roguelike_topic_table.json"
  })

  const roguelikeTopicTableRes = await fetch(url)
  const roguelikeTopicTableJson = await roguelikeTopicTableRes.json() as IRoguelikeTopicTable
  return roguelikeTopicTableJson
}, { cacheKey: "roguelikeTopicTable", expiryMode: "EX", ttl: serverRuntimeConfig.REDIS_EX_TTL })

export const getRoguelikeTopicByZoneId = async (zoneId: string): Promise<IRoguelikeTopicInfo> => {
  const { topics } = await roguelikeTopicTable()

  return topics[zoneId]
}

export type { IRoguelikeTopicInfo }
