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

interface HeaderProps {
  forwardRef?: React.Ref<HTMLDivElement>
}

interface HeaderState {
  settingsOpen: boolean
}

class Header extends React.PureComponent<HeaderProps, HeaderState> {
  private static readonly defaultProps: HeaderProps = {
    forwardRef: undefined
  }

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  public constructor (props: Readonly<HeaderProps>) {
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
    const { forwardRef } = this.props
    const { settingsOpen } = this.state
    return (
      <AppBar
        position="sticky"
      >
        <Toolbar
          ref={forwardRef}
        >
          <Title />

          <GrowingDiv />

          <IconButton
            aria-label="settings"
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

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export default React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => <Header forwardRef={ref} />)
