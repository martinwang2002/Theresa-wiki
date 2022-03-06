// libs
import React from "react"
import type { AppProps } from "next/app"
import { CacheProvider } from "@emotion/react"
import type { EmotionCache } from "@emotion/cache"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

// models
import createEmotionCache from "@/models/createEmotionCache"
import theme from "@/models/theme"

// styles
import "./styles.scss"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
function myApp (props: MyAppProps): React.ReactChild {
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-assignment
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}

        <CssBaseline />

        <Component
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...pageProps}
        />

      </ThemeProvider>
    </CacheProvider>
  )
}

export default myApp
