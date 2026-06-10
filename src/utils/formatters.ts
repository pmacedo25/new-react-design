export const startCaseFromPath = (value: string) => {
  return value
    .split('/')
    .filter(Boolean)
    .slice(-1)[0]
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export const shortenList = <T>(items: T[], limit: number) => {
  return items.slice(0, limit)
}
