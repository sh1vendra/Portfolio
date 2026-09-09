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
- **Typing animation** — cycles through roles in the hero section, with a static alternative for reduced-motion preferences
- **Project showcase** — project cards with browser mockup frames, screenshots, tech tags, and GitHub links
- **Categorized skills** — icon + label pills grouped by Languages, Frontend, Backend, Databases, and Tools
- **Experience timeline** — vertical timeline layout with 3 professional positions
- **Fully responsive** — mobile-first layout with hamburger navigation
- **Accessible** — semantic HTML, ARIA labels, skip-to-content link, keyboard navigable
- **SEO ready** — meta tags, Open Graph tags, and SVG favicon

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

## Contact

- **Website:** [shivendrabhagat.com](https://shivendrabhagat.com)
- **LinkedIn:** [linkedin.com/in/shivendrabhagat](https://www.linkedin.com/in/shivendrabhagat/)
- **GitHub:** [github.com/sh1vendra](https://github.com/sh1vendra)
- **Email:** shivendra@txstate.edu
