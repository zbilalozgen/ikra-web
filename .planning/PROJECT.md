# İkra Web

## What This Is

The marketing/landing website for **İkra** — a Quran verses & Sahih hadith widget mobile app (Expo/React Native, currently pre-launch at v3.5). The site presents the app's value to prospective users and hosts the Privacy Policy, Support, and Terms pages required for App Store and Google Play submission. English-only, built with Next.js + Tailwind, deployed on Vercel. Visual identity mirrors the app's brand (emerald/gold/navy, dark-mode-friendly).

## Core Value

A polished, brand-accurate landing page plus the legally-required Privacy Policy and Support pages — so İkra can launch on the App Store and Google Play and convert visitors into installs.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Landing page communicating İkra's purpose, features, and screenshots — brand-matched
- [ ] App Store + Google Play store badges (placeholder links until launch)
- [ ] Privacy Policy page (store submission requirement)
- [ ] Support / Contact page (store submission requirement)
- [ ] Terms of Service page
- [ ] Responsive layout with dark mode matching the app's brand tokens
- [ ] SEO: meta tags, Open Graph / social share cards, sitemap
- [ ] Deployed to Vercel with production domain

### Out of Scope

- Multi-language / i18n — English only for v1 (app supports 6, site stays single-language to ship fast)
- Blog / CMS / content marketing — deferred
- Waitlist / email capture — store badges chosen instead
- Live app download links — app not yet published; badges are placeholders
- RTL support — not needed for English-only site

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
| Next.js App Router + Tailwind + Vercel | Tailwind matches app design tokens; best Vercel DX/deploy; SSG for fast, SEO-friendly marketing pages | — Pending |
| English only (no i18n) | Ship fast; English serves the global secondary audience; i18n deferrable | — Pending |
| Store badges as placeholders | App is pre-launch; links filled in at launch | — Pending |
| Landing + legal pages scope | Minimum needed to launch app stores and market | — Pending |

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
*Last updated: 2026-05-25 after initialization*
