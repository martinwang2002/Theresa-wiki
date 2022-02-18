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
    version: [0, 0, 3].join(".") + ".canary",
    date: new Date("2022-02-20T8:00:00+0800"),
    contents: {
      changed: [
        "use uri-js to format url"
      ],
      fixed: [
        "Dockerfile yarn install network error, adding tolerance"
      ]
    }
  },
  {
    version: [0, 0, 2],
    date: new Date("2022-02-14T0:00:00+0000"),
    contents: {
      added: [
        "Minified favicon.svg",
        "Component StageInfo",
        "Docs for ENV THERESA_WIKI_NO_BUILD_DYNAMIC_ROUTES=False"
      ],
      changed: [
        "Dockerfile for gen-license",
        "Page: /map/[stageId] -> /map/[zoneId]/[stageId]"
      ],
      fixed: [
        "redis typo",
        "eslint readonly"
      ]
    }
  },
  {
    version: [0, 0, 1],
    date: new Date("2022-01-17T0:00:00+0000"),
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
