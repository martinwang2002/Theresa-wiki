/* eslint-disable react/iframe-missing-sandbox */
import React from "react"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Head from "next/head"
import ReactMarkdown from "react-markdown"

import HeadingAnchor from "@/components/common/ToC/headingAnchor"
import WithTableOfContents from "@/components/common/ToC/withTableOfContents"
import Page from "@/components/page/page"

const urlQueryMarkdown = `
?theme={theme}

Options:
* \`system\` 跟随系统
* \`light\` 亮色主题
* \`dark\` 暗色主题
`

const mapSceneMarkdown = `
iframe URL: \`https://theresa.wiki/widget/map/{stageId}/scene\`
* \`stageId\` 可以在地图页面的 URL 中找到。
  例如：主线0-1，其地址为 /map/main_0/main_00-01 ，其中 \`main_00-01\` 即为 \`stageId\`。
* 建议将iframe的纵横比设置为 16 : 9 。由于内嵌网页使用 16 : 9 的纵横比响应式布局地块，如果使用其他纵横比可能会导致页面有很多空白。
`

export default function SourceCode (): React.ReactNode {
  return (
    <Page>
      <Head>

        <title>
          小组件 | Theresa.wiki
        </title>

      </Head>

      <Typography
        sx={{
          fontFamily: "\"Dream Han Serif CN W27\"",
          my: 2
        }}
        variant="h3"
      >
        <span>
          小组件文档
        </span>

      </Typography>

      <WithTableOfContents>
        <HeadingAnchor
          id="urlQuery"
          text="通用 URL Query"
        />

        <ReactMarkdown>
          {urlQueryMarkdown}
        </ReactMarkdown>

        <HeadingAnchor
          id="mapScene"
          text="场景地图"
        />

        <ReactMarkdown>
          {mapSceneMarkdown}
        </ReactMarkdown>

        <Container
          sx={{
            aspectRatio: "16 / 9",
            width: "100%"
          }}
        >
          <iframe
            height="100%"
            src="/widget/map/main_00-01/scene"
            style={{
              border: "none"
            }}
            width="100%"
          />
        </Container>

      </WithTableOfContents>

    </Page>
  )
}
