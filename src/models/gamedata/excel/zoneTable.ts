// configs
import cacheable from "@/configurations/redis"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

interface IZoneTable {
  zones: unknown[]
}

const zoneTable = cacheable(async (): Promise<IZoneTable> => {
  const url = `${serverRuntimeConfig.THERESA_S3}api/v0/AK_AB/CN/Android/latest/unpacked_assetbundle/assets/torappu/dynamicassets/gamedata/excel/zone_table.json`
  const zoneTableRes = await fetch(url)
  const zoneTableJson = await zoneTableRes.json() as IZoneTable
  return zoneTableJson
}, { cacheKey: "zoneTable", expiryMode: "EX", ttl: 86400 })

export const zonesArray = cacheable(async (): Promise<string[]> => {
  const { zones } = await zoneTable()

  // replace # with __
  const _zonesArray = Object.keys(zones).map((zoneId) => {
    return zoneId
  })
  return _zonesArray
}, { cacheKey: "zonesArray", expiryMode: "EX", ttl: 86400 })

export type { IZoneTable }
