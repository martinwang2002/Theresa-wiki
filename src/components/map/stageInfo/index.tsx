// libs
import React from "react"

// Components
import StageInfoDescription from "./stageInfoDescription"
import StageInfoTable from "./stageInfoTable"

// models
import type { IStageInfo } from "@/models/gamedata/excel/stage"

interface StageInfoProps{
  stageInfo: IStageInfo
  stageJsonOptions: Record<string, string> | null
}

class StageInfo extends React.PureComponent<StageInfoProps> {
  public render (): React.ReactNode {
    const { stageInfo, stageJsonOptions } = this.props

    // FIXME: eslint
    /* eslint-disable react/jsx-max-depth */
    return (
      <>
        <StageInfoDescription
          description={stageInfo.description}
        />

        <h2 id="stageInfo">
          作战信息
        </h2>

        <StageInfoTable
          stageInfo={stageInfo}
        />

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

        <a href="#stageInfo">
          test
        </a>
      </>
    )
  }
}

export default StageInfo
