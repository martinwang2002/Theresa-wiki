// libs
import React from "react"
import Paper from "@mui/material/Paper"

// components
import MapPreviewImage from "./mapPreviewImage"

interface MapPreviewProps{
  stageId: string
}

class MapPreview extends React.PureComponent<MapPreviewProps> {
  public render (): React.ReactNode {
    const { stageId } = this.props

    return (
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
        {/* TODO:  */}

        {/* mui model */}

        <Paper
          elevation={10}
          sx={{ height: "100%" }}
        >
          <MapPreviewImage
            stageId={stageId}
          />
        </Paper>
      </div>
    )
  }
}

export default MapPreview
