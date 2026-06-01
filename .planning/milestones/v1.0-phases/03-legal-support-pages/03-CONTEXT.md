# Phase 3: Legal & Support Pages - Context

**Gathered:** 2026-06-01
**Status:** Ready for planning
**Source:** Smart Discuss (autonomous mode)

<domain>
## Phase Boundary

Replace the body content of the existing stub routes `/privacy`, `/terms`, `/support` (shipped in Phase 1 per D-05) with real, store-submission-ready legal and support content. Routes, footer hrefs, and global layout DO NOT change — Phase 1 already wired everything. This phase only fills the page bodies.

**In scope:**
- Real Privacy Policy content at `/privacy` (Apple App Store + Google Play submission requirement)
- Real Terms of Service content at `/terms`
- Real Support page at `/support` with primary contact (email) and a small FAQ
- `@tailwindcss/typography` plugin install + brand-aligned `prose` overrides
- In-page Tables of Contents for `/privacy` and `/terms`
- Per-page `<title>` and meta description via Next.js `metadata` export
- "Last updated" date stamp on each page
- Cross-links + Back-to-home links at the bottom of each page

**Out of scope (Phase 3):**
- Contact form with backend (Phase 4 polish if at all — `mailto:` suffices)
- Multi-language / i18n (English-only per PROJECT.md)
- A separate legal layout / route group (in-place edits per D-05)
- Cookie banner (no first-party cookies on the website itself; the app's privacy concerns belong to the app, but the website still must disclose its own zero-collection posture)
- SEO meta polish / OG cards (Phase 4)
- Dark mode (D-04)

</domain>

<decisions>
## Implementation Decisions

### Content Scope & Sourcing (D-21 through D-25)
- **D-21:** Privacy Policy is **hand-written, app-specific**, covering the actual data flows of the İkra mobile app: Firebase Analytics + Crashlytics + Remote Config (anonymous), RevenueCat (subscriptions), Expo Notifications (opt-in), Expo Tracking Transparency (iOS ATT), Google Mobile Ads / AdMob (free-tier ads), AppsFlyer (mobile measurement / attribution). The "premium tier removes ads" feature confirms ads exist. Apple/Google IAP billing is a transactional processor (not advertising). No user accounts, no PII. Children's policy note (app not directed at children under 13). Generic GDPR/CCPA mention with contact-email remediation path. NOT a template.

  > **Correction (post-planning):** Initial CONTEXT scan missed `react-native-google-mobile-ads` and `react-native-appsflyer` in `wip-muslim/package.json`. The planner's source audit caught this; the Privacy Policy correctly discloses all processors. This D-21 text is the corrected truth.
- **D-22:** Privacy Policy structure: H1 "Privacy Policy", `Last updated: June 1, 2026` line, **Table of Contents** linking to anchors, then H2 sections in this order: (1) Overview, (2) Data we collect (and what we don't), (3) Third-party services (Firebase, RevenueCat, Apple/Google IAP, Expo Notifications), (4) Local storage on your device, (5) Children's privacy, (6) Your rights (EU/UK/California brief), (7) Data retention, (8) Changes to this policy, (9) Contact us.
- **D-23:** Terms of Service is **hand-written, app-specific**: H1 "Terms of Service", Last-updated date, TOC, sections (1) Acceptance, (2) License to use the App, (3) Acceptable use, (4) Subscriptions and in-app purchases (Apple/Google billing rules), (5) Content & scripture (audio/text not for redistribution), (6) Disclaimer of warranties, (7) Limitation of liability, (8) Governing law — **US/Delaware as generic-safe default** (developer can override at launch), (9) Changes, (10) Termination, (11) Contact.
- **D-24:** Support page is **static page with `mailto:` contact + FAQ**: H1 "Support", primary contact `mailto:support@ikraapp.com` styled as a button-link, then H2 "Frequently asked" with 5 collapsible-but-render-open FAQ entries: "How do I install the iOS / Android widget?", "Audio isn't playing — what should I check?", "How do I restore my premium purchase?", "Daily verse notifications aren't arriving — how do I fix that?", "How do I report a bug or request a feature?". Each Q in `<h3>` and A in `<p>`. No JS, no `<details>` — open by default so search engines index the answers.
- **D-25:** Contact email: `support@ikraapp.com` — matches bundle id `com.ikraapp.app`. Developer must confirm mailbox routes before App Store submission; if not, override to a confirmed deliverable address.

### Layout, Typography, Polish (D-26 through D-30)
- **D-26:** Replace in-place at the existing stub routes (`app/privacy/page.tsx`, `app/terms/page.tsx`, `app/support/page.tsx`). Routes, file paths, and footer hrefs do NOT change (honors Phase 1 D-05). Each page: `<main className="bg-cream"><article className="max-w-3xl mx-auto px-screen py-section">` so content is constrained to a comfortable reading width; the global Footer keeps rendering beneath.
- **D-27:** Install `@tailwindcss/typography` and use the `prose` class on the legal body wrapper. Override `prose` variables in `app/globals.css` (or via `prose-*` utilities at use site) so paragraphs use Body role (16px/1.5 navy-800), H2 uses Heading role (20px/1.2 emerald-600), `<a>` uses `text-gold-500 hover:text-emerald-600 underline underline-offset-4`. Lists, blockquotes inherit prose defaults with brand color tweaks.
- **D-28:** TOC at top of `/privacy` and `/terms`: a static `<nav aria-label="On this page">` with an `<ol>` of anchor links pointing at each `<h2 id="...">`. No JS, no scroll-spy. Subtle styling: `bg-surface-card border border-navy-800/10 rounded-lg p-md text-sm` with a label "On this page".
- **D-29:** Per-page metadata: each page exports a `metadata` object with `title: "Privacy Policy — İkra"` (etc.) and a 1-sentence `description`. The `Last updated: June 1, 2026` line sits directly under H1 in `text-sm text-navy-800/60`.
- **D-30:** Bottom of each legal page: a small navigation strip linking to the other 2 legal pages + a "← Back to home" link. Styled `text-sm text-navy-800/70 hover:text-emerald-600`, separated by gold-500 middle dots, centered, with `mt-2xl pt-lg border-t border-navy-800/10`.

### Claude's Discretion
- Exact wording of the FAQ answers (keep concise, reverent — D-24 specifies the questions, not the answers)
- Exact wording of each Privacy / Terms section body — write clean, plain English, no legalese padding
- Whether the TOC links use smooth scroll behavior (CSS `scroll-behavior: smooth` is fine if needed; not required)
- Whether `prose` overrides are inline (per-file `prose-headings:*`) or in `@theme`/`@layer base` (preference: inline `prose-*` utilities at the page level for clarity)
- Whether to add Open Graph / Twitter card meta for the legal pages (defer to Phase 4 polish)

</decisions>

<canonical_refs>
## Canonical References

### Phase 1 + 2 Foundation (Inherited)
- `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/support/page.tsx` — Existing stub files; bodies to be replaced (D-26)
- `app/layout.tsx` — Global layout, Inter font, global Footer
- `app/globals.css` — Tailwind v4 `@theme` block with brand tokens
- `.planning/phases/01-foundation-deployable-skeleton/01-UI-SPEC.md` — typography + spacing + color tokens (inherited)
- `.planning/phases/02-landing-page-content/02-UI-SPEC.md` — content section patterns

### Project & Requirements
- `.planning/PROJECT.md` — tone constraint (reverent, scholarly, no aggressive language)
- `.planning/REQUIREMENTS.md` — LEGAL-01 (Privacy), LEGAL-02 (Terms), LEGAL-03 (Support)
- `.planning/ROADMAP.md` §"Phase 3: Legal & Support Pages"
- `CLAUDE.md` — brand & compliance constraints

### Mobile App Data Flows (Source of Truth for Privacy Policy)
- `/Users/zbilalozgen/repos/wip-muslim/package.json` — actual dependencies:
  - `@react-native-firebase/analytics`, `crashlytics`, `remote-config` — anonymous usage + crash + config (Firebase)
  - `react-native-purchases` — RevenueCat (subscription management, anonymized user ID)
  - `expo-notifications` — verse reminders (opt-in)
  - `expo-tracking-transparency` — iOS ATT permission prompt
  - `react-native-google-mobile-ads` — Google AdMob (free-tier ads; premium tier removes ads)
  - `react-native-appsflyer` — AppsFlyer mobile attribution / measurement
- All of the above are present in `wip-muslim/package.json`. Privacy Policy correctly discloses all processors including AdMob and AppsFlyer.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Stub pages at `app/{privacy,terms,support}/page.tsx` — minimal centered layout already in place (Phase 1 D-05). Phase 3 replaces the body content within the same files.
- Brand tokens in `app/globals.css` — Body 16px navy-800, Heading 20px emerald-600 already wired.
- `bg-cream` body background, Inter font — inherited.

### Established Patterns
- `<main>` wraps page body content
- `max-w-Xxl mx-auto px-screen` for centered constrained layout
- Conventional commits `feat(03-XX):` / `style(03-XX):` / `docs(03-XX):`
- Sequential executor on `main` → Vercel auto-deploy

### Integration Points
- Footer (Phase 1) already links to `/privacy`, `/terms`, `/support` — no nav changes needed.
- Global `<Footer />` will render below the `<article>` content on each legal page.
- `@tailwindcss/typography` install is the one new dependency for Phase 3.

</code_context>

<specifics>
## Specific Ideas

- Tone is reverent and factual, NOT preachy. Privacy/Terms read like a friendly developer wrote them, not a corporate lawyer.
- Avoid the phrase "We may collect..." — be definite: "We collect X. We do not collect Y."
- Apple App Store and Google Play both require Privacy Policy URL at submission; this URL must be `https://ikra-web.vercel.app/privacy` (or wherever the site lives at submission time).
- Support page must have a way for users to reach a human — `mailto:` satisfies that.

</specifics>

<deferred>
## Deferred Ideas

- Multi-language Privacy/Terms (English-only per PROJECT.md)
- Cookie consent banner (no first-party cookies on the website yet; revisit in Phase 4 if SEO analytics added)
- A separate `<legal>` route layout / route group (in-place edits suffice)
- Backend-powered contact form (mailto suffices for v1)
- Last-updated date sourced from git commit time (manually maintained for v1)
- DPA / GDPR Article 30 record (not required for a Quran widget with no PII)

</deferred>

---

*Phase: 03-legal-support-pages*
*Context gathered: 2026-06-01 via smart-discuss (autonomous mode)*
