---
phase: 01-foundation-deployable-skeleton
plan: "01"
subsystem: web-scaffold
tags:
  - nextjs
  - tailwindcss-v4
  - app-router
  - greenfield-scaffold
  - brand-tokens
dependency_graph:
  requires: []
  provides:
    - Next.js App Router scaffold with Tailwind v4
    - Brand color tokens in app/globals.css @theme
    - Global Footer component with three working nav links
    - Stub routes /privacy /terms /support
    - Static production build
  affects:
    - All subsequent phases (2-4) build on this scaffold
tech_stack:
  added:
    - "Next.js 16.2.6 (App Router)"
    - "React 19.2.4"
    - "Tailwind CSS v4 (@tailwindcss/postcss)"
    - "TypeScript 5"
    - "ESLint 9 (eslint-config-next)"
    - "next/font (Inter, Google Fonts)"
  patterns:
    - "Tailwind v4 @theme directive for brand tokens (no tailwind.config.js)"
    - "Next.js App Router with RootLayout wrapping all routes"
    - "Next.js <Link> for internal navigation"
    - "App Router file-based favicon (app/icon.png)"
key_files:
  created:
    - app/globals.css
    - app/layout.tsx
    - app/page.tsx
    - app/icon.png
    - app/privacy/page.tsx
    - app/terms/page.tsx
    - app/support/page.tsx
    - components/Footer.tsx
    - package.json
    - tsconfig.json
    - next.config.ts
    - eslint.config.mjs
    - postcss.config.mjs
    - .gitignore
  modified: []
decisions:
  - "D-01 honored: Tailwind v4 via @tailwindcss/postcss; no tailwind.config.js created"
  - "D-02 honored: all brand tokens declared as --color-* CSS variables in @theme block in globals.css"
  - "D-04 honored: zero dark-mode artifacts (no prefers-color-scheme, no darkMode config, no dark: utilities)"
  - "D-05 honored: footer hrefs are absolute paths (/privacy, /terms, /support); all three stub routes are real pages, not redirects or 404s"
metrics:
  duration: "~20 minutes"
  completed: "2026-06-01"
  tasks_completed: 2
  tasks_total: 2
  files_created: 14
  files_modified: 0
---

# Phase 01 Plan 01: Bootstrap Next.js + Brand Scaffold Summary

**One-liner:** Next.js 16 App Router scaffold with Tailwind v4 @theme brand tokens (emerald/gold/navy from wip-muslim), global Inter font, skeleton home page, production-ready Footer with three real stub routes.

---

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Bootstrap Next.js + Tailwind v4 with brand tokens in @theme | 8a70b87 | package.json, tsconfig.json, next.config.ts, eslint.config.mjs, postcss.config.mjs, .gitignore, app/globals.css, app/layout.tsx, app/page.tsx, app/icon.png, components/Footer.tsx (placeholder) |
| 2 | Build global Footer and three stub routes | 7b225b7 | components/Footer.tsx, app/privacy/page.tsx, app/terms/page.tsx, app/support/page.tsx |

---

## Brand Tokens Ported

Sourced verbatim from `/Users/zbilalozgen/repos/wip-muslim/tailwind.config.js` into `app/globals.css` `@theme` block:

| Token | Hex | Role |
|-------|-----|------|
| --color-emerald-600 | #006B3F | Primary brand — skeleton h1, footer brand mark |
| --color-gold-500 | #D4A843 | Accent — footer link hover |
| --color-navy-800 | #1B2A4A | Secondary — body text, footer text |
| --color-cream | #F2F2F7 | Page background |
| --color-surface-card | #FFFFFF | Footer background |
| --color-surface-warm | #FFF5E6 | Warm surface (available for later phases) |
| --color-surface-card-hover | #FFFAF2 | Card hover surface (available for later phases) |

Full ramps ported: emerald 50–900, gold 50–900, navy 50–900.

Additional tokens:
- `--spacing-touch: 44px` — enforces 44px min-height on footer brand mark
- `--transition-duration-fast: 150ms` — footer link hover transition

