import React from "react"

import Skeleton from "@mui/material/Skeleton"
import { styled } from "@mui/system"
import Head from "next/head"

import Page from "@/components/page/page"

interface ICreditsState {
  openSourceLicenses: string
  openSourceLicensesLoaded: boolean
  openSourceLicensesLoadingError: boolean
}

const contentsLicenses = `\
特蕾西娅 Theresa.wiki 网站内所使用的游戏资源（包括但不限于 游戏图片、动画、音频、文本原文或其转译版本等），其目的仅为更好地反映游戏内对应元素、增强用户体验，相关作品之版权仍属于上海鹰角网络科技有限公司和/或其关联公司，即鹰角网络游戏软件和/或鹰角网络游戏服务的提供方（包括但不限于 YOSTAR (HONG KONG) LIMITED, 株式会社Yostar, YOSTAR LIMITED, 龍成網路 等）

The game resources (including but not limited to game pictures, animations, audios, original texts or their translations, etc.) used in the Theresa.wiki website are only for the purpose of better reflecting the corresponding elements in the game and enhancing the user experience. The copyright of related works still belongs to Shanghai Yingjiao Network Technology Co., Ltd. and/or its affiliates, that is, the provider of YOSTAR (HONG KONG) LIMITED , Yostar Co., Ltd., YOSTAR LIMITED, Yongcheng Network, etc.)

特蕾西娅 Theresa.wiki 网站内所使用的部分资源来源于 PRTS.wiki (http://prts.wiki/) (CC BY-NC-SA 4.0) 并同时对部分资源进行了非歧义性的更改。

Some of the resources used in the Theresa.wiki website are from PRTS.wiki (http://prts.wiki/) (CC BY-NC-SA 4.0) and some non-ambiguous changes have been made to some of the resources .

特蕾西娅 Theresa.wiki 网站内所使用的部分资源来源于 ArknightsGameData (https://github.com/Kengxxiao/ArknightsGameData) 并同时对部分资源进行了非歧义性的更改。

Some resources used in the Theresa.wiki website are derived from ArknightsGameData (https://github.com/Kengxxiao/ArknightsGameData) and some non-ambiguous changes have been made to some resources.

特蕾西娅 Theresa.wiki 网站内所使用的部分资源来源于 Arkwaifu (https://arkwaifu.cc/, https://github.com/FlandiaYingman/arkwaifu) 并同时对部分资源进行了非歧义性的更改。

Some resources used in the Theresa.wiki website are derived from Arkwaifu (https://arkwaifu.cc/, https://github.com/FlandiaYingman/arkwaifu) and some non-ambiguous changes have been made to some resources.

特蕾西娅 Theresa.wiki 网站内所使用的关卡掉落数据来源于 企鹅物流数据 (https://penguin-stats.io/) (CC BY-NC 4.0)，对企鹅物流的贡献者（包括团队成员以及上传数据的刀客塔）在此表示感谢

The level drop data used in the Theresa.wiki website is from Penguin Logistics Data (https://penguin-stats.io/) (CC BY-NC 4.0), contributors to Penguin Logistics (including the team members and the Doctors who uploaded the data). Special thanks to them.

特蕾西娅 Theresa.wiki 网站内所使用的 Bender 字体文件来源于 MyFonts (https://www.myfonts.com/viewlicense.php?lid=1630)。

Bender used in Theresa.wiki website is from MyFonts (https://www.myfonts.com/viewlicense.php?lid=1630)

特蕾西娅 Theresa.wiki 网站内所使用的部分字体文件来源于 Google Fonts (https://fonts.google.com/) (OFL 许可)，包括但不限于 Noto Serif, Roboto Mono, ZCOOL QingKe HuangYou。

Some font files used in Theresa.wiki website are from Google Fonts (https://fonts.google.com/) (OFL), including but not limited to Noto Serif, Roboto Mono, ZCOOL QingKe HuangYou.

特蕾西娅 Theresa.wiki 网站内所使用的部分字体文件来源于 https://github.com/Pal3love/dream-han-cjk (SIL Open Font License 1.1 许可)，包括但不限于 梦源宋体（大陆简中子集，字重27）。

Some font files used in Theresa.wiki website are from https://github.com/Pal3love/dream-han-cjk (SIL Open Font License 1.1), including but not limited to Dream Han Serif CN W27.
`

const StyledLicenseDiv = styled("div")({
  border: "2px solid #ccc",
  borderRadius: "0.75em",
  maxHeight: "50vh",
  overflowX: "hidden",
  overflowY: "auto",
  padding: "0.75em",
  whiteSpace: "pre-line"
})

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
      openSourceLicenses,
      openSourceLicensesLoaded: true,
      openSourceLicensesLoadingError: !response.ok
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

        <StyledLicenseDiv>
          {openSourceLicenses}
        </StyledLicenseDiv>
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

          <StyledLicenseDiv>
            {contentsLicenses}
          </StyledLicenseDiv>

          {openSourceLicensesLoaded
            ? (openSourceLicensesLoadingError ? openSourceLicensesErrorPrompt : openSourceLicensesTextField)
            : skeleton()}

        </div>

      </Page>

    )
  }
}
