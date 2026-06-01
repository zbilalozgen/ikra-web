# Phase 2: Landing Page Content - Context

**Gathered:** 2026-06-01
**Status:** Ready for planning
**Source:** Smart Discuss (autonomous mode)

<domain>
## Phase Boundary

The landing page at `/` fully communicates İkra's purpose, features, product visuals, store availability, and social proof in a reverent, scholarly tone — replacing the Phase 1 skeleton heading with a complete marketing page. Footer (LAND-06) is already shipped in Phase 1 and is not touched here.

**In scope:**
- Replace `app/page.tsx` skeleton with Hero / Features / Showcase / Stats sections
- Initialize `shadcn/ui` and add `button` + `card` primitives
- `components/StoreBadges.tsx` with inline Apple + Google SVG badges (placeholder hrefs)
- `components/Hero.tsx`, `components/Features.tsx`, `components/Showcase.tsx`, `components/Stats.tsx`
- Copy real iOS screenshots from `wip-muslim/analysis/screenshots/ios/` into `public/screenshots/`
- Copy watermark glyph into `public/watermark-glyph.png` for hero background
- Use Lucide React icons for the 6 feature tiles
- Next.js `<Image>` with proper width/height for zero CLS, `priority` on hero
- All copy reverent, scholarly, no FOMO/sales language

**Out of scope (Phase 2):**
- Privacy / Terms / Support page content (Phase 3 — stub pages already exist)
- Responsive QA polish, motion, SEO meta tags, OG cards, sitemap (Phase 4)
- Dark mode (deferred indefinitely per Phase 1 D-04)
- Real App Store / Google Play hrefs (filled at launch — placeholders remain as `#` with TODO comments)
- Custom domain
- Multi-language / i18n (English-only per PROJECT.md)
- Waitlist / email capture (badges chosen instead)

</domain>

<decisions>
## Implementation Decisions

### Page Composition & Hero (D-06 through D-10)
- **D-06:** Single long `/` page — `app/page.tsx` composes `<Hero />`, `<Features />`, `<Showcase />`, `<Stats />` in order. Footer is global from Phase 1 layout. No new routes.
- **D-07:** Hero heading: **"Quran Verses & Sahih Hadith on Your Lock Screen"** — concrete, hits the widget hook directly. Heading uses Display typography role (28px semibold, emerald-600).
- **D-08:** Hero subheading: **"Authentic verses and Sahih hadith, refreshed throughout the day — quietly present on your home and lock screens."** — Body role, navy-800/80.
- **D-09:** Hero primary CTA: Apple App Store + Google Play badges side-by-side. Hrefs are `#` with `{/* TODO(launch): fill App Store URL */}` and `{/* TODO(launch): fill Google Play URL */}` comments. Satisfies LAND-04.
- **D-10:** Hero visual: Single tilted iPhone-frame mockup using `public/screenshots/02-home-full.png` (copied from `wip-muslim/analysis/screenshots/ios/02-home-full.png`). Next.js `<Image>` with `priority` and explicit width/height.

### Features, Showcase, Stats (D-11 through D-15)
- **D-11:** Features grid: 1 col mobile, 2 cols md, 3 cols lg. Six feature cards in two rows.
- **D-12:** Feature icons: Lucide React. Map:
  - Lock/home screen widgets → `Smartphone` (or `LayoutDashboard`)
  - Multi-reciter audio → `Volume2`
  - Esmaül Hüsna (99 Names) → `Stars`
  - Prayer times & qibla → `Compass`
  - Social share templates → `Share2`
  - Offline-first → `WifiOff`
- **D-13:** Feature card structure: `<Card>` (shadcn primitive) with `bg-surface-card` background, `border-navy-800/10` border, `rounded-lg`, `p-lg`. Inside: Lucide icon (24px, `text-gold-500`), `<h3>` title (Heading role, navy-800), `<p>` description (Body role, navy-800/80, 1-2 sentences). Card hover: subtle `border-gold-500/30` transition over `duration-fast`.
- **D-14:** Showcase section between Features and Stats. Section header "See it in action" (Heading role, navy-800, centered). All 4 iOS screenshots (`01-home-screen.png`, `02-home-full.png`, `03-deeplink-verse.png`, `04-push-notification.png`) shown in a horizontally-scrollable strip on mobile (`overflow-x-auto snap-x`) and a 4-col grid on lg+. Each in a subtle phone-frame outline (`rounded-3xl border-4 border-navy-800/10 shadow-sm`).
- **D-15:** Stats display: centered single row, wraps on mobile. Six stat tiles separated by gold-500 dot dividers (`·` rendered as `<span className="text-gold-500">·</span>`):
  - "6 reciters" / "6,236 verses" / "99 Names" / "6 languages" / "Offline" / "Free forever"
  Each tile: Display-role number/word in emerald-600, Label-role caption in navy-800/70 if needed. No animated counters in v1.

