---
phase: 4
slug: polish-seo-launch-readiness
audited: 2026-06-01
baseline: 04-CONTEXT.md decisions (D-31..D-41) + inherited 01-UI-SPEC.md / 02-UI-SPEC.md
live_url: https://ikra-web.vercel.app/
screenshots: not captured (live URL audited via curl; no Playwright session available)
dark_mode: deferred per D-04 — not penalized
---

# Phase 04 — UI Review

**Audited:** 2026-06-01
**Baseline:** D-31..D-41 (04-CONTEXT.md) + 01-UI-SPEC.md / 02-UI-SPEC.md (inherited)
**Live verification:** curl against https://ikra-web.vercel.app/ (HTML + headers)
**Screenshots:** not captured — live HTML evidence used for SEO pillars; code analysis used for motion/visual pillars

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 2/4 | Legal page `<title>` tags double-apply the layout template: "Privacy Policy — İkra — İkra" ships to production |
| 2. Visuals | 3/4 | Hero fade and card hover are correctly scoped and subtle; watermark opacity on OG (0.18) deviates from spec (0.20) — minor |
| 3. Color | 4/4 | Brand palette applied correctly throughout; OG card uses #006B3F bg + #FFFFFF wordmark + #F2F2F7 tagline — matches spec |
| 4. Typography | 3/4 | OG image renders without Inter loaded (no `fonts` param in ImageResponse — Satori falls back to Noto); `font-medium` appears in StoreBadges outside declared weight set |
| 5. Spacing | 3/4 | All layout spacing uses declared scale tokens; scroll-behavior:smooth missing from Showcase strip (D-31 deliverable); hero section fade targets entire section root including watermark |
| 6. Experience Design | 3/4 | `prefers-reduced-motion` implemented correctly; sitemap + robots ship correctly; legal pages have no `canonical` alternates; home canonical missing trailing slash vs sitemap |

**Overall: 18/24**

---

## Top 3 Priority Fixes

1. **BLOCKER — Legal page `<title>` double-template** — `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/support/page.tsx` export plain string titles like `"Privacy Policy — İkra"`. The root layout template `"%s — İkra"` is applied on top, producing `"Privacy Policy — İkra — İkra"` in the live `<title>` tag (confirmed via curl). Fix: change each legal page title export to the bare page name only — `"Privacy Policy"`, `"Terms of Service"`, `"Support"` — so the template renders `"Privacy Policy — İkra"` as intended. Same issue applies to `app/page.tsx` home title: `"İkra — Quran Verses & Sahih Hadith Widget App"` becomes `"İkra — Quran Verses & Sahih Hadith Widget App — İkra"`. Use `{ absolute: "İkra — Quran Verses & Sahih Hadith Widget App" }` to bypass the template for the home page specifically.

2. **WARNING — OG image renders without Inter** — `app/opengraph-image.tsx` calls `new ImageResponse(...)` with no `fonts` parameter. Satori (the engine behind next/og) falls back to Noto Sans — the wordmark and tagline will not render in Inter on OG cards in iMessage, Twitter, WhatsApp. D-38 explicitly requires Inter via the function's `fonts` parameter. Fix: fetch Inter Bold from Google Fonts (or from the `next/font` woff2 URL at build time) and pass it via `{ fonts: [{ name: "Inter", data: interBoldBuffer, weight: 700, style: "normal" }] }` to the `ImageResponse` constructor.

3. **WARNING — Legal pages missing canonical alternates** — `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/support/page.tsx` export no `alternates: { canonical: "..." }`. The live HTML confirms: no `<link rel="canonical">` tag on any legal page. Google may choose alternate URLs (with/without trailing slash, or Vercel preview URLs) as the canonical. D-36/D-37 established canonical patterns for the home page; the same must be applied to all four routes. Fix: add `alternates: { canonical: "/privacy" }` (etc.) to each legal page's metadata export.

---

## Detailed Findings

