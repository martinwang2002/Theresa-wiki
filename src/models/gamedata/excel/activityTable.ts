import { serialize as serializeUri } from "uri-js"

import cacheable from "@/configurations/redis"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

interface IActivityInfo {
  id: string
  type: string
  displayType: string
  name: string
  startTime: number
  endTime: number
  rewardEndTime: number
  displayOnHome: boolean
  hasStage: boolean
  actTopBarColor: string | null
  actTopBarText: string | null
  templateShopId: string
  medalGroupId: string
  isReplicate: boolean
}

interface IActivityTable {
  basicInfo: Record<string, IActivityInfo>
  zoneToActivity: Record<string, string>
}

export const activityTable = cacheable(async (): Promise<IActivityTable> => {
  const url = serializeUri({
    ...serverRuntimeConfig.THERESA_S3,
    path: "/api/v0/AK/CN/Android/assets/latest/unpacked_assetbundle/assets/torappu/dynamicassets/gamedata/excel/activity_table.json"
  })

  const activityTableRes = await fetch(url)
  const activityTableJson = await activityTableRes.json() as IActivityTable
  return activityTableJson
}, { cacheKey: "activityTable", expiryMode: "EX", ttl: 86400 })

export const getActivityByZoneId = async (zoneId: string): Promise<IActivityInfo> => {
  const { basicInfo, zoneToActivity } = await activityTable()

  const activityId = zoneToActivity[zoneId]

  return basicInfo[activityId]
}

export type { IActivityInfo }
