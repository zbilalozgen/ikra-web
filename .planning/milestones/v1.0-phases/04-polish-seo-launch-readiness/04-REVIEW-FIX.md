---
phase: 04-polish-seo-launch-readiness
fixed_at: 2026-06-01T00:00:00Z
review_path: .planning/phases/04-polish-seo-launch-readiness/04-REVIEW.md
ui_review_path: .planning/phases/04-polish-seo-launch-readiness/04-UI-REVIEW.md
iteration: 1
findings_in_scope: 10
fixed: 10
skipped: 0
status: all_fixed
---

# Phase 04: Code Review Fix Report

**Fixed at:** 2026-06-01  
**Source review:** 04-REVIEW.md + 04-UI-REVIEW.md  
**Iteration:** 1

**Summary:**
- Findings in scope: 10 (2 CR + 1 UI-BLOCKER + 4 WR + 1 UI-WARNING + 2 IN)
- Fixed: 10
- Skipped: 0

---

## Fixed Issues

### UI-BLOCKER: Legal page title double-template

**Files modified:** `app/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/support/page.tsx`  
**Commit:** bf7f425  
**Applied fix:** Changed legal page title exports to bare page names (`"Privacy Policy"`, `"Terms of Service"`, `"Support"`) so the root layout template `"%s — İkra"` produces the correct single-suffix output. Home page title wrapped in `{ absolute: "..." }` to bypass the template entirely (it already contained the brand suffix).

---

### UI-WARNING: Legal pages missing canonical alternates

**Files modified:** `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/support/page.tsx`  
**Commit:** bf7f425 (batched with title fix — same metadata blocks)  
**Applied fix:** Added `alternates: { canonical: "/privacy" }` (resp. `/terms`, `/support`) to each legal page's metadata export.

---

### CR-01: OG image has no font declaration

**Files modified:** `app/opengraph-image.tsx`  
**Commits:** 0f3a84a, b313a21  
**Applied fix:** Fetch Inter Bold woff (v1) from rsms/inter GitHub release inside the `Image()` function and pass via `fonts: [{ name: "Inter", data: interBoldData, weight: 700, style: "normal" }]` to `ImageResponse`. Fetch is best-effort — OG image degrades to Satori default sans-serif if the fetch fails. Note: woff2 was tried first (Google Fonts CDN) but Satori's opentype.js rejects woff2 containers at prerender; corrected to woff in follow-up commit.

---

### CR-02: Reduced-motion rule hides hero content entirely

**Files modified:** `app/globals.css`  
**Commit:** 857c625  
**Applied fix:** Replaced the `animation-duration: 0.001ms` approach with `animation: none; opacity: 1; transform: none` on `[data-motion="hero-fade"]` under `prefers-reduced-motion: reduce`. The element is unconditionally visible regardless of browser animation timing behavior (fixes Safari invisible-hero edge case).

---

### WR-01: Feature card competing transition systems

**Files modified:** `app/globals.css`, `components/Features.tsx`  
**Commit:** 857c625  
**Applied fix:** Added `background-color 150ms ease-out` to the CSS `[data-motion="feature-card"]` transition longhand so it covers all animated properties. Removed the conflicting Tailwind `transition-colors duration-fast` utility from the Card className — single transition declaration now governs all animated properties (transform, box-shadow, border-color, background-color).

---

### WR-02: `&amp;` HTML entity in OG tagline

**Files modified:** `app/opengraph-image.tsx`  
**Commit:** 0f3a84a  
**Applied fix:** Replaced JSX `&amp;` entity with literal `&` character. Satori/next-og does not decode HTML entities in JSX text nodes — the entity was rendering verbatim in social cards.

---

### WR-03: Sitemap lastModified stamps wall-clock build time

**Files modified:** `app/sitemap.ts`  
**Commit:** b630031  
**Applied fix:** Replaced `new Date()` with a static `LAST_MODIFIED = new Date("2026-06-01")` constant with an inline comment directing developers to bump it manually on real content changes.

---

### WR-04: Hero badge row not a nav landmark

**Files modified:** `components/Hero.tsx`  
**Commit:** bdbc97a  
**Applied fix:** Changed the store badge wrapper `<div>` to `<nav aria-label="Download İkra">`. App Store and Google Play badges are the primary CTAs and now expose a navigable ARIA landmark.

---

### IN-01: Trailing slash not normalized on site URL env var

**Files modified:** `app/sitemap.ts`, `app/robots.ts`, `app/layout.tsx`  
**Commit:** b630031  
**Applied fix:** Added `.replace(/\/$/, "")` on `NEXT_PUBLIC_SITE_URL` reads in all three files to prevent double-slash URLs if the env var is set with a trailing slash.

---

### IN-02: Watermark opacity divergence Hero vs OG

**Files modified:** `app/opengraph-image.tsx`  
**Commit:** 0f3a84a (batched with WR-02 fix — same file)  
**Applied fix:** Reduced OG watermark opacity from 0.18 to 0.10. Hero remains at 0.06. The split difference (0.10 vs 0.06) is intentional — OG card is a smaller fixed canvas where slightly more emphasis is needed to be visible at social card render sizes, while the Hero watermark is full-bleed and its low opacity is load-bearing for foreground legibility.

---

## Skipped Issues

None.

---

## Build Verification

`npm run build` passed after all fixes. All 10 routes prerender as static (○). One intermediate build failure occurred when the woff2 URL was used for Inter Bold — Satori rejects woff2 at prerender with "Unsupported OpenType signature wOF2". Corrected to woff (v1) in commit b313a21. Final build clean.

---

## Post-Deploy Verification Checklist

After Vercel deploys (push to origin/main completed at b313a21):

- [ ] `curl -s https://ikra-web.vercel.app/privacy | grep -E '<title>'` → `"Privacy Policy — İkra"` (single suffix, not double)
- [ ] `curl -s https://ikra-web.vercel.app/terms | grep -E '<title>'` → `"Terms of Service — İkra"`
- [ ] `curl -s https://ikra-web.vercel.app/support | grep -E '<title>'` → `"Support — İkra"`
- [ ] `curl -sI https://ikra-web.vercel.app/opengraph-image` → 200 image/png
- [ ] Visual social-preview check (Twitter card validator / iMessage share)
- [ ] Confirm legal pages have `<link rel="canonical">` tags in live HTML

---

_Fixed: 2026-06-01_  
_Fixer: Claude (gsd-code-fixer)_  
_Iteration: 1_
