import { StatusCodes } from "http-status-codes"
import type { NextApiRequest, NextApiResponse } from "next"

import { addRevalidatePaths } from "./health"

const mustRevalidatePathsAtStartup = ["/map", "/enemy"]

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const startup = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // trigger revalidation of must revalidate paths
  for (const revalidatePath of mustRevalidatePathsAtStartup) {
    console.log("revalidating [startup]", revalidatePath)
    await res.revalidate(revalidatePath).catch((reason) => {
      console.warn("failed to revalidate", revalidatePath, reason)
    })
  }

  addRevalidatePaths().catch((reason) => {
    console.warn("failed to add revalidate paths", reason)
  })

  res.status(StatusCodes.OK).json({
    health: "ok"
  })
}

export default startup
