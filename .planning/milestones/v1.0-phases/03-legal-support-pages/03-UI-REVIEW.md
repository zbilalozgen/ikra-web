---
phase: 3
slug: legal-support-pages
created: 2026-06-01
pillars_graded: 6
overall_score: 20/24
screenshots: not captured (no dev server; code-only audit)
baseline: 03-CONTEXT.md (D-21..D-30) + 01-UI-SPEC.md + 02-UI-SPEC.md
---

# Phase 3 — UI Review: Legal & Support Pages

**Audited:** 2026-06-01
**Baseline:** 03-CONTEXT.md design decisions D-21 through D-30; Phase 1 + 2 inherited design system
**Screenshots:** Not captured — no dev server running. Audit is code-only.

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 3/4 | Definite voice enforced; AppsFlyer/AdMob disclosed but not in D-21 source data |
| 2. Visuals | 4/4 | TOC, button-link, cross-link strip, aria roles all match spec |
| 3. Color | 4/4 | Token-only usage; 60/30/10 maintained; no hardcoded hex values |
| 4. Typography | 3/4 | prose-headings:emerald applies to h3 FAQ questions; D-24 specifies navy-800 for h3 |
| 5. Spacing | 4/4 | All spacing via named tokens; no arbitrary values; D-26/D-28/D-30 patterns exact |
| 6. Experience Design | 2/4 | No TOC on /support (acceptable per D-22/D-23 scope); no loading/error states; prose max-width conflict risk |

**Overall: 20/24**

---

## Top 3 Priority Fixes

1. **BLOCKER (Content Accuracy) — AppsFlyer and AdMob disclosed in Privacy Policy but were not in the D-21 approved data-flow scope.** The context decision D-21 explicitly states "No advertising SDK detected (AdMob etc.) — Privacy Policy can disclose Firebase + RevenueCat as the only third-party data processors." However `wip-muslim/package.json` actually does contain `react-native-appsflyer` and `react-native-google-mobile-ads`. The disclosures in `app/privacy/page.tsx` lines 142–217 are therefore technically correct given the real package.json, but they directly contradict the D-21 design decision's claim of "no advertising SDK." This must be resolved: either (a) confirm the disclosures are accurate and update D-21 with a correction note, or (b) if those SDKs are unused/removed, strip the AppsFlyer and AdMob sections from the Privacy Policy before App Store submission. Shipping incorrect or unauthorized disclosures is a compliance blocker.

2. **WARNING (Typography) — FAQ `<h3>` elements on `/support` render emerald-600 instead of navy-800.** `prose-headings:text-emerald-600` on the article element (line 13 of `app/support/page.tsx`) applies `color: emerald-600` to all heading levels including `<h3>`. D-24 specifies "Each Q in `<h3>`" and D-27 specifies "H3 = navy-800 semibold for FAQ Qs." There is no `prose-h3:text-navy-800` override. Fix: add `prose-h3:text-navy-800` to the article class string on `app/support/page.tsx`.

3. **WARNING (Typography) — Prose plugin default `max-width: 65ch` (~650px) may conflict with `max-w-3xl` (768px) on the article element.** `@tailwindcss/typography` v0.5 injects `max-width: 65ch` directly into the `.prose` class via its own CSS. The `max-w-3xl` utility (768px) is on the same element. In Tailwind v4, whether the utility overrides the plugin depends on cascade layer ordering. If the plugin wins, the content column will be narrower than the 768px reading width specified in D-26. Fix: add `prose-[max-width:none]` or `max-w-none` inside the prose selector, or explicitly set `max-width: var(--spacing-...)` in a `@layer utilities` override, or confirm via live rendering that max-w-3xl takes precedence.

---

## Detailed Findings

### Pillar 1: Copywriting (3/4)

**PASS items:**
- Definite voice enforced throughout: "We collect:" / "We do not collect:" (`app/privacy/page.tsx` lines 114, 148). No "we may collect" language in data collection sections.
- D-25 contact email `support@ikraapp.com` used consistently across all three pages. All nine mailto: links resolve to the correct address.
- FAQ question text matches D-24 spec verbatim:
  - "How do I install the iOS / Android widget?" (line 34)
  - "Audio isn't playing — what should I check?" (line 47)
  - "How do I restore my premium purchase?" (line 74)
  - "Daily verse notifications aren't arriving — how do I fix that?" (line 88)
  - "How do I report a bug or request a feature?" (line 115)
- Metadata titles match D-29: "Privacy Policy — İkra", "Terms of Service — İkra", "Support — İkra".
- Last updated line present on all three pages: "Last updated: June 1, 2026".
- Tone is reverent and plain English throughout. No legalese padding detected. No generic CTAs ("Submit", "Click Here") found.
- Privacy policy structure (9 sections) matches D-22 exactly.
- Terms of Service structure (11 sections) matches D-23 exactly.
- "We may update" in Changes sections (privacy line 276, terms line 228) is standard change-notification language, not a hedged collection claim — acceptable.

