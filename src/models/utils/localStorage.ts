export function getLocalStorage (name: string): string | null {
  if (typeof window === "undefined") {
    throw new Error(
      "getLocalStorage() is not supported on the server. Fallback to a different value when rendering on the server."
    )
  }
  const localStorage = window.localStorage

  return localStorage.getItem(name)
}

export function setLocalStorage (name: string, value: string): void {
  if (typeof window === "undefined") {
    throw new Error(
      "setLocalStorage() is not supported on the server. Fallback to a different value when rendering on the server."
    )
  }
  const localStorage = window.localStorage

  localStorage.setItem(name, value)
}
