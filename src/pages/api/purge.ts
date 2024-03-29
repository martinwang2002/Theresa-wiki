import type { JSONSchemaType } from "ajv"
import Ajv from "ajv"
import { StatusCodes } from "http-status-codes"
import type { NextApiRequest, NextApiResponse } from "next"

import { redisClient } from "@/configurations/cache"
import { publicRuntimeConfig, serverRuntimeConfig } from "@/configurations/runtimeConfig"

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

interface CloudflarePurgeResponseData {
  success: boolean
  errors: readonly string[]
  messages: readonly string[]
  readonly result: {
    readonly id: string
  }
}

interface PurgeResponseData {
  cdnPurge: {
    error: string | null
    success: boolean
  }
  nextjsPurge: {
    error: string | null
    success: boolean
  }
  resVersion: string | null
}

interface PurgeResponse {
  code: number
  data?: PurgeResponseData
  error?: string
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const purge = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== "POST") {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
      code: StatusCodes.METHOD_NOT_ALLOWED,
      error: "Method not allowed. Only POST is allowed."
    } as PurgeResponse)
    return undefined
  }

  // if request body is not valid
  if (!validate(req.body)) {
    res.status(StatusCodes.BAD_REQUEST).json({
      code: StatusCodes.BAD_REQUEST,
      error: "Bad request. Request body is not valid."
    } as PurgeResponse)
    return undefined
  }

  const { path } = req.body as { path: string }

  if (!path.startsWith("/")) {
    res.status(StatusCodes.BAD_REQUEST).json({
      code: StatusCodes.BAD_REQUEST,
      error: "Bad request. Path must start with '/'."
    } as PurgeResponse)
    return undefined
  }

  // reCaptcha validation
  // if (process.env.NODE_ENV !== "development") {
  // }

  const resVersion = await redisClient.get("_s3Version")

  const [isRevalidateSuccessful, revalidationError] = await res.revalidate(path).then(() => {
    return [true, null]
  }).catch((error: Readonly<Error>) => {
    return [false, error]
  }) as [boolean, Error | null]

  if (!isRevalidateSuccessful) {
    res.status(StatusCodes.OK).json({
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        cdnPurge: {
          error: "Not started as previous step failed",
          success: false
        },
        nextjsPurge: {
          error: revalidationError?.message,
          success: false
        },
        resVersion
      },
      error: revalidationError?.message
    } as PurgeResponse)
    return undefined
  }

  // purge Cloudflare cache
  await fetch(`https://api.cloudflare.com/client/v4/zones/${serverRuntimeConfig.CLOUDFLARE_ZONE_ID}/purge_cache`, {
    body: JSON.stringify({
      files: [
        `https://theresa.wiki${path}`,
        `https://theresa.wiki/_next/data/${publicRuntimeConfig.GIT_COMMIT}${path}.json`
      ]
    }),
    headers: {
      Authorization: `Bearer ${serverRuntimeConfig.CLOUDFLARE_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    method: "POST"
  }).then(async (response) => response.json()).then((json: Readonly<CloudflarePurgeResponseData>) => {
    if (json.success) {
      return undefined
    }
    throw new Error(json.errors[0])
  }).catch((error: Readonly<Error>) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        cdnPurge: {
          error: error.message,
          success: false
        },
        nextjsPurge: {
          error: null,
          success: true
        },
        resVersion
      }
    } as PurgeResponse)
    return undefined
  })

  console.log(`[/api/purge] Purged ${path}`)
  res.status(StatusCodes.OK).json({
    code: StatusCodes.OK,
    data: {
      cdnPurge: {
        error: null,
        success: true
      },
      nextjsPurge: {
        error: null,
        success: true
      },
      resVersion
    }
  } as PurgeResponse)
}

export default purge

export type { PurgeResponse }
