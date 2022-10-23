/* eslint-disable react/jsx-max-depth */
import React from "react"

import CloseIcon from "@mui/icons-material/Close"
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Dialog from "@mui/material/Dialog"
import Fab from "@mui/material/Fab"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

import TransitionUpRef from "@/components/common/TransitionUp"

import MapPreviewImage from "./mapPreviewImage"

interface MapPreviewProps {
  stageId: string
}

interface MapPreviewState {
  imageDialogOpen: boolean
}

class MapPreview extends React.PureComponent<MapPreviewProps, MapPreviewState> {
  public constructor (props: Readonly<MapPreviewProps>) {
    super(props)

    this.state = {
      imageDialogOpen: false
    }
  }

  private readonly handleImageDialogOpen = (): void => {
    this.setState({
      imageDialogOpen: true
    })
  }

  private readonly handleImageDialogClose = (): void => {
    this.setState({
      imageDialogOpen: false
    })
  }

  public render (): React.ReactNode {
    const { stageId } = this.props
    const { imageDialogOpen } = this.state

    return (
      <>
        <Paper
          elevation={10}
          onClick={this.handleImageDialogOpen}
          sx={{
            "&:hover": {
              "& .MuiFab-root": {
                opacity: 1
              },
              cursor: "pointer"
            },
            aspectRatio: "16/9",
            borderRadius: "1rem",
            display: "block",
            height: "100%",
            margin: "auto",
            maxHeight: "50vh",
            maxWidth: "90%",
            overflow: "hidden",
            position: "relative",
            width: "auto"
          }}
        >
          <MapPreviewImage
            stageId={stageId}
          />

          <Fab
            aria-label="zoom"
            color="primary"
            size="small"
            sx={{
              opacity: 0,
              position: "absolute",
              right: 16,
              top: 16,
              transition: "opacity 0.5s linear"
            }}
          >
            <ZoomOutMapIcon />
          </Fab>
        </Paper>

        <Dialog
          TransitionComponent={TransitionUpRef}
          fullScreen
          onClose={this.handleImageDialogClose}
          open={imageDialogOpen}
        >
          <AppBar
            color="primary"
            sx={{ position: "relative" }}
          >
            <Toolbar>
              <IconButton
                aria-label="close"
                color="inherit"
                edge="start"
                onClick={this.handleImageDialogClose}
              >
                <CloseIcon />
              </IconButton>

              <Typography
                component="div"
                sx={{ flex: 1, ml: 2 }}
                variant="h6"
              >
                {`Stage Preview Picture ${stageId}`}
              </Typography>
            </Toolbar>
          </AppBar>

          <Box
            sx={{
              aspectRatio: "16/9",
              display: "block",
              margin: "auto",
              maxWidth: "100%",
              overflow: "hidden",
              position: "relative",
              width: "100%"
            }}
          >
            <MapPreviewImage
              stageId={stageId}
            />
          </Box>
        </Dialog>
      </>
    )
  }
}

export default MapPreview
