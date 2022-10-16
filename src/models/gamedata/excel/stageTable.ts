import { serialize as serializeUri } from "uri-js"

import cacheable from "@/configurations/redis"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

import { retroTable } from "./retroTable"
import type { IRoguelikeTopicDetailStageInfo } from "./roguelikeTopicTable"
import { roguelikeTopicTable } from "./roguelikeTopicTable"

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
  performanceStageFlag: string
  diffGroup: string
  unlockCondition: IUnlockCondition[]
  stageId: string
  levelId: string
  zoneId: string
  code: string
  name: string
  description: string
  hardStagedId: string | null
  dangerLevel: string
  dangerPoint: number
  loadingPicId: string
  canPractice: boolean
  canBattleReplay: boolean
  apCost: number
  apFailReturn: number
  etItemId: string | null
  etCost: number
  etFailReturn: number
  apProtectTimes: number
  diamondOnceDrop: number
  practiceTicketCost: number
  dailyStageDifficulty: number
  expGain: number
  goldGain: number
  lossExpGain: number
  lossGoldGain: number
  passFavor: number
  completeFavor: number
  slProgress: number
  displayMainItem: string | null
  hilightMark: boolean
  bossMark: boolean
  isPredefined: boolean
  isHardPredefined: boolean
  isSkillSelectablePredefined: boolean
  isStoryOnly: boolean
  appearanceStyle: number
  stageDropInfo: IStageDropInfo
  startButtonOverrideId: string | null
  isStagePatch: boolean
  mainStageId: string
}

interface ITileInfo {
  tileKey: string
  name: string
  description: string
  isFunctional: boolean
}

const stageTable = cacheable(async (): Promise<IStageTable> => {
  const url = serializeUri({
    ...serverRuntimeConfig.THERESA_S3,
    path: `${serverRuntimeConfig.THERESA_S3.path ?? ""}/excel/stage_table.json`
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

export const getStageInfo = async (stageId: string): Promise<IStageInfo> => {
  const convertedStageId = stageIdtoHash(stageId)

  const { stages } = await stageTable()
  return stages[convertedStageId]
}

interface ICustomRoguelikeTopicDetailStageInfo extends IRoguelikeTopicDetailStageInfo {
  stageId: string
  zoneId: string
}

export const getStagesByZoneId = async (zoneId: string): Promise<(ICustomRoguelikeTopicDetailStageInfo | IStageInfo)[]> => {
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

  if (_stages.length) {
    return _stages
  } else {
    const { details } = await roguelikeTopicTable()
    if (zoneId in details) {
      const { stages: rougelikeStages } = details[zoneId]
      return Object.values(rougelikeStages).map((stage) => {
        return {
          ...stage,
          stageId: stage.id,
          zoneId
        }
      })
    } else {
      return []
    }
  }
}

export const getStageIdsByZoneId = async (zoneId: string): Promise<string[]> => {
  const stages = await getStagesByZoneId(zoneId)

  // replace # with __
  const _stageIds = stages.map((stage) => {
    return stageIdtoLodash(stage.stageId)
  })
  return _stageIds
}

interface ICustomStageInfo extends IStageInfo {
  _unlockConditionStageInfo: Record<string, Pick<IStageInfo, "code" | "difficulty" | "isStoryOnly" | "name" | "stageId" | "zoneId">>
}

export const getCustomStageInfo = async (zoneId: string, stageId: string, permanent = false): Promise<ICustomRoguelikeTopicDetailStageInfo | ICustomStageInfo> => {
  const convertedStageId = stageIdtoHash(stageId)

  let result: ICustomStageInfo

  if (permanent) {
    const { stageList } = await retroTable()
    result = stageList[convertedStageId] as ICustomStageInfo
  } else {
    const { stages } = await stageTable()

    if (Object.keys(stages).includes(convertedStageId)) {
      result = stages[convertedStageId] as ICustomStageInfo
    } else {
      const { details } = await roguelikeTopicTable()
      const { stages: rougelikeStages } = details[zoneId]
      const rougelikeResult = {
        ...rougelikeStages[convertedStageId],
        stageId,
        zoneId
      } as ICustomRoguelikeTopicDetailStageInfo

      return rougelikeResult
    }
  }

  result._unlockConditionStageInfo = {}

  // query for extra stage info data for rendering
  for (const unlockCondition of result.unlockCondition) {
    const _stageId = unlockCondition.stageId
    const extraStageInfo = await getStageInfo(_stageId)

    result._unlockConditionStageInfo[_stageId] = {
      code: extraStageInfo.code,
      difficulty: extraStageInfo.difficulty,
      isStoryOnly: extraStageInfo.isStoryOnly,
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

export type {
  IStageInfo,
  ICustomRoguelikeTopicDetailStageInfo,
  ICustomStageInfo,
  IDisplayDetailReward,
  IUnlockCondition,
  ITileInfo
}