**FAIL item:**
- D-21 states the approved third-party processor list is "Firebase + RevenueCat as the only third-party data processors" and notes "No advertising SDK detected (AdMob etc.)." The Privacy Policy at lines 142–217 discloses AppsFlyer and Google AdMob. Cross-checking `wip-muslim/package.json` confirms both SDKs are present (`react-native-appsflyer@6.17.9`, `react-native-google-mobile-ads@16.3.3`), meaning the disclosures are factually correct — but D-21 was drafted with incorrect information. The mismatch creates a compliance risk: D-21 must be corrected and reviewed, and the Privacy Policy must be verified accurate for the actual app being submitted. Score deducted for the content discrepancy against the approved design decision.

---

### Pillar 2: Visuals (4/4)

**PASS items:**
- TOC on `/privacy` and `/terms`: `not-prose bg-surface-card border border-navy-800/10 rounded-lg p-md text-sm mt-lg` (privacy line 22, terms line 22). Matches D-28 exactly: `bg-surface-card border border-navy-800/10 rounded-lg p-md text-sm`. Label "On this page" present as a `<p className="font-semibold text-navy-800 mb-sm">`.
- TOC correctly uses `<nav aria-label="On this page">` and `<ol>` with anchor links to each `<h2 id="...">`. All 9 anchors on privacy, all 11 on terms are present.
- Support page email button: `not-prose inline-flex items-center justify-center bg-emerald-600 text-white font-semibold px-lg py-md rounded-lg min-h-touch` (line 27) — satisfies D-24 "styled as a button-link," meets 44px touch target with `min-h-touch`.
- Cross-link strip on all three pages: `text-sm text-navy-800/70 flex flex-wrap items-center justify-center` with gold-500 dot dividers and `aria-hidden="true"` on the dots. Matches D-30 specification.
- `<nav aria-label="Related pages">` on each page — correct semantics.
- "← Back to home" present on all three pages, pointing to `/`.
- No support TOC — correct, as D-22/D-23 scope only prescribes TOC for privacy and terms.
- All h2 sections have `id="..."` anchors matching their TOC links.

---

### Pillar 3: Color (4/4)

**PASS items:**
- No hardcoded hex values or `rgb()` in any of the three page files. Zero matches on hardcoded color grep.
- Color token usage is entirely via Tailwind custom token names: `emerald-600`, `emerald-700`, `navy-800`, `navy-800/10`, `navy-800/60`, `navy-800/70`, `gold-500`, `surface-card`, `cream` (inherited from body in layout).
- Prose overrides use `prose-headings:text-emerald-600`, `prose-p:text-navy-800`, `prose-li:text-navy-800`, `prose-a:text-gold-500`, `hover:prose-a:text-emerald-600` — all brand tokens, no rogue colors.
- Background: body has `bg-cream` from `app/layout.tsx` line 24 — pages inherit cream without re-declaring it, matching D-26 intent.
- Gold-500 used for: cross-link dot dividers (`text-gold-500`), prose link color (`prose-a:text-gold-500`). Not overused.
- Emerald-600 used for: all headings (via prose-headings), the email button (`bg-emerald-600`, hover `bg-emerald-700`), hover state on links. Within brand spec.
- 60/30/10 distribution maintained: cream dominates (body bg), white surface-card appears in TOC blocks (30%), gold-500 accent confined to dots and link colors (10%).

---

### Pillar 4: Typography (3/4)

**PASS items:**
- `@plugin "@tailwindcss/typography"` loaded in `app/globals.css` line 2.
- Inter font wired globally via `next/font/google` in `app/layout.tsx`; `--font-inter` → `--font-sans` chain correct.
- `prose-headings:font-semibold` on all article elements — weight 600 applied to H1/H2/H3.
- `prose-p:text-navy-800` — body paragraph color navy-800 matching Body role.
- `prose-a:text-gold-500` with `hover:prose-a:text-emerald-600` — link colors per D-27.
- `prose-a:underline-offset-4` per D-27 spec.
- Last updated date: `text-sm text-navy-800/60` — 14px Label role at reduced opacity, per D-29.
- TOC text: `text-sm` — Label role (14px), appropriate for navigation aid.
- Distinct font sizes in use: `text-sm` (14px), prose defaults for body (16px), prose defaults for headings. No rogue sizes introduced.
- Font weights in use: `font-semibold` only in explicit classes; prose weight defaults for body. No unexpected weights.

**FAIL item:**
- `prose-headings:text-emerald-600` is applied to the article element on all three pages (privacy line 13, terms line 13, support line 13). This directive affects `h1`, `h2`, `h3`, `h4`, `h5`, `h6` — no heading level is exempt. D-24 specifies H3 FAQ questions in navy-800 semibold; D-27 specifies "H3 = navy-800 semibold for FAQ Qs." No `prose-h3:text-navy-800` override exists anywhere. The support page FAQ headings will render emerald-600 instead of navy-800. The visual distinction between section headers (H2, emerald-600) and FAQ question headings (H3, should be navy-800) is lost.

