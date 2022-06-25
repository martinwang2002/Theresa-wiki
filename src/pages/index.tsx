/* eslint-disable react/jsx-max-depth */
import React from "react"

import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/system"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import BattleIcon from "@/components/icon/ui_home/battleIcon"
import Page from "@/components/page/page"

const RelativeDiv = styled("div")({
  position: "relative"
})

const RotataryStack = styled(Stack)({
  marginLeft: "auto",
  marginRight: 0,
  maxWidth: 360,
  transform: "perspective(800) rotateY(-20deg)"
})

const ImageDiv = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  zIndex: -10,
  [theme.breakpoints.down("sm")]: {
    display: "none"
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: -80
  },
  [theme.breakpoints.up("md")]: {
    marginLeft: "20%"
  }
}))

export default function home (): React.ReactNode {
  return (
    <Page>
      <Head>
        <title>
          Theresa.wiki
        </title>
      </Head>

      <p>
        欢迎来到 Theresa.wiki
      </p>

      <p>
        目前应该只有
        <Link
          href="/map"
        >
          地图
        </Link>
        可以使用。PS：可以查看3D场景。
      </p>

      <RelativeDiv>
        <RotataryStack
          spacing={2}
        >
          <Card
            elevation={2}
            sx={{
              width: "90%"
            }}
          >
            <Link
              href="/map"
              passHref
            >
              <CardActionArea>
                <Typography
                  sx={{
                    fontFamily: "\"Dream Han Serif CN W27\"",
                    pl: 2,
                    py: 1
                  }}
                  variant="h3"
                >
                  终端

                  <BattleIcon
                    sx={{
                      display: "inline",
                      fontSize: "h1.fontSize",
                      ml: -3,
                      opacity: 0.2,
                      verticalAlign: "-50%"
                    }}
                  />
                </Typography>
              </CardActionArea>
            </Link>
          </Card>
        </RotataryStack>

        <ImageDiv>
          <Image
            alt="Theresa"
            height={512}
            src="/theresa.webp"
            unoptimized
            width={512}
          />
        </ImageDiv>
      </RelativeDiv>
    </Page>
  )
}
