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

function compareChronologically<T extends { filename: string; sortYear?: number }>(a: T, b: T): number {
  const yearDifference = (b.sortYear ?? getMomentYear(b.filename) ?? 0)
    - (a.sortYear ?? getMomentYear(a.filename) ?? 0)
  return yearDifference || collator.compare(cleanMomentCaption(a.filename), cleanMomentCaption(b.filename))
}

export function sortMoments<T extends { filename: string; sortYear?: number }>(items: readonly T[]): T[] {
  return [...items].sort(compareChronologically)
}

/**
 * Resolves an explicit source-file sequence and rejects an incomplete or
 * ambiguous configuration before it can render a partial Moments collection.
 */
export function orderMomentsByFilename<T extends { filename: string }>(
  items: readonly T[],
  filenames: readonly string[],
): T[] {
  const configured = new Set(filenames)
  if (configured.size !== filenames.length) {
    throw new Error('Moments manual order contains duplicate source filenames.')
  }

  const byFilename = new Map(items.map((item) => [item.filename, item]))
  const missing = filenames.filter((filename) => !byFilename.has(filename))
  const unlisted = items.filter((item) => !configured.has(item.filename)).map((item) => item.filename)
  if (missing.length || unlisted.length || items.length !== filenames.length) {
    throw new Error(
      `Moments manual order must list every source exactly once. Missing: ${missing.join(', ') || 'none'}. `
      + `Unlisted: ${unlisted.join(', ') || 'none'}.`,
    )
  }

  return filenames.map((filename) => byFilename.get(filename)!)
}

type MomentPriority = 'awardee' | 'meetup' | 'normal' | 'dell' | 'ieee'

/**
 * Keeps named Moments at intentional positions while preserving the normal
 * newest-first sort for everything else.
 */
export function sortMomentsWithPriorities<T extends { filename: string; sortYear?: number }>(items: readonly T[]): T[] {
  const priority = (filename: string): MomentPriority => {
    if (filename.includes('Computer Sciecle Excellence Awardee')) return 'awardee'
    if (filename.includes('Tech Startup Meetup')) return 'meetup'
    if (filename.includes('DELL')) return 'dell'
    if (filename.includes('IEEE')) return 'ieee'
    return 'normal'
  }
  const rank: Record<MomentPriority, number> = { awardee: 0, meetup: 1, normal: 2, dell: 3, ieee: 4 }

  return [...items].sort((a, b) => {
    const priorityDifference = rank[priority(a.filename)] - rank[priority(b.filename)]
    return priorityDifference || compareChronologically(a, b)
  })
}
