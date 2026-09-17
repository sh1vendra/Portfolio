import generated from './moments.generated.json'
import { cleanMomentCaption, sortMoments } from '../utils/moments'

// Import only optimized variants. This nonrecursive glob cannot include originals.
// Manifest records, rather than variant files, determine the number of Moment cards.
const urls = import.meta.glob<string>('../assets/moments/.generated/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

// Optional full filenames, in the desired order. Listed photos come first;
// everything else retains the automatic newest-year-first order.
const manualOrder: string[] = []
// Use only for meaningful trailing numbers that should not be treated as photo sequences.
const captionOverrides: Record<string, string> = {}

export interface Moment {
  id: string
  filename: string
  caption: string
  width: number
  height: number
  src: string
  srcSet: string
}

interface GeneratedMoment {
  id: string
  filename: string
  width: number
  height: number
  sources: { file: string; width: number }[]
}

// Explicit typing also supports a freshly generated, completely empty collection.
const generatedMoments: GeneratedMoment[] = generated
const ordered = sortMoments(generatedMoments)
if (manualOrder.length) {
  const rank = (filename: string) => {
    const index = manualOrder.indexOf(filename)
    return index < 0 ? manualOrder.length : index
  }
  ordered.sort((a, b) => rank(a.filename) - rank(b.filename))
}

export const moments: Moment[] = ordered.map((item) => {
  const sourceUrl = (file: string) => urls[`../assets/moments/.generated/${file}`]
  return {
    ...item,
    caption: captionOverrides[item.filename] ?? cleanMomentCaption(item.filename),
    src: sourceUrl(item.sources[Math.min(1, item.sources.length - 1)].file),
    srcSet: item.sources.map((source) => `${sourceUrl(source.file)} ${source.width}w`).join(', '),
  }
})
