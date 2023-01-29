import { StatusCodes } from "http-status-codes"
import type { NextApiRequest, NextApiResponse } from "next"

import { addRevalidatePaths } from "./health"

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const startup = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.socket.remoteAddress?.startsWith("127.") || req.socket.remoteAddress?.startsWith("::ffff:127.")) {
    addRevalidatePaths().catch((reason) => {
      console.warn("failed to add revalidate paths", reason)
    })
  }

  res.status(StatusCodes.OK).json({
    health: "ok"
  })
}

export default startup
