import { createHash } from 'node:crypto'
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'
import { discoverMomentImages } from './discover-moments.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const source = path.join(root, 'src/assets/moments')
const output = path.join(source, '.generated')
const manifestPath = path.join(root, 'src/data/moments.generated.json')
await mkdir(output, { recursive: true })
const filenames = await discoverMomentImages(source)

const previous = await readFile(manifestPath, 'utf8').then(JSON.parse).catch(() => [])
const existing = new Set(await readdir(output))
const keep = new Set()
const moments = []
// Sequential processing bounds memory even when source photos are large.
for (const filename of filenames) {
  const input = await readFile(path.join(source, filename))
  const hash = createHash('sha256').update('moments-webp-v1-80').update(filename).update(input).digest('hex').slice(0, 16)
  const cached = previous.find((item) => item.id === hash)
  if (cached && cached.sources.every((item) => existing.has(item.file))) {
    cached.sources.forEach((item) => keep.add(item.file))
    moments.push(cached)
    continue
  }
  const sources = []
  let width = 0
  let height = 0
  for (const size of [640, 1280, 1920]) {
    const file = `${hash}-${size}.webp`
    const info = await sharp(input).rotate().resize({ width: size, withoutEnlargement: true })
      .webp({ quality: 80 }).toFile(path.join(output, file))
    keep.add(file)
    if (!sources.some((item) => item.width === info.width)) {
      sources.push({ file, width: info.width })
    }
    width = info.width
    height = info.height
  }
  moments.push({ id: hash, filename, width, height, sources })
}
// Only this generated directory is cleaned; original photos are never modified.
for (const file of await readdir(output)) {
  if (!keep.has(file)) await rm(path.join(output, file))
}
await writeFile(manifestPath, `${JSON.stringify(moments, null, 2)}\n`)
console.log(`Prepared ${moments.length} Moments photos with responsive WebP sources.`)
