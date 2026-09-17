# Shivendra Bhagat — Portfolio

[![Live site](https://img.shields.io/badge/Live%20site-shivendrabhagat.com-98c379?style=flat-square)](https://shivendrabhagat.com)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)

Personal portfolio for **Shivendra Bhagat**, a software engineer and Computer Science student at Texas State University. The site brings together selected work, technical experience, skills, campus involvement, and a curated Moments photo gallery.

**Live site:** [shivendrabhagat.com](https://shivendrabhagat.com)

## Highlights

- Responsive React single-page experience with TypeScript and Vite
- Project case studies with technology stacks, screenshots, and GitHub links
- Accessible navigation, skip link, keyboard interactions, and reduced-motion support
- Search-ready metadata, Open Graph tags, sitemap, robots.txt, and structured data
- Animated visual system built with Tailwind CSS, Framer Motion, Typed.js, and an ambient background
- A responsive Moments marquee with photo expansion, touch/drag input, chronological ordering, and image optimization

## Stack

| Area | Tools |
| --- | --- |
| UI | React 18, TypeScript, Tailwind CSS |
| Animation | Framer Motion, Typed.js |
| Build | Vite, PostCSS, Autoprefixer |
| Images | Sharp-generated responsive WebP variants |
| Testing | Node.js test runner |
| Deployment | Vercel |

## Run locally

**Prerequisite:** Node.js 18 or later.

```bash
git clone https://github.com/sh1vendra/Portfolio.git
cd Portfolio
npm install
npm run dev
```

The development server prepares the Moments image assets first, then starts Vite. Open the URL shown in the terminal, usually `http://localhost:5173`.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Prepare Moments assets and start the development server |
| `npm run build` | Type-check, prepare images, and create a production build |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run Moments discovery, caption, and ordering tests |
| `npm run moments:prepare` | Rebuild the Moments image manifest and responsive variants |

## Project structure

```text
src/
├── assets/moments/          # Source photos for the Moments collection
├── components/              # Page sections and reusable UI
│   ├── MomentsSection.tsx
│   ├── MomentsMarquee.tsx
│   └── MomentCard.tsx
├── data/
│   ├── index.ts             # Projects, experience, skills, and page content
│   └── moments.ts           # Moments captions, ordering, and presentation overrides
├── hooks/                   # Marquee and reduced-motion behavior
├── utils/moments.ts         # Filename captions and chronological sorting
├── App.tsx                  # Page composition
└── index.css                # Global styles and responsive layout
scripts/
├── discover-moments.mjs     # Finds supported direct photo sources
└── prepare-moments.mjs      # Produces responsive WebP variants and manifest
tests/                       # Automated Moments behavior tests
```

## Updating portfolio content

Projects, skills, experience, awards, coursework, and involvement are defined in [`src/data/index.ts`](src/data/index.ts). Update the relevant exported collection, then run `npm run build` before publishing.

Project screenshots live in `public/assets/projects/`. Add an image there and reference it with a root-relative path such as `/assets/projects/my-project.png` in the matching project entry.

## Managing Moments

### Add or remove photos

Add JPG, JPEG, PNG, or WebP photos directly to [`src/assets/moments/`](src/assets/moments/). Each direct, browser-compatible file becomes one Moment. HEIC/HEIF files and all subdirectories are ignored, so source backups and generated variants never become cards.

Run `npm run moments:prepare` after adding, removing, renaming, or replacing photos while the dev server is running. `npm run dev` and `npm run build` run it automatically.

The preparation script creates optimized 640px, 1280px, and 1920px WebP variants in `src/assets/moments/.generated/` and writes `src/data/moments.generated.json`. Both are generated build output and are intentionally ignored by Git. Keep the original browser-compatible sources; they are the input for future builds.

### Captions, ordering, and framing

Captions are created from filenames: extensions are removed, underscores and hyphens become spaces, duplicate whitespace is collapsed, and a final standalone sequence number is removed. Years and meaningful internal numbers are preserved.

The rendered sequence is manually curated by source filename in [`src/data/moments.ts`](src/data/moments.ts). This makes the order explicit and keeps separate photos distinct when they share a display caption. The configuration validates that every discovered source appears exactly once before the gallery renders.

Use the override maps in [`src/data/moments.ts`](src/data/moments.ts) when a photo needs an exact caption or a one-off crop/focal-point adjustment. This preserves the shared marquee behavior and avoids component-specific exceptions.

### Interaction and accessibility

The marquee moves left at a steady pace, begins its cinematic entrance only once the section is sufficiently visible, and pauses when it is offscreen, hidden, focused, or expanded. Horizontal trackpad gestures, mouse dragging, and mobile swipes influence the motion while ordinary vertical scrolling remains unchanged. Selecting a photo expands it inline; select it again or press `Escape` to close it.

With `prefers-reduced-motion`, the gallery becomes a native horizontal scroller with no automatic motion. Responsive images use `srcset` so the browser can choose a suitable generated WebP size.

## Quality checks

Before opening a pull request or deploying, run:

```bash
npm test
npm run build
```

The test suite covers source discovery, filename caption cleanup, date handling, centralized overrides, and ordering rules. The production build runs TypeScript validation and confirms that the image preparation pipeline completes.

## Contact

- Website: [shivendrabhagat.com](https://shivendrabhagat.com)
- LinkedIn: [linkedin.com/in/shivendrabhagat](https://www.linkedin.com/in/shivendrabhagat/)
- GitHub: [github.com/sh1vendra](https://github.com/sh1vendra)
- Email: [shivendra@txstate.edu](mailto:shivendra@txstate.edu)
