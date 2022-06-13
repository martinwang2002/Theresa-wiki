import { serialize as serializeUri } from "uri-js"

import cacheable from "@/configurations/redis"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

import { getActivityByZoneId } from "./activityTable"
import type { IActivityInfo } from "./activityTable"
import { getCampaignZoneInfoByZoneId } from "./campaignTable"
import type { ICampaignZoneInfo } from "./campaignTable"
import { getTowerByZoneId } from "./climbTowerTable"
import type { ITowerInfo } from "./climbTowerTable"
import { getRetroByZoneId } from "./retroTable"
import type { IRetroInfo } from "./retroTable"
import { getRoguelikeTopicByZoneId } from "./roguelikeTopicTable"
import type { IRoguelikeTopicInfo } from "./roguelikeTopicTable"

interface IZoneTable {
  zones: Record<string, IZoneInfo>
}

interface IZoneInfo {
  // zoneID is AS IS see extracted zone_table.json
  zoneID: string
  zoneIndex: number
  type: string
  zoneNameFirst: string | null
  zoneNameSecond: string
  zoneNameTitleCurrent: string | null
  zoneNameTitleUnCurrent: string | null
  zoneNameTitleEx: string | null
  zoneNameThird: string | null
  lockedText: string
  canPreview: boolean
}

interface ICustomZoneInfo extends IZoneInfo {
  _activity?: Readonly<IActivityInfo>
  _campaign?: Readonly<ICampaignZoneInfo>
  _retro?: Readonly<IRetroInfo>
  _roguelikeTopic?: Readonly<IRoguelikeTopicInfo>
  _tower?: Readonly<ITowerInfo>
}

export const zoneTable = cacheable(async (): Promise<IZoneTable> => {
  const url = serializeUri({
    ...serverRuntimeConfig.THERESA_S3,
    path: "/api/v0/AK/CN/Android/assets/latest/unpacked_assetbundle/assets/torappu/dynamicassets/gamedata/excel/zone_table.json"
  })

  const zoneTableRes = await fetch(url)
  const zoneTableJson = await zoneTableRes.json() as IZoneTable
  return zoneTableJson
}, { cacheKey: "zoneTable", expiryMode: "EX", ttl: 86400 })

export const zoneIds = cacheable(async (): Promise<string[]> => {
  const { zones } = await zoneTable()

  // replace # with __
  const _zoneIds = Object.keys(zones).map((zoneId) => {
    return zoneId
  })
  return _zoneIds
}, { cacheKey: "zoneIds", expiryMode: "EX", ttl: 86400 })

export const getZoneInfo = async (zoneId: string): Promise<IZoneInfo> => {
  const { zones } = await zoneTable()

  return zones[zoneId]
}

export const getCustomZoneInfo = async (zoneId: string): Promise<ICustomZoneInfo> => {
  const { zones } = await zoneTable()

  const customZoneInfo = zones[zoneId] as ICustomZoneInfo

  if (customZoneInfo.type === "ACTIVITY") {
    customZoneInfo._activity = await getActivityByZoneId(zoneId)
  } else if (customZoneInfo.type === "BRANCHLINE" || customZoneInfo.type === "SIDESTORY") {
    customZoneInfo._retro = await getRetroByZoneId(zoneId)
  } else if (customZoneInfo.type === "CAMPAIGN") {
    customZoneInfo._campaign = await getCampaignZoneInfoByZoneId(zoneId)
  } else if (customZoneInfo.type === "ROGUELIKE") {
    customZoneInfo._roguelikeTopic = await getRoguelikeTopicByZoneId(zoneId)
  } else if (customZoneInfo.type === "CLIMB_TOWER") {
    customZoneInfo._tower = await getTowerByZoneId(zoneId)
  }

  return customZoneInfo
}

export const getZones = async (): Promise<IZoneInfo[]> => {
  const { zones } = await zoneTable()

  return Object.values(zones)
}

export const getCustomZones = async (): Promise<ICustomZoneInfo[]> => {
  const _zoneIds = await zoneIds()

  const customZoneInfos = await Promise.all(_zoneIds.map(async (zoneId) => {
    return getCustomZoneInfo(zoneId)
  }))

  return customZoneInfos
}

export type { IZoneTable, IZoneInfo, ICustomZoneInfo }
