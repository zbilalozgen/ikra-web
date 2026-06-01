# İkra Web

## What This Is

The marketing/landing website for **İkra** — a Quran verses & Sahih hadith widget mobile app (Expo/React Native, currently pre-launch at v3.5). The site presents the app's value to prospective users and hosts the Privacy Policy, Support, and Terms pages required for App Store and Google Play submission. English-only, built with Next.js + Tailwind, deployed on Vercel. Visual identity mirrors the app's brand (emerald/gold/navy, dark-mode-friendly).

## Core Value

A polished, brand-accurate landing page plus the legally-required Privacy Policy and Support pages — so İkra can launch on the App Store and Google Play and convert visitors into installs.

## Current State

✅ **v1.0 shipped 2026-06-01** — Production live at https://ikra-web.vercel.app/

The launch milestone delivered the full landing page (Hero / Features / Showcase / Stats), store-submission-ready legal pages (Privacy / Terms / Support), and the complete SEO surface (per-page metadata, dynamic OG image, sitemap, robots). 17/17 v1 requirements satisfied (UI-02 dark mode intentionally deferred per D-04). All 4 phases passed audit with zero blockers.

See `.planning/milestones/v1.0-SUMMARY.md` and `.planning/v1.0-MILESTONE-AUDIT.md` for the full record.

### Operator actions before App Store / Play submission
- Replace placeholder store badges with official Apple + Google marketing SVGs
- Fill real App Store / Google Play URLs in `components/StoreBadges.tsx`
- Confirm `support@ikraapp.com` mailbox routes
- Confirm or override Delaware governing law in `app/terms/page.tsx`
- Run Lighthouse mobile audit (targets Perf 90 / A11y 95 / BP 95 / SEO 100)
- Wire custom marketing domain when chosen (~10 min on Vercel)

## Next Milestone Goals

`v1.1` candidates (run `/gsd:new-milestone` to scope):
- Real App Store / Google Play URLs after app submission goes live
- Official Apple + Google badge SVGs
- Custom domain
- Post-launch SEO tuning + analytics opt-in
- Animated counters on Stats, scroll-triggered reveals on Features
- Schema.org structured data (Organization, MobileApplication)

### Out of Scope

- Multi-language / i18n — English only (app supports 6, site stays single-language to ship fast)
- Blog / CMS / content marketing — deferred
- Waitlist / email capture — store badges chosen instead
- RTL support — not needed for English-only site
- Dark mode — dropped from v1 per D-04 (site is light-mode only)

## Context

- **Source app:** `/Users/zbilalozgen/repos/wip-muslim` (name: İkra / Iqra, bundle `com.ikraapp.app`, Expo SDK 55).
- **Product:** Quran verses + authentic (Sahih) hadith on lock/home screen widgets; swipe discovery, 6-reciter word-level audio, Esmaül Hüsna (99 Names), prayer times/qibla, shareable Islamic-motif visuals, offline-first, freemium (premium removes ads; reading always free).
- **Audience:** Primary Turkey (Muslims 18–35), secondary global Muslim diaspora. Website is English-facing.
- **Brand language:** Respectful, scholarly, reverent. No FOMO/aggressive monetization framing. Tagline: "Quran Verses & Sahih Hadith Widget App."
- **Brand assets in source app:** `src/assets/images/` (icon.png, adaptive-icon.png, watermark-glyph.png, splash-light/dark). Color tokens in `src/theme/colors.ts` and `tailwind.config.js`.
- **Marketing stats:** 6 languages, 6 reciters, 6236 Quran verses + Sahih hadith + 99 Names, 5 social share formats, offline-first, free-forever reading.

## Constraints

- **Brand fidelity**: Must match İkra app — primary emerald `#006B3F`, accent gold `#D4A843`, secondary navy `#1B2A4A`; dark mode background `#0A1F0E`. Reuse Tailwind tokens from the app where practical.
- **Compliance**: Privacy Policy + Support page are hard requirements for App Store and Google Play submission.
- **Tech stack**: Next.js (App Router) + Tailwind CSS + Vercel. Optionally shadcn/ui for components.
- **Tone**: Reverent and authentic; never instrumentalize worship; no aggressive sales language.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router + Tailwind + Vercel | Tailwind matches app design tokens; best Vercel DX/deploy; SSG for fast, SEO-friendly marketing pages | ✅ Validated v1.0 |
| English only (no i18n) | Ship fast; English serves the global secondary audience; i18n deferrable | ✅ Validated v1.0 |
| Store badges as placeholders | App is pre-launch; links filled in at launch | ✅ Validated v1.0 — placeholder pills + TODO comments |
| Landing + legal pages scope | Minimum needed to launch app stores and market | ✅ Validated v1.0 |
| Dark mode dropped from v1 (D-04) | Reduce scope; light-mode-only ships faster; can revisit | ✅ Validated v1.0 |
| Tailwind v4 `@theme` (no config.js) | Match app's token shape via CSS variables, future-proof | ✅ Validated v1.0 |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-01 after v1.0 milestone completion*
