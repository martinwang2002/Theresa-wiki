/* eslint-disable react/jsx-max-depth */
import React from "react"

import CloseIcon from "@mui/icons-material/Close"
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap"
import AppBar from "@mui/material/AppBar"
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
        <div style={{
          aspectRatio: "16/9",
          display: "block",
          width: "auto",
          overflow: "hidden",
          position: "relative",
          margin: "auto",
          maxHeight: "50vh",
          maxWidth: "90%",
          borderRadius: "1rem"
        }}
        >
          <Paper
            elevation={10}
            onClick={this.handleImageDialogOpen}
            sx={{
              height: "100%",
              position: "relative",
              "&:hover": {
                cursor: "pointer",
                "& .MuiFab-root": {
                  opacity: 1
                }
              }
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
                top: 16,
                right: 16,
                position: "absolute",
                transition: "opacity 0.5s linear",
                opacity: 0
              }}
            >
              <ZoomOutMapIcon />
            </Fab>
          </Paper>
        </div>

        <Dialog
          TransitionComponent={TransitionUpRef}
          fullScreen
          onClose={this.handleImageDialogClose}
          open={imageDialogOpen}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "#9e9e9e"
            }
          }}
        >
          <AppBar sx={{ position: "relative", backgroundColor: "#4da9f5 !important" }}>
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
                sx={{ ml: 2, flex: 1 }}
                variant="h6"
              >
                {`Stage Preview Picture ${stageId}`}
              </Typography>
            </Toolbar>
          </AppBar>

          <div style={{
            aspectRatio: "16/9",
            display: "block",
            width: "100%",
            overflow: "hidden",
            position: "relative",
            margin: "auto",
            maxWidth: "100%"
          }}
          >
            <MapPreviewImage
              stageId={stageId}
            />
          </div>
        </Dialog>
      </>
    )
  }
}

export default MapPreview
