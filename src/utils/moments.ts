/** Strip photo sequence suffixes, but retain years and numbers within a name. */
export function cleanMomentCaption(filename: string): string {
  return filename.replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s+\d{1,3}$/, '')
    .trim()
}

/** A year can touch letters (e.g. Hackathon2025), but cannot be part of a longer number. */
export function getMomentYear(filename: string): number | null {
  const years = filename.replace(/\.[^.]+$/, '').match(/(?<!\d)(?:19\d{2}|2\d{3})(?!\d)/g)
  return years ? Math.max(...years.map(Number)) : null
}

const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })

export function sortMoments<T extends { filename: string }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => {
    const yearDifference = (getMomentYear(b.filename) ?? 0) - (getMomentYear(a.filename) ?? 0)
    return yearDifference || collator.compare(cleanMomentCaption(a.filename), cleanMomentCaption(b.filename))
  })
}
