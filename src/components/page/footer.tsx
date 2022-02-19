/* eslint-disable react/jsx-max-depth */
// libs
import React from "react"
import Link from "next/link"

// models
import { publicRuntimeConfig } from "@/configurations/runtimeConfig"
import { THERESA_WIKI_VERSION } from "@/models/changelog"

// styles
import style from "./page.module.scss"

class Footer extends React.PureComponent {
  public render (): React.ReactNode {
    return (
      <div className={style.footer}>
        <div className={style.footer_links}>
          <Link
            href="/about/privacy"
          >
            隐私权政策
          </Link>

          <Link
            href="/about/credits"
          >
            内容来源
          </Link>

          {/* <Link
            href="/about/changelog"
          >
            更新记录
          </Link> */}
        </div>

        <div className={style.version}>
          {THERESA_WIKI_VERSION}

          {" "}

          {publicRuntimeConfig.GIT_COMMIT}
        </div>
      </div>
    )
  }
}

export default Footer
