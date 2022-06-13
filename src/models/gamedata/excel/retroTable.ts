import { serialize as serializeUri } from "uri-js"

import cacheable from "@/configurations/redis"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

import type { IStageInfo } from "./stageTable"

interface IRetroTable {
  stageList: Record<string, IStageInfo>
  zoneToRetro: Record<string, string>
  retroActList: Record<string, IRetroInfo>
}

interface IRetroInfo {
  retroId: string
  type: number
  linkedActId: readonly string[]
  startTime: number
  trailStartTime: number
  index: number
  name: string
  detail: string
  haveTrail: boolean
  customActId: null
  customActType: string
}

export const retroTable = cacheable(async (): Promise<IRetroTable> => {
  const url = serializeUri({
    ...serverRuntimeConfig.THERESA_S3,
    path: "/api/v0/AK/CN/Android/assets/latest/unpacked_assetbundle/assets/torappu/dynamicassets/gamedata/excel/retro_table.json"
  })

  const retroTableRes = await fetch(url)
  const retroTableJson = await retroTableRes.json() as IRetroTable
  return retroTableJson
}, { cacheKey: "retroTable", expiryMode: "EX", ttl: 86400 })

export const getRetroByZoneId = async (zoneId: string): Promise<IRetroInfo> => {
  const { retroActList, zoneToRetro } = await retroTable()

  const retroId = zoneToRetro[zoneId]

  return retroActList[retroId]
}

export type { IRetroInfo }
