import React from "react"
import Head from "next/head"
import { TextField, Shimmer, ShimmerElementsGroup, ShimmerElementType } from "@fluentui/react"
import type { IShimmerElement } from "@fluentui/react"

import Page from "@/components/page/page"
import style from "./about.module.scss"

interface ICreditsState {
  openSourceLicenses: string
  openSourceLicensesLoaded: boolean
  openSourceLicensesLoadingError: boolean
  shimmerElements: IShimmerElement[]
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
      openSourceLicensesLoadingError: false,
      shimmerElements: []

    }
  }

  public async componentDidMount (): Promise<void> {
    const shimmerLength = 10
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      shimmerElements: Array(shimmerLength).fill(undefined).map(() => {
        const oneHundred = 100
        const randomWidthPercentage = Math.round(Math.random() * oneHundred)
        return [
          { type: ShimmerElementType.line, width: `${randomWidthPercentage}%`, height: 14 },
          { type: ShimmerElementType.gap, width: `${oneHundred - randomWidthPercentage}%`, height: 14 },
          { type: ShimmerElementType.gap, width: "100%", height: 10 }
        ]
      }).flat()
    })
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
    const { openSourceLicenses, openSourceLicensesLoaded, openSourceLicensesLoadingError, shimmerElements } = this.state

    const openSourceLicensesErrorPrompt: JSX.Element = (
      <p>
        Error in loading licenses
      </p>
    )
    const openSourceLicensesTextField: JSX.Element = (
      <TextField
        label="开源许可列表"
        multiline
        readOnly
        rows={30}
        value={openSourceLicenses}
      />
    )
    const getCustomElements = (): JSX.Element => {
      return (
        <div>
          <ShimmerElementsGroup
            flexWrap
            shimmerElements={[
              { type: ShimmerElementType.gap, width: "100%", height: 5 },
              { type: ShimmerElementType.line, width: "6em", height: 14 },
              { type: ShimmerElementType.gap, width: "calc(100% - 6em)", height: 14 },
              { type: ShimmerElementType.gap, width: "100%", height: 10 },
              ...shimmerElements
            ]}
            width="100%"
          />
        </div>
      )
    }
    return (

      <Page>
        <Head>

          <title>
            内容来源 Theresa.wiki
          </title>

        </Head>

        <div className={style.container}>
          <TextField
            autoAdjustHeight
            label="网站内容声明"
            multiline
            readOnly
            value={contentsLicenses}
          />

          <Shimmer
            customElementsGroup={getCustomElements()}
            isDataLoaded={openSourceLicensesLoaded}
            width="300"
          >
            {openSourceLicensesLoadingError
              ? openSourceLicensesErrorPrompt
              : openSourceLicensesTextField}
          </Shimmer>

        </div>

      </Page>

    )
  }
}
