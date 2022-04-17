import type { IZoneInfo } from "@/models/gamedata/excel/zoneTable"

export const getDisplayZoneName = (zoneInfo: Readonly<IZoneInfo>): string => {
  const zoneNames = [zoneInfo.zoneNameFirst, zoneInfo.zoneNameSecond, zoneInfo.zoneNameThird]

  // nonNullZoneNames is not empty
  const nonNullZoneNames = zoneNames.filter(name => name !== null)

  if (nonNullZoneNames.length) {
    return nonNullZoneNames.join(" - ")
  } else {
    return zoneInfo.zoneID
  }
}
