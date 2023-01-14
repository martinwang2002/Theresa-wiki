import type { JSONSchemaType } from "ajv"
import Ajv from "ajv"
import { StatusCodes } from "http-status-codes"
import type { NextApiRequest, NextApiResponse } from "next"

const ajv = new Ajv()

interface PurgeRequestData {
  path: string
}

const purgeRequestSchema: JSONSchemaType<PurgeRequestData> = {
  properties: {
    path: {
      nullable: false,
      type: "string"
    }
  },
  required: ["path"],
  type: "object"
}

const validate = ajv.compile(purgeRequestSchema)

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const purge = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== "POST") {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
      code: StatusCodes.METHOD_NOT_ALLOWED,
      error: "Method not allowed"
    })
    return undefined
  }

  // if request body is not valid
  if (!validate(req.body)) {
    res.status(StatusCodes.BAD_REQUEST).json({
      code: StatusCodes.BAD_REQUEST,
      error: "Bad request"
    })
    return undefined
  }

  const { path } = req.body as { path: string }

  if (!path.startsWith("/")) {
    res.status(StatusCodes.BAD_REQUEST).json({
      code: StatusCodes.BAD_REQUEST,
      error: "Bad request"
    })
    return undefined
  }

  // reCaptcha validation
  // if (process.env.NODE_ENV !== "development") {
  // }

  const [isRevalidateSuccessful, revalidationError] = await res.revalidate(path).then(() => {
    return [true, null]
  }).catch((error: Readonly<Error>) => {
    return [false, error]
  }) as [boolean, Error | null]

  if (!isRevalidateSuccessful) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      error: revalidationError?.message
    })
    return undefined
  }

  console.log(`[/api/purge] Purged ${path}`)
  res.status(StatusCodes.OK).json({
    code: StatusCodes.OK,
    data: {
      nextjsRevalidation: true
    }
  })
}

export default purge