### Pillar 1: Copywriting (2/4)

**BLOCKER: Title template double-application on all non-home pages**

The root layout (`app/layout.tsx:17-18`) declares:
```
title: { default: "...", template: "%s — İkra" }
```

Every page that exports `title` as a plain string has the template applied on top of the string. Live evidence via curl:

- `/privacy` → `<title>Privacy Policy — İkra — İkra</title>`
- `/terms` → `<title>Terms of Service — İkra — İkra</title>`
- `/support` → `<title>Support — İkra — İkra</title>`
- `/` (home) → `<title>İkra — Quran Verses & Sahih Hadith Widget App</title>` (no double-apply because the home page title happens to match the layout default, and Next.js serves the `default` when the page title equals it exactly — but this is fragile)

Confirmed files:
- `app/privacy/page.tsx:5` — `title: "Privacy Policy — İkra"`
- `app/terms/page.tsx:5` — `title: "Terms of Service — İkra"`
- `app/support/page.tsx:5` — `title: "Support — İkra"`

**Spec compliance for other copy: PASS**

- Hero `<h1>` (`components/Hero.tsx:11`): "Quran Verses & Sahih Hadith on Your Lock Screen" — matches D-07
- Hero subheading (`Hero.tsx:14`): matches D-08 verbatim
- `applicationName`, `description`, OG title/description in `layout.tsx` all match D-36 verbatim
- All 6 feature card titles and descriptions match 02-UI-SPEC.md copywriting contract exactly
- All 6 stat tile labels present and correct
- Store badge aria-labels correct: "Download on the App Store", "Get it on Google Play" (`StoreBadges.tsx:12,36`)
- No generic "Submit / Click Here / OK / Cancel" strings found anywhere
- Footer copyright and nav links intact from Phase 1 spec

---

### Pillar 2: Visuals (3/4)

**Motion implementation: mostly correct**

- `data-motion="hero-fade"` is on the `<section>` root (`Hero.tsx:6`) which is correct per D-31. The watermark `<Image>` is a child of this section (positioned absolute), so it also fades in. This is a minor semantic impurity — the watermark is decorative and ideally would not animate — but the visual effect is acceptable since the watermark is `opacity-[0.06]` and the fade is barely perceptible.
- Feature card hover: `data-motion="feature-card"` on each card (`Features.tsx:62`), `scale(1.01)` + gold ring box-shadow in `globals.css:183`. Matches D-31 exactly.
- Animation timing: `500ms ease-out` (`globals.css:174`) — matches D-31 exactly.
- `animation: ... both` fill-mode is correct (hero is visible on load, stays visible after).

**OG watermark opacity deviation: minor**

D-38 specifies watermark at "~20% opacity". Implementation uses `opacity: 0.18` (`opengraph-image.tsx:50`). This is within the approximate range but is a documented deviation. The OG image endpoint returns 200 with `content-type: image/png` — image is live and functional.

**Showcase strip scroll-behavior:smooth: MISSING**

D-31 specifies "add `scroll-behavior: smooth` on the container." The Showcase strip container (`Showcase.tsx:38`) has no `scroll-smooth` Tailwind class and `globals.css` has no matching rule. Functionally the strip is still swipeable and snapping, but programmatic scroll (if ever triggered) will jump.

**Visual hierarchy: PASS**

Clear focal point (emerald h1), icon-only buttons have aria-labels, shadcn Card components render with correct border and padding. No icon-only interactive elements without accessible labels.

---

### Pillar 3: Color (4/4)

**60/30/10 distribution verified**

