// configs
import cacheable from "@/configurations/redis"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

interface IGamedataConst {
  richTextStyles: Record<string, string>
  [key: string]: unknown
}

const gamedataConst = cacheable(async (): Promise<IGamedataConst> => {
  const url = `${serverRuntimeConfig.THERESA_S3}api/v0/AK_AB/CN/Android/latest/unpacked_assetbundle/assets/torappu/dynamicassets/gamedata/excel/gamedata_const.json`
  const gamedataConstRes = await fetch(url)
  const gamedataConstJson = await gamedataConstRes.json() as IGamedataConst
  return gamedataConstJson
}, { cacheKey: "gamedataConst", expiryMode: "EX", ttl: 86400 })

export { gamedataConst }
export type { IGamedataConst }