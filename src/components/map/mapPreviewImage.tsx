import React from "react"

import Image from "next/image"
import type { ImageLoaderProps } from "next/image"
import { serialize } from "uri-js"

import { publicRuntimeConfig } from "@/configurations/runtimeConfig"

interface MapPreviewImageProps {
  stageId: string
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const staticLoader = ({ src, width, quality }: Readonly<ImageLoaderProps>): string => {
  const fallbackQuality = 75
  return src.replace("width", String(width)).replace("quality", String(quality ?? fallbackQuality))
}

class MapPreviewImage extends React.PureComponent<MapPreviewImageProps> {
  public render (): React.ReactNode {
    const { stageId } = this.props

    const normalStageId = stageId.replace("__f__", "")
    const imageSrc = serialize({
      ...publicRuntimeConfig.THERESA_STATIC,
      path: `/api/v0/AK/CN/Android/mappreview/${normalStageId}/width/quality`
    })

    return (
      <Image
        alt={`Stage Preview Picture ${stageId}`}
        layout="fill"
        loader={staticLoader}
        src={imageSrc}
      />
    )
  }
}

export default MapPreviewImage
