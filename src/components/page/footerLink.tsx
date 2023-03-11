import React from "react"

import { styled } from "@mui/system"
import Link from "next/link"
import type { LinkProps } from "next/link"

interface IFooterLinkProps {
  href: LinkProps["href"]
  icon: JSX.Element
  text: string
}

const LinkItem = styled("span")({
  "&:hover": {
    color: "#fff",
    cursor: "pointer"
  },
  margin: "0.2em auto",
  textDecoration: "none",
  transition: "color 500ms ease"
})

class FooterLink extends React.PureComponent<IFooterLinkProps> {
  public render (): React.ReactNode {
    const { href, icon, text } = this.props

    return (
      <Link
        href={href}
        legacyBehavior
        passHref
        prefetch={false}
      >
        <LinkItem>
          {icon}

          <span style={{ verticalAlign: "middle" }}>
            {text}
          </span>
        </LinkItem>
      </Link>
    )
  }
}

export default FooterLink
