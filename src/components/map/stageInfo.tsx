import React from "react"

interface StageInfoProps{
  stageInfo: Record<string, string>
  stageJsonOptions: Record<string, string> | null
}

class StageInfo extends React.PureComponent<StageInfoProps> {
  public render (): React.ReactNode {
    // FIXME
    const { stageInfo, stageJsonOptions } = this.props
    // delete stageInfo.stageDropInfo
    // delete stageInfo.unlockCondition
    /* eslint-disable react/jsx-max-depth */
    return (
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
    )
  }
}

export default StageInfo
