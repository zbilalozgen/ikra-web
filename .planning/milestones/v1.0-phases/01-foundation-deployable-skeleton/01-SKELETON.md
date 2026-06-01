# Walking Skeleton — İkra Web

**Phase:** 1
**Generated:** 2026-06-01

## Capability Proven End-to-End

A visitor opens the production Vercel URL and sees the brand-accurate İkra skeleton home page with a global footer linking to live stub pages for Privacy, Terms, and Support — proving Next.js + Tailwind v4 + brand tokens + routing + global layout + Vercel auto-deploy are all wired and working.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js (App Router, latest stable) + TypeScript + ESLint | Locked by D-01 / PROJECT.md; SSG for SEO, best Vercel DX |
| Styling | Tailwind CSS **v4** with `@theme` directive inside `app/globals.css` | D-01 — no `tailwind.config.js`; mobile app's NativeWind config is not portable verbatim |
| Brand token strategy | Port emerald / gold / navy / cream / surface / dark hex ramps from `/Users/zbilalozgen/repos/wip-muslim/tailwind.config.js` as `--color-*` CSS variables in `@theme` so utility names (`bg-emerald-600`, `text-gold-500`, `bg-navy-800`, `bg-cream`) match the mobile app verbatim | D-02 — design-language parity with the mobile app, no invented ramps |
| Font | Inter via `next/font/google` | UI-SPEC §Design System (locked) |
| Routing | App Router with real route folders: `app/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/support/page.tsx` | D-05 — real stub pages so footer hrefs resolve, Phase 3 replaces body in place |
| Global layout | `app/layout.tsx` hosts `<Footer />` so every route inherits it | Phase 1 success criterion 3 + D-05 |
| Component location | `components/Footer.tsx` (single component this phase) | Claude's discretion per CONTEXT.md; conventional Next.js layout |
| Favicon | Copy `wip-muslim/src/assets/images/icon.png` → `app/icon.png` (App Router auto-discovery) | Claude's discretion per CONTEXT.md |
| Dark mode | **Out of scope for v1** | D-04 — drop entirely, no `darkMode` config, no `prefers-color-scheme` styles, no dark-mode tokens emitted |
| Deployment | GitHub remote → Vercel project, git-push auto-deploy (preview per PR, prod on `main`) | D-03 |
| Production domain | Vercel default subdomain (e.g. `ikra-web.vercel.app`), documented in `README.md` | D-03 — custom domain deferred until marketing domain chosen |
| Branch / commit conventions | `main` as default branch; Conventional Commits (`feat:`, `chore:`, etc.) | Claude's discretion per CONTEXT.md |

## Stack Touched in Phase 1

- [x] Project scaffold — Next.js App Router + TypeScript + ESLint via `create-next-app`
- [x] Routing — four real routes: `/`, `/privacy`, `/terms`, `/support`
- [ ] Database — N/A (no DB this milestone; site is fully static)
- [x] UI — global `<Footer />` rendered on every route; `hover:text-gold-500` link transition (150ms) is the one real interaction
- [x] Deployment — production build live on Vercel default subdomain via git-push auto-deploy

> Note: "Database read AND write" from the generic Walking Skeleton template is intentionally N/A. İkra Web is a static marketing site — the equivalent end-to-end proof is "scaffold → route → global layout → public production URL," which Phase 1 delivers.

## Out of Scope (Deferred to Later Slices)

- **Dark mode** — dropped from v1 entirely (D-04). Will require full token-system + `darkMode` strategy revisit if reintroduced.
- **Landing page marketing content** — hero, features, screenshots, store badges, stats → Phase 2.
- **Real Privacy / Terms / Support body content** — Phase 3 replaces the "This page is under construction." placeholder at the same route paths.
- **Responsive QA, motion polish, SEO meta, OG cards, sitemap, robots.txt** — Phase 4.
- **shadcn/ui initialization** — Phase 2 decision per UI-SPEC if interactive components are needed.
- **Footer brand mark as SVG/image** — Phase 1 uses text logotype "İkra"; likely Phase 4 polish.
- **Custom marketing domain** — deferred until a domain is confirmed; <10 min wire-up post-Phase 1.
- **i18n / Turkish / Arabic / RTL** — explicitly v2 (REQUIREMENTS.md §Out of Scope).

## Subsequent Slice Plan

Each later phase adds one vertical slice on top of this skeleton without altering the architectural decisions above:

- **Phase 2 — Landing Page Content:** hero, features section, screenshot showcase, store badges, stats/social-proof (LAND-01 through LAND-05). May initialize shadcn/ui at phase start.
- **Phase 3 — Legal & Support Pages:** replace the under-construction body at `/privacy`, `/terms`, `/support` with real, store-submission-ready content (LEGAL-01, LEGAL-02, LEGAL-03). Footer hrefs do not change.
- **Phase 4 — Polish & SEO Launch-Readiness:** responsive QA across breakpoints, tasteful motion, per-page metadata, Open Graph / Twitter cards, sitemap + robots.txt (UI-03, UI-04, SEO-01, SEO-02, SEO-03).
