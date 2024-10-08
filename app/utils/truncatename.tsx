export function trunctatename(string: string) {
  if (string?.length < 25) return string

  return string?.substring(0, 25) + '...'
}
