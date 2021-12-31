/* eslint-disable react/jsx-max-depth */
import React from "react"
import Link from "next/link"
import getConfig from "next/config"

import style from "./page.module.scss"

interface IPublicRuntimeConfig {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  THERESA_WIKI_VERSION: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  GIT_COMMIT: string
}

const { publicRuntimeConfig } = getConfig() as {
  publicRuntimeConfig: IPublicRuntimeConfig
}

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
          {publicRuntimeConfig.THERESA_WIKI_VERSION}

          {" "}

          {publicRuntimeConfig.GIT_COMMIT}
        </div>
      </div>
    )
  }
}

export default Footer
