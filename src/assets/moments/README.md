# Moments source photos

Place JPG/JPEG, PNG, or WebP photos directly in this directory.
Filenames supply captions and years for newest-first sorting.
Run `npm run moments:prepare` after changes, or restart `npm run dev`.
`npm run build` always prepares the collection automatically.

Export HEIC/HEIF to JPEG first and add only the JPEG export here. HEIC/HEIF files are
ignored, including uppercase extensions. Discovery never enters subdirectories,
including `.generated/`. `.generated/` is build output; do not edit it. Variants do not
create extra Moment entries.

See the repository README for ordering and caption overrides.
