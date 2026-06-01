# Roadmap: İkra Web

## Overview

İkra Web is a single-page-led marketing site with legal/support pages required for App Store and Google Play submission. The journey starts by standing up a brand-accurate, deployable Next.js skeleton on Vercel (foundation you can see live early), then layers in the full landing-page content, the legally-required Privacy/Terms/Support pages, and finally responsive polish, tasteful motion, and SEO so the site is launch-ready. Built with Next.js App Router + Tailwind, English-only, mirroring the İkra app's emerald/gold/navy identity.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation & Deployable Skeleton** - Brand-themed Next.js + Tailwind shell live on Vercel
- [x] **Phase 2: Landing Page Content** - Hero, features, screenshots, store badges, and stats (completed 2026-06-01)
- [ ] **Phase 3: Legal & Support Pages** - Privacy Policy, Terms of Service, and Support/Contact
- [ ] **Phase 4: Polish & SEO Launch-Readiness** - Responsive QA, motion, meta/OG, and sitemap

## Phase Details

### Phase 1: Foundation & Deployable Skeleton
**Goal**: A brand-accurate Next.js App Router + Tailwind site shell is live on Vercel, with İkra's color palette and a global footer linking to Privacy/Terms/Support stub routes in place — so every later phase builds on a deployable, on-brand foundation.
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: UI-01, ~~UI-02~~ (deferred per D-04), LAND-06, DEPLOY-01, DEPLOY-02
**Success Criteria** (what must be TRUE):
  1. Visitor loads the site and sees İkra's brand palette applied (emerald `#006B3F`, gold `#D4A843`, navy `#1B2A4A`, cream `#F2F2F7`) via Tailwind v4 `@theme` tokens reused from the app
  2. Visitor sees a global footer with the İkra brand mark and links to Privacy, Terms, and Support routes (real stub pages, not 404s)
  3. Operator can open the production Vercel URL and the site builds and serves without errors
  4. Production domain is configured, or the Vercel default domain is documented in README
**Plans**: 2 plans
  - [x] 01-01-PLAN.md — Scaffold Next.js + Tailwind v4 with brand `@theme` tokens; skeleton home page; global Footer; stub routes `/privacy`, `/terms`, `/support`
  - [x] 01-02-PLAN.md — Git init + GitHub push; Vercel git-push auto-deploy; production URL documented in README
**UI hint**: yes

### Phase 2: Landing Page Content
**Goal**: The landing page fully communicates İkra's purpose, features, product visuals, store availability, and social proof in a reverent, scholarly tone — so prospective users understand the app and are driven toward installing it.
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: LAND-01, LAND-02, LAND-03, LAND-04, LAND-05
**Success Criteria** (what must be TRUE):
  1. Visitor sees a hero section with the İkra name, tagline ("Quran Verses & Sahih Hadith Widget App"), an app visual, and a primary call-to-action
  2. Visitor can read a features section covering lock/home screen widgets, multi-reciter audio, Esmaül Hüsna, prayer times & qibla, social share templates, and offline-first
  3. Visitor sees an app screenshot / visual showcase of the product
  4. Visitor sees App Store and Google Play store badges (placeholder links until launch)
  5. Visitor sees a stats / social-proof section (6 languages, 6236 verses, 6 reciters, 99 Names, offline-first, free-forever reading)
**Plans**: 2 plans
  - [x] 02-01-PLAN.md — Initialize shadcn/ui (Tailwind v4, button + card), install lucide-react, copy iOS screenshots + watermark glyph into public/
  - [x] 02-02-PLAN.md — Build Hero / Features / Showcase / Stats + StoreBadges; replace app/page.tsx body
**UI hint**: yes

### Phase 3: Legal & Support Pages
**Goal**: The site hosts the Privacy Policy, Terms of Service, and Support/Contact pages required for App Store and Google Play submission — so İkra can pass store compliance review.
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: LEGAL-01, LEGAL-02, LEGAL-03
**Success Criteria** (what must be TRUE):
  1. Visitor can open and read a Privacy Policy page that satisfies App Store / Play submission requirements
  2. Visitor can open and read a Terms of Service page
  3. Visitor can reach a Support / Contact page with a working way to get help
  4. Footer links from Phase 1 resolve to these live pages (no broken or placeholder routes)
**Plans**: TBD
**UI hint**: yes

### Phase 4: Polish & SEO Launch-Readiness
**Goal**: The site is responsive across devices, feels polished with tasteful motion, and is discoverable with proper meta tags, social share cards, and a sitemap — so it presents professionally and is launch-ready.
**Mode:** mvp
**Depends on**: Phase 2, Phase 3
**Requirements**: UI-03, UI-04, SEO-01, SEO-02, SEO-03
**Success Criteria** (what must be TRUE):
  1. Visitor sees a layout that adapts cleanly across mobile, tablet, and desktop with no broken or overflowing sections
  2. Visitor experiences polished interactions (tasteful animations/transitions, nothing flat or static)
  3. Each page exposes an appropriate title and meta description
  4. Pages render correct Open Graph / Twitter share cards with brand imagery when shared
  5. Site serves a valid sitemap and robots.txt
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Deployable Skeleton | 2/2 | Complete | 2026-06-01 |
| 2. Landing Page Content | 2/2 | Complete   | 2026-06-01 |
| 3. Legal & Support Pages | 0/TBD | Not started | - |
| 4. Polish & SEO Launch-Readiness | 0/TBD | Not started | - |