---

## UI-SPEC Copy Lock — Verbatim Confirmation

All copy strings from the UI-SPEC Copywriting Contract are used verbatim:

| Element | Locked Copy | File |
|---------|------------|------|
| Skeleton page heading | İkra — Quran Verses & Hadith | app/page.tsx |
| Skeleton page subheading | Coming soon. | app/page.tsx |
| Footer brand mark | İkra | components/Footer.tsx |
| Footer tagline | Quran Verses & Sahih Hadith Widget App | components/Footer.tsx |
| Footer Privacy link | Privacy Policy → /privacy | components/Footer.tsx |
| Footer Terms link | Terms of Service → /terms | components/Footer.tsx |
| Footer Support link | Support → /support | components/Footer.tsx |
| Footer copyright | © 2025 İkra. All rights reserved. | components/Footer.tsx |
| Empty-state stub copy | This page is under construction. | app/privacy/page.tsx, app/terms/page.tsx, app/support/page.tsx |

---

## Routes Shipped

| Route | Type | Status |
|-------|------|--------|
| / | Static | Skeleton heading + subheading |
| /privacy | Static | Stub — "This page is under construction." |
| /terms | Static | Stub — "This page is under construction." |
| /support | Static | Stub — "This page is under construction." |

---

## Build Verification

```
✓ Compiled successfully
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /icon.png
├ ○ /privacy
├ ○ /support
└ ○ /terms
○  (Static)  prerendered as static content
```

`npm run build` exits 0. All four app routes are static.

---

## D-04 Confirmation: Zero Dark-Mode Artifacts

Confirmed zero occurrences of `prefers-color-scheme`, `darkMode`, or `dark:` utilities in `app/globals.css` and all component/page files. Site is light-mode only per D-04. UI-02 intentionally NOT implemented.

---

## D-05 Confirmation: Real Stub Routes with Absolute Hrefs

Footer links use Next.js `<Link>` with hrefs `/privacy`, `/terms`, `/support` (absolute paths, never `#`). All three stub routes return real pages — no 404, no `notFound()`, no redirect.

---

## Requirements Satisfied

| Requirement | Status |
|-------------|--------|
| UI-01: brand palette applied via Tailwind utility classes | SATISFIED |
| UI-02: dark mode | INTENTIONALLY DEFERRED per D-04 — zero dark-mode code |
| LAND-06: global footer with brand mark and three working links | SATISFIED |
| DEPLOY-01: `npm run build` succeeds | SATISFIED |

---

## Deviations from Plan

None — plan executed exactly as written.

---

## Known Stubs

The following stub pages exist intentionally per D-05. They render "This page is under construction." and will be replaced in Phase 3:

| File | Stub Content | Reason |
|------|-------------|--------|
| app/privacy/page.tsx | "This page is under construction." | Phase 3 will add real Privacy Policy content |
| app/terms/page.tsx | "This page is under construction." | Phase 3 will add real Terms of Service content |
| app/support/page.tsx | "This page is under construction." | Phase 3 will add real Support page content |

These stubs do not prevent the plan's goal — the goal is a buildable scaffold with working routes, not full legal content.

---

## Threat Surface Scan

No new security-relevant surface beyond the plan's threat model. The site remains fully static with no user input, no API routes, no database, and no server-side state.

---

## Self-Check: PASSED

- [x] app/globals.css exists with @theme block containing brand anchors
- [x] app/layout.tsx exists with Inter font, bg-cream, Footer import
- [x] app/page.tsx exists with locked heading/subheading copy
- [x] app/icon.png exists, byte-identical to wip-muslim source
- [x] components/Footer.tsx exists with all required copy and hrefs
- [x] app/privacy/page.tsx, app/terms/page.tsx, app/support/page.tsx exist with stub copy
- [x] Commit 8a70b87 exists (Task 1)
- [x] Commit 7b225b7 exists (Task 2)
- [x] npm run build exits 0, all four routes static
- [x] No tailwind.config.js in repo
- [x] Zero dark-mode artifacts in globals.css
