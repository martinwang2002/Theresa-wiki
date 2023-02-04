import { serialize as serializeUri } from "uri-js"

import cacheable from "@/configurations/cache"
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

interface IRoguelikeTopicDetailStageInfo {
  id: string
  linkedStageId: string
  levelId: string
  code: string
  name: string
  loadingPicId: string
  description: string
  eliteDesc: unknown
  isBoss: unknown
  isElite: unknown
  difficulty: string
  capsulePool: string
  capsuleProb: number
  vutresProb: unknown
  boxProb: unknown
}

interface IRoguelikeTopicDetail {
  stages: Record<string, IRoguelikeTopicDetailStageInfo>
}

interface IRoguelikeTopicTable {
  topics: Record<string, IRoguelikeTopicInfo>
  details: Record<string, IRoguelikeTopicDetail>
}

export const roguelikeTopicTable = cacheable(async (): Promise<IRoguelikeTopicTable> => {
  const url = serializeUri({
    ...serverRuntimeConfig.THERESA_S3,
    path: `${serverRuntimeConfig.THERESA_S3.path ?? ""}/excel/roguelike_topic_table.json`
  })

  const roguelikeTopicTableRes = await fetch(url)
  const roguelikeTopicTableJson = await roguelikeTopicTableRes.json() as IRoguelikeTopicTable
  return roguelikeTopicTableJson
}, { cacheKey: "roguelikeTopicTable", expiryMode: "EX", ttl: serverRuntimeConfig.REDIS_EX_TTL })

export const getRoguelikeTopicByZoneId = async (zoneId: string): Promise<IRoguelikeTopicInfo> => {
  const { topics } = await roguelikeTopicTable()

  return topics[zoneId]
}

export type { IRoguelikeTopicInfo, IRoguelikeTopicDetailStageInfo }
