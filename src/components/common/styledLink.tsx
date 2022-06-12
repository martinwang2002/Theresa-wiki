/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-named-default */
import type { UrlObject } from "url"

import React from "react"

import { default as MuiLink } from "@mui/material/Link"
import type { LinkProps as MuiLinkProps } from "@mui/material/Link"
import { default as NextLink } from "next/link"

interface IStyledLinkProps extends Omit<MuiLinkProps, "href"> {
  href: UrlObject | string
}

export default class StyledLink extends React.PureComponent<IStyledLinkProps> {
  public render (): React.ReactNode {
    const { href, ...otherMuiLinkProps } = this.props
    return (
      <NextLink
        href={href}
        passHref
      >
        <MuiLink {...otherMuiLinkProps} />
      </NextLink>
    )
  }
}
