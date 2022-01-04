import React from "react"
import type { IStageInfo } from "@/models/gamedata/excel/stage"
interface StageInfoProps{
  stageInfo: IStageInfo
  stageJsonOptions: Record<string, string> | null
}

const stageInfoDescriptionParser = (description: string): JSX.Element => {
  const replacedDescription = description.replaceAll("\\n", "\n")
  return (
    <span>
      {replacedDescription}
    </span>
  )
}

class StageInfo extends React.PureComponent<StageInfoProps> {
  public render (): React.ReactNode {
    // FIXME
    const { stageInfo, stageJsonOptions } = this.props
    // delete stageInfo.stageDropInfo
    // delete stageInfo.unlockCondition
    /* eslint-disable react/jsx-max-depth */
    console.log(stageInfo.description)
    return (
      <>
        <p style={{ fontSize: "0.87em", whiteSpace: "pre-line" }}>
          {stageInfoDescriptionParser(stageInfo.description)}
        </p>

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
