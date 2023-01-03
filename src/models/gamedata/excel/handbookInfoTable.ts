import { serialize as serializeUri } from "uri-js"

import cacheable from "@/configurations/redis"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

interface IHandbookInfoTableStageInfo {
  charId: string
  stageId: string
  levelId: string
  zoneId: string
  code: string
  name: string
  loadingPicId: string
  description: string
  unlockParam: unknown[]
  rewardItem: unknown[]
  stageNameForShow: string
  zoneNameForShow: string
  picId: string
  stageGetTime: number
}

interface IHandbookInfoTable {
  handbookStageData: Record<string, IHandbookInfoTableStageInfo>
}

const handbookInfoTable = cacheable(async (): Promise<IHandbookInfoTable> => {
  const url = serializeUri({
    ...serverRuntimeConfig.THERESA_S3,
    path: `${serverRuntimeConfig.THERESA_S3.path ?? ""}/excel/handbook_info_table.json`
  })

  const handbookInfoTableRes = await fetch(url)
  const handbookInfoTableJson = await handbookInfoTableRes.json() as IHandbookInfoTable
  return handbookInfoTableJson
}, { cacheKey: "handbookInfoTable", expiryMode: "EX", ttl: serverRuntimeConfig.REDIS_EX_TTL })

export { handbookInfoTable }
export type { IHandbookInfoTable, IHandbookInfoTableStageInfo }
