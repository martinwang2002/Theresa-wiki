// libs
import React from "react"
import Link from "@mui/material/Link"

// components
import HeadingAnchor from "./headingAnchor"
import type { HeadingAnchorProps } from "./headingAnchor"

interface WithTableOfContentsProps{
  children: React.ReactNode[]
}

export default class WithTableOfContents extends React.PureComponent<WithTableOfContentsProps> {
  public render (): React.ReactNode {
    const { children } = this.props

    // obtain HeadingAnchor components props
    const headingAnchorsProps = React.Children.toArray(children).map((child): HeadingAnchorProps | undefined => {
      if (React.isValidElement(child) && typeof child.type !== "string") {
        if (child.type.name === HeadingAnchor.name) {
          const headingAnchorProps = child.props as HeadingAnchorProps
          return headingAnchorProps
        }
      }
      return undefined
    }).filter((headingAnchorProps): headingAnchorProps is HeadingAnchorProps => headingAnchorProps !== undefined)

    return (
      <>
        <div style={{ marginTop: "1rem", marginBottom: "1rem", display: "flex" }}>
          <div style={{ width: "0.5rem", backgroundColor: "#00B3FD" }} />

          <div style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>

            {headingAnchorsProps.map((headingAnchorProps) => {
              return (
                <Link
                  href={"#" + headingAnchorProps.id}
                  key={headingAnchorProps.text}
                  sx={{ marginLeft: "0.5em", marginTop: "0.25em", marginBottom: "0.25em", cursor: "pointer", display: "block" }}
                  underline="hover"
                >
                  {headingAnchorProps.text}
                </Link>
              )
            })}
          </div>
        </div>

        {children}
      </>
    )
  }
}
