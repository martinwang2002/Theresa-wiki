import cacheable from "@/configurations/redis"

interface IStageTable {
  [key: string]: unknown
  stages: Record<string, IStageInfo>
  tileInfo: Record<string, ITileInfo>
}

interface IStageInfo {
  stageType: string
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
  const url = "https://s3-torappu.martinwang2002.com/api/v0/CN/Android/latest/unpacked_assetbundle/assets/torappu/dynamicassets/gamedata/excel/stage_table.json"
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

export const stagesArray = async (): Promise<string[]> => {
  const { stages } = await stageTable()

  // replace # with __
  const stagesArrayResult = Object.keys(stages).map((stageId) => {
    return stageIdtoLodash(stageId)
  })
  return stagesArrayResult
}

export const getStageInfo = async (stageId: string): Promise<IStageInfo> => {
  const convertedStageId = stageIdtoHash(stageId)

  const { stages } = await stageTable()
  return stages[convertedStageId]
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
  const stageUrl = `https://s3-torappu.martinwang2002.com/api/v0/CN/Android/latest/unpacked_assetbundle/assets/torappu/dynamicassets/gamedata/levels/${String(levelId).toLowerCase()}.json`
  const stageRes = await fetch(stageUrl)
  const stageJsonResult = await stageRes.json() as IStageJson
  return stageJsonResult
}

export type { IStageInfo, IMapData, ITileInfo, IMapDataTiles, IStageJson }
