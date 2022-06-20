import React from "react"

import SettingsIcon from "@mui/icons-material/Settings"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import { styled } from "@mui/system"

import SettingsDrawer from "./settingsDrawer"
import Title from "./title"

const GrowingDiv = styled("div")({
  flex: "1 1 auto"
})

interface HeaderState {
  settingsOpen: boolean
}

class Header extends React.PureComponent<Record<string, never>, HeaderState> {
  public constructor (props: Readonly<Record<string, never>>) {
    super(props)

    this.state = {
      settingsOpen: false
    }
  }

  private readonly handleSettingsDrawerOpen = (): void => {
    this.setState({
      settingsOpen: true
    })
  }

  private readonly handleSettingsDrawerClose = (): void => {
    this.setState({
      settingsOpen: false
    })
  }

  public render (): React.ReactNode {
    const { settingsOpen } = this.state
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Title />

          <GrowingDiv />

          <IconButton
            onClick={this.handleSettingsDrawerOpen}
            sx={{ color: "text.primary" }}
          >
            <SettingsIcon />
          </IconButton>

          <SettingsDrawer
            onClose={this.handleSettingsDrawerClose}
            open={settingsOpen}
          />
        </Toolbar>
      </AppBar>
    )
  }
}

export default Header
