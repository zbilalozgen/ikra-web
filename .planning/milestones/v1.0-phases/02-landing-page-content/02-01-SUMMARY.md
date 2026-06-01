---
phase: 02-landing-page-content
plan: "01"
subsystem: foundation/assets
tags: [shadcn, lucide-react, assets, tailwind-v4]
dependency_graph:
  requires: []
  provides:
    - components/ui/button.tsx
    - components/ui/card.tsx
    - lib/utils.ts
    - components.json
    - public/screenshots/01-home-screen.png
    - public/screenshots/02-home-full.png
    - public/screenshots/03-deeplink-verse.png
    - public/screenshots/04-push-notification.png
    - public/watermark-glyph.png
  affects:
    - Plan 02-02 (Hero, Features, Showcase, Stats sections)
tech_stack:
  added:
    - shadcn@4.10.0 (Tailwind v4 mode, new-york style)
    - lucide-react@1.17.0
  patterns:
    - shadcn primitives coexisting with Tailwind v4 @theme block (no tailwind.config.js)
    - cn() helper from lib/utils.ts for conditional class merging
key_files:
  created:
    - components.json
    - lib/utils.ts
    - components/ui/button.tsx
    - components/ui/card.tsx
    - public/screenshots/01-home-screen.png
    - public/screenshots/02-home-full.png
    - public/screenshots/03-deeplink-verse.png
    - public/screenshots/04-push-notification.png
    - public/watermark-glyph.png
  modified:
    - app/globals.css (shadcn appended @theme inline + :root/:dark CSS variable layer below existing @theme block)
    - app/layout.tsx (shadcn added Geist font — reverted to Inter per plan; added cn() import)
    - package.json (lucide-react added to dependencies)
    - package-lock.json
decisions:
  - shadcn init ran with -d -y flags selecting new-york style, neutral base, CSS variables, RSC mode
  - shadcn modified layout.tsx adding Geist font; reverted to preserve Phase 1 Inter setup
  - shadcn variables (:root --background, --foreground, etc.) kept below existing @theme block — no collision with --color-* namespace
metrics:
  duration: "~8 minutes"
  completed: "2026-06-01"
  tasks_completed: 2
  files_created: 9
  files_modified: 4
---

# Phase 02 Plan 01: shadcn/ui Foundation + Asset Copy Summary

**One-liner:** shadcn/ui initialized in Tailwind v4 mode (button + card only) with lucide-react and 5 PNG assets copied from wip-muslim repo.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Initialize shadcn/ui (Tailwind v4) and add button + card | 21fa7ae | components.json, lib/utils.ts, components/ui/button.tsx, components/ui/card.tsx, app/globals.css, app/layout.tsx, package.json, package-lock.json |
| 2 | Install lucide-react and copy iOS screenshots + watermark glyph | a1ba607 | package.json, package-lock.json, public/screenshots/* (4 files), public/watermark-glyph.png |

## What Was Built

- **shadcn@4.10.0** initialized in Tailwind v4 mode (auto-detected from `@tailwindcss/postcss` in devDependencies and `@import "tailwindcss"` in globals.css). Style: new-york, base: neutral, CSS variables: yes, RSC: yes.
- **components/ui/button.tsx** — exports `Button` and `buttonVariants`, imports `cn` from `@/lib/utils`
- **components/ui/card.tsx** — exports `Card`, `CardHeader`, `CardContent`, `CardTitle`, `CardDescription`, `CardFooter`, imports `cn` from `@/lib/utils`
- **lib/utils.ts** — exports `cn()` using `clsx` + `tailwind-merge`
- **lucide-react@1.17.0** — runtime dependency for feature icons (Smartphone, Volume2, Stars, Compass, Share2, WifiOff, LayoutDashboard)
- **5 PNG assets** copied byte-identical from wip-muslim repo (verified with `cmp`)

## Asset Copy Verification

| Source | Destination | Byte-Equal |
|--------|-------------|-----------|
| wip-muslim/analysis/screenshots/ios/01-home-screen.png | public/screenshots/01-home-screen.png | YES |
| wip-muslim/analysis/screenshots/ios/02-home-full.png | public/screenshots/02-home-full.png | YES |
| wip-muslim/analysis/screenshots/ios/03-deeplink-verse.png | public/screenshots/03-deeplink-verse.png | YES |
| wip-muslim/analysis/screenshots/ios/04-push-notification.png | public/screenshots/04-push-notification.png | YES |
| wip-muslim/src/assets/images/watermark-glyph.png | public/watermark-glyph.png | YES |

## Phase 1 @theme Token Preservation

All Phase 1 brand tokens confirmed intact in `app/globals.css`:
- `--color-emerald-600: #006B3F` (primary green)
- `--color-gold-500: #D4A843` (accent gold)
- `--color-navy-800: #1B2A4A` (secondary navy)
- `--color-cream: #F2F2F7`
- `--spacing-section: 64px`
- `--duration-fast: 150ms`
- `--font-sans` wired to Inter via `--font-inter`

shadcn appended its own `@theme inline` block and `:root`/`.dark` CSS variable sections below the existing @theme block. These coexist cleanly in the `--background`/`--foreground` namespace (no collision with `--color-*` brand tokens).

## Build Status

`npm run build` exits 0. All 6 routes (/, /privacy, /support, /terms, /icon.png, /_not-found) generated as static content.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] shadcn modified app/layout.tsx adding Geist font**
- **Found during:** Task 1
- **Issue:** `npx shadcn@latest init -d -y` overwrote layout.tsx, replacing Inter with Geist font and assigning it to `--font-sans`. This would have broken the Phase 1 brand font (Inter is the source of truth per globals.css `--font-sans: var(--font-inter)`).
- **Fix:** Reverted layout.tsx to Phase 1 state while keeping the `cn` import that shadcn added (which is correct and needed).
- **Files modified:** app/layout.tsx
- **Commit:** 21fa7ae (included in same commit)

## Self-Check: PASSED

- components.json exists: FOUND
- lib/utils.ts exists: FOUND
- components/ui/button.tsx exists: FOUND
- components/ui/card.tsx exists: FOUND
- public/screenshots/01-home-screen.png exists: FOUND
- public/screenshots/02-home-full.png exists: FOUND
- public/screenshots/03-deeplink-verse.png exists: FOUND
- public/screenshots/04-push-notification.png exists: FOUND
- public/watermark-glyph.png exists: FOUND
- Task 1 commit 21fa7ae: FOUND
- Task 2 commit a1ba607: FOUND
- Phase 1 @theme tokens preserved: CONFIRMED
- Build exit 0: CONFIRMED
