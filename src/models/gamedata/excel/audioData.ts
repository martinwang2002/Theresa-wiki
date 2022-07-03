import { serialize as serializeUri } from "uri-js"

import cacheable from "@/configurations/redis"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

interface IBgmBank {
  intro: string | null
  loop: string | null
  volume: number
  crossfade: number
  delay: number
  name: string
}

interface IAudioData {
  bgmBanks: IBgmBank[]
  bankAlias: Record<string, string>
}

export const audioData = cacheable(async (): Promise<IAudioData> => {
  const url = serializeUri({
    ...serverRuntimeConfig.THERESA_S3,
    path: `${serverRuntimeConfig.THERESA_S3.path ?? ""}/excel/audio_data.json`
  })

  const audioDataRes = await fetch(url)
  const audioDataJson = await audioDataRes.json() as IAudioData
  return audioDataJson
}, { cacheKey: "audioData", expiryMode: "EX", ttl: serverRuntimeConfig.REDIS_EX_TTL })

export const getBattleOnGameReadyBgmBankByBgmEventKey = async (key: string): Promise<IBgmBank> => {
  const { bgmBanks, bankAlias } = await audioData()

  let searchKey: string
  searchKey = "battle.ON_GAME_READY." + key

  if (searchKey in bankAlias) {
    searchKey = bankAlias[searchKey]
  }

  const filteredBgmBanks = bgmBanks.filter(bank => bank.name === searchKey)

  if (!filteredBgmBanks.length) {
    return {} as IBgmBank
  }

  return filteredBgmBanks[0]
}

export type { IBgmBank }
