# Shivendra Bhagat — Portfolio

> **Live at [shivendrabhagat.com](https://shivendrabhagat.com)**

Personal portfolio website showcasing my projects, skills, and professional experience as a Full-Stack Developer and Computer Science student at Texas State University.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Typing Effect | Typed.js |
| Icons | Font Awesome 6, Devicon |
| Hosting | Vercel |

---

## Features

- **Dark theme** — near-black and lime styling with glowing green bubbles drifting behind every section; stationary when reduced motion is preferred
- **Smooth animations** — Framer Motion scroll-triggered entrance animations throughout
- **Moments** — newest-first photo marquee with inline expansion, drag/swipe controls, keyboard access, and a reduced-motion manual scroller
- **Typing animation** — cycles through roles in the hero section, with a static alternative for reduced-motion preferences
- **Project showcase** — project cards with browser mockup frames, screenshots, tech tags, and GitHub links
- **Categorized skills** — icon + label pills grouped by Languages, Frontend, Backend, Databases, and Tools
- **Experience timeline** — vertical timeline layout with 3 professional positions
- **Fully responsive** — mobile-first layout with hamburger navigation
- **Accessible** — semantic HTML, ARIA labels, skip-to-content link, keyboard navigable
- **SEO ready** — meta tags, Open Graph tags, and SVG favicon
- **Search discoverability** — canonical URL, Person/ProfilePage/WebSite structured data, robots.txt, and XML sitemap

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── AmbientBackground.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Hobbies.tsx
│   ├── SectionHeading.tsx
│   ├── Experience.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── data/
│   └── index.ts       # All content lives here
├── App.tsx
├── main.tsx
└── index.css
public/
└── assets/
    ├── portrait.jpg   # Optimized portrait, displayed without cropping
    └── projects/      # Project screenshots
```

---

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

---

## Adding a New Project

Open `src/data/index.ts` and append a new object to the `projects` array:

```ts
{
  name: 'Project Name',
  description: 'Short description.',
  tags: ['React', 'TypeScript'],
  github: 'https://github.com/sh1vendra/repo',
  screenshot: '/assets/projects/screenshot.png',
  alt: 'Screenshot description',
}
```

Drop the screenshot into `public/assets/projects/` and it will appear automatically.

---

## Managing Moments Photos

Add or remove photos directly in `src/assets/moments/`. Supported formats are JPG/JPEG,
PNG, and WebP, including uppercase extensions. Only files directly inside this
folder become Moments; portrait and project assets are not used.

Run `npm run dev` or `npm run build`. Both automatically run `npm run moments:prepare`,
which creates responsive WebP versions (up to 640, 1280, and 1920 pixels wide) and a
dimensions manifest. Existing generated images are cached by content hash. After
adding, renaming, replacing, or removing images while the dev server is running,
run `npm run moments:prepare` in a second terminal, or restart the dev server.
The generated files are ignored by Git and regenerated for production builds.

HEIC/HEIF and other unsupported formats are ignored, including uppercase extensions.
Export HEIC/HEIF images to JPEG before adding them, then keep only the browser-compatible
export in this directory. Discovery does not recurse into subdirectories or `.generated/`,
and creates one manifest entry per compatible source photo, not per
optimized variant. Do not edit `.generated/` or `moments.generated.json`.

Photos sort by the newest four-digit year in the filename, descending. A year attached
to a word, such as `Hackathon2025`, is recognized. Undated photos always come last.
Within a year, cleaned captions provide a secondary natural sort, and equivalent
captions retain stable order. Later years automatically move ahead of older ones.
The centralized priority rules in `src/utils/moments.ts` place Computer Science Excellence
Awardee first, Tech Startup Meetup second, then normal chronological Moments, followed by
DELL and IEEE at the end in that order.

Captions remove the extension, replace underscores/hyphens with spaces, collapse
whitespace, and strip a final standalone one-to-three-digit photo sequence number.
Years and internal numbers are preserved. Examples:

- `HackRice Rice University 2026 3.JPG` → `HackRice Rice University 2026`
- `SXSW 2026 @Austin TX.jpg` → `SXSW 2026 @Austin TX`

Filename text alone cannot distinguish every meaningful trailing number from a photo
sequence. For an event whose name genuinely ends in a small number, set its exact
caption in `captionOverrides` in the same data file. Existing filename spelling and
capitalization are otherwise preserved.

The component hierarchy is `MomentsSection` → `MomentsMarquee` → `MomentCard`.
`useMarqueeMotion` updates a transformed, triplicated track with `requestAnimationFrame`
without React rerenders on animation frames. Motion pauses offscreen, in a hidden tab,
on keyboard focus, or when expanded. Horizontal wheel input and dragging change velocity,
which eases back to 48 pixels/second leftward; vertical input remains page scrolling.
The decorative loop copies are hidden from assistive technology and excluded from the tab order.

Desktop images are 33vh high, expanding inline to 50vh. Mobile uses stable viewport
heights and caps card width to the screen, reducing image height when necessary to
preserve the complete photo. With reduced motion enabled, there is one native horizontal
scroller and no automatic movement or expansion animation. Empty collections hide the
section and its navigation link.

---

## Contact

- **Website:** [shivendrabhagat.com](https://shivendrabhagat.com)
- **LinkedIn:** [linkedin.com/in/shivendrabhagat](https://www.linkedin.com/in/shivendrabhagat/)
- **GitHub:** [github.com/sh1vendra](https://github.com/sh1vendra)
- **Email:** shivendra@txstate.edu
