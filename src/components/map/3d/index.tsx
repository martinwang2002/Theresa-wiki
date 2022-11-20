import React, { Suspense } from "react"

import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded"
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import Button from "@mui/material/Button"
import LinearProgress from "@mui/material/LinearProgress"
import Paper from "@mui/material/Paper"

import StyledLink from "@/components/common/styledLink"
import MapPreviewImage from "@/components/map/mapPreview/mapPreviewImage"

import type { Map3DProps } from "./map3D"
import WorldViewTip from "./worldViewTip"

const Map3D = React.lazy(async () => import("./map3D"))

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
      <>
        <Alert
          iconMapping={{
            info: <ScienceRoundedIcon fontSize="inherit" />
          }}
          severity="info"
          sx={{
            marginY: "1em"
          }}
        >
          <AlertTitle>
            3D场景地图 Beta 测试版
          </AlertTitle>

          已知问题：
          <ul>
            <li>
              部分阴影缺失或不正确。这是由于Three.js不支持面光源所产生的阴影，或摄像机不支持渲染。
            </li>
          </ul>

          您可以向
          <StyledLink
            href="/about/contact"
          >
            站长提交反馈
          </StyledLink>
          ，（开真银斩杀源石虫啦~~~
        </Alert>

        <Alert
          severity="warning"
          sx={{
            marginY: "1em"
          }}
        >
          3D场景地图非常考验浏览器性能，有可能导致您的浏览器卡顿或崩溃。
        </Alert>

        <Paper
          elevation={10}
          sx={{
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
              <Suspense>
                <Map3D
                  onLoadSceneDataProgressChange={this.handleLoadSceneDataProgressChange}
                  onLoadScenePhaseChange={this.handleLoadScenePhaseChange}
                  stageId={stageId}
                />
              </Suspense>
            </div>}
        </Paper>
      </>
    )
  }
}

export default Map3DIndex
