---
phase: 03-legal-support-pages
plan: "04"
subsystem: legal-support-pages
tags: [support, faq, mailto, legal, static-page]
dependency_graph:
  requires: [03-01]
  provides: [LEGAL-03, /support route content]
  affects: [app/support/page.tsx]
tech_stack:
  added: []
  patterns: [prose-typography, cross-link-strip, mailto-button-link]
key_files:
  created: []
  modified:
    - app/support/page.tsx
decisions:
  - "Used straight ASCII apostrophes in FAQ h3 question strings per D-24 grep-friendliness requirement"
  - "Used HTML entities (&apos; &rarr; &ldquo; &rdquo;) only inside prose body text, not in verbatim h3 strings"
  - "Rendered FAQ answers as ul+li where enumerable steps improve clarity (Q2, Q4), p+p where prose flows naturally (Q1, Q3, Q5)"
metrics:
  duration: "~5 minutes"
  completed: "2026-06-01"
  tasks_completed: 1
  files_modified: 1
---

# Phase 03 Plan 04: Support Page Summary

Support page with mailto:support@ikraapp.com CTA, 5 verbatim FAQ entries as h3+p (always-open, SEO-indexed), and cross-link footer strip — satisfying LEGAL-03 for App Store and Google Play submission.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Write Support page body in app/support/page.tsx | 47bed29 | app/support/page.tsx |

## Confirmation Checklist

### mailto Button-Link
- Rendered as `<a href="mailto:support@ikraapp.com">` (not a form, not JS)
- Label: `Email us at support@ikraapp.com` (verbatim per D-24)
- Styling: `bg-emerald-600 text-white font-semibold px-lg py-md rounded-lg min-h-touch hover:bg-emerald-700 transition-colors duration-fast not-prose`
- Positioned after intro paragraph, before FAQ section

### 5 FAQ Questions — Verbatim Presence (D-24)
1. `How do I install the iOS / Android widget?` — line ~44
2. `Audio isn't playing — what should I check?` — line ~52 (straight ASCII apostrophe)
3. `How do I restore my premium purchase?` — line ~73
4. `Daily verse notifications aren't arriving — how do I fix that?` — line ~82 (straight ASCII apostrophe)
5. `How do I report a bug or request a feature?` — line ~104

### FAQ Structure
- All 5 questions wrapped in `<h3>` (NOT `<details>`, NOT `<summary>`, NOT accordion)
- All answers wrapped in `<p>` or `<ul><li>` immediately following `<h3>`
- Answers render open by default — no JS required — search engines index all content

### Typography / Layout (D-26, D-27)
- Article wrapper: `prose prose-headings:text-emerald-600 prose-headings:font-semibold prose-p:text-navy-800 prose-li:text-navy-800 prose-a:text-gold-500 prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-emerald-600 max-w-3xl mx-auto px-screen py-section`
- Uses `@plugin "@tailwindcss/typography"` already registered in globals.css (Plan 03-01)
- No extra `<main>` wrapper — inherits from layout.tsx

### Metadata (D-29)
- `title: "Support — İkra"` (em dash U+2014, preserved from stub)
- `description: "Get help with the İkra app — widget install, audio playback, purchase restore, notifications, and bug reports."`
- `Last updated: June 1, 2026` line under H1

### Cross-Link Strip (D-30)
- `<nav aria-label="Related pages">` with `border-t border-navy-800/10 mt-2xl pt-lg`
- Links: `/privacy` "Privacy Policy", `/terms` "Terms of Service", `/` "← Back to home"
- Separator: `·` in `text-gold-500`
- Each link: `hover:text-emerald-600 transition-colors duration-fast`

### Build Verification
- `npm run build` exits 0
- `/support` listed as `○` (Static) prerendered route
- TypeScript: no errors
- Turbopack compiled successfully

### Light-Mode Compliance
- Zero `dark:` utilities
- Zero `prefers-color-scheme`
- Zero `prose-invert` or `prose-dark`
- Zero `duration-150` (uses `duration-fast` throughout)
- Server component — no `"use client"`, no state, no event handlers

### Decision Coverage
- **D-24**: Support page structure (H1, mailto button-link, FAQ h3+p, 5 verbatim questions, no details) — honored
- **D-25**: Contact email `support@ikraapp.com` — used throughout; developer must confirm mailbox delivery BEFORE app-store submission
- **D-26**: In-place replacement of stub at `app/support/page.tsx`; routes unchanged — honored
- **D-27**: `prose` + inline `prose-*` utility overrides at use site — honored
- **D-29**: `metadata` export with title + description + last-updated subtitle — honored
- **D-30**: Cross-link strip with gold-500 dividers, border-t, mt-2xl pt-lg — honored

### LEGAL-03 Satisfaction
A user visiting `/support` can reach a human developer via `mailto:support@ikraapp.com` directly from a button-link visible above the fold. App Store and Google Play support URL requirement is met.

## Important Follow-Up (D-25)
**Developer action required before app-store submission:** Confirm that `support@ikraapp.com` is a live, deliverable mailbox. If the address is not yet active, update `app/support/page.tsx` to a verified deliverable address before submitting to Apple or Google.

## Deviations from Plan

None — plan executed exactly as written. All 5 verbatim FAQ question strings present; all structural, styling, and metadata requirements met.

## Known Stubs

None — page is fully wired with real content. No placeholder text, no TODO markers, no hardcoded empty data.

## Threat Flags

No new security surface beyond what the plan's threat model covers. The `mailto:` link hands off to the OS mail client — no server-side handling, no new endpoints.

## Self-Check: PASSED

- [x] `app/support/page.tsx` exists and is 149 lines (>90 minimum)
- [x] Commit `47bed29` exists in git log
- [x] All 5 verbatim FAQ h3 strings confirmed via grep
- [x] No `<details>`, no `dark:`, no `duration-150`, no `"use client"`
- [x] `npm run build` exits 0, `/support` is static (○)
