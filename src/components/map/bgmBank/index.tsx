import React from "react"

import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { serialize as serializeUri } from "uri-js"

import AudioController from "@/components/common/audioController"
import InlineBadge from "@/components/common/badge/inlineBadge"

import { publicRuntimeConfig } from "@/configurations/runtimeConfig"

import type { IBgmBank } from "@/models/gamedata/excel/audioData"

interface BgmBankProps {
  bgmBank: IBgmBank
}

class BgmBank extends React.PureComponent<BgmBankProps> {
  public render (): React.ReactNode {
    const { bgmBank } = this.props
    const { name, intro, loop } = bgmBank

    return (
      <Paper sx={{ margin: "auto", maxWidth: "100%", width: "max-content" }}>

        <Typography
          sx={{
            padding: 1
          }}
        >
          {name}
        </Typography>

        <Divider />

        <Box>
          {
            intro != null &&
              <>
                <Box sx={{
                  padding: 2
                }}
                >
                  <InlineBadge
                    sx={{
                      backgroundColor: "primary.main",
                      marginBottom: 1
                    }}
                  >
                    入场
                  </InlineBadge>

                  <AudioController
                    src={["ogg", "mp3"].map((extension) => serializeUri({
                      ...publicRuntimeConfig.THERESA_STATIC,
                      path: `/api/v0/AK/CN/Android/${intro.toLowerCase()}.${extension}`
                    }))}
                  />
                </Box>

                <Divider />
              </>
          }

          {
            loop != null &&
            <Box sx={{
              padding: 2
            }}
            >
              <InlineBadge
                sx={{
                  backgroundColor: "primary.main",
                  marginBottom: 1
                }}
              >
                循环
              </InlineBadge>

              <AudioController
                loop
                src={["ogg", "mp3"].map((extension) => serializeUri({
                  ...publicRuntimeConfig.THERESA_STATIC,
                  path: `/api/v0/AK/CN/Android/${loop.toLowerCase()}.${extension}`
                }))}
              />
            </Box>
          }
        </Box>
      </Paper>
    )
  }
}

export default BgmBank
