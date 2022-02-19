// libs
import React from "react"
import Image from "next/image"
import Paper from "@mui/material/Paper"
import { serialize } from "uri-js"
import type { ImageLoaderProps } from "next/image"

// models
import { publicRuntimeConfig } from "@/configurations/runtimeConfig"

interface MapPreviewProps{
  stageId: string
}

const staticLoader = ({ src, width, quality }: Readonly<ImageLoaderProps>): string => {
  const fallbackQuality = 75
  return src.replace("width", String(width)).replace("quality", String(quality ?? fallbackQuality))
}

class MapPreview extends React.PureComponent<MapPreviewProps> {
  public render (): React.ReactNode {
    const { stageId } = this.props

    const normalStageId = stageId.replace("__f__", "")
    const imageSrc = serialize({
      ...publicRuntimeConfig.THERESA_STATIC,
      path: `/api/v0/AK_AB/CN/Android/latest/mappreview/${normalStageId}/width/quality`
    })

    return (
      <>
        <h2 id="mapPreview">
          地图预览
        </h2>

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
          {/* TODO:  */}

          {/* mui model */}

          <Paper
            elevation={10}
            sx={{ height: "100%" }}
          >
            <Image
              alt={`Stage Preview Picture ${stageId}`}
              layout="fill"
              loader={staticLoader}
              src={imageSrc}
            />
          </Paper>
        </div>
      </>
    )
  }
}

export default MapPreview
