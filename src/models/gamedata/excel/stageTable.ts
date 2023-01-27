import { serialize as serializeUri } from "uri-js"

import cacheable from "@/configurations/redis"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

import { handbookInfoTable } from "./handbookInfoTable"
import type { IHandbookInfoTableStageInfo } from "./handbookInfoTable"
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

export const stageIdToLodash = (stageId: string): string => {
  return stageId.replaceAll("#", "__")
}

export const stageIdToHash = (stageId: string): string => {
  return stageId.replaceAll("__", "#")
}

export const getStageInfo = async (stageId: string): Promise<IStageInfo> => {
  const convertedStageId = stageIdToHash(stageId)

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
      stageId: stageIdToLodash(stageInfo.stageId)
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

export const getStageByStageId = async (stageId: string): Promise<(ICustomRoguelikeTopicDetailStageInfo | IHandbookInfoTableStageInfo | IStageInfo | undefined)> => {
  const stageIdToLodashed = stageIdToLodash(stageId)
  const { stages } = await stageTable()

  if (stageIdToLodashed in stages) {
    return {
      ...stages[stageIdToLodashed],
      stageId: stageIdToLodash(stageId)
    }
  }

  const { stageList: stagesFromRetro } = await retroTable()

  if (stageIdToLodashed in stagesFromRetro) {
    return {
      ...stagesFromRetro[stageIdToLodashed],
      stageId: stageIdToLodash(stageId)
    }
  }

  const { details } = await roguelikeTopicTable()
  for (const zoneId in details) {
    if (stageId in details[zoneId].stages) {
      return {
        ...details[zoneId].stages[stageId],
        stageId,
        zoneId
      }
    }
  }

  const { handbookStageData } = await handbookInfoTable()

  const handbookStages = Object.values(handbookStageData).filter((stage) => {
    return stage.stageId === stageId
  })

  if (handbookStages.length) {
    return handbookStages[0]
  }

  return undefined
}

export const getStageIdsByZoneId = async (zoneId: string): Promise<string[]> => {
  const stages = await getStagesByZoneId(zoneId)

  // replace # with __
  const _stageIds = stages.map((stage) => {
    return stageIdToLodash(stage.stageId)
  })
  return _stageIds
}

interface ICustomStageInfo extends IStageInfo {
  _unlockConditionStageInfo: Record<string, Pick<IStageInfo, "code" | "difficulty" | "isStoryOnly" | "name" | "stageId" | "zoneId">>
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const getUnlockConditionStageInfo = async (stageInfo: ICustomStageInfo): Promise<ICustomStageInfo> => {
  stageInfo._unlockConditionStageInfo = {}

  // query for extra stage info data for rendering
  for (const unlockCondition of stageInfo.unlockCondition) {
    const _stageId = unlockCondition.stageId
    const extraStageInfo = await getStageInfo(_stageId)

    stageInfo._unlockConditionStageInfo[_stageId] = {
      code: extraStageInfo.code,
      difficulty: extraStageInfo.difficulty,
      isStoryOnly: extraStageInfo.isStoryOnly,
      name: extraStageInfo.name,
      stageId: stageIdToLodash(extraStageInfo.stageId),
      zoneId: extraStageInfo.zoneId
    }
  }

  return stageInfo
}

export const getCustomStageInfo = async (zoneId: string, stageId: string, permanent = false): Promise<ICustomRoguelikeTopicDetailStageInfo | ICustomStageInfo | IHandbookInfoTableStageInfo | undefined> => {
  const convertedStageId = stageIdToHash(stageId)

  let result: ICustomStageInfo

  if (permanent) {
    const { stageList } = await retroTable()
    result = stageList[convertedStageId] as ICustomStageInfo
    return getUnlockConditionStageInfo(result)
  }

  const { stages } = await stageTable()
  if (Object.keys(stages).includes(convertedStageId)) {
    result = stages[convertedStageId] as ICustomStageInfo
    return getUnlockConditionStageInfo(result)
  }

  const { details } = await roguelikeTopicTable()
  if (zoneId in details) {
    const { stages: rougelikeStages } = details[zoneId]
    if (convertedStageId in rougelikeStages) {
      const rougelikeResult = {
        ...rougelikeStages[convertedStageId],
        stageId,
        zoneId
      } as ICustomRoguelikeTopicDetailStageInfo

      return rougelikeResult
    } else {
      return undefined
    }
  }

  const { handbookStageData } = await handbookInfoTable()
  const handbookStages = Object.values(handbookStageData).filter((stage) => {
    return stage.stageId === convertedStageId
  }
  )

  if (handbookStages.length) {
    return handbookStages[0]
  }
}

export const tileInfo = async (): Promise<Record<string, ITileInfo>> => {
  const { tileInfo: _tileInfo } = await stageTable()
  const tileInfoExtra = {
    tile_creep: {
      description: "可部署，可被溟痕影响",
      isFunctional: false,
      name: "溟痕",
      tileKey: "tile_creep"
    },
    tile_creepf: {
      description: "不可部署，可被溟痕影响",
      isFunctional: false,
      name: "溟痕（不可部署）",
      tileKey: "tile_creepf"
    },
    tile_empty: {
      description: "不可放置单位，不可通行",
      isFunctional: false,
      name: "空",
      tileKey: "tile_empty"
    },
    tile_passable_wall_forbidden: {
      description: "不可放置单位。置于其中的单位对地面单位造成的伤害提升，受到来自地面单位的伤害降低",
      isFunctional: false,
      name: "玉门天灾工事（不可部署）",
      tileKey: "tile_empty"
    }
  } as Record<string, ITileInfo>

  // add message to description
  for (const tileKey in tileInfoExtra) {
    tileInfoExtra[tileKey].description = `${tileInfoExtra[tileKey].description}\n\t(游戏本体未包含该内容，本描述可能不准确)`
  }

  return {
    ..._tileInfo,
    ...tileInfoExtra
  }
}

export type {
  IStageInfo,
  ICustomRoguelikeTopicDetailStageInfo,
  ICustomStageInfo,
  IDisplayDetailReward,
  IUnlockCondition,
  ITileInfo
}
