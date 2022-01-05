import React from "react"

import type { ITileInfo } from "../gamedata/excel/stage"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TileInfoContext = React.createContext<Record<string, ITileInfo>>({
  tileKey: {
    tileKey: "",
    name: "",
    description: "",
    isFunctional: true
  }
})
