import React from "react"

import Image from "next/image"
import { serialize } from "uri-js"

import { publicRuntimeConfig } from "@/configurations/runtimeConfig"

interface MapPreviewImageProps {
  stageId: string
}

class MapPreviewImage extends React.PureComponent<MapPreviewImageProps> {
  public render (): React.ReactNode {
    const { stageId } = this.props

    const normalStageId = stageId.replace("__f__", "")

    const width = 1080
    const quality = 75

    const imageSrc = serialize({
      ...publicRuntimeConfig.THERESA_STATIC,
      path: `/api/v0/AK/CN/Android/mappreview/${normalStageId}/${width}/${quality}`
    })

    return (
      <Image
        alt={`Stage Preview Picture ${stageId}`}
        fill
        src={imageSrc}
      />
    )
  }
}

export default MapPreviewImage
