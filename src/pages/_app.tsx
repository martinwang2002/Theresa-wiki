/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState, useMemo } from "react"

import type { EmotionCache } from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import CssBaseline from "@mui/material/CssBaseline"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import Script from "next/script"

import { publicRuntimeConfig } from "@/configurations/runtimeConfig"

import createEmotionCache from "@/models/createEmotionCache"
import { SettingsContext } from "@/models/reactContext/settingsContext"
import themeOptions from "@/models/theme"
import { pageview } from "@/models/utils/gtag"
import { getLocalStorage } from "@/models/utils/localStorage"
const { GTAG_ID } = publicRuntimeConfig

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
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

  const [paletteMode, setPaletteMode] = useState<"dark" | "light" | "system">("system")
  const [patchedNumberMode, setPatchedNumberMode] = useState<"difference" | "result">("difference")

  // initial setup based on local storage
  useEffect(() => {
    // paletteMode
    const initialPaletteMode = getLocalStorage("paletteMode") ?? "system"
    if (initialPaletteMode === "dark" || initialPaletteMode === "light" || initialPaletteMode === "system") {
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
  }, [prefersDarkMode])

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
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
        strategy="afterInteractive"
      />

      <Script
        dangerouslySetInnerHTML={{
          // eslint-disable-next-line @typescript-eslint/naming-convention
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GTAG_ID}', {
                ${process.env.NODE_ENV === "development" ? "'debug_mode': true," : ""}
                'page_path': window.location.pathname,
                'cookie_prefix': 'theresaGa',
              });
            `
        }}
        id="gtag-init"
        strategy="afterInteractive"
      />

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
    </>
  )
}

MyApp.defaultProps = {
  emotionCache: clientSideEmotionCache
}

export default MyApp
