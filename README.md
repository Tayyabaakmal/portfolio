# Tayyaba Akmal — Portfolio

Next.js 14 (App Router), TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Lenis smooth scroll.
Nine case-study pages are generated from `data/projects.ts`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build && npm start
```

## Edit your content

| What | Where |
|---|---|
| Name, title, about, expertise, experience, **contact links** | `data/profile.ts` |
| Projects, case-study text, features | `data/projects.ts` |
| Colors and fonts | `tailwind.config.ts`, `app/layout.tsx` |

**Replace the contact placeholders in `data/profile.ts` before publishing** (email, GitHub, Fiverr, LinkedIn).

## Add screenshots

Drop images into `public/projects/<slug>/`. No code changes needed:

- `cover.jpg` — project cover (shown in the list and at the top of the case study). If missing, the first desktop image is used.
- `desktop-1.jpg`, `desktop-2.jpg`, … — desktop gallery images, in filename order.
- `mobile-1.jpg`, `mobile-2.jpg`, … — mobile gallery images.

`.jpg`, `.png`, `.webp` and `.avif` all work. Next.js optimizes and serves responsive sizes automatically.
In development, empty slots show a dashed hint; in production, empty sections are hidden.

## Add or edit case-study text

In `data/projects.ts`, each project accepts optional `description`, `overview`, `objective`, `contribution[]` and `features[]`.
Only write what you can verify. Anything left out is hidden in production.

## Add a project

Add an object to `projects` in `data/projects.ts` and create `public/projects/<slug>/`. The route, sitemap entry and navigation update automatically.

## Deploy to Vercel

1. Push to GitHub.
2. In Vercel: **Add New → Project**, import the repo (framework is auto-detected).
3. Add an environment variable `NEXT_PUBLIC_SITE_URL` set to your final domain (used for SEO, sitemap and social previews).
4. Deploy. Adding screenshots later = commit and push; Vercel rebuilds.

## Accessibility and performance notes

- `prefers-reduced-motion` disables smooth scroll, reveals and page transitions.
- Hover previews are replaced by inline covers on touch devices.
- Keyboard focus is visible; there is a skip link; the mobile menu closes with Escape.
