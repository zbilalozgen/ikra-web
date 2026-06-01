---
phase: 04-polish-seo-launch-readiness
plan: "01"
subsystem: seo-metadata
tags: [seo, metadata, opengraph, twitter-card, canonical, next-js]
dependency_graph:
  requires: []
  provides:
    - default-metadata-layout
    - home-canonical
    - env-var-docs
  affects:
    - app/layout.tsx
    - app/page.tsx
    - README.md
tech_stack:
  added: []
  patterns:
    - "Next.js 16 Metadata API (title template + metadataBase + viewport export)"
    - "Separate viewport export for themeColor (Next.js 16 convention)"
key_files:
  modified:
    - app/layout.tsx
    - app/page.tsx
    - README.md
decisions:
  - "viewport export used for themeColor (not metadata object) per Next.js 16 convention — avoids deprecation warning"
  - "OG images reference /opengraph-image with explicit width/height 1200x630; resolved by 04-02's route"
  - "metadataBase falls back to https://ikra-web.vercel.app literal so OG URLs are always absolute even without env var"
metrics:
  duration: "~8 minutes"
  completed: "2026-06-01"
  tasks_completed: 3
  files_modified: 3
---

# Phase 04 Plan 01: SEO Metadata Foundation Summary

Full Next.js 16 Metadata API foundation wired in `app/layout.tsx` (default title template, description, metadataBase, OG, Twitter card, viewport themeColor) and explicit home override with canonical in `app/page.tsx`; `NEXT_PUBLIC_SITE_URL` documented in README.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Author full default metadata + viewport in app/layout.tsx | 2c87080 | app/layout.tsx |
| 2 | Add explicit home metadata + canonical in app/page.tsx | 8420efd | app/page.tsx |
| 3 | Document NEXT_PUBLIC_SITE_URL in README | 58900fe | README.md |

## Verification Results

- `npm run build` exits 0 (Next.js 16.2.6 Turbopack, all 7 static pages generated).
- `.next/server/app/index.html` contains: `<meta name="theme-color" content="#006B3F">`, `<meta property="og:title" ...>`, `<meta property="og:image" content="https://ikra-web.vercel.app/opengraph-image...">`, `<meta name="twitter:card" content="summary_large_image">`, `<link rel="canonical" href="https://ikra-web.vercel.app">`.
- `body` class `bg-cream text-navy-800` preserved (D-04).
- No dark-mode utilities introduced.
- No JS animation library added (D-31).

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. OG image URL resolves to `/opengraph-image` which 04-02 provides. If 04-02 is not yet deployed the OG image will 404 at the route level, but the meta tag itself is correctly emitted.

## Threat Flags

None. NEXT_PUBLIC_SITE_URL is a public env var by design (T-04-01 accepted). metadataBase uses literal fallback ensuring OG URLs always resolve to the canonical domain (T-04-02 mitigated).

## Self-Check: PASSED

- app/layout.tsx: found, exports metadata + viewport
- app/page.tsx: found, exports metadata with alternates.canonical
- README.md: found, documents NEXT_PUBLIC_SITE_URL
- Commits 2c87080, 8420efd, 58900fe: verified in git log
