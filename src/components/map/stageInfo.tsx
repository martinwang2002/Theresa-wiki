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

    return (
      <table>
        <tr>
          <th>
            Key
          </th>

          <th>
            Value
          </th>
        </tr>

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
      </table>
    )
  }
}

export default StageInfo
