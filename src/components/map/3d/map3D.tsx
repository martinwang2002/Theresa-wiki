// libs
import React from "react"
import type { Group } from "three"
import {
  MeshPhongMaterial,
  Scene,
  Color,
  PerspectiveCamera,
  DirectionalLight,
  Mesh,
  WebGLRenderer,
  HemisphereLight
} from "three"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { serialize as serializeUri } from "uri-js"

import { publicRuntimeConfig } from "@/configurations/runtimeConfig"

interface Map3DProps{
  stageId: string
}

// interface LightmapConfigs {
//   x: number
//   y: number
//   z: number
//   w: number
// }

interface Map3DConfigApi {
  rootScene: {
    obj: string
    // lightmap: string
    // lightmapConfigs: LightmapConfigs[]
  }
}

interface Map3DConfig {
  rootScene: {
    obj: Group
    // lightmap: Texture
    // lightmapConfigs: LightmapConfigs[]
  }
}

const loadSceneData = async (stageId: string): Promise<Map3DConfig> => {
  const configJson = await fetch(serializeUri({
    ...publicRuntimeConfig.THERESA_STATIC,
    path: `/api/v0/AK/CN/Android/map3d/${stageId}/config`
  }), { method: "GET" }).then(async res => res.json()) as Map3DConfigApi

  const objLoader = new OBJLoader()

  const rootSceneObj = await objLoader.loadAsync(configJson.rootScene.obj)

  // const textureLoader = new TextureLoader()
  // const lightmap = await textureLoader.loadAsync(configJson.rootScene.lightmap)
  // lightmap.encoding = sRGBEncoding
  // lightmap.anisotropy = 16
  // const lightmapConfigs = configJson.rootScene.lightmapConfigs

  const map3DConfig: Map3DConfig = {
    rootScene: {
      obj: rootSceneObj
      // lightmap: lightmap,
      // lightmapConfigs: lightmapConfigs
    }
  }

  return map3DConfig
}

class Map3D extends React.PureComponent<Map3DProps> {
  public constructor (props: Readonly<Map3DProps>) {
    super(props)
    this.sceneContainer = React.createRef()
  }

  public async componentDidMount (): Promise<void> {
    await this.threejsRender()
  }

  private async threejsRender (): Promise<void> {
    const { stageId } = this.props
    const map3DConfig = await loadSceneData(stageId)

    const container = this.sceneContainer.current ?? document.createElement("div")

    // Creating the scene
    const scene = new Scene()
    scene.background = new Color("skyblue")

    // camera
    const fov = 35
    const aspect = container.clientWidth / container.clientHeight
    const near = 0.1
    const far = 100
    const camera = new PerspectiveCamera(fov, aspect, near, far)
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    camera.position.set(0, -10, -20)

    // light
    const mainLight = new DirectionalLight("#fff")
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    mainLight.position.set(0, 100, -80)
    scene.add(mainLight)

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const hemisphereLight = new HemisphereLight("#ffffff", "#b0bec5", 1)
    // const hemisphereLight = new HemisphereLight("#ffffff", "#90a4ae", 1)
    scene.add(hemisphereLight)

    // obj
    const rootSceneObj = map3DConfig.rootScene.obj
    rootSceneObj.traverse(function (child) {
      if (child instanceof Mesh) {
        child.material = new MeshPhongMaterial({
          color: "#90a4ae",
          shininess: 10,
          refractionRatio: 0.3
        })
      }
    })
    scene.add(rootSceneObj)

    // controls
    const orbitalControls = new OrbitControls(camera, container)
    orbitalControls.enabled = true

    // renderer
    const renderer = new WebGLRenderer({ antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    renderer.setAnimationLoop(() => {
      render()
    })

    function render (): void {
      renderer.render(scene, camera)
    }
  }

  private readonly sceneContainer: React.RefObject<HTMLDivElement>

  public render (): React.ReactNode {
    return (
      <div
        ref={this.sceneContainer}
        style={{
          aspectRatio: "16/9",
          display: "block"
        }}
      />
    )
  }
}

export default Map3D

export type { Map3DProps }
