import React from "react"
import { isFragment } from "react-is"

import Box from "@mui/material/Box"
import Link from "@mui/material/Link"

import HeadingAnchor from "./headingAnchor"
import type { HeadingAnchorProps } from "./headingAnchor"

interface WithTableOfContentsProps {
  readonly children: React.ReactNode[]
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
function flattenChildren (children: React.ReactNode): React.ReactNode[] {
  const childrenArray = React.Children.toArray(children)
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  return childrenArray.reduce((flatChildren: React.ReactNode[], child) => {
    if (isFragment(child)) {
      return flatChildren.concat(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        flattenChildren(child.props.children)
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
        if (child.type === HeadingAnchor) {
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
