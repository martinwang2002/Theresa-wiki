import React from "react"

import PauseIcon from "@mui/icons-material/Pause"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import SyncIcon from "@mui/icons-material/Sync"
import SyncDisabledIcon from "@mui/icons-material/SyncDisabled"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"

interface AudioControllerProps {
  src: string
  loop?: boolean
}

interface AudioControllerState {
  currentTime: number
  paused: boolean
  loop: boolean
  duration: number
}

const getFormattedTime = (time: number): string => {
  const zero = 0
  const date = new Date(zero)
  date.setSeconds(time) // specify value for SECONDS here

  const minutesIndex = 14
  const secondsIndex = 19
  const timeString = date.toISOString().slice(minutesIndex, secondsIndex)
  return timeString
}

class AudioController extends React.PureComponent<AudioControllerProps, AudioControllerState> {
  private static readonly defaultProps = {
    loop: false
  }

  public constructor (props: Readonly<AudioControllerProps>) {
    super(props)

    this.state = {
      currentTime: 0,
      duration: 0,
      loop: props.loop ?? false,
      paused: true
    }

    this.audioElement = React.createRef()
  }

  public componentDidMount (): void {
    const { current } = this.audioElement
    if (current) {
      current.addEventListener("ended", this.handleEnded)
      current.addEventListener("loadeddata", this.handleLoadedData)
      current.addEventListener("timeupdate", this.handleTimeUpdate)
    }
  }

  public componentWillUnmount (): void {
    const { current } = this.audioElement
    if (current) {
      current.removeEventListener("loadeddata", this.handleLoadedData)
      current.removeEventListener("timeupdate", this.handleTimeUpdate)
    }
  }

  private readonly audioElement: React.RefObject<HTMLAudioElement>

  private readonly handleEnded = (): void => {
    this.setState({
      paused: true
    })
  }

  private readonly handleLoadedData = (): void => {
    const { current } = this.audioElement
    if (current) {
      this.setState({
        duration: current.duration
      })
    }
  }

  private readonly handleTimeUpdate = (): void => {
    const { current } = this.audioElement
    if (current) {
      this.setState({
        currentTime: current.currentTime
      })
    }
  }

  private readonly handlePlayAndPause = (): void => {
    const { current } = this.audioElement
    if (current) {
      if (current.paused) {
        current.play().catch((error) => {
          console.error(error)
        })
        this.setState({
          paused: false
        })
      } else {
        current.pause()
        this.setState({
          paused: true
        })
      }
    }
  }

  private readonly handleLoop = (): void => {
    const { current } = this.audioElement
    if (current) {
      current.loop = !current.loop
      this.setState(prevState => ({
        loop: !prevState.loop
      }))
    }
  }

  public render (): React.ReactNode {
    const { src } = this.props
    const { paused, loop, duration, currentTime } = this.state

    return (
      <Card
        elevation={6}
      >
        <audio
          ref={this.audioElement}
        >
          <source src={src} />
        </audio>

        <Box
          sx={{
            display: "flex",
            padding: 1
          }}
        >
          <IconButton
            aria-label="play and pause"
            onClick={this.handlePlayAndPause}
          >
            {paused
              ? <PlayArrowIcon />
              : <PauseIcon />}
          </IconButton>

          <IconButton
            aria-label="loop"
            onClick={this.handleLoop}
          >
            {loop
              ? <SyncIcon />
              : <SyncDisabledIcon />}

          </IconButton>

          <Typography
            sx={{
              margin: "auto"
            }}
          >
            {`${getFormattedTime(currentTime)} / ${getFormattedTime(duration)}`}
          </Typography>

        </Box>
      </Card>
    )
  }
}

export default AudioController
