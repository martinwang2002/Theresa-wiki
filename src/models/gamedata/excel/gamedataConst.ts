import cachable from "@/configurations/redis"

interface IGamedataConst {
  richTextStyles: Record<string, string>
  [key: string]: unknown
}

const gamedataConst = cachable(async (): Promise<IGamedataConst> => {
  const url = "https://s3-torappu.martinwang2002.com/api/v0/CN/Android/latest/unpacked_assetbundle/assets/torappu/dynamicassets/gamedata/excel/gamedata_const.json"
  const gamedataConstRes = await fetch(url)
  const gamedataConstJson = await gamedataConstRes.json() as IGamedataConst
  return gamedataConstJson
}, { cacheKey: "gamedataConst", expiryMode: "EX", ttl: 86400 })

export { gamedataConst }
export type { IGamedataConst }
