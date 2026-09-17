import generated from './moments.generated.json'
import { cleanMomentCaption, orderMomentsByFilename } from '../utils/moments'

// Import only optimized variants. This nonrecursive glob cannot include originals.
// Manifest records, rather than variant files, determine the number of Moment cards.
const urls = import.meta.glob<string>('../assets/moments/.generated/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

// This is the complete, manually curated source sequence. Match source filenames
// rather than captions because some distinct images share a display caption.
const manualMomentOrder = [
  'Computer Sciecle Excellence Awardee.jpg',
  'Tech Startup Meetup @Houston TX.jpg',
  'SXSW 2026 @Austin TX.jpg',
  'HackRice Rice University 2026 3.JPG',
  'HackRice Rice University 2026 4.jpg',
  'HackRice Rice University 2026.jpg',
  'OpenAI Codex Hackathon 2026.jpg',
  'TXST Shipaton 2026 .jpg',
  'AI Build LaunchD Hackathon 2026.jpg',
  'NVIDIA AITX Hackathon2025.jpg',
  'WebAI_hackathon.jpg',
  'WebAI Headquarters Austin TX.jpg',
  'HackTX Hackathon 2024.jpeg',
  'Meta AITX Hackathon 2024.jpg',
  'Meta AITX Hackathon 2026 2.jpg',
  'TXST Datahon 2024.jpeg',
  "Dean's List Fall 2023.jpeg",
  'Alpha Lambda Delta Honor Ceremony.jpg',
  'Meta @Capital Factory.jpg',
  'N8N Build.jpg',
  'Datathon_2024.jpg',
  'DELL @TXST.jpeg',
  'IEEE @TXST.jpeg',
] as const

// Use only when a meaningful display name cannot be derived from a filename.
const captionOverrides: Record<string, string> = {
  'Computer Sciecle Excellence Awardee.jpg': 'Computer Science Excellence Awardee',
  'Meta AITX Hackathon 2026 2.jpg': 'Meta AITX Hackathon 2024',
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
  // Portrait standing group: trim the ceiling while keeping the group centered.
  'HackRice Rice University 2026 4.jpg': {
    imageScale: 1.3,
    transformOrigin: '50% 65%',
  },
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
const ordered = orderMomentsByFilename(generatedMoments, manualMomentOrder)

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
