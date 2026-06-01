---
phase: 04-polish-seo-launch-readiness
plan: "02"
subsystem: seo
tags: [og-image, next/og, satori, brand]
dependency_graph:
  requires: []
  provides: ["/opengraph-image route", "ImageResponse brand card"]
  affects: ["app/layout.tsx (04-01 references /opengraph-image)", "social share previews"]
tech_stack:
  added: ["next/og ImageResponse"]
  patterns: ["Next.js App Router opengraph-image file convention", "Satori inline-style JSX rendering", "base64 data URI for asset embedding"]
key_files:
  created: ["app/opengraph-image.tsx"]
  modified: []
decisions:
  - "System font fallback used for v1 — no Inter Bold fetch; Satori geometric sans is readable and unblocking"
  - "Watermark glyph loaded via fetch(new URL('../public/watermark-glyph.png', import.meta.url)) and base64-encoded as data URI for Satori compatibility"
  - "runtime directive omitted — Next.js 16 defaults to Node runtime for next/og; both runtimes work"
  - "Watermark fetch wrapped in try/catch — glyph is decorative, failure is non-fatal"
metrics:
  duration: "~5 minutes"
  completed: "2026-06-01"
  tasks_completed: 1
  files_created: 1
---

# Phase 4 Plan 02: Dynamic OG Image Summary

**One-liner:** 1200x630 brand card via next/og ImageResponse — emerald background, white İkra wordmark, cream tagline, base64 watermark glyph

## What Was Built

`app/opengraph-image.tsx` — Next.js App Router opengraph-image file convention. Exports `alt`, `size`, `contentType`, and a default async `Image()` function returning `new ImageResponse(...)`.

The rendered card:
- Background: `#006B3F` (emerald-600)
- "İkra" wordmark: `#FFFFFF`, 144px, weight 700, letter-spacing -2
- Tagline: "Quran Verses & Sahih Hadith Widget App", `#F2F2F7`, 36px, opacity 0.9
- Watermark glyph: absolute top-right, 320x320, opacity 0.18

Build output confirmed `/opengraph-image` as a static route. Route appears in `next build` route table.

## Decisions Made

### Font: System fallback (no Inter Bold fetch)
Per D-38 "Claude's Discretion" and plan action: "v1 simplicity: accept system fallback." Satori uses a geometric sans that renders the wordmark legibly. If the wordmark appears too thin post-deploy, wire Inter Bold via the `fonts` parameter in a follow-up.

### Watermark asset loading
Used `fetch(new URL('../public/watermark-glyph.png', import.meta.url))` → `arrayBuffer()` → `Buffer.from().toString('base64')` → `data:image/png;base64,...` data URI. This is the portable approach that works on both Edge and Node runtimes. Failure is caught and silently skipped (watermark is decorative).

### No `runtime = "edge"` directive
Next.js 16 + next/og defaults to Node runtime. Adding `runtime = "edge"` would require re-validating `Buffer` availability. Omitted per plan action.

## Verification

- `npm run build` passed with TypeScript check
- `/opengraph-image` route present in build output
- All four required exports confirmed: `alt`, `size`, `contentType`, `ImageResponse` usage

## Checkpoint Status

Task 2 is `checkpoint:human-verify` requiring visual inspection of the rendered image at `http://localhost:3000/opengraph-image` or the deployed Vercel URL. The checkpoint requires a human to confirm:
- Correct dimensions (1200x630)
- Visual: emerald background, white wordmark, cream tagline, subtle watermark glyph
- `content-type: image/png` response header

## Deviations from Plan

None — plan executed exactly as written.

## Threat Surface Scan

No new security-relevant surface beyond what the threat model covers. The `/opengraph-image` route is read-only static asset serving. Threats T-04-04 (DoS) and T-04-05 (tampering) are both accepted per the plan's threat register.

## Self-Check: PASSED

- `app/opengraph-image.tsx` exists
- Commit `864800b` present in git log
- Build route `/opengraph-image` confirmed
