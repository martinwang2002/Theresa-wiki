import type { IZoneInfo } from "@/models/gamedata/excel/zoneTable"

export const getDisplayZoneName = (zoneInfo: Readonly<IZoneInfo>): string => {
  if (zoneInfo.zoneNameFirst !== null) {
    return `${zoneInfo.zoneNameFirst} - ${zoneInfo.zoneNameSecond}`
  } else {
    return zoneInfo.zoneNameSecond
  }
}
