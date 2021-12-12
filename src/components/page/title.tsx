import React from "react"
import Link from "next/link"
import style from "./page.module.scss"

class Title extends React.PureComponent {
  public render (): React.ReactNode {
    return (
      <Link
        href="/"
        passHref
      >
        <span className={style.theresa_title_clickable}>
          <span className={style.theresa_cn}>
            特蕾西娅
          </span>

          <span className={style.theresa}>
            Theresa.wiki
          </span>
        </span>
      </Link>
    )
  }
}

export default Title
