import redisClient from "@/configurations/redis"

interface IStageTable {
  [key: string]: unknown
  stages: Record<string, IStageInfo>
}

interface IStageInfo {
  [key: string]: unknown
  stageType: string
}

const fetchStageTable = async (): Promise<IStageTable> => {
  const url = "https://s3-torappu.martinwang2002.com/api/v0/CN/Android/latest/unpacked_assetbundle/assets/torappu/dynamicassets/gamedata/excel/stage_table.json"
  const stageTableRes = await fetch(url)
  const stageTableJson = await stageTableRes.json() as IStageTable
  return stageTableJson
}

const stageTable = async (): Promise<IStageTable> => {
  let stageTableResult
  try {
    stageTableResult = await redisClient.get("stageTable").then(async (result) => {
      if (result != null) {
        return JSON.parse(String(result)) as IStageTable
      } else {
        stageTableResult = await fetchStageTable()
        const expiration = 3600
        await redisClient.set("stageTable", JSON.stringify(stageTable), "EX", expiration)
        return stageTableResult
      }
    })
  } catch {
    stageTableResult = await fetchStageTable()
  }
  return stageTableResult
}

export const stagesArray = async (): Promise<string[]> => {
  const { stages } = await stageTable()

  // replace # with __
  const stagesArrayResult = Object.keys(stages).map((stageId) => {
    return stageId.replaceAll("#", "__")
  })
  return stagesArrayResult
}

export const getStageInfo = async (stageId: string): Promise<IStageInfo> => {
  const convertedStageId = stageId.replaceAll("__", "#")

  const { stages } = await stageTable()
  return stages[convertedStageId]
}
