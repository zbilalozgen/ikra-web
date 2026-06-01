---
phase: 03-legal-support-pages
plan: "02"
subsystem: legal-pages
tags: [privacy-policy, legal, typography, prose, tailwind]
dependency_graph:
  requires: [03-01]
  provides: [privacy-policy-page, LEGAL-01]
  affects: [app-store-submission]
tech_stack:
  added: []
  patterns: [next-metadata, prose-typography, anchor-toc, server-component]
key_files:
  created: []
  modified:
    - app/privacy/page.tsx
decisions:
  - "Disclosed all 8 third-party processors including AdMob and AppsFlyer (not mentioned in CONTEXT D-21, but verified present in wip-muslim/package.json — plan interfaces table took precedence)"
  - "Apple App Store / Google Play Billing added as a ninth processor row in section 3 per plan interfaces table"
  - "Used &#8592; (HTML entity) for left arrow in cross-link strip — renders correctly as ← in browser"
  - "Used &middot; entity for gold-500 separator dots — avoids encoding issues"
metrics:
  duration: "~10 minutes"
  completed: "2026-06-01"
  tasks_total: 1
  tasks_completed: 1
  files_modified: 1
---

# Phase 3 Plan 02: Privacy Policy Content Summary

**One-liner:** Complete Privacy Policy with 9-section anchored TOC, all 8 third-party processor disclosures, and cross-link footer — satisfying LEGAL-01 and app-store submission requirements.

## Task Execution

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Write Privacy Policy body | `6e83d7c` | app/privacy/page.tsx |

## Section Coverage (D-22)

| # | H2 Title | id | TOC href | Present |
|---|----------|----|----------|---------|
| 1 | Overview | `overview` | `#overview` | yes |
| 2 | Data we collect (and what we don't) | `data-we-collect` | `#data-we-collect` | yes |
| 3 | Third-party services | `third-party-services` | `#third-party-services` | yes |
| 4 | Local storage on your device | `local-storage` | `#local-storage` | yes |
| 5 | Children's privacy | `childrens-privacy` | `#childrens-privacy` | yes |
| 6 | Your rights | `your-rights` | `#your-rights` | yes |
| 7 | Data retention | `data-retention` | `#data-retention` | yes |
| 8 | Changes to this policy | `changes-to-this-policy` | `#changes-to-this-policy` | yes |
| 9 | Contact us | `contact-us` | `#contact-us` | yes |

All 9 H2 titles match D-22 verbatim, including the apostrophe in "Children's privacy" and the parenthetical in "Data we collect (and what we don't)".

## Third-Party Processor Disclosures (Section 3)

All 8 processors named and described by operator:

| Processor | Operator | Disclosed |
|-----------|----------|-----------|
| Firebase Analytics | Google LLC | yes |
| Firebase Crashlytics | Google LLC | yes |
| Firebase Remote Config | Google LLC | yes |
| RevenueCat | RevenueCat, Inc. | yes |
| Apple App Store / Google Play Billing | Apple Inc. / Google LLC | yes |
| Expo Notifications | Expo / EAS | yes |
| Apple App Tracking Transparency | iOS framework | yes |
| AppsFlyer | AppsFlyer Ltd. | yes |
| Google AdMob | Google LLC | yes |

Notes in section 3:
- AdMob personalized ads and AppsFlyer attribution operate only with ATT consent on iOS.
- Premium subscribers do not see AdMob ads.
- Website zero-collection posture stated explicitly in section 2.

## Decision Coverage

| Decision | How honored |
|----------|-------------|
| D-21 | Hand-written, app-specific; all actual data flows from wip-muslim/package.json disclosed |
| D-22 | 9 sections in locked order, each with matching id, verbatim H2 titles |
| D-26 | In-place edit of existing stub; no route changes; top element is `<article>` (no extra `<main>`) |
| D-27 | `prose` class with inline `prose-*` overrides: `prose-headings:text-emerald-600`, `prose-a:text-gold-500 hover:prose-a:text-emerald-600`; `max-w-3xl mx-auto px-screen py-section` (line 12) |
| D-28 | `<nav aria-label="On this page">` with `not-prose bg-surface-card border border-navy-800/10 rounded-lg p-md text-sm mt-lg`; `<ol>` with 9 anchor links (lines 19-75) |
| D-29 | `export const metadata` with `title: "Privacy Policy — İkra"` and 1-sentence description (lines 3-8) |
| D-30 | Cross-link strip `<nav aria-label="Related pages">` with `/terms`, `/support`, `/`, gold-500 dots, `mt-2xl pt-lg border-t border-navy-800/10` (lines 293-323) |

## Build Verification

- `npm run build` exits 0
- `/privacy` listed as static (○) route
- 325 lines (above 120-line minimum)
- No `"use client"`, no `dark:`, no `prefers-color-scheme`, no `prose-invert`, no `duration-150`

## LEGAL-01 Status

Satisfied. The `/privacy` route now serves a complete, hand-written, app-specific Privacy Policy suitable for use as the Privacy Policy URL in Apple App Store and Google Play submission forms.

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written.

### Notes

**D-21 CONTEXT vs. interfaces table discrepancy:** The 03-CONTEXT D-21 line reads "No advertising SDK detected (AdMob etc.)" but the plan's `<interfaces>` table explicitly confirmed that `react-native-google-mobile-ads` and `react-native-appsflyer` ARE in `wip-muslim/package.json`. Per plan instruction: "CONTEXT's 'no ad SDK' line is superseded by the verified package.json — disclose AdMob and AppsFlyer plainly." Both are disclosed in section 3.

## Known Stubs

None.

## Self-Check: PASSED

- `app/privacy/page.tsx` exists: FOUND
- Commit `6e83d7c` exists: FOUND
- Build exits 0: VERIFIED
- All 9 H2 ids verified by grep: PASSED
- All 8 third-party processors present: PASSED
- No forbidden utilities (`dark:`, `duration-150`, `prose-invert`): PASSED
