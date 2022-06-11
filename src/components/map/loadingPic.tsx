import React from "react"

import Image from "next/image"

// import type { ImageLoaderProps } from "next/image"

interface LoadingPicProps {
  loadingPicId: string
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line no-unused-vars
// const myLoader = ({ src, width, quality }: ImageLoaderProps): string => {
//   return src
//   // const qualityFallback = 75
//   // return `https://example.com/${src}?w=${width}&q=${quality || qualityFallback}`
// }

class LoadingPict extends React.PureComponent<LoadingPicProps> {
  public render (): React.ReactNode {
    const { loadingPicId } = this.props
    // FIXME no longer available
    const imageSrc = `https://s3-torappu.martinwang2002.com/api/v0/CN/Android/latest/unpacked_assetbundle/assets/torappu/dynamicassets/arts/[uc]loadingillusts/${loadingPicId.toLocaleLowerCase()}.png`
    return (
      <div style={{
        aspectRatio: "16/9",
        display: "block",
        width: "100%",
        overflow: "hidden",
        position: "relative"
      }}
      >
        <Image
          alt={`Loading Picture ${loadingPicId}`}
          layout="fill"
          // loader={myLoader}
          src={imageSrc}
        />
      </div>
    )
  }
}

export default LoadingPict
