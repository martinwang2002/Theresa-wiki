import { publicRuntimeConfig } from "@/configurations/runtimeConfig"

const { GTAG_ID } = publicRuntimeConfig

declare global {
  interface Window {
    gtag: ((command: string, targetId: string, params: Readonly<Record<string, unknown>>) => void)
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
  window.gtag("config", GTAG_ID, {
    page_path: url
  })
}

interface IGtagEvent {
  action: string
  category: string | null
  label: string | null
  [key: string]: unknown
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const gtagEvent = ({ action, category, label, ...value }: Readonly<IGtagEvent>): void => {
  if (typeof window !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      ...value
    })
  } else {
    console.warn("gtagEvent on server side", action, category, label, value)
  }
}
