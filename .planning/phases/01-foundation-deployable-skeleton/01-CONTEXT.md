# Phase 1: Foundation & Deployable Skeleton - Context

**Gathered:** 2026-06-01
**Status:** Ready for planning

<domain>
## Phase Boundary

A brand-accurate Next.js App Router + Tailwind site shell is live on Vercel — İkra's color palette in place (light-mode only this phase), a global footer with brand mark and links to Privacy/Terms/Support routes (real stub pages, no 404s), and the production deploy reachable via the Vercel default subdomain. Every later phase (landing content, legal pages, polish/SEO) builds on this skeleton.

**In scope:**
- Next.js App Router project bootstrap with Tailwind v4
- Brand color tokens ported from the app into `@theme` in `globals.css`
- Inter font via `next/font`
- Global footer with brand mark + Privacy/Terms/Support links (per UI-SPEC copy)
- Stub route pages at `/privacy`, `/terms`, `/support` ("This page is under construction.")
- Skeleton home page (`/`) with UI-SPEC heading + subheading
- GitHub remote created, Vercel project connected for git-push auto-deploy
- Production deploy on Vercel default subdomain documented in README

**Out of scope (Phase 1):**
- Dark mode (dropped from v1 — see D-04)
- Landing-page marketing content (Phase 2)
- Real Privacy/Terms/Support page content (Phase 3)
- Responsive QA, motion, SEO, OG cards (Phase 4)
- shadcn/ui (deferred to Phase 2 if needed)
- Custom domain (deferred until a marketing domain is confirmed)

</domain>

<decisions>
## Implementation Decisions

### Tailwind & Token Port
- **D-01:** Use Tailwind CSS **v4** with the `@theme` directive in `app/globals.css`. No `tailwind.config.js`. The app's `tailwind.config.js` uses `nativewind/preset` and is not portable verbatim anyway — port hex *values*, not the config file.
- **D-02:** Port the brand palette as `--color-*` CSS variables inside `@theme` so utility class names match the mobile app (`bg-emerald-600`, `text-gold-500`, `bg-navy-800`, `bg-cream`, etc.). Read the actual ramp values from `/Users/zbilalozgen/repos/wip-muslim/tailwind.config.js` during planning — do not invent ramps. Confirmed brand anchors: `#006B3F` (emerald-600), `#D4A843` (gold-500), `#1B2A4A` (navy-800), `#F2F2F7` (cream).

### Deploy & Domain
- **D-03:** Create a GitHub remote for `ikra-web` and connect Vercel for **git-push auto-deploy** (preview URLs per PR, prod on `main`). Use the **Vercel default subdomain** (`ikra-web.vercel.app` or similar) for Phase 1 — satisfies DEPLOY-02. Custom domain deferred until a marketing domain is confirmed (post-Phase 1 follow-up, <10 min to wire up).

### Dark Mode (Scope Change)
- **D-04:** **Drop dark mode from v1 scope.** Site is light-mode only. Skip dark mode tokens, `darkMode` config, and `prefers-color-scheme` styles entirely.
  - ⚠️ **Amends locked artifacts** — these need follow-up edits outside this phase:
    - `.planning/REQUIREMENTS.md` — move `UI-02` from Active to Out of Scope (reason: scope cut for v1; deferrable)
    - `.planning/ROADMAP.md` — remove Phase 1 Success Criterion #2 ("Visitor can toggle/observe dark mode rendering with the app's dark background `#0A1F0E`")
    - `.planning/phases/01-foundation-deployable-skeleton/01-UI-SPEC.md` — remove dark-mode rows from Color section, Interaction Contract row "Dark mode", and dark.* token rows in Token Source Traceability. Set `## Color` to light-only (cream bg, white card, emerald-600 brand, navy-800 accent, gold-500 accent).
  - Implication: navy and gold tokens are still in scope (light-mode brand accents per UI-SPEC).

### Footer Link Targets
- **D-05:** Create **real stub route pages** at `/privacy`, `/terms`, `/support` in Phase 1. Each page renders the UI-SPEC empty-state copy "This page is under construction." inside a minimal centered layout. Phase 3 replaces body content in-place at the same routes — no footer changes needed in Phase 3. Footer hrefs point to these absolute paths, not `#`.

