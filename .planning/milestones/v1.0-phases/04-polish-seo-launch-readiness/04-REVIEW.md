---
phase: 04-polish-seo-launch-readiness
reviewed: 2026-06-01T00:00:00Z
depth: standard
files_reviewed: 10
files_reviewed_list:
  - app/layout.tsx
  - app/page.tsx
  - app/opengraph-image.tsx
  - app/sitemap.ts
  - app/robots.ts
  - app/globals.css
  - components/Hero.tsx
  - components/Features.tsx
  - README.md
  - package.json
findings:
  critical: 2
  warning: 4
  info: 2
  total: 8
status: issues_found
---

# Phase 04: Code Review Report

**Reviewed:** 2026-06-01  
**Depth:** standard  
**Files Reviewed:** 10  
**Status:** issues_found

## Summary

Phase 4 is largely correct. SEO wiring (sitemap, robots, metadata), the viewport export, and the CSS motion system are all structurally sound. Two ship-blockers exist: the OG image silently omits its font declaration, producing a broken/system-fallback render in every social preview; and the reduced-motion rule leaves the hero element invisible for screen readers and static rendering because it collapses the animation duration without setting a static `opacity: 1` on the element. Four warnings cover the dual transition system on feature cards, a missing `<nav>` landmark on the Hero CTA badge row, the `&amp;` HTML entity appearing raw in JSX, and a sitemap `lastModified` that stamps every URL with the server's wall-clock time rather than an actual file-modified date. Two info items round out the review.

---

## Critical Issues

### CR-01: OG image has no font declaration — system fallback renders instead of Inter

**File:** `app/opengraph-image.tsx:23`  
**Issue:** `ImageResponse` uses the Satori renderer, which only knows fonts you explicitly provide via the `fonts` option. The call passes only `{ ...size }` — no `fonts` array. Satori falls back to a built-in sans-serif (or nothing), so "İkra" and the tagline will render in the wrong typeface on every social platform. Inter is already loaded via `next/font` for the page, but that instance is not available to the OG image worker.

The fix is to fetch the Inter woff2 in the same function and pass it through the `fonts` option:

```ts
export default async function Image() {
  // fetch Inter Bold for the wordmark
  const interBold = await fetch(
    new URL("https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZJhiI2B.woff2")
  ).then((r) => r.arrayBuffer());

  // ... watermark logic unchanged ...

  return new ImageResponse(
    ( /* JSX unchanged */ ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
      ],
    }
  );
}
```

Self-hosted alternative: copy the woff2 into `public/fonts/inter-bold.woff2` and fetch it with `new URL("../public/fonts/inter-bold.woff2", import.meta.url)` — same pattern used for the watermark.

---

### CR-02: Reduced-motion rule hides hero content entirely — no static fallback

**File:** `app/globals.css:188-191`  
**Issue:** Under `prefers-reduced-motion: reduce`, the rule sets `animation-duration: 0.001ms` and `animation-iteration-count: 1` on `[data-motion="hero-fade"]`. The `@keyframes ikra-fade-in-up` starts at `opacity: 0` (line 169). With a near-zero duration the browser applies the `from` state, runs the animation, and fills with `both` — so theoretically the element ends at `opacity: 1`. However this relies on sub-millisecond timing behaviour that differs across browsers and rendering engines. Safari in particular has been observed to paint the initial keyframe (`opacity: 0`) and never advance when the duration is compressed this small. The safe and idiomatic fix is to disable the animation entirely for reduced-motion users:

```css
@media (prefers-reduced-motion: reduce) {
  [data-motion="hero-fade"] {
    animation: none;
    opacity: 1;             /* guarantee visibility without relying on fill-mode */
    transform: none;
  }
  [data-motion="feature-card"] {
    transition-duration: 0ms !important;
  }
  [data-motion="feature-card"]:hover {
    transform: none !important;
    box-shadow: none !important;
  }
}
```

This is the same approach used by Tailwind's own `motion-safe`/`motion-reduce` utilities and is referenced in the WCAG 2.1 SC 2.3.3 guidance.

---

## Warnings

### WR-01: Feature card has two competing transition systems on the same element

**File:** `components/Features.tsx:63` and `app/globals.css:179`  
**Issue:** The `Card` element at line 63 carries the Tailwind utility `transition-colors duration-fast` (which generates `transition-property: color, background-color, border-color, text-decoration-color, fill, stroke` with `duration: 150ms`) *and* the CSS rule at `globals.css:179` sets `transition: transform 150ms ease-out, box-shadow 150ms ease-out, border-color 150ms ease-out` on the same element via `[data-motion="feature-card"]`. The CSS `transition` shorthand at line 179 does **not** include `background-color` or `color`, so the Tailwind `hover:bg-surface-card-hover` colour transition declared in the JSX class list is stripped by the specificity cascade in browsers that let the more-specific CSS rule win. The element's hover background change will snap rather than transition.

