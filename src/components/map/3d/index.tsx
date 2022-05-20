// libs
import React from "react"
import dynamic from "next/dynamic"
import Paper from "@mui/material/Paper"

// components
import type { Map3DProps } from "./map3D"
import MapPreviewImage from "@/components/map/mapPreviewImage"
import { Button } from "@mui/material"

// components
// eslint-disable-next-line @typescript-eslint/naming-convention
const Map3D = dynamic(async () => import("./map3D"))

interface Map3DIndexState {
  loadScene: boolean
}

class Map3DIndex extends React.PureComponent<Map3DProps, Map3DIndexState> {
  public constructor (props: Readonly<Map3DProps>) {
    super(props)

    this.state = {
      loadScene: false
    }
  }

  private readonly handleLoadScene = (): void => {
    this.setState({
      loadScene: true
    })
  }

  public render (): React.ReactNode {
    const { stageId } = this.props
    const { loadScene } = this.state
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
        <Paper
          elevation={10}
          sx={{ height: "100%" }}
        >
          <div
            style={{
              aspectRatio: "16/9",
              display: "block",
              filter: "brightness(0.5)",
              position: "relative"
            }}
          >
            <MapPreviewImage
              stageId={stageId}
            />
          </div>

          <Button
            color="primary"
            onClick={this.handleLoadScene}
            sx={{
              top: "-35%",
              left: "50%",
              transform: "translateX(-50%)",
              position: "relative"
            }}
            variant="contained"
          >
            {!loadScene ? "加载场景" : "请稍后..."}
          </Button>

          {loadScene &&
            <div
              style={{
                position: "relative",
                top: "calc(-100% - 37.5px)"
              }}
            >
              <Map3D
                stageId={stageId}
              />
            </div>}
        </Paper>
      </div>
    )
  }
}

export default Map3DIndex
