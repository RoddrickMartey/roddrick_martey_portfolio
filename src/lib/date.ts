export function toIsoDateTime(value: string | undefined) {
  if (!value) return undefined
  return value.length === 10 ? `${value}T00:00:00.000Z` : value
}

export function toDateInputValue(value: string | null | undefined) {
  return value ? value.slice(0, 10) : undefined
}
