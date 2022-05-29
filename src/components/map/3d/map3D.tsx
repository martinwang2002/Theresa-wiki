import React from "react"

import {
  MeshPhongMaterial,
  Scene,
  Color,
  PerspectiveCamera,
  DirectionalLight,
  Mesh,
  WebGLRenderer,
  TextureLoader,
  HemisphereLight
} from "three"
import type { Group, MeshPhongMaterialParameters, Texture } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
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

interface ConfigColor {
  r: number
  g: number
  b: number
  a: number
}

interface Map3DConfigApiMaterial {
  // texture link
  texture: string
  emissionMap: string | null
  color: ConfigColor | null
  emissionColor: ConfigColor | null
}

interface Map3DConfigApiMeshConfig {
  // material id
  material: string
}

interface Map3DConfigApi {
  rootScene: {
    obj: string
    materials: Record<string, Map3DConfigApiMaterial>
    meshConfigs: Map3DConfigApiMeshConfig[]
  }
}

interface Map3DConfig {
  rootScene: {
    obj: Group
    materials: Record<string, MeshPhongMaterialParameters>
    meshConfigs: Map3DConfigApiMeshConfig[]
  }
}

const loadSceneData = async (stageId: string): Promise<Map3DConfig> => {
  const configJson = await fetch(serializeUri({
    ...publicRuntimeConfig.THERESA_STATIC,
    path: `/api/v0/AK/CN/Android/map3d/stage/${stageId}/config`
  }), { method: "GET" }).then(async res => res.json()) as Map3DConfigApi

  const objLoader = new OBJLoader()

  const rootSceneObj = await objLoader.loadAsync(configJson.rootScene.obj)

  const textureLoader = new TextureLoader()

  const materials = {} as Record<string, MeshPhongMaterialParameters>

  const result = Object.entries(configJson.rootScene.materials).map(async ([key, value]) => {
    const texture = await textureLoader.loadAsync(value.texture)

    // load emissionMap or emissiveMap
    let emissionMap: Texture | null
    emissionMap = null
    if (value.emissionMap !== null) {
      emissionMap = await textureLoader.loadAsync(value.emissionMap)
    }

    const meshMaterial = {
      map: texture,
      color: value.color ? new Color(value.color.r, value.color.g, value.color.b) : null,
      emissive: value.emissionColor ? new Color(value.emissionColor.r, value.emissionColor.g, value.emissionColor.b) : null,
      emissiveIntensity: value.emissionColor ? value.emissionColor.a : null,
      emissiveMap: emissionMap ?? null
    } as MeshPhongMaterialParameters
    materials[key] = meshMaterial
  })

  await Promise.all(result)
  // lightmap.encoding = sRGBEncoding
  // lightmap.anisotropy = 16
  // const lightmapConfigs = configJson.rootScene.lightmapConfigs

  const map3DConfig: Map3DConfig = {
    rootScene: {
      obj: rootSceneObj,
      materials: materials,
      meshConfigs: configJson.rootScene.meshConfigs
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

    let _index: number
    const zero = 0
    _index = zero
    rootSceneObj.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = new MeshPhongMaterial(
          map3DConfig.rootScene.materials[map3DConfig.rootScene.meshConfigs[_index].material]
        )
        _index++
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
