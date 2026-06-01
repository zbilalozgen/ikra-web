---
phase: 02-landing-page-content
plan: "02"
subsystem: landing-page/sections
tags: [hero, features, showcase, stats, store-badges, next-image, lucide, shadcn]
dependency_graph:
  requires:
    - 02-01 (shadcn/ui + lucide-react + assets)
  provides:
    - components/Hero.tsx
    - components/Features.tsx
    - components/Showcase.tsx
    - components/Stats.tsx
    - components/StoreBadges.tsx
    - app/page.tsx (landing page composition)
  affects:
    - Vercel production deploy (/ route renders full marketing page)
tech_stack:
  added: []
  patterns:
    - next/image with explicit width/height for CLS=0
    - inline SVG store badges (no external image assets for badges)
    - flatMap pattern for interleaved React elements (stat tiles + dot dividers)
    - shadcn Card with custom className overriding default styles
key_files:
  created:
    - components/StoreBadges.tsx
    - components/Hero.tsx
    - components/Features.tsx
    - components/Showcase.tsx
    - components/Stats.tsx
  modified:
    - app/page.tsx
decisions:
  - "Used flatMap (not fragment key hack) to interleave stat tiles and dot dividers — avoids React key warnings and produces clean DOM"
  - "PhoneFrame extracted as local function component inside Showcase.tsx to avoid duplicating phone-frame JSX across mobile strip and desktop grid"
  - "StoreBadges exports only AppStoreBadge and GooglePlayBadge named exports — no default/wrapper export per D-17"
  - "Hero watermark positioned absolute within section root (relative overflow-hidden) — watermark clips at section boundary per design intent"
  - "body bg-cream preserved via layout.tsx className utility (wins over shadcn @layer base bg-background rule) — no globals.css modification needed"
metrics:
  duration: "~20 minutes"
  completed: "2026-06-01"
  tasks_completed: 6
  files_created: 5
  files_modified: 1
---

# Phase 02 Plan 02: Landing Page Sections Summary

**One-liner:** Full marketing landing page built with Hero, Features (6 Lucide icon cards), Showcase (4 phone-frame screenshots), Stats (6 tiles with gold dot dividers), and inline SVG store badges — all locked copy verbatim, npm run build exits 0.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create StoreBadges.tsx with inline SVG anchors | 23273ba | components/StoreBadges.tsx |
| 2 | Create Hero.tsx — h1, subheading, badges, phone, watermark | f290659 | components/Hero.tsx |
| 3 | Create Features.tsx — 6 shadcn Card tiles with Lucide icons | 1e48be6 | components/Features.tsx |
| 4 | Create Showcase.tsx — 4 phone-frame screenshots | 74e5e1d | components/Showcase.tsx |
| 5 | Create Stats.tsx — 6 stat tiles with gold dot dividers | a68a08d | components/Stats.tsx |
| 6 | Replace app/page.tsx — compose Hero/Features/Showcase/Stats | 063e780 | app/page.tsx |

## What Was Built

### components/StoreBadges.tsx
- `AppStoreBadge` and `GooglePlayBadge` named exports (no default)
- Each: `<a href="#">` with official-style inline SVG badge, `aria-label`, `min-h-touch`, `duration-fast hover:opacity-90`
- `{/* TODO(launch): fill App Store URL */}` and `{/* TODO(launch): fill Google Play URL */}` comments per D-09

### components/Hero.tsx
- h1: "Quran Verses & Sahih Hadith on Your Lock Screen" (D-07, emerald-600)
- Subheading with em dash (D-08, navy-800/80)
- StoreBadges row: flex flex-wrap justify-center md:justify-start gap-md mt-xl
- Phone image: /screenshots/02-home-full.png, 280×560, priority, rotate-3 drop-shadow-xl
- Watermark: /watermark-glyph.png, 320×320, absolute top-0 right-0, opacity-[0.06], pointer-events-none
- Section: relative overflow-hidden py-section; container: max-w-6xl mx-auto px-screen

### components/Features.tsx
- Section header "What İkra Offers" (h2, text-center)
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl
- 6 shadcn Card tiles: bg-surface-card border-navy-800/10 rounded-lg p-lg hover:border-gold-500/30 hover:bg-surface-card-hover duration-fast
- Icons: LayoutDashboard, Volume2, Stars, Compass, Share2, WifiOff — w-6 h-6 text-gold-500

### components/Showcase.tsx
- Section header "See It in Action" (h2, text-center)
- Mobile: flex overflow-x-auto snap-x snap-mandatory gap-md pb-sm lg:hidden
- Desktop: hidden lg:grid grid-cols-4 gap-md
- Phone-frame: rounded-3xl border-4 border-navy-800/10 shadow-sm overflow-hidden snap-start flex-shrink-0
- 4 images at 240×480 object-cover (no priority — lazy)

### components/Stats.tsx
- Section header "By the Numbers" (h2, text-center)
- 6 tiles via flatMap with 5 middle-dot dividers (U+00B7, text-gold-500, aria-hidden)
- Tile values: text-2xl font-semibold text-emerald-600; captions: text-sm text-navy-800/70 mt-xs
- Three tiles with captions: "of Allah", "Always available", "Forever"

