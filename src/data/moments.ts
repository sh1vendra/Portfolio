import generated from './moments.generated.json'
import { cleanMomentCaption, sortMomentsWithPriorities } from '../utils/moments'

// Import only optimized variants. This nonrecursive glob cannot include originals.
// Manifest records, rather than variant files, determine the number of Moment cards.
const urls = import.meta.glob<string>('../assets/moments/.generated/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

// Priority rules supplement the normal newest-year-first order:
// Excellence Awardee is first, Tech Startup Meetup is second, and DELL/IEEE are last.
// See sortMomentsWithPriorities for the centralized matching rules.

// Use only when a meaningful display name cannot be derived from a filename.
const captionOverrides: Record<string, string> = {
  'Computer Sciecle Excellence Awardee.jpg': 'Computer Science Excellence Awardee',
  'WebAI_hackathon.jpg': 'WebAI Community Hackathon 2025',
  'TXST Datahon 2024.jpeg': 'TXST Datathon 2024',
  'Datathon_2024.jpg': 'TXST Datathon 2025',
  'TXST Shipaton 2026 .jpg': 'TXST Shipaton Hackathon 2026',
}

interface MomentPresentation {
  imageScale?: number
  transformOrigin?: string
}

// Image-specific framing is kept here so shared card sizing stays unchanged.
const presentationOverrides: Record<string, MomentPresentation> = {
  'TXST Shipaton 2026 .jpg': {
    imageScale: 1.32,
    transformOrigin: '50% 55%',
  },
}

export interface Moment {
  id: string
  filename: string
  caption: string
  width: number
  height: number
  src: string
  srcSet: string
  presentation?: MomentPresentation
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
const ordered = sortMomentsWithPriorities(generatedMoments)

export const moments: Moment[] = ordered.map((item) => {
  const sourceUrl = (file: string) => urls[`../assets/moments/.generated/${file}`]
  return {
    ...item,
    caption: captionOverrides[item.filename] ?? cleanMomentCaption(item.filename),
    src: sourceUrl(item.sources[Math.min(1, item.sources.length - 1)].file),
    srcSet: item.sources.map((source) => `${sourceUrl(source.file)} ${source.width}w`).join(', '),
    presentation: presentationOverrides[item.filename],
  }
})
