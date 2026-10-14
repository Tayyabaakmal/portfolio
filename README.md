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

## AI portfolio assistant

A responsive chat widget appears above the WhatsApp button on every page. It answers questions using the public services and project data already in this repository, supports follow-up questions, and offers email and WhatsApp links. No inquiry is submitted or meeting booked by the assistant.

### Enable real AI replies

1. Create a Gemini API key at https://aistudio.google.com/apikey. Select a Free Tier project and leave billing disabled for free API usage. Free quotas vary by model/project and are shown in AI Studio.
2. Locally, copy `.env.example` to `.env.local` and set `GEMINI_API_KEY`.
3. In Vercel **Project → Settings → Environment Variables**, add `GEMINI_API_KEY` for Preview and Production. Optionally set `GEMINI_MODEL` (default: `gemini-3.5-flash-lite`). Never use a `NEXT_PUBLIC_` name for the key.
4. Redeploy after changing environment variables. Test the preview before merging.
5. Ask about services, a relevant project, and an estimate. Confirm the assistant does not invent prices or availability. Test mobile, keyboard, and the contact links.

Without a key the widget shows a clear unavailable message and direct contact links. It does not pretend to generate AI responses.

### Architecture and limits

- `components/PortfolioChat.tsx`: accessible chat panel, bounded conversation history, loading/error states, retry by resending, new chat, and no persistent browser transcript.
- `app/api/chat/route.ts`: server-only Gemini generateContent integration; public knowledge from `data/profile.ts` and `data/projects.ts`; no additional package dependencies.
- Validates message roles, length, request size, content type and origin; caps reply tokens; aborts slow requests; suppresses provider error details.
- Replies are rendered as plain text, never injected HTML. Google may use free-tier prompts and responses to improve its products; do not submit sensitive information. The application does not save chat transcripts.
- The in-memory eight-requests-per-minute limit is **per instance** and resets on cold starts. It is not distributed abuse protection. Before public traffic, configure Vercel Firewall rate limits for `/api/chat` and review Gemini project quotas. Origin checks alone do not prevent scripted requests.
- Prompt instructions limit the assistant to portfolio facts, but cannot guarantee factual accuracy. The user-facing notice and direct human contact links remain available.

Validate with `npm run test:chat`, `npm run typecheck` and `npm run build`. The chat tests mock the provider and cover validation, missing configuration, upstream errors and throttling. Test the configured provider after adding a key; a successful build does not prove API credentials or billing are valid.


## Contact inquiries inside chat

Visitors can open **Leave your contact details** and supply their name, project details, and either an email address or phone number. The form requires consent and submits to the approved FormSubmit service, which routes notifications to `tkcreators01@gmail.com`. Chat transcripts are not included. Submission opens a separate tab for FormSubmit verification and confirmation; the chat does not claim delivery before that step.

Before launch, submit one test inquiry on the latest Vercel preview and confirm the FormSubmit activation email in `tkcreators01@gmail.com` (check spam). After activation, send another test and verify delivery. Receipt has not yet been tested. FormSubmit's default CAPTCHA remains enabled. No application database or lead dashboard is provided by this integration.
