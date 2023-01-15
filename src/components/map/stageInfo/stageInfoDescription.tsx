import React from "react"

import Box from "@mui/material/Box"

import type { IGamedataConst } from "@/models/gamedata/excel/gamedataConst"
import { GamedataContext } from "@/models/reactContext/gamedataContext"
import { gtagEvent } from "@/models/utils/gtag"

const zero = 0

const getColorFromAkFormatString = (akFormatString: string): string => {
  // extract color from <color=#FFFFFF>{0}</color>
  const regexMatch = [...akFormatString.matchAll(/<color=([^>]*)>(.*)<\/color>/g)][0]
  return regexMatch[1]
}

const stageInfoDescriptionParser = (description: string, richTextStyles: Readonly<IGamedataConst["richTextStyles"]>): JSX.Element => {
  // replace \\n with \n
  const replacedBackSlashDescription = description.replaceAll("\\n", "\n")

  // recursively replace <@{akFormatStringKey}>{text}</> to <span style={{color: color}}>{text}<span>
  let colorFormattedDescription: (JSX.Element | string)[]
  colorFormattedDescription = []
  let stringSliceIndex
  stringSliceIndex = zero

  for (const regexMatch of replacedBackSlashDescription.matchAll(/<([^>]*)>(.*?)<\/([^>]*)>/g)) {
    // see https://stackoverflow.com/a/3075532
    // use reluctant string mode instead of greedy

    let color: string
    color = "#fff"
    if (regexMatch[1].startsWith("@")) {
      // use styles defined in richTextStyles
      const akFormatStringKey: string = regexMatch[1]
      const akFormatStringKeyIndexWithoutAt = 1
      const akFormatString = richTextStyles[akFormatStringKey.slice(akFormatStringKeyIndexWithoutAt)]
      color = getColorFromAkFormatString(akFormatString)
    } else if (regexMatch[1].startsWith("color")) {
      // use inline color
      // regexMatch[0] gives the whole string
      color = getColorFromAkFormatString(regexMatch[0])
    } else {
      gtagEvent({
        action: "error",
        akFormatStringKey: regexMatch[1],
        category: "map.stageInfo.stageInfoDescription",
        label: "unknown akFormatStringKey"
      })
    }

    colorFormattedDescription = [
      ...colorFormattedDescription,
      replacedBackSlashDescription.slice(stringSliceIndex, regexMatch.index),
      <span
        key={regexMatch.index}
        style={{ color }}
      >
        { regexMatch[2] }
      </span>
    ]
    stringSliceIndex = (regexMatch.index ?? zero) + regexMatch[0].length
  }
  colorFormattedDescription = [
    ...colorFormattedDescription,
    replacedBackSlashDescription.slice(stringSliceIndex)
  ]

  return (
    <Box
      sx={{
        backgroundColor: "#2f2f2f",
        borderRadius: "0.75em",
        color: "#a9a9a9",
        ml: 5,
        px: 1.5,
        py: 1
      }}
    >
      {colorFormattedDescription}
    </Box>
  )
}

export const stageInfoDescriptionToPlainTextParser = (description: string): string => {
  // replace \\n with \n
  const replacedBackSlashDescription = description.replaceAll("\\n", "\n")

  // recursively replace <@{akFormatStringKey}>{text}</> to <span style={{color: color}}>{text}<span>
  let plainTextDescriptionArray: string[]
  plainTextDescriptionArray = []
  let stringSliceIndex
  stringSliceIndex = zero

  for (const regexMatch of replacedBackSlashDescription.matchAll(/<@([^>]*)>(.*)<\/>/g)) {
    plainTextDescriptionArray = [
      ...plainTextDescriptionArray,
      replacedBackSlashDescription.slice(stringSliceIndex, regexMatch.index),
      regexMatch[2]
    ]
    stringSliceIndex = (regexMatch.index ?? zero) + regexMatch[0].length
  }
  plainTextDescriptionArray = [
    ...plainTextDescriptionArray,
    replacedBackSlashDescription.slice(stringSliceIndex)
  ]

  return plainTextDescriptionArray.join("")
}

interface StageInfoDescriptionProps {
  description: string
}

class StageInfoDescription extends React.PureComponent<StageInfoDescriptionProps> {
  public render (): React.ReactNode {
    const { description } = this.props

    return (
      <Box
        sx={{
          display: "flex",
          fontSize: "body2.fontSize",
          whiteSpace: "pre-line"
        }}
      >
        <GamedataContext.Consumer>
          {(gamedataConst: Readonly<IGamedataConst>): JSX.Element => {
            const { richTextStyles } = gamedataConst
            return stageInfoDescriptionParser(description, richTextStyles)
          }}
        </GamedataContext.Consumer>
      </Box>
    )
  }
}

export default StageInfoDescription
