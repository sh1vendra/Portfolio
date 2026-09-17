import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { discoverMomentImages } from '../scripts/discover-moments.mjs'

test('discovery allows only direct JPG, JPEG, PNG, and WebP files, case-insensitively', async (t) => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'moments-discovery-'))
  t.after(() => rm(directory, { recursive: true, force: true }))
  const included = ['A.jpg', 'B.JPG', 'C.jpeg', 'D.JPEG', 'E.png', 'F.PNG', 'G.webp', 'H.WEBP']
  const ignored = ['A.heic', 'B.HEIC', 'C.heif', 'D.HEIF', 'I.avif', 'J.gif', 'README.md']
  await Promise.all([...included, ...ignored].map((name) => writeFile(path.join(directory, name), 'fixture')))
  // Even a subdirectory named like a supported image is not an input file.
  await mkdir(path.join(directory, 'folder.jpg'))
  assert.deepEqual(await discoverMomentImages(directory), included)
})

test('HEIC backups and generated variants never create duplicate source entries', async (t) => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'moments-backups-'))
  t.after(() => rm(directory, { recursive: true, force: true }))
  const filename = 'Meta AITX Hackathon 2026 2.jpg'
  await mkdir(path.join(directory, 'originals'))
  await mkdir(path.join(directory, '.generated'))
  const original = path.join(directory, 'originals', 'Meta AITX Hackathon 2026 2.HEIC')
  await writeFile(original, 'untouched original')
  await writeFile(path.join(directory, filename), 'converted JPEG')
  await writeFile(path.join(directory, 'Meta AITX Hackathon 2026 2.heic'), 'ignored HEIC')
  await writeFile(path.join(directory, 'originals', filename), 'ignored nested JPEG')
  await Promise.all([640, 1280, 1920].map((width) =>
    writeFile(path.join(directory, '.generated', `variant-${width}.webp`), 'optimized variant')))
  assert.deepEqual(await discoverMomentImages(directory), [filename])
  assert.equal(await readFile(original, 'utf8'), 'untouched original')
})
