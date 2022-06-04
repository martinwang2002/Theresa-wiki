import React from "react"

import { Button } from "@mui/material"
import Paper from "@mui/material/Paper"
import dynamic from "next/dynamic"

import MapPreviewImage from "@/components/map/mapPreviewImage"

import type { Map3DProps } from "./map3D"

// eslint-disable-next-line @typescript-eslint/naming-convention
const Map3D = dynamic(async () => import("./map3D"))

interface Map3DIndexState {
  loadScene: boolean
  loadScenePhase: number
}

class Map3DIndex extends React.PureComponent<Map3DProps, Map3DIndexState> {
  public constructor (props: Readonly<Map3DProps>) {
    super(props)

    this.state = {
      loadScene: false,
      loadScenePhase: 0
    }
  }

  private readonly handleLoadScene = (): void => {
    this.setState({
      loadScene: true
    })
  }

  private readonly handleLoadScenePhaseChange = (phase: number): void => {
    this.setState({
      loadScenePhase: phase
    })
  }

  public render (): React.ReactNode {
    const { stageId } = this.props
    const { loadScene, loadScenePhase } = this.state

    const phases = ["正在加载脚本.", "正在加载场景配置文件..", "正在加载场景美术资源..."]

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
            {!loadScene ? "加载场景" : phases[loadScenePhase]}
          </Button>

          {loadScene &&
            <div
              style={{
                position: "relative",
                top: "calc(-100% - 37.5px)"
              }}
            >
              <Map3D
                onLoadPhaseChange={this.handleLoadScenePhaseChange}
                stageId={stageId}
              />
            </div>}
        </Paper>
      </div>
    )
  }
}

export default Map3DIndex
