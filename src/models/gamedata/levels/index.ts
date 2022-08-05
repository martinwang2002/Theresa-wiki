import { serialize as serializeUri } from "uri-js"

import cacheable from "@/configurations/redis"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

import { battleMiscTable } from "../battle/battleMiscTable"

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

interface IRunesBlackboard {
  key: string
  value: number | null
  valueStr: string | null
}

interface IRunes {
  difficultyMask: number
  key: string
  professionMask: number
  buildableMask: number
  blackboard: Readonly<Readonly<IRunesBlackboard>[]> | null
}

interface IStageJson {
  options: IStageJsonOptions
  levelId: string
  loadingPicId: string
  mapData: IMapData
  waves: IWave[]
  runes: IRunes[] | null
  bgmEvent: string | null
  [key: string]: unknown
}

export const stageJson = cacheable(async (levelId: string): Promise<IStageJson> => {
  // use hooked level id
  const { levelScenePairs } = await battleMiscTable()
  if (levelId in levelScenePairs) {
    levelId = levelScenePairs[levelId].levelId
  }

  const stageUrl = serializeUri({
    ...serverRuntimeConfig.THERESA_S3,
    path: `${serverRuntimeConfig.THERESA_S3.path ?? ""}/levels/${String(levelId).toLowerCase()}.json`
  })

  const stageRes = await fetch(stageUrl)
  const stageJsonResult = await stageRes.json() as IStageJson
  return stageJsonResult
}, { cacheKey: "stageTable", expiryMode: "EX", ttl: serverRuntimeConfig.REDIS_EX_TTL })

export type {
  IMapData,
  IMapDataTiles,
  IStageJson,
  IStageJsonOptions,
  IWave,
  IRunes
}
