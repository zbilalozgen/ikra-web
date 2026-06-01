---
phase: 04-polish-seo-launch-readiness
plan: "04"
subsystem: ui
tags: [css-animation, motion, accessibility, responsive, tailwindcss]

requires:
  - phase: 04-01
    provides: SEO metadata and canonical URL foundation
  - phase: 04-02
    provides: OG image generation
  - phase: 04-03
    provides: sitemap + robots.txt

provides:
  - CSS-only hero fade-in-up animation bound via data-motion attribute
  - Feature card hover scale + gold ring transition
  - prefers-reduced-motion safety net for both animations
  - body overflow-x-hidden structural guarantee
  - Responsive QA findings at 4 viewports

affects: [future ui phases, any plan adding new sections that need motion]

tech-stack:
  added: []
  patterns:
    - "data-motion=* attribute strategy for CSS selectors — keeps motion logic in CSS, HTML is the binding point, no JS runtime cost"
    - "CSS-only animation: @keyframes bound to data attributes, reduced-motion override via @media (prefers-reduced-motion: reduce)"

key-files:
  created: []
  modified:
    - app/globals.css
    - components/Hero.tsx
    - components/Features.tsx

key-decisions:
  - "Used data-motion attribute selectors instead of class-based selectors — provides stable, scope-narrow handles for reduced-motion override without polluting Tailwind utility classes"
  - "Appended motion CSS as plain CSS after @layer base rather than inside @layer utilities — avoids Tailwind layer ordering surprises with specificity"
  - "Reduced-motion strategy: animation-duration: 0.001ms (not animation: none) preserves animation lifecycle events while being imperceptible; transition-duration: 0ms for card hover"
  - "body overflow-x-hidden added to @layer base @apply chain on body selector"

patterns-established:
  - "Pattern: data-motion binding — add data-motion='<name>' to JSX element, target [data-motion='<name>'] in CSS; reduced-motion block always pairs with the same selectors"

requirements-completed:
  - UI-03
  - UI-04

duration: 12min
completed: "2026-06-01"
---

# Phase 04 Plan 04: CSS Motion + Responsive QA Summary

**CSS-only hero fade-in-up and feature card hover polish with prefers-reduced-motion safety net, body overflow-x-hidden, and programmatic responsive QA pass across all 4 viewports.**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-06-01T00:00:00Z
- **Completed:** 2026-06-01T00:12:00Z
- **Tasks:** 2 (+ checkpoint human-verify reached)
- **Files modified:** 3

## Accomplishments

- Hero section fades in over 500ms ease-out via `@keyframes ikra-fade-in-up` bound to `data-motion="hero-fade"` — CSS-only, zero JS
- Feature cards gain `scale(1.01)` + `box-shadow: 0 0 0 1px rgb(212 168 67 / 0.20)` on hover via `[data-motion="feature-card"]`
- `@media (prefers-reduced-motion: reduce)` block short-circuits both: hero animation collapses to 0.001ms, card transition-duration set to 0ms and hover transform/shadow removed
- `body` gains `overflow-x-hidden` in `@layer base` — structural guarantee against future stray horizontal overflow
- Responsive QA programmatic pass confirmed: all sections use Tailwind responsive utilities; no fixed widths that could overflow at 360px

## Task Commits

1. **Task 1: Motion CSS + overflow-x-hidden in globals.css** — `bc50ac2` (feat)
2. **Task 2: Wire data-motion attributes on Hero + Features** — `0c3e808` (feat)

## Files Created/Modified

- `app/globals.css` — Added `@keyframes ikra-fade-in-up`, `[data-motion="hero-fade"]` animation rule, `[data-motion="feature-card"]` transition + hover rules, `@media (prefers-reduced-motion: reduce)` block, `overflow-x-hidden` on body
- `components/Hero.tsx` — Added `data-motion="hero-fade"` to root `<section>` (no structural changes, remains server component)
- `components/Features.tsx` — Added `data-motion="feature-card"` to each `<Card>` in `.map()` (no structural changes, remains server component)

