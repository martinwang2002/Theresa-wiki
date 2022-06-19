import React from "react"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"

import Title from "./title"

class Header extends React.PureComponent {
  public render (): React.ReactNode {
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Title />
        </Toolbar>
      </AppBar>
    )
  }
}

export default Header
