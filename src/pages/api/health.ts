import type { NextApiRequest, NextApiResponse } from "next"

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export default (req: NextApiRequest, res: NextApiResponse): void => {
  const resStatus = 200
  res.status(resStatus).json({
    health: "ok"
  })
}
