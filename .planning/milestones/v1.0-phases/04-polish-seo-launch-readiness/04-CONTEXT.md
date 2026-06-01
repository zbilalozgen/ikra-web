# Phase 4: Polish & SEO Launch-Readiness - Context

**Gathered:** 2026-06-01
**Status:** Ready for planning
**Source:** Smart Discuss (autonomous mode)

<domain>
## Phase Boundary

The final pre-launch phase. Adds tasteful motion (no JS library), verifies responsive layout across viewports, and ships full SEO surface: per-page metadata, Open Graph + Twitter share cards, sitemap.xml, robots.txt. No new product surface — purely polish on what Phases 1–3 shipped.

**In scope:**
- CSS-only motion: hero fade-in-up on load, feature-card hover lift, scroll-snap polish on screenshot strip
- `prefers-reduced-motion: reduce` short-circuit for all non-essential motion
- Responsive QA at 360 / 768 / 1024 / 1440 viewports; `overflow-x-hidden` safeguard
- Lighthouse targets: Perf ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 100
- `app/layout.tsx` metadata defaults: title, description, `metadataBase`, theme-color (#006B3F), application-name
- Per-page metadata override on `app/page.tsx` (home) — Privacy/Terms/Support already done in Phase 3
- Dynamic Open Graph image via `app/opengraph-image.tsx` using `next/og` `ImageResponse` (1200×630 brand card)
- Twitter card: `summary_large_image` reusing the OG image
- `app/sitemap.ts` — Next.js sitemap handler for /, /privacy, /terms, /support
- `app/robots.ts` — Next.js robots handler
- Canonical URL alternates per page
- `NEXT_PUBLIC_SITE_URL` env var (default `https://ikra-web.vercel.app`)

**Out of scope (Phase 4):**
- Dark mode (D-04 — out forever in v1)
- JS animation library (framer-motion, motion-one — heavy, unnecessary)
- Per-page unique OG images (single shared OG for v1)
- i18n / hreflang
- Backend/contact form (already deferred in Phase 3)
- Custom domain (still ships on Vercel default subdomain unless operator wires one before launch)
- Lighthouse perfectionism — fix critical issues only; defer non-critical

</domain>

<decisions>
## Implementation Decisions

### Motion & Responsive (D-31 through D-35)
- **D-31:** Motion is **CSS-only**. No JS library. Use `@keyframes`, `animation`, `transition`. Hero fade-in-up: `opacity 0→1`, `translateY(12px→0)`, `500ms ease-out`, runs once on mount via `animation` (no React state). Feature cards: existing hover border gains a subtle `scale-[1.01]` and gold-500 `ring-1 ring-gold-500/20` transition over `duration-fast`. Screenshot strip already has `scroll-snap-x`; add `scroll-behavior: smooth` on the container.
- **D-32:** Reduced-motion: add a global `@media (prefers-reduced-motion: reduce)` block in `app/globals.css` that sets `animation-duration: 0.001ms !important` and `animation-iteration-count: 1 !important` and `transition-duration: 0ms !important` on the motion-related selectors. Keep `transition-colors duration-fast` on links (color change is not motion). Pragmatic: target `[data-motion]` attributes or animation-named selectors so we don't strip the hover color transition.
- **D-33:** Responsive QA: verify Hero / Features / Showcase / Stats / Legal pages render correctly at 360px, 768px, 1024px, 1440px in Chrome DevTools device toolbar. Fix anything that breaks: text overflow, image distortion, sub-touch-target buttons, horizontal scroll. Add `overflow-x-hidden` on `body` as a safety net for any future stray overflow.
- **D-34:** Lighthouse pass after deploy: targets Perf ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 100 on mobile (Vercel Lighthouse integration if available, otherwise local `npx lighthouse` against the production URL). Fix CLS issues, image size issues, missing alt text, contrast issues if reported. Defer non-critical issues with a comment.
- **D-35:** Add `overflow-x-hidden` to the `body` rule in `@layer base` in `app/globals.css` so any future stray element can't introduce horizontal scrollbar.

### SEO Surface (D-36 through D-41)
- **D-36:** Default metadata in `app/layout.tsx`:
  ```
  title: { default: "İkra — Quran Verses & Sahih Hadith Widget App", template: "%s — İkra" }
  description: "Authentic verses and Sahih hadith, refreshed throughout the day — quietly present on your home and lock screens."
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ikra-web.vercel.app")
  applicationName: "İkra"
  themeColor: "#006B3F"
  ```
  Phase 3 page-level metadata (Privacy / Terms / Support) continues to override the template.
- **D-37:** `app/page.tsx` adds an explicit `metadata` export with the home-specific title (matching the layout default — but explicit so SSR snapshot is deterministic) and `alternates: { canonical: "/" }`.
- **D-38:** OG image: `app/opengraph-image.tsx` using `ImageResponse` from `next/og`. 1200×630, emerald-600 background `#006B3F`, white "İkra" wordmark in Inter Bold ~120px centered, tagline "Quran Verses & Sahih Hadith Widget App" in cream `#F2F2F7` ~36px below, watermark glyph at ~20% opacity in corner. Single OG image, shared across all routes (Privacy/Terms/Support reuse the home OG for v1).
- **D-39:** Twitter card meta in layout: `twitter: { card: "summary_large_image", title: <default>, description: <default>, images: ["/opengraph-image"] }`.
- **D-40:** `app/sitemap.ts` exports `default function sitemap()` returning a `MetadataRoute.Sitemap` array. 4 entries: `/`, `/privacy`, `/terms`, `/support`. `lastModified: new Date()` (build-time), `changeFrequency: "monthly"`, `priority: 1.0` for `/`, `0.7` for legal pages.
- **D-41:** `app/robots.ts` exports `default function robots()` returning `MetadataRoute.Robots`: `rules: [{ userAgent: "*", allow: "/" }]`, `sitemap: \`${siteUrl}/sitemap.xml\``.

### Claude's Discretion
- Exact selector strategy for the `prefers-reduced-motion` block (target by `[data-motion]` data attribute, or named `@keyframes` rule names — pick whichever is cleaner)
- Whether the hero fade-in-up is implemented via `animation` on the Hero root or staggered children
- Lighthouse run mechanism (Vercel automatic checks vs local `npx lighthouse`); record results in SUMMARY.md regardless
- Exact OG image typography weights and sizes (Inter not bundled in `next/og` — load via the function's `fonts` parameter)
- Whether to add `viewport` meta export (Next.js defaults are usually fine — confirm in Next.js 16 docs)
- Final test of `NEXT_PUBLIC_SITE_URL` env var — set on Vercel project settings (operator action) or just use the fallback for v1

</decisions>

<canonical_refs>
## Canonical References

### Phase 1+2+3 Foundation (Inherited)
- `app/layout.tsx` — currently has `bg-cream text-navy-800` body className, Inter font, global Footer. Phase 4 adds metadata defaults and theme-color.
- `app/page.tsx` — home page composed in Phase 2; Phase 4 adds explicit metadata export.
- `app/{privacy,terms,support}/page.tsx` — Phase 3 metadata exports stay.
- `app/globals.css` — Tailwind v4 `@theme` block, `@plugin "@tailwindcss/typography"`, shadcn token layers. Phase 4 adds `prefers-reduced-motion` rule + `overflow-x-hidden` on body.

### Project & Requirements
- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md` — UI-03, UI-04, SEO-01, SEO-02, SEO-03
- `.planning/ROADMAP.md` §"Phase 4"
- `CLAUDE.md`

### Brand Source (Mobile App)
- `/Users/zbilalozgen/repos/wip-muslim/src/assets/images/watermark-glyph.png` — already in `public/watermark-glyph.png`. Can be inlined or fetched in OG image generation.

### Next.js References
- App Router Metadata API: `metadata` export, `generateMetadata`, `MetadataRoute.Sitemap`, `MetadataRoute.Robots`
- `next/og` `ImageResponse` for dynamic OG images
- Default route handlers: `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/layout.tsx` — has minimal metadata; needs full SEO defaults
- `public/watermark-glyph.png` — for OG image
- `public/screenshots/02-home-full.png` — fallback OG image source if dynamic generation hits a snag

### Established Patterns
- Conventional commits `feat(04-XX):`, `style(04-XX):`, `docs(04-XX):`, `perf(04-XX):`
- Sequential executor on main → Vercel auto-deploys
- Tailwind v4 `@theme` for tokens, inline utilities for component-level styles

### Integration Points
- `app/layout.tsx` is the SEO mothership for defaults
- `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts` are new app-router files
- `app/globals.css` `@layer base` is where the `prefers-reduced-motion` and `overflow-x-hidden` rules go

</code_context>

<specifics>
## Specific Ideas

- Hero fade-in-up should feel quiet, not flashy — 500ms ease-out, no spring/bounce
- Reduced-motion users see static hero (no animation), still see brand
- OG image must look great in iMessage, WhatsApp, Twitter/X previews
- robots.txt MUST NOT disallow anything (pre-launch site needs indexing)
- `theme-color` matters for the iOS Safari header tint when the site is added to Home Screen

</specifics>

<deferred>
## Deferred Ideas

- Per-page unique OG images (e.g., Privacy/Terms with their own card)
- Scroll-triggered reveals (e.g., features fade in as you scroll) — defer to v1.1
- Page transitions (Next.js App Router supports them — defer)
- Custom error pages with brand fidelity (404 is currently stock — defer to v1.1)
- Real-user-monitoring (Vercel Analytics opt-in — defer)
- WebP/AVIF source set generation for screenshots beyond what Next.js Image already does
- Schema.org structured data (Organization, MobileApplication) — could fit in v1 if cheap; planner decides
- Custom font preload optimizations

</deferred>

---

*Phase: 04-polish-seo-launch-readiness*
*Context gathered: 2026-06-01 via smart-discuss (autonomous mode)*
