import React from "react"
import Head from "next/head"
import Skeleton from "@mui/material/Skeleton"

import Page from "@/components/page/page"
import style from "./credits.module.scss"

interface ICreditsState {
  openSourceLicenses: string
  openSourceLicensesLoaded: boolean
  openSourceLicensesLoadingError: boolean
}

const contentsLicenses = `\
特蕾西娅 Theresa.wiki 网站内所使用的游戏资源（包括但不限于 游戏图片、动画、音频、文本原文或其转译版本等），其目的仅为更好地反映游戏内对应元素、增强用户体验，相关作品之版权仍属于上海鹰角网络科技有限公司和/或其关联公司，即鹰角网络游戏软件和/或鹰角网络游戏服务的提供方（包括但不限于 YOSTAR (HONG KONG) LIMITED, 株式会社Yostar, YOSTAR LIMITED, 龍成網路 等）

特蕾西娅 Theresa.wiki 网站内所使用的部分资源来源于 PRTS.wiki (http://prts.wiki/) (CC BY-NC-SA 4.0) 并同时对部分资源进行了非歧义性的更改。

特蕾西娅 Theresa.wiki 网站内所使用的部分资源来源于 ArknightsGameData (https://github.com/Kengxxiao/ArknightsGameData) 并同时对部分资源进行了非歧义性的更改。

特蕾西娅 Theresa.wiki 网站内所使用的关卡掉落数据来源于 企鹅物流数据 (https://penguin-stats.io/) (CC BY-NC 4.0)，对企鹅物流的贡献者（包括团队成员以及上传数据的刀客塔）在此表示感谢

特蕾西娅 Theresa.wiki 网站内所使用的部分字体文件来源于 Google Fonts (https://fonts.google.com/) (OFL)，包括 Roboto Mono, Corinthia, ZCOOL QingKe HuangYou.\
`

export default class Credits extends React.PureComponent<null, ICreditsState> {
  public constructor (props: null) {
    super(props)

    this.state = {
      openSourceLicenses: "",
      openSourceLicensesLoaded: false,
      openSourceLicensesLoadingError: false
    }
  }

  public async componentDidMount (): Promise<void> {
    const response = await fetch("/LICENSES.txt")
    const openSourceLicenses = await response.text()
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      openSourceLicensesLoaded: true,
      openSourceLicensesLoadingError: !response.ok,
      openSourceLicenses: openSourceLicenses
    })
  }

  public render (): React.ReactNode {
    const { openSourceLicenses, openSourceLicensesLoaded, openSourceLicensesLoadingError } = this.state

    const openSourceLicensesErrorPrompt: JSX.Element = (
      <p>
        Error in loading licenses
      </p>
    )

    const openSourceLicensesTextField: JSX.Element = (
      <>
        <h3>
          开源许可列表
        </h3>

        <div className={style.license}>
          {openSourceLicenses}
        </div>
      </>
    )

    const skeleton = (): JSX.Element => {
      return (
        <>
          <Skeleton
            variant="text"
            width="6em"
          />

          <Skeleton variant="text" />

          <Skeleton variant="text" />
        </>
      )
    }
    return (
      <Page>
        <Head>

          <title>
            内容来源 | Theresa.wiki
          </title>

        </Head>

        <div>
          <h3>
            网站内容声明
          </h3>

          <div className={style.license}>
            {contentsLicenses}
          </div>

          {openSourceLicensesLoaded
            ? (openSourceLicensesLoadingError ? openSourceLicensesErrorPrompt : openSourceLicensesTextField)
            : skeleton}

        </div>

      </Page>

    )
  }
}
