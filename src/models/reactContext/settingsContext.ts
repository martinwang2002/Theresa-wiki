import React from "react"

interface ISettingsContext {
  paletteMode: "dark" | "light" | "system"
  patchedNumberMode: "difference" | "result"
  setPaletteMode: (mode: "dark" | "light" | "system") => void
  setPatchedNumberMode: (mode: "difference" | "result") => void
}

export const SettingsContext = React.createContext<ISettingsContext>({
  paletteMode: "system",
  patchedNumberMode: "difference",
  setPaletteMode: () => {
    throw new Error("setPaletteMode is not implemented")
  },
  setPatchedNumberMode: () => {
    throw new Error("setPatchedNumberMode is not implemented")
  }
})
