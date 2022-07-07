import React from "react"

import PauseIcon from "@mui/icons-material/Pause"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import SyncIcon from "@mui/icons-material/Sync"
import SyncDisabledIcon from "@mui/icons-material/SyncDisabled"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import IconButton from "@mui/material/IconButton"
import Slider from "@mui/material/Slider"
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
  srcObjectUrl: string | undefined
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
      paused: true,
      srcObjectUrl: undefined
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
    const { src } = this.props
    fetch(src).then(async (response) => {
      this.setState({ srcObjectUrl: URL.createObjectURL(new Blob([await response.arrayBuffer()], { type: "audio/wav" })) })
      if (current) {
        current.load()
      }
    }).catch((error) => {
      console.error(error)
    })
  }

  public componentWillUnmount (): void {
    const { current } = this.audioElement
    if (current) {
      current.removeEventListener("loadeddata", this.handleLoadedData)
      current.removeEventListener("timeupdate", this.handleTimeUpdate)
    }
    const { srcObjectUrl } = this.state
    if (srcObjectUrl !== undefined) {
      URL.revokeObjectURL(srcObjectUrl)
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

  private readonly handleProgressChange = (_event: unknown, progress: Readonly<number[]> | number): void => {
    const { current } = this.audioElement

    if (current) {
      if (isFinite(current.duration)) {
        current.currentTime = (progress as number) * current.duration
        this.setState({
          currentTime: current.currentTime
        })
      }
    }
  }

  public render (): React.ReactNode {
    const { paused, loop, duration, currentTime, srcObjectUrl } = this.state
    const zero = 0

    return (
      <Card
        elevation={6}
      >
        <audio
          ref={this.audioElement}
        >
          <source
            src={srcObjectUrl}
          />
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

          <Slider
            max={1}
            min={0}
            onChange={this.handleProgressChange}
            step={0.01}
            sx={{
              minWidth: "6em",
              mx: 2,
              my: "auto"
            }}
            value={currentTime / duration || zero}
          />

          <Typography
            sx={{
              margin: "auto",
              minWidth: "6em"
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
