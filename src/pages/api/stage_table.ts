import type { NextApiRequest, NextApiResponse } from "next"

import { stageIds } from "@/models/gamedata/excel/stageTable"

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const resStatus = 200
  res.status(resStatus).json({
    stages: await stageIds()
  })
}
