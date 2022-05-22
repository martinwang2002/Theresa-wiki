import React from "react"

import Link from "next/link"

interface IFooterLinkProps{
  href: string
  icon: JSX.Element
  text: string
}

class FooterLink extends React.PureComponent<IFooterLinkProps> {
  public render (): React.ReactNode {
    const { href, icon, text } = this.props

    return (
      <Link
        href={href}
        passHref
      >
        <span>
          {icon}

          <span style={{ verticalAlign: "middle" }}>
            {text}
          </span>
        </span>
      </Link>
    )
  }
}

export default FooterLink
