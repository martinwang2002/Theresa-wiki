// libs
import React from "react"

interface HeadingAnchorProps{
  id: string
  text: string
}

export default class HeadingAnchor extends React.PureComponent<HeadingAnchorProps> {
  public render (): React.ReactNode {
    const { text, id } = this.props
    return (
      <h2 id={id}>
        {text}
      </h2>
    )
  }
}

export type { HeadingAnchorProps }
