# AGENTS.md

Single-page static portfolio built with Next.js 16 App Router, React 19, TypeScript (strict), Tailwind v3, and Three.js via `@react-three/fiber`/`drei`. (`package.json` description still says "Next.js 14" — stale.)

## Commands

- `npm run dev` — dev server
- `npm run build` — production build; this is the typecheck gate (no `tsc`/`typecheck` script)
- `npm start` — serve production build
- `npm run lint` — **broken**: ESLint 10.7.0 + `eslint-config-next` crash on every file with `getFilename is not a function`. Do not rely on it; use `npm run build` to verify.
- No tests exist in this repo.
- Install with `npm install --legacy-peer-deps` (`overrides` in package.json pin `@types/react`/`@types/react-dom` to avoid peer conflicts).

## Structure & where to edit content

- `app/layout.tsx` renders `Navbar`, `Footer`, and `StarsCanvas` (a fixed full-screen Three.js canvas) on every page; `app/page.tsx` composes the sections (`Hero` → `Skills` → `Encryption` → `Projects`).
- `components/main/` = page sections (`hero`, `skills`, `encryption`, `projects`, `navbar`, `footer`, `star-background`). `components/sub/` = reusable pieces (`hero-content`, `skill-data-provider`, `skill-text`, `project-card`).
- All data/content lives in `constants/index.ts` (skills, projects, socials, nav links, footer links, declared `as const`). Site metadata lives in `config/index.ts`. Change content there, not inside components.
- In `constants/index.ts`, skill images are bare filenames (resolved by `skill-data-provider.tsx` to `/skills/<name>`, so files go in `public/skills/`) while project images are full `/projects/...` paths (`public/projects/`).
- Path alias `@/*` maps to the repo root (e.g. `@/components/main/hero`).
- Server components by default; client components must carry `"use client"`. Current ones: `star-background.tsx`, `encryption.tsx`, `hero-content.tsx`, `skill-data-provider.tsx`, `skill-text.tsx`.

## Gotchas

- `components/main/star-background.tsx` imports `maath/random`, but `maath` is **not** declared in package.json — it's only a transitive dep of `drei`. Keep it in the lockfile or add it to dependencies if you touch that file.
- `image/` at the repo root is **orphaned** — nothing references it (real assets live in `public/skills/` and `public/projects/`). Don't add new files there.
- Both `.eslintrc.json` (legacy, dead config) and `eslint.config.mjs` (flat config, the one ESLint 10 actually reads) exist. Only edit `eslint.config.mjs`.
- `README.md` was removed from the repo (commit "Remove unnecessary documentation files"). `.github/workflows/update-readme.yml` still regenerates README dependency/folder-structure sections (between `<!--- ..._START --->`/`END` markers) and will error on push to `main` until a README.md exists again.
- `netlify.toml` skips deploys for doc-only changes.
- `app/layout.tsx` uses `next/font/google` (Inter), which fetches fonts at build time — offline builds fail.
