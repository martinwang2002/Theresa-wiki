export const arknightsNameByServer = (server: "CN" | "JP" | "KR" | "TW" | "US"): string => {
  /* eslint-disable @typescript-eslint/naming-convention */
  const arknightsName = {
    CN: "明日方舟",
    JP: "アークナイツ",
    KR: "明日方舟",
    TW: "明日方舟",
    US: "明日方舟"
  }
  /* eslint-enable @typescript-eslint/naming-convention */

  return arknightsName[server]
}
