import React from "react"

import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/system"

import { SettingsContext } from "@/models/reactContext/settingsContext"

// eslint-disable-next-line @typescript-eslint/no-type-alias
type IPatchedNumber = number | {
  old: number | string
  new: number
}

interface PatchedNumberProps {
  readonly number: IPatchedNumber
}

const Span = styled(Typography)({
  fontFamily: "Roboto Mono"
}) as typeof Typography

export default class PatchedNumber extends React.PureComponent<PatchedNumberProps> {
  public render (): React.ReactNode {
    return (
      <SettingsContext.Consumer>
        {({ patchedNumberMode }): React.ReactNode => {
          const { number } = this.props
          if (typeof (number) === "number") {
            return (
              <Span
                component="span"
              >
                {number}
              </Span>
            )
          } else if (patchedNumberMode === "result") {
            return (
              <Span
                component="span"
              >
                {number.new}
              </Span>
            )
          } else {
            return (
              <span>
                <Span
                  component="span"
                  sx={{ color: "warning.main" }}
                >
                  {number.old}
                </Span>

                <ArrowForwardIcon
                  fontSize="small"
                  sx={{ verticalAlign: "text-bottom" }}
                />

                <Span
                  component="span"
                  sx={{ color: "success.main" }}
                >
                  {number.new}
                </Span>
              </span>
            )
          }
        }}
      </SettingsContext.Consumer>
    )
  }
}

export type { IPatchedNumber }
