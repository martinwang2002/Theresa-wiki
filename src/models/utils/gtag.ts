/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { publicRuntimeConfig } from "@/configurations/runtimeConfig"

const { GTAG_ID } = publicRuntimeConfig

declare global {
  interface Window {
    gtag: any
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
  window.gtag("config", GTAG_ID, {
    page_path: url
  })
}

interface IGtagEvent {
  action: any
  category: any
  label: any
  value: any
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: Readonly<IGtagEvent>): void => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value
  })
}
