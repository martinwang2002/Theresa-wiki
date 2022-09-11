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

interface XY {
  x: number
  y: number
}

interface TexEnv {
  texture: string | null
  scale: XY
  offset: XY
}
interface Map3DConfigApiMaterial {
  texEnvs: {
    bumpMap?: TexEnv
    emissionMap?: TexEnv
    mainTex?: TexEnv
    metallicGlossMap?: TexEnv
    occlusionMap?: TexEnv
    [key: string]: TexEnv | undefined
  }
  floats: {
    bumpScale?: number
    cutoff?: number
    detailNormalMapScale?: number
    dstBlend?: number
    glossMapScale?: number
    glossiness?: number
    glossyReflections?: number
    metallic?: number
    mode?: number
    occlusionStrength?: number
    parallax?: number
    smoothnessTextureChannel?: number
    specularHighlights?: number
    srcBlend?: number
    uvSec?: number
    zWrite?: number
    [key: string]: number | undefined
  }
  colors: {
    color?: ConfigColor
    emissionColor?: ConfigColor
    [key: string]: ConfigColor | undefined
  }
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
    let map: Promise<Texture> | undefined
    map = undefined
    if (value.texEnvs.mainTex?.texture !== undefined && value.texEnvs.mainTex.texture !== null) {
      total += step
      map = textureLoader.loadAsync(value.texEnvs.mainTex.texture).then((texture) => {
        handleProgressTextureLoader()
        return texture
      })
    }

    // load emissionMap or emissiveMap
    let emissionMap: Promise<Texture> | undefined
    emissionMap = undefined
    if (value.texEnvs.emissionMap?.texture !== undefined && value.texEnvs.emissionMap.texture !== null) {
      total += step
      emissionMap = textureLoader.loadAsync(value.texEnvs.emissionMap.texture).then((texture) => {
        handleProgressTextureLoader()
        return texture
      })
    }

    // load bumpMap
    let bumpMap: Promise<Texture> | undefined
    bumpMap = undefined
    if (value.texEnvs.bumpMap?.texture !== undefined && value.texEnvs.bumpMap.texture !== null) {
      total += step
      bumpMap = textureLoader.loadAsync(value.texEnvs.bumpMap.texture).then((texture) => {
        handleProgressTextureLoader()
        return texture
      })
    }

    // load metallicGlossMap
    let metallicGlossMap: Promise<Texture> | undefined
    metallicGlossMap = undefined
    if (value.texEnvs.metallicGlossMap?.texture !== undefined && value.texEnvs.metallicGlossMap.texture !== null) {
      total += step
      metallicGlossMap = textureLoader.loadAsync(value.texEnvs.metallicGlossMap.texture).then((texture) => {
        handleProgressTextureLoader()
        return texture
      })
    }

    const alphaTestMagicNumber = 0.5

    const meshMaterial = {
      alphaTest: alphaTestMagicNumber,
      color: value.colors.color ? new Color(value.colors.color.r, value.colors.color.g, value.colors.color.b) : null,
      emissive: value.colors.emissionColor ? new Color(value.colors.emissionColor.r, value.colors.emissionColor.g, value.colors.emissionColor.b) : null,
      emissiveIntensity: value.colors.emissionColor !== undefined ? value.colors.emissionColor.a : null,
      emissiveMap: await emissionMap ?? null,
      map: await map ?? null,
      metalness: value.floats.glossiness,
      metalnessMap: await metallicGlossMap ?? null,
      normalMap: await bumpMap ?? null,
      // threejs need to handle transparent image separately
      transparent: true
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
      renderer.render(scene, camera)
    })
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
