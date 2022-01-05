import React from "react"

import type { IGamedataConst } from "../gamedata/excel/gamedataConst"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GamedataContext = React.createContext<Partial<IGamedataConst>>({
  richTextStyles: {
    akFormatString: ""
  }
})
