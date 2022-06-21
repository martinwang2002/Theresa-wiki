import { serialize as serializeUri } from "uri-js"

import cacheable from "@/configurations/redis"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

interface ICampaignZoneInfo {
  id: string
  name: string
  regionId: string
  templateId: string
}

interface ICampaignTable {
  campaignZones: Record<string, ICampaignZoneInfo>
}

export const campaignTable = cacheable(async (): Promise<ICampaignTable> => {
  const url = serializeUri({
    ...serverRuntimeConfig.THERESA_S3,
    path: `${serverRuntimeConfig.THERESA_S3.path ?? ""}/excel/campaign_table.json`
  })

  const campaignTableRes = await fetch(url)
  const campaignTableJson = await campaignTableRes.json() as ICampaignTable
  return campaignTableJson
}, { cacheKey: "campaignTable", expiryMode: "EX", ttl: serverRuntimeConfig.REDIS_EX_TTL })

export const getCampaignZoneInfoByZoneId = async (zoneId: string): Promise<ICampaignZoneInfo> => {
  const { campaignZones } = await campaignTable()

  return campaignZones[zoneId]
}

export type { ICampaignZoneInfo }
