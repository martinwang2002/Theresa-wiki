// libs
import React, { useEffect } from "react"
import type { AppProps } from "next/app"
import Script from "next/script"
import { useRouter } from "next/router"
import { CacheProvider } from "@emotion/react"
import type { EmotionCache } from "@emotion/cache"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

// configs
import { publicRuntimeConfig } from "@/configurations/runtimeConfig"

// models
import createEmotionCache from "@/models/createEmotionCache"
import theme from "@/models/theme"
import { pageview } from "@/models/utils/gtag"

const { GTAG_ID } = publicRuntimeConfig

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
function myApp (props: MyAppProps): React.ReactChild {
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
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}

          <CssBaseline />

          <Component
          // eslint-disable-next-line react/jsx-props-no-spreading
            {...pageProps}
          />

        </ThemeProvider>
      </CacheProvider>
    </>
  )
}

export default myApp