---

### Pillar 5: Spacing (4/4)

**PASS items:**
- No arbitrary spacing values (`[Npx]`, `[Nrem]`) found in any of the three pages. Zero matches.
- Article container: `max-w-3xl mx-auto px-screen py-section` — matches D-26 exactly. `px-screen` = 24px horizontal inset, `py-section` = 64px vertical padding.
- TOC: `p-md` (16px internal padding), `mt-lg` (24px top margin from last-updated line) — matches D-28.
- TOC list: `gap-xs` (4px) between anchor items — compact and correct.
- TOC label: `mb-sm` (8px) below "On this page" heading — clean.
- Cross-link strip: `mt-2xl` (48px top margin), `pt-lg` (24px padding-top) — matches D-30.
- Cross-link strip: `gap-sm` (8px) between links and dot dividers — appropriate density.
- Email button on support: `px-lg py-md` (24px horizontal, 16px vertical), `min-h-touch` (44px minimum height), `mt-md` (16px from intro paragraph) — all on-token.
- All spacing tokens trace to the `@theme` block in `app/globals.css` (xs=4px, sm=8px, md=16px, lg=24px, xl=32px, 2xl=48px, screen=24px, section=64px, touch=44px).

---

### Pillar 6: Experience Design (2/4)

**PASS items:**
- Registry safety: components.json shows `"registries": {}` — no third-party registries. Only `button.tsx` and `card.tsx` from official shadcn registry, neither used in Phase 3 pages. Registry audit: 0 third-party blocks, no flags.
- `@tailwindcss/typography` is an official Tailwind Labs plugin (`@tailwindcss/typography@0.5.19`). No suspicious network access, eval, or process.env patterns.
- `aria-label="On this page"` on TOC nav, `aria-label="Related pages"` on cross-link nav, `aria-hidden="true"` on gold dot dividers — accessibility semantics correct.
- FAQ answers are in `<p>` tags (not `<details>`), fully rendered for SEO indexing per D-24.
- All anchor links (`<a href="#section-id">`) in TOC point to corresponding `<h2 id="section-id">` elements. No broken anchors detected.
- `<main>` wrapping is handled by the global layout (`app/layout.tsx` line 22). Pages return fragments. No duplicate `<main>` elements.
- Metadata exports present on all three pages with meaningful titles and descriptions.

**FAIL items:**
- Prose plugin `max-width: 65ch` conflict risk: `@tailwindcss/typography` injects `max-width: 65ch` (~650px) into `.prose`. The article element carries both `.prose` and `max-w-3xl` (768px). In Tailwind v4, plugin-injected CSS and utility classes may be in different cascade layers. If the plugin's max-width wins, the reading column will be ~120px narrower than D-26 specifies. This needs live verification or an explicit `max-w-none` following the `prose` class, followed by `max-w-3xl`. Without visual confirmation this is an unresolved rendering risk. Score: 1 point deducted.
- No loading or error boundary states are defined on any of the three pages. These are static pages with no async data, so runtime errors are not a concern for the content itself. However, there is no `not-found.tsx` or `error.tsx` adjacent to the phase, and the absence of any fallback for malformed anchor navigation is noted as low-risk but non-zero.
- The email `mailto:` link (`support@ikraapp.com`) is the sole contact mechanism. D-25 notes "Developer must confirm mailbox routes before App Store submission." No verification of mailbox delivery is possible at code-audit time. Flagged as a pre-launch gate item.

---

## Registry Safety

Registry audit: 0 third-party blocks. `components.json` shows `"registries": {}`. Only official shadcn blocks `button` and `card` are installed (Phase 2 additions). Neither is imported in Phase 3 pages. No flags.

---

## Files Audited

- `/Users/zbilalozgen/repos/ikra-web/app/privacy/page.tsx`
- `/Users/zbilalozgen/repos/ikra-web/app/terms/page.tsx`
- `/Users/zbilalozgen/repos/ikra-web/app/support/page.tsx`
- `/Users/zbilalozgen/repos/ikra-web/app/globals.css`
- `/Users/zbilalozgen/repos/ikra-web/app/layout.tsx`
- `/Users/zbilalozgen/repos/ikra-web/components/Footer.tsx`
- `/Users/zbilalozgen/repos/ikra-web/components.json`
- `/Users/zbilalozgen/repos/ikra-web/.planning/phases/03-legal-support-pages/03-CONTEXT.md`
- `/Users/zbilalozgen/repos/ikra-web/.planning/phases/01-foundation-deployable-skeleton/01-UI-SPEC.md`
- `/Users/zbilalozgen/repos/ikra-web/.planning/phases/02-landing-page-content/02-UI-SPEC.md`
- `/Users/zbilalozgen/repos/ikra-web/CLAUDE.md`
- `/Users/zbilalozgen/repos/wip-muslim/package.json` (cross-reference for Privacy Policy accuracy)
