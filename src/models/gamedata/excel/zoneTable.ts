// libs
import { serialize as serializeUri } from "uri-js"

// configs
import cacheable from "@/configurations/redis"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

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

export const getZones = async (): Promise<IZoneInfo[]> => {
  const { zones } = await zoneTable()

  return Object.values(zones)
}

export type { IZoneTable, IZoneInfo }
