import { readdir } from 'node:fs/promises'

/** Only direct, browser-compatible source files become Moment entries. */
export async function discoverMomentImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isFile() && /\.(jpe?g|png|webp)$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
  // Never descend into .generated/ or other subdirectories.
  // HEIC/HEIF and every format outside the allowlist are simply ignored.
}
