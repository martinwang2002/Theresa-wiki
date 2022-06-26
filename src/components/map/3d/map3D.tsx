import React from "react"

import {
  MeshStandardMaterial,
  Scene,
  Color,
  PerspectiveCamera,
  DirectionalLight,
  Mesh,
  WebGLRenderer,
  TextureLoader,
  Quaternion,
  HemisphereLight
} from "three"
import type { Group, MeshStandardMaterialParameters, Texture } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { serialize as serializeUri } from "uri-js"

import { publicRuntimeConfig } from "@/configurations/runtimeConfig"

interface Map3DProps {
  stageId: string
}

interface Map3DPropsWithPhase extends Map3DProps {
  onLoadScenePhaseChange: (phase: number) => void
  onLoadSceneDataProgressChange: (progress: number) => void
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
  map: string
  emissionMap: string | null
  bumpMap: string | null
  metallicGlossMap: string | null
  bumpScale: number
  glossiness: number
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
    materials: Record<string, MeshStandardMaterialParameters>
    meshConfigs: Map3DConfigApiMeshConfig[]
  }
}

const loadSceneData = async (
  stageId: string,
  onLoadScenePhaseChange: (phase: number) => void,
  onLoadSceneDataProgressChange: (progress: number) => void
): Promise<Map3DConfig | undefined> => {
  let total: number
  let loaded: number
  const zero = 0
  loaded = zero
  total = zero
  const step = 1

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  const handleProgressEvent = (event: ProgressEvent): void => {
    if (event.lengthComputable) {
      if (event.loaded === event.total) {
        loaded += step
        onLoadSceneDataProgressChange(loaded / total)
      }
    }
  }

  const handleProgressTextureLoader = (): void => {
    loaded += step
    onLoadSceneDataProgressChange(loaded / total)
  }

  onLoadScenePhaseChange(Map3DLoadPhase.config)

  const configJson = await fetch(serializeUri({
    ...publicRuntimeConfig.THERESA_STATIC,
    path: `/api/v0/AK/CN/Android/map3d/stage/${stageId}/config`
  }), { method: "GET" })
    .then(async res => res.json())
    .catch(() => {
      onLoadScenePhaseChange(Map3DLoadPhase.error)
    }) as Map3DConfigApi | undefined

  if (!configJson) {
    onLoadScenePhaseChange(Map3DLoadPhase.error)
    return undefined
  }

  onLoadScenePhaseChange(Map3DLoadPhase.scene)

  const objLoader = new OBJLoader()

  total += step
  const rootSceneObj = objLoader.loadAsync(configJson.rootScene.obj, (event) => {
    handleProgressEvent(event)
  })

  const textureLoader = new TextureLoader()

  const materials = {} as Record<string, MeshStandardMaterialParameters>

  const result = Object.entries(configJson.rootScene.materials).map(async ([key, value]) => {
    // load texture or map
    let map: Promise<Texture> | null
    map = null
    if (value.map) {
      total += step
      map = textureLoader.loadAsync(value.map).then((texture) => {
        handleProgressTextureLoader()
        return texture
      })
    }

    // load emissionMap or emissiveMap
    let emissionMap: Promise<Texture> | null
    emissionMap = null
    if (value.emissionMap !== null) {
      total += step
      emissionMap = textureLoader.loadAsync(value.emissionMap).then((texture) => {
        handleProgressTextureLoader()
        return texture
      })
    }

    // load bumpMap
    let bumpMap: Promise<Texture> | null
    bumpMap = null
    if (value.bumpMap !== null) {
      total += step
      bumpMap = textureLoader.loadAsync(value.bumpMap).then((texture) => {
        handleProgressTextureLoader()
        return texture
      })
    }

    // load metallicGlossMap
    let metallicGlossMap: Promise<Texture> | null
    metallicGlossMap = null
    if (value.metallicGlossMap !== null) {
      total += step
      metallicGlossMap = textureLoader.loadAsync(value.metallicGlossMap).then((texture) => {
        handleProgressTextureLoader()
        return texture
      })
    }

    const meshMaterial = {
      color: value.color ? new Color(value.color.r, value.color.g, value.color.b) : null,
      emissive: value.emissionColor ? new Color(value.emissionColor.r, value.emissionColor.g, value.emissionColor.b) : null,
      emissiveIntensity: value.emissionColor ? value.emissionColor.a : null,
      emissiveMap: await emissionMap ?? null,
      map: await map ?? null,
      metalness: value.glossiness,
      metalnessMap: await metallicGlossMap ?? null,
      normalMap: await bumpMap ?? null
    } as MeshStandardMaterialParameters
    materials[key] = meshMaterial
  })

  await Promise.all(result).catch(() => {
    onLoadScenePhaseChange(Map3DLoadPhase.error)
  })
  // lightmap.encoding = sRGBEncoding
  // lightmap.anisotropy = 16
  // const lightmapConfigs = configJson.rootScene.lightmapConfigs

  const map3DConfig: Map3DConfig = {
    rootScene: {
      materials,
      meshConfigs: configJson.rootScene.meshConfigs,
      obj: await rootSceneObj
    }
  }

  return map3DConfig
}

enum Map3DLoadPhase {
  script = 0,
  config = 1,
  scene = 2,
  error = 3
}

class Map3D extends React.PureComponent<Map3DPropsWithPhase> {
  public constructor (props: Readonly<Map3DPropsWithPhase>) {
    super(props)
    this.sceneContainer = React.createRef()
  }

  public async componentDidMount (): Promise<void> {
    await this.threejsRender()
  }

  private async threejsRender (): Promise<void> {
    const { stageId, onLoadScenePhaseChange, onLoadSceneDataProgressChange } = this.props

    const map3DConfig = await loadSceneData(stageId, onLoadScenePhaseChange, onLoadSceneDataProgressChange)

    if (!map3DConfig) {
      return
    }

    const container = this.sceneContainer.current ?? document.createElement("div")

    // Creating the scene
    const scene = new Scene()
    scene.background = new Color("skyblue")

    // camera
    const fov = 40
    // const aspect = container.clientWidth / container.clientHeight
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const aspect = 16 / 9
    const near = 0.3
    const far = 1000
    const camera = new PerspectiveCamera(fov, aspect, near, far)
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    camera.position.set(0, -5, -8)
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    camera.rotation.setFromQuaternion(new Quaternion(-2.5, 0, 0, 0.96))

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
        child.material = new MeshStandardMaterial(
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
