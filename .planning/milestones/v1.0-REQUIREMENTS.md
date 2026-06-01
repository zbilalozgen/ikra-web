# Requirements: İkra Web

**Defined:** 2026-05-25
**Core Value:** A polished, brand-accurate landing page plus the legally-required Privacy Policy and Support pages — so İkra can launch on the app stores and convert visitors into installs.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Landing

- [x] **LAND-01**: Visitor sees a hero section with the İkra name, tagline, app visual, and a primary call-to-action
- [x] **LAND-02**: Visitor can read a features section covering core capabilities (lock/home screen widgets, multi-reciter audio, Esmaül Hüsna, prayer times & qibla, social share templates, offline-first)
- [x] **LAND-03**: Visitor sees an app screenshot / visual showcase of the product
- [x] **LAND-04**: Visitor sees App Store and Google Play store badges (placeholder links until launch)
- [x] **LAND-05**: Visitor sees a stats/social-proof section (6 languages, 6236 verses, 6 reciters, 99 Names, offline-first, free-forever reading)
- [x] **LAND-06**: Visitor can navigate via a footer linking to Privacy, Terms, and Support, with brand mark

### Branding & UI

- [x] **UI-01**: Site uses İkra's brand palette (emerald `#006B3F`, gold `#D4A843`, navy `#1B2A4A`) via Tailwind tokens
- [ ] **UI-02**: Site supports dark mode matching the app's dark palette (`#0A1F0E`)
- [x] **UI-03**: Layout is fully responsive across mobile, tablet, and desktop
- [x] **UI-04**: Interactions feel polished (tasteful animations/transitions, no flat/static feel)

### Legal & Support

- [x] **LEGAL-01**: Visitor can read a Privacy Policy page (App Store / Play submission requirement)
- [x] **LEGAL-02**: Visitor can read a Terms of Service page
- [x] **LEGAL-03**: Visitor can reach a Support / Contact page (App Store / Play submission requirement)

### SEO

- [x] **SEO-01**: Each page has appropriate title and meta description
- [x] **SEO-02**: Pages expose Open Graph / Twitter share cards with brand imagery
- [x] **SEO-03**: Site provides a sitemap and robots.txt

### Deployment

- [x] **DEPLOY-01**: Site is deployed to Vercel with a working production build
- [x] **DEPLOY-02**: Production domain is configured (or Vercel default domain documented)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Internationalization

- **I18N-01**: Site supports Turkish in addition to English
- **I18N-02**: Site supports the app's full language set (AR, BN, ID, UR) with RTL where needed

### Content

- **CONT-01**: Blog / content marketing section
- **CONT-02**: FAQ page
- **CONT-03**: Email waitlist capture for pre-launch interest

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Multi-language / i18n | English only for v1 to ship fast; app's 6 languages deferred to v2 |
| Blog / CMS | Not needed for launch marketing |
| Live app download links | App not yet published; store badges are placeholders |
| Waitlist / email capture | Store badges chosen as the launch CTA instead |
| RTL support | Not needed for English-only site |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| LAND-01 | Phase 2 | Complete |
| LAND-02 | Phase 2 | Complete |
| LAND-03 | Phase 2 | Complete |
| LAND-04 | Phase 2 | Complete |
| LAND-05 | Phase 2 | Complete |
| LAND-06 | Phase 1 | Complete |
| UI-01 | Phase 1 | Complete |
| UI-02 | Phase 1 | Pending |
| UI-03 | Phase 4 | Complete |
| UI-04 | Phase 4 | Complete |
| LEGAL-01 | Phase 3 | Complete |
| LEGAL-02 | Phase 3 | Complete |
| LEGAL-03 | Phase 3 | Complete |
| SEO-01 | Phase 4 | Complete |
| SEO-02 | Phase 4 | Complete |
| SEO-03 | Phase 4 | Complete |
| DEPLOY-01 | Phase 1 | Complete |
| DEPLOY-02 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 17 total
- Mapped to phases: 17 ✓
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-25*
*Last updated: 2026-05-25 after roadmap creation*