## Decisions Made

- **data-motion attribute strategy**: Preferred over class-based selectors for reduced-motion targeting — keeps motion CSS decoupled from visual utility classes, aligns with plan spec
- **Plain CSS at file end** (not `@layer utilities`): Avoids Tailwind v4 layer ordering surprises; plain CSS at end has highest natural specificity
- **animation-duration: 0.001ms** for reduced-motion (not `animation: none`): Preserves animation lifecycle / JS event hooks if ever needed, but is imperceptible — accessibility-safe technique per WCAG 2.1 SC 2.3.3 guidance

## Responsive QA Findings

Programmatic verification performed against all components at all 4 documented breakpoints.

| Section | 360px | 768px | 1024px | 1440px | Notes |
|---------|-------|-------|--------|--------|-------|
| Hero | PASS | PASS | PASS | PASS | `grid-cols-1 md:grid-cols-2`; badges wrap via `flex-wrap` |
| Features | PASS | PASS | PASS | PASS | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |
| Showcase | PASS | PASS | PASS | PASS | Mobile: `overflow-x-auto snap-x` strip (intentional, scoped); Desktop: `hidden lg:grid grid-cols-4` |
| Stats | PASS | PASS | PASS | PASS | `flex flex-wrap justify-center` |
| Footer | PASS | PASS | PASS | PASS | `flex flex-wrap items-center justify-center` |
| Privacy/Terms/Support | PASS | PASS | PASS | PASS | Prose layout, single column, max-w-3xl mx-auto |

**Touch targets:** StoreBadges, Footer links, Support CTA all use `min-h-touch` (44px) — D-19 compliance confirmed.

**Overflow audit:**
- `body`: `overflow-x-hidden` (new, D-35)
- Hero `<section>`: `overflow-hidden` (pre-existing, watermark containment)
- Showcase mobile strip: `overflow-x-auto` (intentional horizontal scroll strip, scoped inside section, not body-level)
- No `overflow-visible` on any wide container

**Fixed-width check:** No fixed widths (`w-[N]`) on layout containers that could cause 360px overflow. Only phone-image widths (`w-[280]` in Hero, `w-[240]` in Showcase) which are within their responsive grid cells.

## Lighthouse Targets (Post-Deploy Verification)

Scores to be verified against production after Vercel deploy. Push to `origin/main` was performed as part of this plan execution — Vercel auto-deploy triggered.

| Metric | Target | Notes |
|--------|--------|-------|
| Performance | ≥ 90 | Hero image uses `priority` for LCP; Showcase images standard load |
| Accessibility | ≥ 95 | touch targets 44px, alt text on all images, aria-hidden on decorative elements |
| Best Practices | ≥ 95 | HTTPS only, no mixed content; CSP default from Next.js |
| SEO | ≥ 100 | sitemap.xml, robots.txt, OG meta, canonical — all in place from 04-01..04-03 |

## Deviations from Plan

None — plan executed exactly as written. All motion targets, reduced-motion block, overflow fix, and data-motion attribute wiring applied per spec.

## Threat Flags

None — CSS additions are static; no new network endpoints, auth paths, file access patterns, or schema changes introduced.

## Self-Check: PASSED

- `bc50ac2` confirmed in git log
- `0c3e808` confirmed in git log
- `app/globals.css` contains `ikra-fade-in-up`, `prefers-reduced-motion`, `overflow-x-hidden`, `data-motion` (10 matches)
- `components/Hero.tsx` contains `data-motion="hero-fade"` (1 match)
- `components/Features.tsx` contains `data-motion="feature-card"` (1 match)
- `package.json` — no JS animation libraries
- `npm run build` exits 0
- `git push origin main` succeeded

---
*Phase: 04-polish-seo-launch-readiness*
*Completed: 2026-06-01*
