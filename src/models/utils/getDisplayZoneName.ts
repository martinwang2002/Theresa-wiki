import type { ICustomZoneInfo } from "@/models/gamedata/excel/zoneTable"

export const getDisplayZoneName = (zoneInfo: Readonly<ICustomZoneInfo>): string => {
  let zoneNames: (string | null | undefined)[]
  if (zoneInfo.type === "ACTIVITY") {
    const activityName = zoneInfo._activity?.name

    zoneNames = [activityName, zoneInfo.zoneNameFirst, zoneInfo.zoneNameSecond, zoneInfo.zoneNameThird]
  } else if (zoneInfo.type === "BRANCHLINE" || zoneInfo.type === "SIDESTORY") {
    const retroName = zoneInfo._retro?.name

    zoneNames = [retroName, zoneInfo.zoneNameFirst, zoneInfo.zoneNameSecond, zoneInfo.zoneNameThird]
  } else if (zoneInfo.type === "CAMPAIGN") {
    const campaignName = zoneInfo._campaign?.name

    zoneNames = [campaignName, zoneInfo.zoneNameFirst, zoneInfo.zoneNameSecond, zoneInfo.zoneNameThird]
  } else if (zoneInfo.type === "ROGUELIKE") {
    const roguelikeTopicName = zoneInfo._roguelikeTopic?.name

    zoneNames = [roguelikeTopicName, zoneInfo.zoneNameFirst, zoneInfo.zoneNameSecond, zoneInfo.zoneNameThird]
  } else if (zoneInfo.type === "CLIMB_TOWER") {
    const towerName = zoneInfo._tower?.name

    zoneNames = [towerName, zoneInfo.zoneNameFirst, zoneInfo.zoneNameSecond, zoneInfo.zoneNameThird]
  } else {
    zoneNames = [zoneInfo.zoneNameFirst, zoneInfo.zoneNameSecond, zoneInfo.zoneNameThird]
  }

  // nonNullZoneNames is not empty
  const nonNullZoneNames = zoneNames.filter(name => name)

  if (nonNullZoneNames.length) {
    return nonNullZoneNames.join(" - ")
  } else {
    return zoneInfo.zoneID
  }
}