### app/page.tsx
- Replaced skeleton with Fragment composing `<Hero />` `<Features />` `<Showcase />` `<Stats />`
- No Footer import (global from layout), no metadata, no use client

## LAND Requirement Satisfaction

| Requirement | Description | Status | Coverage |
|-------------|-------------|--------|----------|
| LAND-01 | Hero section with headline + CTA | SATISFIED | Hero.tsx — h1 D-07, subheading D-08, StoreBadges row |
| LAND-02 | Features section 6 tiles | SATISFIED | Features.tsx — 6 Card tiles, Lucide icons, locked copy |
| LAND-03 | Product screenshot showcase | SATISFIED | Showcase.tsx — 4 phone-frame screenshots, mobile+desktop |
| LAND-04 | App Store + Google Play badges | SATISFIED | StoreBadges.tsx consumed by Hero — placeholder hrefs + TODO comments |
| LAND-05 | Stats row | SATISFIED | Stats.tsx — 6 tiles with gold-500 dot dividers |

## Decision Coverage (D-06 through D-20)

| Decision | File | Implementation |
|----------|------|----------------|
| D-06 — Single long page composition | app/page.tsx | Fragment composing Hero/Features/Showcase/Stats; Footer global |
| D-07 — Hero h1 locked copy | components/Hero.tsx | "Quran Verses & Sahih Hadith on Your Lock Screen" (emerald-600) |
| D-08 — Hero subheading locked copy | components/Hero.tsx | em dash, navy-800/80 |
| D-09 — Badge placeholder hrefs | components/StoreBadges.tsx | href="#", TODO(launch) comments |
| D-10 — Hero phone mockup | components/Hero.tsx | /screenshots/02-home-full.png, 280×560, priority |
| D-11 — Features grid responsive | components/Features.tsx | grid-cols-1 md:grid-cols-2 lg:grid-cols-3 |
| D-12 — Lucide icons | components/Features.tsx | LayoutDashboard, Volume2, Stars, Compass, Share2, WifiOff |
| D-13 — Card structure | components/Features.tsx | bg-surface-card p-lg, flat icon+h3+p, no CardHeader/CardContent |
| D-14 — Showcase section | components/Showcase.tsx | Mobile snap strip + desktop 4-col grid, phone-frame wrappers |
| D-15 — Stats tile row | components/Stats.tsx | 6 tiles, gold-500 dot dividers, no animated counters |
| D-16 — shadcn init | components/ui/card.tsx | (shipped in 02-01) |
| D-17 — StoreBadges location + exports | components/StoreBadges.tsx | AppStoreBadge + GooglePlayBadge named exports, inline SVG |
| D-18 — Watermark | components/Hero.tsx | opacity-[0.06], absolute top-0 right-0, pointer-events-none |
| D-19 — Section spacing | All section components | py-section, max-w-6xl px-screen |
| D-20 — next/image CLS=0 | Hero.tsx, Showcase.tsx | Explicit width+height on every Image, priority on hero only |

## Build Output

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /icon.png
├ ○ /privacy
├ ○ /support
└ ○ /terms

○  (Static)  prerendered as static content
```

`npm run build` exits 0. `/` is static (`○`).

## Verbatim Copy Verification

All copy strings match UI-SPEC Copywriting Contract verbatim. Zero deviations:
- Hero h1: matches D-07 exactly (ampersand, no smart quotes)
- Hero subheading: matches D-08 exactly (em dash U+2014, trailing period)
- Feature tile 3: "Esmaül Hüsna — 99 Names" (em dash, Turkish diacritics)
- Feature tile 6: "İkra works without a connection, always." (U+0130 capital I with dot)
- Stats "6,236 Verses" (ASCII comma), "of Allah", "Always available", "Forever"
- Store badge aria-labels: verbatim per §Copywriting Contract

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

- `href="#"` on App Store and Google Play badges — intentional per D-09, tracked with TODO(launch) comments. Future plan fills real store URLs at launch.

## Threat Flags

None — no new security surface introduced. All threat register items handled:
- T-02-02-01: Placeholder hrefs are `#` (non-navigating) with aria-labels — accepted
- T-02-02-02: SVG badges are inline, visually recognizable brand artwork — mitigated
- T-02-02-03: First-party screenshots served from public/ — accepted
- T-02-02-04: Hero image has priority, remaining images lazy, explicit dimensions — mitigated
- T-02-02-05: Marketing copy — no privacy implications — accepted

## Self-Check: PASSED

- components/StoreBadges.tsx: FOUND
- components/Hero.tsx: FOUND
- components/Features.tsx: FOUND
- components/Showcase.tsx: FOUND
- components/Stats.tsx: FOUND
- app/page.tsx: FOUND (modified)
- Commit 23273ba (StoreBadges): FOUND
- Commit f290659 (Hero): FOUND
- Commit 1e48be6 (Features): FOUND
- Commit 74e5e1d (Showcase): FOUND
- Commit a68a08d (Stats): FOUND
- Commit 063e780 (page.tsx): FOUND
- npm run build exits 0: CONFIRMED
- No dark: utilities in phase-2 authored files: CONFIRMED
- No duration-150 in phase-2 authored files: CONFIRMED
- LAND-01 through LAND-05: ALL SATISFIED