### Components, Brand Polish, Deferrals (D-16 through D-20)
- **D-16:** Initialize `shadcn/ui` with `npx shadcn@latest init` (Tailwind v4 mode). Add `button` and `card` only. No other primitives — Hero CTA uses StoreBadges, not Button (yet).
- **D-17:** Store badges: `components/StoreBadges.tsx` exports `<AppStoreBadge />` and `<GooglePlayBadge />`, each inline SVG (official Apple + Google marketing SVGs). Wrapped in `<a href="#" aria-label="Download on the App Store">` (etc.) with TODO comments. Badges sized at ~160px width, gap-md between them, justify-center on mobile, justify-start (or center per Hero layout) on desktop.
- **D-18:** Watermark: copy `wip-muslim/src/assets/images/watermark-glyph.png` to `public/watermark-glyph.png`. Render as `<Image>` absolutely positioned top-right of Hero section at `opacity-[0.06]` (or use a CSS `background-image` with `background-blend-mode`). No watermark on other sections.
- **D-19:** Section padding: `py-section` (64px) between major sections, `py-2xl` (48px) inner; container: `max-w-6xl mx-auto px-screen`. Reuses the spacing scale shipped in Phase 1.
- **D-20:** Images: Next.js `<Image>` everywhere except inline SVG badges. `priority` on hero image. Explicit `width` and `height` props on every image so CLS = 0 (target Lighthouse CLS 0). Screenshots stored in `public/screenshots/` so Vercel serves them via the image CDN.

### Claude's Discretion
- Lucide icon-to-feature exact mapping if the recommended icon doesn't fit (e.g., `LayoutDashboard` vs `Smartphone`)
- Exact feature copy (1-2 sentence descriptions) — write reverent, factual, scholarly tone per PROJECT.md
- Exact stat capitalization / formatting nuances
- Whether to extract Hero/Features/Showcase/Stats into separate component files (recommended) or compose inline in `app/page.tsx` (acceptable for very thin sections)
- Card hover micro-interaction details (border, shadow, scale) within the `duration-fast` budget
- Empty/loading states (probably N/A — all content is static)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 1 Foundation (Inherited)
- `.planning/phases/01-foundation-deployable-skeleton/01-CONTEXT.md` — Light-mode only (D-04); Tailwind v4 `@theme` (D-01/D-02); footer pattern (D-05); inherited brand tokens
- `.planning/phases/01-foundation-deployable-skeleton/01-UI-SPEC.md` — Inter font, spacing scale (xs..3xl + screen/section/touch), color tokens, typography roles, Copywriting Contract
- `app/globals.css` — Live `@theme` block with `--font-sans`, `--color-*`, `--spacing-*`, `--duration-fast`
- `components/Footer.tsx` — Existing global footer, do not touch

### Project & Requirements
- `.planning/PROJECT.md` — Core value, constraints (brand, tone, tech stack)
- `.planning/REQUIREMENTS.md` — LAND-01 through LAND-05 (Hero, Features, Showcase, Badges, Stats)
- `.planning/ROADMAP.md` §"Phase 2: Landing Page Content"
- `CLAUDE.md` — Brand hex anchors, reverent tone constraint

### Brand & Visual Assets (Mobile App Source)
- `/Users/zbilalozgen/repos/wip-muslim/analysis/screenshots/ios/01-home-screen.png` — Lock screen widget
- `/Users/zbilalozgen/repos/wip-muslim/analysis/screenshots/ios/02-home-full.png` — Home screen widget (hero shot)
- `/Users/zbilalozgen/repos/wip-muslim/analysis/screenshots/ios/03-deeplink-verse.png` — In-app verse view
- `/Users/zbilalozgen/repos/wip-muslim/analysis/screenshots/ios/04-push-notification.png` — Notification
- `/Users/zbilalozgen/repos/wip-muslim/src/assets/images/watermark-glyph.png` — Brand glyph for hero background

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets (from Phase 1)
- `app/layout.tsx` — Inter font + global Footer; wraps `{children}` from every route. New page content slots into `app/page.tsx`.
- `app/globals.css` — Full `@theme` block with `--color-emerald-{50..900}`, `--color-gold-{50..900}`, `--color-navy-{50..900}`, `--color-cream`, `--color-surface-card`, `--spacing-{xs,sm,md,lg,xl,2xl,3xl,screen,section,touch}`, `--duration-fast: 150ms`, `--font-sans` wired to Inter.
- `components/Footer.tsx` — Already renders globally; no changes needed.

### Established Patterns
- Next.js App Router, TypeScript, ESLint
- Tailwind v4 utilities via `@theme` (no `tailwind.config.*`)
- Conventional commits (`feat(02-XX):`, `style(02-XX):`)
- Sequential executor on `main` (Vercel auto-deploys on push)

### Integration Points
- `app/page.tsx` is currently the skeleton — Phase 2 replaces its body.
- New components go in `components/` (e.g., `Hero.tsx`, `Features.tsx`, `Showcase.tsx`, `Stats.tsx`, `StoreBadges.tsx`).
- New static assets go in `public/screenshots/` and `public/`.
- shadcn primitives (`button`, `card`) install into `components/ui/`.

</code_context>

<specifics>
## Specific Ideas

- Copy is locked reverent, scholarly. No "Download now!", "Get yours today!", "Don't miss out". No emoji except the gold-500 dot `·` divider in Stats.
- Apple's official badge guidelines: do not modify the SVG (color, shape, proportions). Same for Google Play.
- Hero CTA badges are visible above the fold on mobile — confirm with executor's QA pass.
- All marketing stats sourced from PROJECT.md: "6 reciters, 6,236 verses, 99 Names, 6 languages, Offline, Free-forever".

</specifics>

<deferred>
## Deferred Ideas

- Animated stat counters — overkill for v1; consider in Phase 4 polish.
- Multi-language toggle — Out of Scope per PROJECT.md.
- Email capture / waitlist — Out of Scope per PROJECT.md.
- A/B testing the hero copy — premature.
- Custom hand-drawn illustrations — phone screenshots are the truth.
- Testimonials / press logos — no real testimonials yet.

</deferred>

---

*Phase: 02-landing-page-content*
*Context gathered: 2026-06-01 via smart-discuss (autonomous mode)*