Fix: either remove the Tailwind `transition-colors duration-fast` utility from the `Card` className and add `background-color` to the CSS rule's longhand:

```css
[data-motion="feature-card"] {
  transition: transform 150ms ease-out,
              box-shadow 150ms ease-out,
              border-color 150ms ease-out,
              background-color 150ms ease-out;
}
```

or keep all transitions in Tailwind and remove the CSS `transition` shorthand from the `[data-motion]` rule (using `transform` and `box-shadow` utilities instead).

---

### WR-02: `&amp;` HTML entity used in JSX — renders as literal text in social cards

**File:** `app/opengraph-image.tsx:78`  
**Issue:** The tagline string is written as `Quran Verses &amp; Sahih Hadith Widget App`. In Satori/`next/og` JSX the content of a `<div>` is a JavaScript string, not HTML. HTML entities are not decoded. The social card will display "Quran Verses &amp; Sahih Hadith Widget App" verbatim.

Fix: use a plain `&` character:

```tsx
<div style={{ /* ... */ }}>
  Quran Verses & Sahih Hadith Widget App
</div>
```

JSX performs no HTML injection risk here because this is a JSX text node inside Satori, not a dangerouslySetInnerHTML call.

---

### WR-03: Sitemap `lastModified` stamps every URL with wall-clock build time

**File:** `app/sitemap.ts:7`  
**Issue:** `lastModified: new Date()` captures the time of each server render (in production this is called at request time in streaming mode, or build time in static export). The value changes on every Vercel re-deploy, causing Google Search Console to re-crawl all four URLs after every deployment even if the pages haven't changed. For legal pages (`/privacy`, `/terms`, `/support`) that may be months old this sends false freshness signals.

This is a SEO-quality issue, not a build breaker, but it is directly contrary to the guidance in D-40 which specifies "lastModified: new Date() (build-time)" — implying static export. For ISR/SSR deployments the value should be a hardcoded date or derived from a `LAST_MODIFIED_` env var per route.

Minimum fix — hardcode to the current phase completion date:

```ts
const LAST_MODIFIED = new Date("2026-06-01");
// ...
{ url: `${siteUrl}/`, lastModified: LAST_MODIFIED, ... }
```

---

### WR-04: Hero section lacks a navigation landmark for store badges

**File:** `components/Hero.tsx:18`  
**Issue:** The App Store and Google Play badge row uses a plain `<div>` with `flex flex-wrap` (line 18). These badges are the primary call-to-action links on the page and are functionally a navigation group. Screen readers and a11y tools will not expose them as a landmark. At a minimum wrap in a `<nav aria-label="Download İkra">` so keyboard and AT users can jump directly to the download links.

```tsx
<nav aria-label="Download İkra" className="flex flex-wrap justify-center md:justify-start gap-md mt-xl">
  <AppStoreBadge />
  <GooglePlayBadge />
</nav>
```

---

## Info

### IN-01: `metadataBase` silently accepts a trailing-slash URL; sitemap does not normalise

**File:** `app/sitemap.ts:4`, `app/layout.tsx:13`  
**Issue:** If `NEXT_PUBLIC_SITE_URL` is set with a trailing slash (e.g. `https://ikra-web.vercel.app/`) the sitemap will produce double-slash URLs (`https://ikra-web.vercel.app//`). The `metadataBase` URL constructor in `layout.tsx` is tolerant, but the sitemap string interpolation is not. Not a current problem with the hardcoded fallback, but worth guarding against when the env var is set by a human:

```ts
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ikra-web.vercel.app"
).replace(/\/$/, "");
```

---

### IN-02: `opacity: 0.18` on watermark in OG image; `opacity: 0.06` in Hero — values diverge

**File:** `app/opengraph-image.tsx:50`, `components/Hero.tsx:43`  
**Issue:** The watermark glyph is rendered at `opacity: 0.18` in the OG card but at `opacity: 0.06` on the Hero section. This is a brand-consistency divergence. Neither value is specified in design tokens. Not a bug, but the OG card will look noticeably different from the page. Consider aligning to a single token or documenting the intentional difference.

---

_Reviewed: 2026-06-01_  
_Reviewer: Claude (gsd-code-reviewer)_  
_Depth: standard_
