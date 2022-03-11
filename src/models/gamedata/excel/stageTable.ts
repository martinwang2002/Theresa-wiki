// libs
import { serialize as serializeUri } from "uri-js"

// configs
import cacheable from "@/configurations/redis"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

interface IStageTable {
  [key: string]: unknown
  stages: Record<string, IStageInfo>
  tileInfo: Record<string, ITileInfo>
}

interface IUnlockCondition {
  stageId: string
  completeState: number
}

interface IDisplayReward {
  type: string
  id: string
  dropType: number
}

interface IDisplayDetailReward {
  type: string
  id: string
  dropType: number
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  occPercent: 0 | 1 | 2 | 3 | 4
}

interface IStageDropInfo {
  firstPassRewards: unknown
  firstCompleteRewards: unknown
  passRewards: unknown
  completeRewards: unknown
  displayRewards: IDisplayReward[]
  displayDetailRewards: IDisplayDetailReward[]
}

interface IStageInfo {
  stageType: string
  difficulty: string
  unlockCondition: IUnlockCondition[]
  stageId: string
  zoneId: string
  code: string
  name: string
  description: string
  levelId: string
  hardStagedId: string
  loadingPicId: string
  apCost: number
  apFailReturn: number
  dangerLevel: string
  practiceTicketCost: number
  canPractice: boolean
  canBattleReplay: boolean
  stageDropInfo: IStageDropInfo
  [key: string]: unknown
}

interface ITileInfo {
  tileKey: string
  name: string
  description: string
  isFunctional: boolean
}

interface IMapDataTiles {
  blackboard: unknown
  buildableType: unknown
  effects: unknown
  heightType: unknown
  passableMask: unknown
  tileKey: string
}

interface IMapData {
  height: number
  map: [number[]]
  tiles: [IMapDataTiles]
  width: number
}

const stageTable = cacheable(async (): Promise<IStageTable> => {
  const url = serializeUri({
    ...serverRuntimeConfig.THERESA_S3,
    path: "/api/v0/AK_AB/CN/Android/latest/unpacked_assetbundle/assets/torappu/dynamicassets/gamedata/excel/stage_table.json"
  })

  const stageTableRes = await fetch(url)
  const stageTableJson = await stageTableRes.json() as IStageTable
  return stageTableJson
}, { cacheKey: "stageTable", expiryMode: "EX", ttl: 86400 })

export const stageIdtoLodash = (stageId: string): string => {
  return stageId.replaceAll("#", "__")
}

export const stageIdtoHash = (stageId: string): string => {
  return stageId.replaceAll("__", "#")
}

export const stageIds = async (): Promise<string[]> => {
  const { stages } = await stageTable()

  // replace # with __
  const _stageIds = Object.keys(stages).map((stageId) => {
    return stageIdtoLodash(stageId)
  })
  return _stageIds
}

export const getStageInfo = async (stageId: string): Promise<IStageInfo> => {
  const convertedStageId = stageIdtoHash(stageId)

  const { stages } = await stageTable()
  return stages[convertedStageId]
}

export const getStagesByZoneId = async (zoneId: string): Promise<IStageInfo[]> => {
  const { stages } = await stageTable()

  const _stages = Object.values(stages).filter((stageInfo) => {
    // filter zoneId
    return stageInfo.zoneId === zoneId
  }).map((stageInfo) => {
    // replace # with __
    return {
      ...stageInfo,
      stageId: stageIdtoLodash(stageInfo.stageId)
    }
  })
  return _stages
}

interface ICustomStageInfo extends IStageInfo {
  _unlockConditionStageInfo: Record<string, Pick<IStageInfo, "code" | "difficulty" | "name" | "stageId" | "zoneId">>
}

export const getCustomStageInfo = async (stageId: string): Promise<ICustomStageInfo> => {
  const convertedStageId = stageIdtoHash(stageId)

  const { stages } = await stageTable()

  const result = stages[convertedStageId] as ICustomStageInfo

  result._unlockConditionStageInfo = {}

  // query for extra stage info data for rendering
  for (const unlockCondition of result.unlockCondition) {
    const _stageId = unlockCondition.stageId
    const extraStageInfo = await getStageInfo(_stageId)

    result._unlockConditionStageInfo[_stageId] = {
      code: extraStageInfo.code,
      name: extraStageInfo.name,
      stageId: stageIdtoLodash(extraStageInfo.stageId),
      zoneId: extraStageInfo.zoneId,
      difficulty: extraStageInfo.difficulty
    }
  }

  return result
}

export const tileInfo = async (): Promise<Record<string, ITileInfo>> => {
  const { tileInfo: _tileInfo } = await stageTable()
  const tileEmptyExtra = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    tile_empty: {
      tileKey: "tile_empty",
      name: "空",
      description: "不可放置单位，不可通行",
      isFunctional: false
    }
  }

  return { ..._tileInfo, ...tileEmptyExtra }
}

interface IStageJson {
  options: Record<string, string>
  levelId: string
  loadingPicId: string
  mapData: IMapData
  [key: string]: unknown
}

export const stageJson = async (levelId: string): Promise<IStageJson> => {
  const stageUrl = serializeUri({
    ...serverRuntimeConfig.THERESA_S3,
    path: `/api/v0/AK_AB/CN/Android/latest/unpacked_assetbundle/assets/torappu/dynamicassets/gamedata/levels/${String(levelId).toLowerCase()}.json`
  })

  const stageRes = await fetch(stageUrl)
  const stageJsonResult = await stageRes.json() as IStageJson
  return stageJsonResult
}

export type { IStageInfo, ICustomStageInfo, IDisplayDetailReward, IUnlockCondition, IMapData, ITileInfo, IMapDataTiles, IStageJson }
