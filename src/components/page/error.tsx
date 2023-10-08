import React from "react"

import { keyframes } from "@emotion/react"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/system"

import Styledlink from "@/components/common/styledLink"

const breatheKeyframes = keyframes`
  0% {
    opacity: 0.2;
  }

  100% {
    opacity: 0.7;
  }
`

const BreatheMissionStar = styled("div")({
  animationDirection: "alternate",
  animationDuration: "5s",
  animationIterationCount: "infinite",
  animationName: breatheKeyframes,
  animationTimingFunction: "ease-out",
  aspectRatio: "1",
  backgroundImage: "url(\"/favicon.svg\")",
  margin: "auto",
  width: "min(50vw, 50vh)"
})

interface IError {
  readonly errorMessage: string
}

class Error extends React.PureComponent<IError> {
  public render (): React.ReactNode {
    const { errorMessage } = this.props
    return (
      <Styledlink
        href="/"
      >
        <Container
          sx={{
            paddingTop: "10vh",
            textAlign: "center"
          }}
        >
          <BreatheMissionStar />

          {errorMessage}

          <Typography sx={{ color: theme => theme.palette.grey[500] }}>
            单击以回到首页
          </Typography>
        </Container>
      </Styledlink>
    )
  }
}

export default Error
