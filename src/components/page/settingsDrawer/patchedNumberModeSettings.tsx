import React from "react"

import DifferenceIcon from "@mui/icons-material/Difference"
import NumbersIcon from "@mui/icons-material/Numbers"
import Box from "@mui/material/Box"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Typography from "@mui/material/Typography"

import PatchedNumber from "@/components/common/patchedNumber"

import { SettingsContext } from "@/models/reactContext/settingsContext"
import { setLocalStorage } from "@/models/utils/localStorage"

import Heading from "./heading"
import StyledToggleButton from "./styledToggleButton"

export default function PatchedNumberModeSettings (): React.ReactNode {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", pl: 2, pr: 2 }}>
      <Heading>
        数据展示模式
      </Heading>

      <SettingsContext.Consumer>
        {({ patchedNumberMode, setPatchedNumberMode }): React.ReactNode => {
          return (
            <ToggleButtonGroup
              color="primary"
              exclusive
              onChange={(event, value: string): void => {
                if (value === "difference" || value === "result") {
                  setPatchedNumberMode(value)
                  setLocalStorage("patchedNumberMode", value)
                }
              }}
              sx={{
                width: "100%"
              }}
              value={patchedNumberMode}
            >
              <StyledToggleButton value="difference">
                <DifferenceIcon fontSize="small" />

                显示差异
              </StyledToggleButton>

              <StyledToggleButton value="result">
                <NumbersIcon fontSize="small" />

                显示结果
              </StyledToggleButton>
            </ToggleButtonGroup>
          )
        }}
      </SettingsContext.Consumer>

      <Typography sx={{ fontSize: "small" }}>
        在受支持的情况（？）下，差异模式将显示数据的变化（计算过程），结果模式将显示最终结果。以下是两组例子。
      </Typography>

      <Box sx={{ pl: 2 }}>
        <SettingsContext.Consumer>
          {(settings): React.ReactNode => {
            /* eslint-disable react/jsx-no-constructed-context-values */
            const forceDifference = { ...settings, patchedNumberMode: "difference" as "difference" | "result" }
            const forceResult = { ...settings, patchedNumberMode: "result" as "difference" | "result" }

            return (
              <>
                <Heading>
                  显示差异
                </Heading>

                <SettingsContext.Provider value={forceDifference}>
                  <li>
                    <PatchedNumber number={{ new: 5, old: 1 }} />
                  </li>

                  <li>
                    <PatchedNumber number={{ new: 3, old: "1\u00782+1" }} />
                  </li>
                </SettingsContext.Provider>

                <Heading>
                  显示结果
                </Heading>

                <SettingsContext.Provider value={forceResult}>
                  <li>
                    <PatchedNumber number={{ new: 5, old: 1 }} />
                  </li>

                  <li>
                    <PatchedNumber number={{ new: 3, old: "1\u00782+1" }} />
                  </li>
                </SettingsContext.Provider>
              </>
            )
          }}
        </SettingsContext.Consumer>
      </Box>

    </Box>
  )
}
