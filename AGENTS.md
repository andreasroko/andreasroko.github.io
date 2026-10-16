# AGENTS.md

Guidance for AI coding agents working in this repository. Keep this file accurate — update it when you change structure, tooling, or deployment.

## What this is

Personal portfolio site for Andreas Rokopanos, deployed to GitHub Pages at https://andreasroko.github.io (repo `andreasroko/andreasroko.github.io`).

- **Next.js 16 (App Router)** with **static export** (`output: 'export'` in `next.config.ts`) — there is no server at runtime.
- **React 19**, **TypeScript** (strict), **Tailwind CSS v4** (via `@tailwindcss/postcss`, configured CSS-first in `src/app/globals.css` — there is no `tailwind.config.*`).
- Icons: `lucide-react`. Resume timeline: `react-vertical-timeline-component`.
- No test suite exists.

## Commands

```bash
npm install        # install deps (CI uses `npm ci`, Node 20)
npm run dev        # dev server at http://localhost:3000 (uses --webpack)
npm run build      # static export to ./out (uses --webpack)
npm run lint       # ESLint 9 flat config (next core-web-vitals + typescript)
npm run deploy     # builds, then pushes ./out to the gh-pages branch
```

Always keep the `--webpack` flag on `dev`/`build`; don't switch to Turbopack without testing.

**Verifying a change:** run `npm run lint` and `npm run build`. The build must succeed — a static export fails on anything that requires a server (see constraints below).

Lint baseline: `npm run lint` reports ~42 pre-existing problems, all in `src/app/projects/huntory-app/page.jsx` (unused vars, unescaped entities, `<img>` usage, components defined during render). Everything else is clean — keep it that way. Don't mass-fix the Huntory file unless asked.

## Project layout

```
src/
  app/
    layout.tsx               Root layout: fixed Header, full-screen lake background + dark overlay, Footer
    globals.css              Tailwind import + minimal global resets
    page.tsx                 Home (portrait, name, animated lines, nav buttons)
    home.animations.css      Keyframes used by the home page (animate-line, animate-expand)
    resume/page.tsx          Vertical timeline; experience data is inline in this file
    projects/page.tsx        Grid of ProjectCards from src/data/projects.ts
    projects/huntory-app/page.jsx   Large (~1600 line) standalone interactive phone-prototype demo (JSX, not TSX)
    contact/page.tsx         Contact links (email / LinkedIn / GitHub constants at the top; empty ones are hidden)
  components/
    Header.tsx               Nav; hidden on "/", shows current page title + links to the other pages
    Footer.tsx               Copyright + photo location; hidden on paths listed in `hiddenPaths`
    ProjectCard.tsx          Card for one Project
  data/projects.ts           `Project` interface + `projects` array (source of truth for the Projects page)
  declarations.d.ts          Module shim for react-vertical-timeline-component
public/                      Static assets (portrait.jpeg, lakeBackground.jpeg, kevin-icon.svg, huntory-mockup.svg, .nojekyll)
```

Path alias `@/*` → `src/*` is configured, though existing code uses relative imports.

## Hard constraints (static export on GitHub Pages)

- No API routes, Server Actions, middleware, `cookies()`/`headers()`, ISR/revalidate, or any request-time server feature.
- Dynamic routes need `generateStaticParams`.
- `next/image` works only because `images.unoptimized: true` — keep it.
- `public/.nojekyll` must stay, or GitHub Pages will drop the `_next/` directory.
- Never commit secrets. Anything in client code ships to the browser. The Huntory demo's Gemini `apiKey` is intentionally an empty string — leave it that way.

## Conventions

- **Styling: Tailwind utility classes inline in JSX.** The repo migrated from CSS Modules to Tailwind; the only CSS files are `globals.css` and `home.animations.css` (keyframes). Don't add CSS Modules. Arbitrary values like `bg-[#111]` are used freely.
- Visual style: dark, high-contrast, white text over the darkened background photo; uppercase, wide-tracked labels; outlined white buttons that invert on hover (`border border-white rounded hover:bg-white hover:text-black`). Match it.
- Components: `export const Name: React.FC<Props> = …` with a named export (Footer also has a default export). Add `"use client"` only when a file uses hooks, browser APIs, or event handlers.
- Pages are `export default function XPage()` returning a `<main>`. Pages with long content wrap it in a `max-h-[calc(100dvh-9rem)] overflow-y-auto` container, because the layout centers content in a full-height viewport and the fixed header/footer need clearance. Use `dvh`, not `vh`, so mobile browser toolbars don't push content under the header.
- Mobile-first responsive: design for ~360px wide first, then add `sm:`/`md:` overrides. The header switches to a hamburger menu below `sm`.
- Prefer accessible markup (`aria-label`, `aria-labelledby`, meaningful `alt` text) — existing components do this.
- 2-space indentation, single quotes in most TS files.

## Common tasks

**Add a project:** append an entry to `projects` in `src/data/projects.ts`. Put its image in `public/` and reference it as `/filename.png`. If it has an in-site demo, create `src/app/projects/<id>/page.tsx` and set `demoUrl: '/projects/<id>'`. If the demo is full-screen, add its path to `hiddenPaths` in `src/components/Footer.tsx`.

**Edit resume entries:** edit the `experiences` array in `src/app/resume/page.tsx` (chronological order; it is reversed for display).

**Add a top-level page:** create `src/app/<name>/page.tsx` and add it to `navItems` in `src/components/Header.tsx` and to the buttons on the home page (`src/app/page.tsx`).

**Change site metadata:** `metadata` export in `src/app/layout.tsx`.

## Huntory demo (`src/app/projects/huntory-app/page.jsx`)

A self-contained HCI design prototype for a crowdsourced cultural-heritage inventory app, rendered inside a phone frame. Structure: shared UI pieces (Toast, DraggableFloatingAssistant, HelpModal), a `callGemini` helper, mock data (`CAMPAIGNS`, `MOCK_SUBMISSIONS`, `MOCK_PINS`, `MY_UPLOADS_DATA`), three role views (`ContributorView`, `CuratorView`, `ExpertView`), and a default `App` with a role switcher. All data is mocked in-file; there is no backend.

It is plain JS (explicitly included in `tsconfig.json`). Keep edits local to the relevant view and don't convert it to TypeScript or split it up unless asked.

## Deployment

Deploy manually with `npm run deploy`: it builds, then the `gh-pages` package publishes `./out` to the `gh-pages` branch, which GitHub Pages serves (Pages source: "Deploy from a branch" → `gh-pages`).

There is no CI. Pushing to `main` does **not** deploy. Don't add a GitHub Actions Pages workflow without also switching the repo's Pages source to "GitHub Actions".

## Git

- Default branch: `main`. Commit messages are short, imperative, sentence case (e.g. "Make container scrollable in huntory app").
- `out/`, `build/`, `.next/`, and `next-env.d.ts` are build artifacts and gitignored — never commit them.