### Claude's Discretion
- Project layout: standard `create-next-app` App Router (`app/`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`), TypeScript, ESLint on.
- Footer component location and composition (e.g. `components/Footer.tsx`), used in `app/layout.tsx` so it appears on every route including the stub pages.
- Favicon: copy `wip-muslim/src/assets/images/icon.png` into `app/icon.png` (Next.js App Router auto-discovers).
- Footer brand mark: text logotype "İkra" per UI-SPEC (no logo asset needed this phase).
- README content: project description, dev/build/deploy commands, documented production URL.
- Initial git remote setup, branch name (`main`), commit conventions.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 1 Design Contract
- `.planning/phases/01-foundation-deployable-skeleton/01-UI-SPEC.md` — Locks Inter font, spacing scale, typography roles, color tokens (light-mode rows only — dark-mode rows superseded by D-04), footer copy, interaction contract (minus dark-mode row), Token Source Traceability. Read before planning. ⚠️ Dark-mode sections superseded by D-04 (pending amendment).

### Project & Requirements
- `.planning/PROJECT.md` — Project overview, core value, constraints (brand fidelity, tone, tech stack), key decisions
- `.planning/REQUIREMENTS.md` — Requirements applicable to Phase 1: UI-01 (brand palette), ~~UI-02 (dark mode — see D-04)~~, LAND-06 (footer + brand mark + Privacy/Terms/Support links), DEPLOY-01 (Vercel build), DEPLOY-02 (production domain or default documented)
- `.planning/ROADMAP.md` §"Phase 1: Foundation & Deployable Skeleton" — Phase goal and success criteria (SC#2 superseded by D-04)
- `CLAUDE.md` — Project instructions, brand hex anchors, tone

### Brand Token Source (Mobile App)
- `/Users/zbilalozgen/repos/wip-muslim/tailwind.config.js` — **Source of truth** for emerald/gold/navy/cream/surface palettes and ramp values. Read this file at plan time to extract the actual hex values for `@theme`. Do not guess ramps.
- `/Users/zbilalozgen/repos/wip-muslim/src/theme/colors.ts` — Cross-reference for brand color tokens
- `/Users/zbilalozgen/repos/wip-muslim/src/assets/images/icon.png` — Source for `app/icon.png` favicon

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Brand palette (hex values + ramp structure):** Sourced from `wip-muslim/tailwind.config.js`. Ported into `app/globals.css` `@theme` block. Same class names (`bg-emerald-600`, `text-gold-500`, `bg-navy-800`) as the mobile app.
- **Favicon:** `wip-muslim/src/assets/images/icon.png` → `app/icon.png` (App Router auto-discovery).
- **Watermark glyph** (`wip-muslim/src/assets/images/watermark-glyph.png`) — available if a visual mark is wanted in the footer later; not required for Phase 1 (text logotype per UI-SPEC).

### Established Patterns
- **No prior web codebase** — this is a greenfield Next.js App Router project. Patterns set here become the baseline for Phases 2–4.
- **Tone & copy** governed by PROJECT.md ("Reverent and authentic; no aggressive sales language") and UI-SPEC's Copywriting Contract.

### Integration Points
- `app/layout.tsx` wraps every route, so the global footer placed there appears on `/`, `/privacy`, `/terms`, `/support` automatically.
- Phase 3 will replace the body of the stub pages at `/privacy`, `/terms`, `/support` in place — routes and footer hrefs don't change.
- Phase 2 will add landing content under `/` (replacing the skeleton heading) and may bring shadcn/ui.

</code_context>

<specifics>
## Specific Ideas

- Brand class names must match the mobile app verbatim (`bg-emerald-600`, `text-gold-500`, `bg-navy-800`, `bg-cream`, `bg-dark-bg` for any future dark surface — though dark-mode is dropped per D-04, these tokens may still be referenced in shared design language).
- Footer copy locked by UI-SPEC: brand mark "İkra", tagline "Quran Verses & Sahih Hadith Widget App", link labels "Privacy Policy" / "Terms of Service" / "Support", copyright "© 2025 İkra. All rights reserved."
- Skeleton home page copy locked by UI-SPEC: heading "İkra — Quran Verses & Hadith", subheading "Coming soon."
- Empty-state copy for stub pages locked by UI-SPEC: "This page is under construction."

</specifics>

<deferred>
## Deferred Ideas

- **Custom marketing domain** — defer until a domain is chosen; Phase 1 ships on the Vercel default subdomain. Wire-up is <10 min once decided.
- **Manual dark/light theme toggle** — dark mode is fully out of v1 (D-04). If reintroduced later, would need full revisit of token system and `darkMode` strategy.
- **shadcn/ui initialization** — Phase 2 decision per UI-SPEC, if interactive components are needed.
- **Footer brand mark as SVG/image** — Phase 1 uses text logotype. A real logotype/glyph treatment could come later (likely Phase 4 polish).

</deferred>

---

*Phase: 01-foundation-deployable-skeleton*
*Context gathered: 2026-06-01*
