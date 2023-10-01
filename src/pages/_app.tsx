/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useMemo, useState } from "react"

import type { EmotionCache } from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"

import createEmotionCache from "@/models/createEmotionCache"
import { SettingsContext } from "@/models/reactContext/settingsContext"
import themeOptions from "@/models/theme"
import { pageview } from "@/models/utils/gtag"
import { getLocalStorage } from "@/models/utils/localStorage"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  readonly emotionCache?: EmotionCache
}

type TPaletteMode = "dark" | "light" | "system"

function isTPaletteMode (value: unknown): value is TPaletteMode {
  return ["dark", "light", "system"].includes(value as TPaletteMode)
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
function MyApp (props: MyAppProps): React.FunctionComponentElement<MyAppProps> {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string): void => {
      pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  const [paletteMode, setPaletteMode] = useState<TPaletteMode>("system")
  const [patchedNumberMode, setPatchedNumberMode] = useState<"difference" | "result">("difference")

  // initial setup based on local storage
  useEffect(() => {
    // paletteMode
    const queryPaletteMode = "theme" in router.query ? router.query.theme : null
    const initialPaletteMode = getLocalStorage("paletteMode")
    if (isTPaletteMode(queryPaletteMode)) {
      setPaletteMode(queryPaletteMode)
    } else if (isTPaletteMode(initialPaletteMode)) {
      setPaletteMode(initialPaletteMode)
    } else {
      setPaletteMode("system")
    }

    // patchedNumberMode
    const initialPatchedNumberMode = getLocalStorage("patchedNumberMode") ?? "difference"
    if (initialPatchedNumberMode === "difference" || initialPatchedNumberMode === "result") {
      setPatchedNumberMode(initialPatchedNumberMode)
    } else {
      setPatchedNumberMode("difference")
    }
  }, [prefersDarkMode, router.query])

  const theme = useMemo(
    () => {
      const _theme = themeOptions
      if (_theme.palette) {
        _theme.palette.mode = paletteMode === "system" ? (prefersDarkMode ? "dark" : "light") : paletteMode
      }
      return createTheme(_theme)
    },
    [paletteMode, prefersDarkMode]
  )

  const settingsValue = useMemo(() => ({
    paletteMode,
    patchedNumberMode,
    setPaletteMode,
    setPatchedNumberMode
  }), [paletteMode, patchedNumberMode])

  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-assignment
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <SettingsContext.Provider value={settingsValue}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}

          <CssBaseline />

          <Component
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...pageProps}
          />

        </ThemeProvider>
      </SettingsContext.Provider>
    </CacheProvider>
  )
}

MyApp.defaultProps = {
  emotionCache: clientSideEmotionCache
}

export default MyApp
