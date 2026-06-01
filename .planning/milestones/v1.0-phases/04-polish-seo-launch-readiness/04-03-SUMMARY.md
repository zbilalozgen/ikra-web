---
phase: 04-polish-seo-launch-readiness
plan: "03"
subsystem: seo
tags: [sitemap, robots, seo, metadata-routes]
dependency_graph:
  requires: []
  provides: [sitemap.xml, robots.txt]
  affects: [SEO-03]
tech_stack:
  added: []
  patterns: [next-metadata-routes]
key_files:
  created:
    - app/sitemap.ts
    - app/robots.ts
  modified: []
decisions:
  - "Used per-file siteUrl constant (no shared util) — two-file duplication cheaper than wiring a lib for v1"
  - "Fallback URL hardcoded as https://ikra-web.vercel.app matching 04-01 canonical exactly"
metrics:
  duration: "~5 minutes"
  completed: "2026-06-01"
  tasks_completed: 2
  tasks_total: 2
  files_changed: 2
---

# Phase 04 Plan 03: Sitemap + Robots Summary

**One-liner:** Next.js metadata route handlers for sitemap.xml (4 URLs, priorities) and robots.txt (allow-all + sitemap pointer) satisfying SEO-03.

## What Was Built

- `app/sitemap.ts` — default-exports `MetadataRoute.Sitemap` with 4 entries: `/` (priority 1.0), `/privacy`, `/terms`, `/support` (priority 0.7 each), all `changeFrequency: "monthly"`, `lastModified: new Date()`.
- `app/robots.ts` — default-exports `MetadataRoute.Robots` with `rules: [{ userAgent: "*", allow: "/" }]` and `sitemap: "${siteUrl}/sitemap.xml"`. No disallow entries.
- Both use `process.env.NEXT_PUBLIC_SITE_URL ?? "https://ikra-web.vercel.app"` for absolute URL resolution.

## Verification

`npm run build` output confirmed both routes:
```
├ ○ /robots.txt
├ ○ /sitemap.xml
```

## Commits

| Task | Description | Commit |
|------|-------------|--------|
| 1 + 2 | sitemap.ts + robots.ts | 187c6e9 |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None.

## Threat Flags

None — both files expose only already-public URLs and intentional allow-all crawler policy (T-04-06, T-04-07 accepted per plan threat model).

## Self-Check: PASSED

- app/sitemap.ts: exists, 4 entries, correct priorities
- app/robots.ts: exists, allow-all, sitemap pointer, no disallow
- Build: /sitemap.xml and /robots.txt routes confirmed in build output
- Commit 187c6e9: present in git log
