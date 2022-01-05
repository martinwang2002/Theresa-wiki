// libs
import React from "react"

// models
import type { IStageInfo } from "@/models/gamedata/excel/stage"
import type { IGamedataConst } from "@/models/gamedata/excel/gamedataConst"

// reactContext
import { GamedataContext } from "@/models/reactContext/gamedataContext"

// style
import style from "./stageInfo.module.scss"

interface StageInfoProps{
  stageInfo: IStageInfo
  stageJsonOptions: Record<string, string> | null
}

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

class StageInfo extends React.PureComponent<StageInfoProps> {
  public render (): React.ReactNode {
    const { stageInfo, stageJsonOptions } = this.props

    // FIXME: eslint
    /* eslint-disable react/jsx-max-depth */
    console.log(stageInfo.description)
    return (
      <>
        <span className={style.description}>
          <span className={style["description-placeholder"]} />

          <GamedataContext.Consumer>
            {(gamedataConst: Readonly<Partial<IGamedataConst>>): JSX.Element => {
              const { richTextStyles } = gamedataConst
              if (richTextStyles) {
                return stageInfoDescriptionParser(stageInfo.description, richTextStyles)
              } else {
                return (
                  <span style={{ color: "red" }}>
                    Error: Cannot load description
                  </span>
                )
              }
            }}
          </GamedataContext.Consumer>
        </span>

        <table>
          <thead>
            <tr>
              <th>
                Key
              </th>

              <th>
                Value
              </th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(stageInfo).map(
              (entry: Readonly<[string, unknown]>) => {
                const [key, value] = entry
                return (
                  <tr key={key}>
                    <td>
                      {key}
                    </td>

                    <td>
                      {JSON.stringify(value)}
                    </td>
                  </tr>
                )
              }
            )}

            <tr>
              <td>
                --
              </td>

              <td>
                /
              </td>
            </tr>

            <tr>
              <td>
                --
              </td>

              <td>
                --
              </td>
            </tr>

            {stageJsonOptions != null && Object.entries(stageJsonOptions).map(
              (entry: Readonly<string[]>) => {
                const [key, value] = entry
                return (
                  <tr key={key}>
                    <td>
                      {key}
                    </td>

                    <td>
                      {String(value)}
                    </td>
                  </tr>
                )
              }
            )}
          </tbody>
        </table>
      </>
    )
  }
}

export default StageInfo
