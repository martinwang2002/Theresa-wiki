import React from "react"

import { Button } from "@mui/material"
import LinearProgress from "@mui/material/LinearProgress"
import Paper from "@mui/material/Paper"
import dynamic from "next/dynamic"

import MapPreviewImage from "@/components/map/mapPreview/mapPreviewImage"

import type { Map3DProps } from "./map3D"
import WorldViewTip from "./worldViewTip"

// eslint-disable-next-line @typescript-eslint/naming-convention
const Map3D = dynamic(async () => import("./map3D"))

interface Map3DIndexState {
  loadScene: boolean
  loadScenePhase: number
  loadSceneDataProgress: number
}

class Map3DIndex extends React.PureComponent<Map3DProps, Map3DIndexState> {
  public constructor (props: Readonly<Map3DProps>) {
    super(props)

    this.state = {
      loadScene: false,
      loadSceneDataProgress: 0,
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

  private readonly handleLoadSceneDataProgressChange = (progress: number): void => {
    this.setState({
      loadSceneDataProgress: progress
    })
  }

  public render (): React.ReactNode {
    const { stageId } = this.props
    const { loadScene, loadScenePhase, loadSceneDataProgress } = this.state

    const phases = ["正在加载脚本.", "正在加载场景配置文件..", "正在加载场景美术资源...", "场景加载失败"]

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const values = [0, 20, 40, 100, 0]
    const phaseThreePercentage = 60
    const progressValue = values[loadScenePhase] + loadSceneDataProgress * phaseThreePercentage
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const progressValueBuffer = values[loadScenePhase + 1]

    const loadScenePhaseError = 3

    return (
      <div style={{
        aspectRatio: "16/9",
        borderRadius: "1rem",
        display: "block",
        margin: "auto",
        maxHeight: "50vh",
        maxWidth: "90%",
        overflow: "hidden",
        position: "relative",
        width: "auto"
      }}
      >
        <Paper
          elevation={10}
          sx={{
            aspectRatio: "16/9",
            height: "100%"
          }}
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

          <div
            style={{
              aspectRatio: "16/9",
              display: "block",
              position: "relative",
              top: "-100%"
            }}
          >
            <Button
              color={loadScenePhase !== loadScenePhaseError ? "primary" : "error"}
              onClick={this.handleLoadScene}
              sx={{
                left: "50%",
                top: "60%",
                transform: "translateX(-50%)"
              }}
              variant="contained"
            >
              {!loadScene ? "加载场景" : phases[loadScenePhase]}
            </Button>

            {!!loadScene &&
              <LinearProgress
                color="warning"
                sx={{
                  top: "70%"
                }}
                value={progressValue}
                valueBuffer={progressValueBuffer}
                variant="determinate"
              />}

            {!!loadScene &&
              <WorldViewTip />}
          </div>

          {!!loadScene &&
            <div
              style={{
                position: "relative",
                top: "-200%"
              }}
            >
              <Map3D
                onLoadSceneDataProgressChange={this.handleLoadSceneDataProgressChange}
                onLoadScenePhaseChange={this.handleLoadScenePhaseChange}
                stageId={stageId}
              />
            </div>}
        </Paper>
      </div>
    )
  }
}

export default Map3DIndex
