import React from "react"

import CloseIcon from "@mui/icons-material/Close"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"

import PaletteModeSettings from "./paletteModeSettings"
import PatchedNumberModeSettings from "./patchedNumberModeSettings"

interface ISettingsDrawerProps {
  open: boolean
  onClose: () => void
}

export default class SettingsDrawer extends React.PureComponent<ISettingsDrawerProps, Record<string, never>> {
  public render (): React.ReactNode {
    const { open, onClose } = this.props
    return (
      <Drawer
        PaperProps={{
          elevation: 0,
          sx: { width: { sm: 360, xs: 310 } }
        }}
        anchor="right"
        onClose={onClose}
        open={open}
      >
        <Box sx={{ alignItems: "center", display: "flex", justifyContent: "space-between", p: 2 }}>
          <Typography
            variant="h6"
          >
            设置
          </Typography>

          <IconButton
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon
              color="primary"
              fontSize="small"
            />
          </IconButton>
        </Box>

        <PaletteModeSettings />

        <PatchedNumberModeSettings />
      </Drawer>
    )
  }
}
