# andreasroko.github.io

Personal portfolio of Andreas Rokopanos: resume, projects and contact.

**Live:** https://andreasroko.github.io

Built with Next.js 16 (App Router, static export), React 19, TypeScript and Tailwind CSS v4, hosted on GitHub Pages.

## Development

Requires Node 20.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build      # static export to ./out
npm run preview    # serve ./out locally
```

## Deployment

Every push to `main` deploys automatically. The [deploy workflow](.github/workflows/deploy.yml) lints, builds the static export and publishes it to GitHub Pages.

## Editing content

| What | Where |
| --- | --- |
| Resume entries | `src/app/resume/page.tsx` (`experiences`) |
| Projects | `src/data/projects.ts` |
| Contact links | `src/app/contact/page.tsx` |
| Site title, description, URL | `src/app/layout.tsx`, `src/data/site.ts` |

See [AGENTS.md](AGENTS.md) for the full project guide (also used by AI coding assistants).
