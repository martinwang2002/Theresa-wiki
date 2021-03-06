import React from "react"

import Box from "@mui/material/Box"
import Link from "@mui/material/Link"

import HeadingAnchor from "./headingAnchor"
import type { HeadingAnchorProps } from "./headingAnchor"

interface WithTableOfContentsProps {
  children: React.ReactNode[]
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
function flattenChildren (children: React.ReactNode): (React.ReactChild | React.ReactFragment | React.ReactPortal)[] {
  const childrenArray = React.Children.toArray(children)
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  return childrenArray.reduce((flatChildren: (React.ReactChild | React.ReactFragment | React.ReactPortal)[], child) => {
    if ((child as React.ReactElement).type === React.Fragment) {
      return flatChildren.concat(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        flattenChildren((child as React.ReactElement).props.children)
      )
    }
    flatChildren.push(child)
    return flatChildren
  }, [])
}

export default class WithTableOfContents extends React.PureComponent<WithTableOfContentsProps> {
  public render (): React.ReactNode {
    const { children } = this.props

    // obtain HeadingAnchor components props
    const headingAnchorsProps = flattenChildren(children).map((child): HeadingAnchorProps | undefined => {
      if (React.isValidElement(child) && typeof child.type !== "string") {
        if (child.type.name === HeadingAnchor.name) {
          const headingAnchorProps = child.props as HeadingAnchorProps
          return headingAnchorProps
        }
      }
      return undefined
    }).filter((headingAnchorProps): headingAnchorProps is HeadingAnchorProps => headingAnchorProps !== undefined)

    const barWidth = 1
    return (
      <>
        <Box sx={{ display: "flex", my: 1 }}>
          <Box sx={{ bgcolor: "primary.light", width: theme => theme.spacing(barWidth) }} />

          <Box sx={{ ml: 1, py: 0.25 }}>

            {headingAnchorsProps.map((headingAnchorProps) => {
              return (
                <Link
                  href={"#" + headingAnchorProps.id}
                  key={headingAnchorProps.text}
                  sx={{ cursor: "pointer", display: "block", my: 0.35 }}
                  underline="hover"
                >
                  {headingAnchorProps.text}
                </Link>
              )
            })}
          </Box>
        </Box>

        {children}
      </>
    )
  }
}
