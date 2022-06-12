import React from "react"

import style from "./page.module.scss"
import Title from "./title"

class Header extends React.PureComponent {
  public render (): React.ReactNode {
    return (
      <nav
        className={style.navbar_theresa}
        data-elastic-exclude
        data-nosnippet
      >
        <div className={style["container-fluid"]}>
          <Title />
        </div>
      </nav>
    )
  }
}

export default Header
