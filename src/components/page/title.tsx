import React from "react"
import Link from "next/link"
import Image from "next/image"

class Title extends React.PureComponent {
  public render (): React.ReactNode {
    return (
      <Link
        href="/"
        passHref
      >
        <span
          style={{
            height: "32px",
            cursor: "pointer"
          }}
        >
          <Image
            height={32}
            src="/title.svg"
            unoptimized
            width={260}
          />
        </span>
      </Link>
    )
  }
}

export default Title
