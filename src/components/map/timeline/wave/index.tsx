/* eslint-disable @typescript-eslint/no-magic-numbers */
import React from "react"

import type { IWave } from "@/models/gamedata/levels/index"

interface IMapTimelineWaveProps {
  readonly wave: IWave
  readonly index: number
}

const timelineScale = 20

const indexOffset = 1

const int2roman = (original: number): string => {
  if (original < 1 || original > 3999) {
    throw new Error("Error: Input integer limited to 1 through 3,999")
  }

  const numerals = [
    ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"], // 1-9
    ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"], // 10-90
    ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"], // 100-900
    ["M", "MM", "MMM"] // 1000-3000
  ]

  // TODO: Could expand to support fractions, simply rounding for now
  const digits = Math.round(original).toString().split("")
  let position: number
  position = (digits.length - 1)

  return digits.reduce((roman, digit) => {
    if (digit !== "0") {
      roman += numerals[position][parseInt(digit) - 1]
    }

    position -= 1

    return roman
  }, "")
}

class MapTimelineWave extends React.PureComponent<IMapTimelineWaveProps> {
  public render (): React.ReactNode {
    const { wave, index } = this.props

    console.log(wave)
    return (

      <div
        key={wave.name}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ background: "#efdcd5", borderRadius: 5, margin: 3, padding: "0.25em", textAlign: "center" }}>
          WAVE
          {" "}

          {int2roman(index + indexOffset)}

          {wave.name != null && ": " + wave.name}
        </div>

        <div style={{ display: "flex" }}>
          {wave.preDelay > 0 &&
          <div style={{ width: wave.preDelay * timelineScale }}>
            preDelay
          </div>}

          <div
            style={{ display: "flex", flexDirection: "column" }}
          >
            {/* Fragments */}

            {wave.fragments.map((fragments, _index) => {
              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={_index}
                  style={{ background: "#fafafa", borderRadius: 5, margin: 3, padding: "0.25em", textAlign: "center" }}
                >
                  {fragments.preDelay > 0 &&
                  <div style={{ width: fragments.preDelay * timelineScale }}>
                    {fragments.preDelay}
                  </div>}

                  {fragments.actions.map((action, _actionIndex) => {
                    return (
                      <div
                        // eslint-disable-next-line react/no-array-index-key
                        key={_actionIndex}
                        style={{ display: "flex" }}
                      >
                        {action.preDelay > 0 &&
                          <div style={{ width: action.preDelay * timelineScale }} />}

                        <div
                          style={{ background: "#42a5f5", borderRadius: 5, margin: 3, padding: "0.25em", textAlign: "center" }}
                        >
                          actionType:
                          {action.actionType}
                          ,

                          enemy key:
                          {action.key}
                          ,

                          enemy count:
                          {action.count}

                          ,
                          enemy predelay:
                          {action.preDelay}
                          ,

                          enemy interval:
                          {action.interval}
                        </div>
                      </div>

                    )
                  })}
                </div>

              )
            })}

          </div>

          {wave.postDelay > 0 &&
          <div style={{ width: wave.postDelay * timelineScale }}>
            ahhhhh
          </div>}
        </div>
      </div>

    )
  }
}

export default MapTimelineWave
