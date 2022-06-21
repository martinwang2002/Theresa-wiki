import React from "react"

import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import Box from "@mui/material/Box"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

import { SettingsContext } from "@/models/reactContext/settingsContext"
import { setLocalStorage } from "@/models/utils/localStorage"

import Heading from "./heading"
import StyledToggleButton from "./styledToggleButton"

export default class PaletteModeSettings extends React.PureComponent {
  public render (): React.ReactNode {
    return (
      <Box sx={{ alignItems: "center", display: "flex", flexDirection: "column", justifyContent: "space-between", pl: 2, pr: 2 }}>
        <Heading>
          颜色模式
        </Heading>

        <SettingsContext.Consumer>
          {({ paletteMode, setPaletteMode }): React.ReactNode => {
            return (
              <ToggleButtonGroup
                color="primary"
                exclusive
                onChange={(event, value: string): void => {
                  if (value === "light" || value === "dark" || value === "system") {
                    setPaletteMode(value)
                    setLocalStorage("paletteMode", value)
                  }
                }}
                sx={{
                  width: "100%"
                }}
                value={paletteMode}
              >
                <StyledToggleButton value="system">
                  <BrightnessAutoIcon fontSize="small" />

                  系统
                </StyledToggleButton>

                <StyledToggleButton value="light">
                  <LightModeIcon fontSize="small" />

                  亮色
                </StyledToggleButton>

                <StyledToggleButton value="dark">
                  <DarkModeIcon fontSize="small" />

                  暗色
                </StyledToggleButton>
              </ToggleButtonGroup>
            )
          }}
        </SettingsContext.Consumer>
      </Box>
    )
  }
}
