import React from "react"

import type { ITileInfo } from "../gamedata/excel/stageTable"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TileInfoContext = React.createContext<Record<string, Readonly<ITileInfo>>>({
  tileKey: {
    tileKey: "",
    name: "",
    description: "",
    isFunctional: true
  }
})
