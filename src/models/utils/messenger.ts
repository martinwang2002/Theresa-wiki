/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { useEffect } from "react"

const DEBUG = true as boolean

let messengerName: string
messengerName = ""

if (typeof window !== "undefined") {
  messengerName = location.host
}

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type Message<T extends string = string, D = undefined> = D extends undefined ? BaseMessage<T> : PayloadMessage<T, D>

interface BaseMessage<T extends string = string> {
  readonly id?: number | string
  readonly type: T
}

export interface PayloadMessage<T extends string = string, D = never>
  extends BaseMessage<T> {
  readonly data: D
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface Messenger {
  addEventListener: ((
    type: string,
    callback: EventListenerOrEventListenerObject,
  ) => void) & (<M extends Message>(
    type: string,
    callback: ((ev: MessengerEvent<M>) => void) | null,
  ) => void)
  removeEventListener: ((
    type: string,
    callback: EventListenerOrEventListenerObject,
  ) => void) & (<M extends Message>(
    type: string,
    callback: ((ev: MessengerEvent<M>) => void) | null,
  ) => void)
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging, no-redeclare
class Messenger extends EventTarget {}

export class MessengerEvent<M extends Message = Message> extends Event {
  public readonly source: MessageEvent["source"]

  public readonly origin: MessageEvent["origin"]

  public readonly message: M

  public constructor (
    params: Pick<
    MessengerEvent<M>,
    "message" | "origin" | "source" | "type"
    >
  ) {
    super(params.type)
    this.source = params.source
    this.origin = params.origin
    this.message = params.message
  }

  /**
   * Handy method to reply to the message's source.
   * @returns a promise which is the result of `sendMessage()`.
   */
  public async reply (message: Message): Promise<boolean> {
    if (this.source) {
      return sendMessage(this.source as Window, this.origin, message)
    }

    return Promise.resolve(false)
  }
}

const messenger = new Messenger()

if (typeof window !== "undefined") {
  window.addEventListener("message", (event: MessageEvent<object>) => {
    const { data, origin, source } = event

    if ((Boolean(data)) && "type" in data && typeof data.type === "string") {
      if (DEBUG) {
        if (!isAckType(data.type)) {
          log("received", data)
        }
      }

      messenger.dispatchEvent(new MessengerEvent({
        message: data as Message,
        origin,
        source,
        type: data.type
      }))
    }
  })
}

export function useMessage<M extends Message = Message> (
  origin: string,
  type: M["type"],
  listener: (message: MessengerEvent<M>) => void
): void {
  useEffect(() => {
    const handler: typeof listener = (message) => {
      if (isAckType(message.type)) {
        return
      }

      if (origin === "*" || message.origin === origin) {
        // we assume that the received message always has an id,
        // since we generate one if it's missing when sending
        const id = message.message.id! // eslint-disable-line @typescript-eslint/no-non-null-assertion

        message.reply({ type: getAckType(id) }).catch((e) => {
          log("Error:", e)
        })

        // processing messages received from outside can be error-prone, so we wrap the listener in a try-catch
        try {
          listener(message)
        } catch (e) {
          log("Error:", e)
        }
      }
    }
    messenger.addEventListener(type, handler)
    return () => {
      messenger.removeEventListener(type, handler)
    }
  }, [type, origin, listener])
}

export async function sendMessage<M extends Message> (
  target: Pick<Window, "postMessage">,
  origin: string,
  message: M,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  timeout = 500
): Promise<boolean> {
  const messageToSend: Message & { id: NonNullable<Message["id"]> } = {
    id: message.id ?? defaultIdGenerator(),
    ...message
  }

  if (DEBUG) {
    if (!isAckType(messageToSend.type)) {
      log("sending", messageToSend)
    }
  }

  const eventType = getAckType(messageToSend.id)

  return new Promise<boolean>((resolve) => {
    target.postMessage(messageToSend, origin)

    const handler = (): void => {
      messenger.removeEventListener(eventType, handler)
      resolve(true)
    }

    if (timeout > +"0") {
      window.setTimeout(() => {
        messenger.removeEventListener(eventType, handler)
        resolve(false)
      }, timeout)
    }

    messenger.removeEventListener(eventType, handler)
  })
}

function getAckType (id: NonNullable<Message["id"]>): string {
  return `ack:${id}`
}

function isAckType (type: string): boolean {
  return type.startsWith("ack:")
}

function defaultIdGenerator (): NonNullable<Message["id"]> {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return Math.random().toString(36).slice(2, 6)
}

export function setMessengerName (name: string): void {
  messengerName = name
}

function log (...args: unknown[]): void {
  console.log(`[Msg:${messengerName}]`, ...args)
}
