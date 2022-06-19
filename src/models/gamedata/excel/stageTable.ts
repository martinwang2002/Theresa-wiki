import { serialize as serializeUri } from "uri-js"

import cacheable from "@/configurations/redis"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

import { battleMiscTable } from "../battle/battleMiscTable"

import { retroTable } from "./retroTable"

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
  diffGroup: string
  unlockCondition: IUnlockCondition[]
  stageId: string
  zoneId: string
  code: string
  name: string
  description: string
  levelId: string
  hardStagedId: string | null
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
    path: "/api/v0/AK/CN/Android/assets/latest/unpacked_assetbundle/assets/torappu/dynamicassets/gamedata/excel/stage_table.json"
  })

  const stageTableRes = await fetch(url)
  const stageTableJson = await stageTableRes.json() as IStageTable
  return stageTableJson
}, { cacheKey: "stageTable", expiryMode: "EX", ttl: serverRuntimeConfig.REDIS_EX_TTL })

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

  const { stageList: stagesFromRetro } = await retroTable()

  const allStages = [...Object.values(stages), ...Object.values(stagesFromRetro)]

  const _stages = allStages.filter((stageInfo) => {
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

export const getCustomStageInfo = async (stageId: string, permanent = false): Promise<ICustomStageInfo> => {
  const convertedStageId = stageIdtoHash(stageId)

  let result: ICustomStageInfo

  if (permanent) {
    const { stageList } = await retroTable()
    result = stageList[convertedStageId] as ICustomStageInfo
  } else {
    const { stages } = await stageTable()
    result = stages[convertedStageId] as ICustomStageInfo
  }

  result._unlockConditionStageInfo = {}

  // query for extra stage info data for rendering
  for (const unlockCondition of result.unlockCondition) {
    const _stageId = unlockCondition.stageId
    const extraStageInfo = await getStageInfo(_stageId)

    result._unlockConditionStageInfo[_stageId] = {
      code: extraStageInfo.code,
      difficulty: extraStageInfo.difficulty,
      name: extraStageInfo.name,
      stageId: stageIdtoLodash(extraStageInfo.stageId),
      zoneId: extraStageInfo.zoneId
    }
  }

  return result
}

export const tileInfo = async (): Promise<Record<string, ITileInfo>> => {
  const { tileInfo: _tileInfo } = await stageTable()
  const tileEmptyExtra = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    tile_empty: {
      description: "不可放置单位，不可通行",
      isFunctional: false,
      name: "空",
      tileKey: "tile_empty"
    }
  }

  return { ..._tileInfo, ...tileEmptyExtra }
}

interface IWaveFragmentAction {
  actionType: number
  autoPreviewRoute: boolean
  blockFragment: boolean
  count: number
  dontBlockWave: boolean
  hiddenGroup: unknown
  interval: number
  isUnharmfulAndAlwaysCountAsKilled: boolean
  key: string
  managedByScheduler: boolean
  preDelay: number
  randomSpawnGroupKey: unknown
  routeIndex: number
  weight: number
}

interface IWaveFragment {
  actions: IWaveFragmentAction[]
  preDelay: number
  name: string | null
}

interface IWave {
  fragments: IWaveFragment[]
  maxTimeWaitingForNextWave: number
  name: string | null
  postDelay: number
  preDelay: number
}

interface IStageJson {
  options: IStageJsonOptions
  levelId: string
  loadingPicId: string
  mapData: IMapData
  waves: IWave[]
  [key: string]: unknown
}

interface IStageJsonOptions {
  characterLimit: number
  maxLifePoint: number
  initialCost: number
  maxCost: number
  costIncreaseTime: number
  moveMultiplier: number
  steeringEnabled: boolean
  isTrainingLevel: boolean
  isHardTrainingLevel: boolean
  functionDisableMask: number
  [key: string]: unknown
}

export const stageJson = async (levelId: string): Promise<IStageJson> => {
  // use hooked level id
  const { levelScenePairs } = await battleMiscTable()
  if (levelId in levelScenePairs) {
    levelId = levelScenePairs[levelId].levelId
  }

  const stageUrl = serializeUri({
    ...serverRuntimeConfig.THERESA_S3,
    path: `/api/v0/AK/CN/Android/assets/latest/unpacked_assetbundle/assets/torappu/dynamicassets/gamedata/levels/${String(levelId).toLowerCase()}.json`
  })

  const stageRes = await fetch(stageUrl)
  const stageJsonResult = await stageRes.json() as IStageJson
  return stageJsonResult
}

export type {
  IStageInfo,
  ICustomStageInfo,
  IDisplayDetailReward,
  IUnlockCondition,
  IMapData,
  ITileInfo,
  IMapDataTiles,
  IStageJson,
  IStageJsonOptions,
  IWave
}
