/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-named-default */
import type { UrlObject } from "url"

import React from "react"

import { default as MuiLink } from "@mui/material/Link"
import type { LinkProps as MuiLinkProps } from "@mui/material/Link"
import type { SxProps } from "@mui/system"
import { default as NextLink } from "next/link"

interface IStyledLinkProps extends Omit<MuiLinkProps, "href"> {
  href: UrlObject | string
  sx?: SxProps
}

export default class StyledLink extends React.PureComponent<IStyledLinkProps> {
  private static readonly defaultProps = {
    sx: {}
  }

  public render (): React.ReactNode {
    const { href, sx, ...otherMuiLinkProps } = this.props
    return (
      <NextLink
        href={href}
        legacyBehavior
        passHref
      >
        <MuiLink
          sx={{ textUnderlineOffset: 2, ...sx }}
          {...otherMuiLinkProps}
        />
      </NextLink>
    )
  }
}
