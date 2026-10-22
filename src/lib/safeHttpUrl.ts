export function safeHttpUrl(value: string | null | undefined) {
  if (!value) {
    return undefined
  }

  try {
    const url = new URL(value)
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return undefined
    }

    return url.href
  } catch {
    return undefined
  }
}
