/**
 * The format is based on https://keepachangelog.com/en/1.0.0/
 */

/* eslint-disable @typescript-eslint/no-magic-numbers */

interface IChangelogContent {
  added?: string[]
  changed?: string[]
  deprecated?: string[]
  removed?: string[]
  fixed?: string[]
  security?: string[]
}

interface IChangelog {
  version: string | [number, number, number]
  date: Date
  contents: IChangelogContent
}

export const changelogs: IChangelog[] = [
  // {
  //   version: [0, 1, 1],
  //   date: new Date("2022-02-1T8:00:00+0800"),
  //   contents: {}
  // },
  {
    version: [0, 0, 1],
    date: new Date("2022-01-17T8:00:00+0800"),
    contents: {
      added: [
        "Initial Release",
        "favicon",
        "map",
        " - tile",
        " - stage info",
        "",
        "内容来源 (/about/credits) 内容许可与开源许可",
        "隐私权政策 (/about/privacy)"
      ]
    }
  }
]

export type { IChangelog }
