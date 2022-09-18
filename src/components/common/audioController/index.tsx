import React from "react"

import PauseIcon from "@mui/icons-material/Pause"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import SyncIcon from "@mui/icons-material/Sync"
import SyncDisabledIcon from "@mui/icons-material/SyncDisabled"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CircularProgress from "@mui/material/CircularProgress"
import IconButton from "@mui/material/IconButton"
import LinearProgress from "@mui/material/LinearProgress"
import Slider from "@mui/material/Slider"
import Typography from "@mui/material/Typography"

interface AudioControllerProps {
  src: readonly string[]
  loop?: boolean
}

interface AudioControllerState {
  currentTime: number
  error: boolean
  paused: boolean
  loading: boolean
  loop: boolean
  duration: number
  srcObjectUrl: string | undefined
}

const getFormattedTime = (time: number, smallDuration = false): string => {
  const zero = 0
  const date = new Date(zero)

  // handle super small duration
  if (smallDuration) {
    const threeDigits = 3
    return time.toFixed(threeDigits)
  }

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
      error: false,
      loading: false,
      loop: props.loop ?? false,
      paused: true,
      srcObjectUrl: undefined
    }

    this.audioElement = React.createRef()
  }

  public componentWillUnmount (): void {
    const { srcObjectUrl } = this.state
    if (srcObjectUrl !== undefined) {
      URL.revokeObjectURL(srcObjectUrl)
    }
  }

  private readonly audioElement: React.RefObject<HTMLAudioElement>

  public loadMedia = async (): Promise<void> => {
    const { current } = this.audioElement
    const { src } = this.props

    this.setState({
      loading: true
    })

    const playableAudioSources: string[] = []
    for (const source of src) {
      const extension = source.split(".").pop() ?? "" // get the extension of the file
      const result = current?.canPlayType(`audio/${extension}`)
      if (result === "probably" || result === "maybe") {
        playableAudioSources.push(source)
        break
      }
    }

    await fetch(playableAudioSources[0] ?? src[0]).then(async (response) => {
      const type = response.headers.get("Content-Type") ?? "audio/wav"
      this.setState({
        error: false,
        loading: false,
        srcObjectUrl: URL.createObjectURL(new Blob([await response.arrayBuffer()], { type }))
      })
      if (current) {
        current.load()
      }
    }).catch((error) => {
      console.error(error)
    })
  }

  private readonly handleEnded = (): void => {
    this.setState({
      paused: true
    })
  }

  private readonly handleError = (): void => {
    this.setState((prevState) => ({
      error: prevState.srcObjectUrl !== undefined
    }))
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
    const { srcObjectUrl } = this.state

    if (current && srcObjectUrl !== undefined) {
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
    } else if (current) {
      this.loadMedia().then(() => {
        current
          .play()
          .then(() => {
            this.setState({
              paused: false
            })
          })
          .catch((error) => {
            console.error(error)
          })
      }).catch((error) => {
        console.log(error)
      })
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
    const { error, paused, loading, loop, duration, currentTime, srcObjectUrl } = this.state
    const zero = 0
    const smallDurationThreshold = 1
    const useSmallDurationDisplay = !!(duration < smallDurationThreshold && duration !== zero)

    return (
      <Card
        elevation={6}
      >
        <audio
          onEnded={this.handleEnded}
          onError={this.handleError}
          onLoadedData={this.handleLoadedData}
          onTimeUpdate={this.handleTimeUpdate}
          ref={this.audioElement}
        >
          <source
            src={srcObjectUrl}
          />
        </audio>

        {
          !!error &&
            <Box
              sx={{
                display: "flex",
                padding: 1
              }}
            >
              <Typography
                sx={{
                  margin: "auto"
                }}
              >
                您的浏览器可能不支持该音频的播放，比如 Safari on IOS
              </Typography>
            </Box>
        }

        <Box
          sx={{
            display: "flex",
            padding: 1
          }}
        >
          <IconButton
            aria-label="play and pause"
            disabled={error}
            onClick={this.handlePlayAndPause}
          >
            {paused
              ? loading
                ? <CircularProgress size={20} />
                : <PlayArrowIcon />
              : <PauseIcon />}
          </IconButton>

          <IconButton
            aria-label="loop"
            disabled={error}
            onClick={this.handleLoop}
          >
            {loop
              ? <SyncIcon />
              : <SyncDisabledIcon />}
          </IconButton>

          {
            !!(srcObjectUrl === undefined || loading) &&
            <LinearProgress
              sx={{
                minWidth: "6em",
                mx: 2,
                my: "auto"
              }}
              value={0}
              variant={loading ? "indeterminate" : "determinate"}
            />
          }

          {
            srcObjectUrl !== undefined &&
            <Slider
              disabled={error}
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
          }

          <Typography
            sx={{
              margin: "auto",
              minWidth: "6em"
            }}
          >
            {getFormattedTime(currentTime, useSmallDurationDisplay)}

            {" / "}

            {getFormattedTime(duration, useSmallDurationDisplay)}
          </Typography>

        </Box>
      </Card>
    )
  }
}

export default AudioController