- Dominant (60%): `bg-cream` (#F2F2F7) on page body and Hero/Features/Stats sections — correct
- Secondary (30%): `bg-surface-card` (#FFFFFF) on feature cards — correct
- Accent (10%): `text-gold-500` confined to Lucide icons in feature cards, stat dot dividers, card hover border tint, footer link hover — matches Phase 2 spec reserved-for list exactly

**OG card colors: PASS**

`opengraph-image.tsx:29` — `backgroundColor: "#006B3F"` (emerald-600), `color: "#FFFFFF"` (wordmark), `color: "#F2F2F7"` (tagline). Matches D-38.

**Hardcoded colors in components: acceptable**

- `app/layout.tsx:49` — `themeColor: "#006B3F"` — correct and required as a string literal for the `<meta name="theme-color">` tag
- `globals.css:183` — `rgb(212 168 67 / 0.20)` in the feature card hover box-shadow. This is the CSS `space-separated rgb()` modern syntax for gold-500 at 20% opacity. It is semantically equivalent to `gold-500/20` in Tailwind but inline in raw CSS because it's in a CSS rule block, not a class. Acceptable.
- `terms/page.tsx:28,44` — `href="#acceptance"` and `href="#acceptable-use"` are anchor fragment IDs, not color values — false positive from grep pattern.

No undeclared colors or brand palette violations found.

---

### Pillar 4: Typography (3/4)

**Size distribution: within spec**

Five distinct sizes found: `text-xs`, `text-sm`, `text-base`, `text-xl`, `text-2xl`. Spec declares four roles mapping to `text-sm`/`text-base`/`text-xl`/`text-2xl`. The addition of `text-xs` is used in Phase 2 stat tile caption context (`Stats.tsx`) — within the Label role range and acceptable.

**Weight distribution: minor deviation**

Two weights found: `font-semibold`, `font-medium`. The Phase 1+2 spec declares only `400 (regular)` and `600 (semibold)`. `font-medium` (500) appears in `StoreBadges.tsx:13,37` for the custom store badge button labels. This is outside the declared weight set and was not explicitly added to the spec. Visually it is subtle (500 vs 400 on badge text) but represents an undocumented weight in the type system.

**OG image Inter font: MISSING — WARNING**

`app/opengraph-image.tsx` does not pass a `fonts` parameter to `ImageResponse`. Satori renders the wordmark and tagline in its bundled Noto Sans fallback, not Inter. The visual difference is notable at 144px — Inter's tight letterform and slightly condensed style at display sizes is part of the brand identity. D-38 explicitly calls out: "Inter not bundled in `next/og` — load via the function's `fonts` parameter." This was left unimplemented.

**Wordmark size: minor deviation**

D-38 specifies "~120px". Actual: `fontSize: 144` (`opengraph-image.tsx:59`). The spec used "~" approximation, so 144px is within the intended range.

---

### Pillar 5: Spacing (3/4)

**Spacing scale compliance: PASS**

All layout components use declared token-aliased utilities: `py-section`, `px-screen`, `gap-xl`, `gap-md`, `mt-md`, `mt-xl`, `mb-xl`, `mb-sm`, `mb-md`, `p-lg`, `pb-sm`. No arbitrary spacing values found in component files (the single `[0.8rem]` flag was inside `components/ui/button.tsx` — a shadcn-generated file, outside Phase 4 scope).

**scroll-behavior:smooth on Showcase strip: MISSING**

D-31: "add `scroll-behavior: smooth` on the container." Neither `scroll-smooth` class nor a CSS rule targets the Showcase mobile strip container. The `globals.css` has no `scroll-behavior` rule. The strip uses `snap-x snap-mandatory` which is correct; smooth scroll is only relevant for programmatic scroll but was an explicit D-31 deliverable.

**Hero fade scope**

The `data-motion="hero-fade"` attribute is on the section root, which contains the absolutely-positioned watermark as a sibling child. The entire section fades up 12px on load, including the watermark. This is a minor spacing/composition issue: the watermark is decorative and its animation provides no UX value, but it doesn't break layout or create shifting.

**overflow-x-hidden: PASS**

D-35 requires `overflow-x-hidden` on body. Implemented in `globals.css:160` (`@layer base` body rule: `@apply bg-background text-foreground overflow-x-hidden`). The inline `className` in `layout.tsx:59` does not duplicate it, which is correct — no conflict.

---

### Pillar 6: Experience Design (3/4)

**prefers-reduced-motion: PASS**

D-32 is fully implemented. `globals.css:187-197` targets `[data-motion="hero-fade"]` and `[data-motion="feature-card"]` under `@media (prefers-reduced-motion: reduce)`:
- Hero: `animation-duration: 0.001ms !important; animation-iteration-count: 1 !important` — effectively disables fade
- Cards: `transition-duration: 0ms !important; transform: none !important; box-shadow: none !important` — static hover
- Color transitions on links are intentionally NOT suppressed (per D-32: "keep `transition-colors duration-fast` on links")

**Sitemap: PASS**

`app/sitemap.ts` — 4 entries (`/`, `/privacy`, `/terms`, `/support`), correct `changeFrequency`, correct priority split (1.0 home, 0.7 legal). Live `/sitemap.xml` verified.

**robots.txt: PASS**

`app/robots.ts` — `userAgent: "*", allow: "/"`, sitemap URL correct. Live `/robots.txt` verified — no disallow rules, safe for indexing.

**theme-color: PASS**

`app/layout.tsx:49` — `viewport.themeColor: "#006B3F"`. Live HTML confirms `<meta name="theme-color" content="#006B3F">`.

**Twitter card: PASS**

`layout.tsx:39-45` — `summary_large_image`, correct title/description, OG image path reused. Live HTML confirms all twitter card meta tags present.

**Canonical URL — home: minor inconsistency**

`app/page.tsx:9` — `alternates: { canonical: "/" }`. Live renders as `<link rel="canonical" href="https://ikra-web.vercel.app">` (no trailing slash). Sitemap entry for home is `https://ikra-web.vercel.app/` (with trailing slash). Google treats these as equivalent but prefers consistency. WARNING level — not a blocker but should be aligned.

**Canonical URLs — legal pages: MISSING**

`app/privacy/page.tsx`, `app/terms/page.tsx`, `app/support/page.tsx` have no `alternates: { canonical: "..." }` exports. Live HTML confirms: no `<link rel="canonical">` tag on any legal page. The SEO-100 Lighthouse target requires canonical on all pages. This is a direct gap against D-36/D-37 intent.

**OG meta on legal pages: gap**

Legal pages have no page-level OG overrides. The root layout OG title/description remain "İkra — Quran Verses & Sahih Hadith Widget App" on all pages including Privacy Policy, which is technically correct for Phase 4 (D-38: "single OG image, shared across all routes for v1") but the OG title should at minimum reflect the per-page `<title>` — currently the broken template title (`"Privacy Policy — İkra — İkra"`) would be the page title while OG title stays as the home value. Once the title template bug is fixed, OG title will remain as the root default — acceptable for v1.

---

## Registry Safety

`components.json` confirmed — `shadcn_initialized: true`, `registries: {}` (empty object — no third-party registries declared). Phase 2 UI-SPEC confirms only official shadcn blocks (`button`, `card`). No third-party registry audit required. Registry audit: 0 third-party blocks, no flags.

---

## Files Audited

- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `app/opengraph-image.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `app/privacy/page.tsx` (metadata check)
- `app/terms/page.tsx` (metadata check)
- `app/support/page.tsx` (metadata check)
- `components/Hero.tsx`
- `components/Features.tsx`
- `components/Showcase.tsx`
- `components/Stats.tsx`
- `components/StoreBadges.tsx`
- `components/Footer.tsx`
- `components.json`
- `.planning/phases/04-polish-seo-launch-readiness/04-CONTEXT.md`
- `.planning/phases/01-foundation-deployable-skeleton/01-UI-SPEC.md`
- `.planning/phases/02-landing-page-content/02-UI-SPEC.md`
- Live HTML: https://ikra-web.vercel.app/ (curl), /privacy, /terms, /support, /sitemap.xml, /robots.txt
