import React from "react"

import type { IGamedataConst } from "@/models/gamedata/excel/gamedataConst"
import { GamedataContext } from "@/models/reactContext/gamedataContext"

import style from "./stageInfo.module.scss"

const getColorFromAkFormatString = (akFormatString: string): string => {
  // extract color from <color=#FFFFFF>{0}</color>
  /* eslint-disable @typescript-eslint/no-magic-numbers */
  const regexMatch = [...akFormatString.matchAll(/<color=([^>]*)>\{0\}<\/color>/g)][0]
  return regexMatch[1]
  /* eslint-enable @typescript-eslint/no-magic-numbers */
}

const stageInfoDescriptionParser = (description: string, richTextStyles: Readonly<IGamedataConst["richTextStyles"]>): JSX.Element => {
  // replace \\n with \n
  const replacedBackSlashDescription = description.replaceAll("\\n", "\n")

  // recursively replace <@{akFormatStringKey}>{text}</> to <span style={{color: color}}>{text}<span>
  /* eslint-disable @typescript-eslint/no-magic-numbers */
  let colorFormattedDescription: (JSX.Element | string)[]
  colorFormattedDescription = []
  let stringSliceIndex
  stringSliceIndex = 0

  for (const regexMatch of replacedBackSlashDescription.matchAll(/<@([^>]*)>(.*)<\/>/g)) {
    const akFormatStringKey: string = regexMatch[1]
    const akFormatString = richTextStyles[akFormatStringKey]
    const color = getColorFromAkFormatString(akFormatString)
    colorFormattedDescription = [
      ...colorFormattedDescription,
      replacedBackSlashDescription.slice(stringSliceIndex, regexMatch.index),
      <span
        key={regexMatch.index}
        style={{ color: color }}
      >
        { regexMatch[2] }
      </span>
    ]
    stringSliceIndex = (regexMatch.index ?? 0) + regexMatch[0].length
  }
  colorFormattedDescription = [
    ...colorFormattedDescription,
    replacedBackSlashDescription.slice(stringSliceIndex)
  ]
  /* eslint-enable @typescript-eslint/no-magic-numbers */

  return (
    <span className={style["description-content"]}>
      {colorFormattedDescription}
    </span>
  )
}

export const stageInfoDescriptionToPlainTextParser = (description: string): string => {
  // replace \\n with \n
  const replacedBackSlashDescription = description.replaceAll("\\n", "\n")

  // recursively replace <@{akFormatStringKey}>{text}</> to <span style={{color: color}}>{text}<span>
  /* eslint-disable @typescript-eslint/no-magic-numbers */
  let plainTextDescriptionArray: string[]
  plainTextDescriptionArray = []
  let stringSliceIndex
  stringSliceIndex = 0

  for (const regexMatch of replacedBackSlashDescription.matchAll(/<@([^>]*)>(.*)<\/>/g)) {
    plainTextDescriptionArray = [
      ...plainTextDescriptionArray,
      replacedBackSlashDescription.slice(stringSliceIndex, regexMatch.index),
      regexMatch[2]
    ]
    stringSliceIndex = (regexMatch.index ?? 0) + regexMatch[0].length
  }
  plainTextDescriptionArray = [
    ...plainTextDescriptionArray,
    replacedBackSlashDescription.slice(stringSliceIndex)
  ]
  /* eslint-enable @typescript-eslint/no-magic-numbers */

  return plainTextDescriptionArray.join("")
}

interface StageInfoDescriptionProps {
  description: string
}

class StageInfoDescription extends React.PureComponent<StageInfoDescriptionProps> {
  public render (): React.ReactNode {
    const { description } = this.props

    return (
      <span className={style.description}>
        <span className={style["description-placeholder"]} />

        <GamedataContext.Consumer>
          {(gamedataConst: Readonly<IGamedataConst>): JSX.Element => {
            const { richTextStyles } = gamedataConst
            return stageInfoDescriptionParser(description, richTextStyles)
          }}
        </GamedataContext.Consumer>
      </span>
    )
  }
}

export default StageInfoDescription
