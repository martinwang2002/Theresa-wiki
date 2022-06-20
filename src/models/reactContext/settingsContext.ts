import React from "react"

interface ISettingsContext {
  mode: "dark" | "light" | "system"
  setMode: (mode: "dark" | "light" | "system") => void
}

export const SettingsContext = React.createContext<ISettingsContext>({
  mode: "system",
  setMode: () => {
    throw new Error("setMode is not implemented")
  }
})
