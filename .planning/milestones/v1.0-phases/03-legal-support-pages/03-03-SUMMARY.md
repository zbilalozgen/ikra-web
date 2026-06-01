---
phase: 03-legal-support-pages
plan: "03"
subsystem: legal-pages
tags: [terms-of-service, legal, typography, static-page]
dependency_graph:
  requires: [03-01]
  provides: [LEGAL-02, /terms route body]
  affects: [app/terms/page.tsx]
tech_stack:
  added: []
  patterns: [prose-typography-overrides, static-server-component, toc-anchor-nav, cross-link-strip]
key_files:
  created: []
  modified:
    - app/terms/page.tsx
decisions:
  - "D-23 interpretation: Content & scripture rendered as 'Content and scripture' (anchor: content-and-scripture) for plain-English consistency"
  - "Delaware governing law phrase kept verbatim on one JSX line to remain grep-verifiable"
metrics:
  duration: ~5 minutes
  completed: 2026-06-01
---

# Phase 3 Plan 03: Terms of Service Summary

**One-liner:** Complete hand-written Terms of Service with 11-section structure, Apple/Google IAP disclosure, Delaware governing law, and brand-aligned prose typography.

## Tasks

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Write Terms of Service body | c5be528 | app/terms/page.tsx |

## Decision Coverage

| Decision | Honored | Notes |
|----------|---------|-------|
| D-23 | Yes | 11 H2 sections in locked order; `Content & scripture` interpreted as `Content and scripture` |
| D-25 | Yes | `support@ikraapp.com` mailto: link in Contact section |
| D-26 | Yes | In-place edit of stub; `<article className="max-w-3xl mx-auto px-screen py-section">` |
| D-27 | Yes | Inline `prose-*` overrides: `prose-headings:text-emerald-600`, `prose-a:text-gold-500` |
| D-28 | Yes | `<nav aria-label="On this page">` TOC with 11 anchor links, `bg-surface-card border border-navy-800/10 rounded-lg p-md` |
| D-29 | Yes | `metadata.title: "Terms of Service — İkra"` + 1-sentence description |
| D-30 | Yes | Cross-link strip → /privacy, /support, / with gold-500 middle dots and `border-t border-navy-800/10 mt-2xl pt-lg` |

## 11 H2 Sections Confirmed

| # | Title | id |
|---|-------|----|
| 1 | Acceptance | acceptance |
| 2 | License to use the App | license |
| 3 | Acceptable use | acceptable-use |
| 4 | Subscriptions and in-app purchases | subscriptions |
| 5 | Content and scripture | content-and-scripture |
| 6 | Disclaimer of warranties | disclaimer-of-warranties |
| 7 | Limitation of liability | limitation-of-liability |
| 8 | Governing law | governing-law |
| 9 | Changes | changes |
| 10 | Termination | termination |
| 11 | Contact | contact |

All 11 TOC `href="#..."` anchors match the H2 `id` attributes exactly.

## Build Verification

- `npm run build` exits 0
- `/terms` listed as `○ (Static)` route

## LEGAL-02 Satisfaction

Visitor can open `/terms` and read the complete Terms of Service. Apple/Google billing rules disclosed in section 4 (Subscriptions). Delaware governing law phrase present verbatim: "the laws of the State of Delaware, United States".

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written.

### D-23 Interpretation (documented)

D-23 writes "Content & scripture" with an ampersand. Per the `<interfaces>` interpretation note, the operational H2 title is rendered as `Content and scripture` (anchor `content-and-scripture`) for plain-English consistency. This is not a deviation from the plan spec — the plan explicitly documented this interpretation.

## Known Stubs

None. All 11 sections contain substantive prose content.

## Threat Flags

None. Page is a pure static read-only server component with no user input surface and a single `mailto:` link that hands off to the OS mail client.

## Self-Check: PASSED

- app/terms/page.tsx: FOUND
- Commit c5be528: FOUND (git log confirms)
- 11 h2 sections: FOUND (grep count = 11)
- Delaware phrase: FOUND
- Build: PASSED (static route ○ /terms)
