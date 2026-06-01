---
phase: 2
slug: landing-page-content
created: 2026-06-01
pillars_graded: 6
overall_score: 18/24
screenshots: not captured (no local dev server — code-only audit; live site at https://ikra-web.vercel.app/)
baseline: .planning/phases/02-landing-page-content/02-UI-SPEC.md (approved 2026-06-01)
---

# Phase 2 — UI Review

**Audited:** 2026-06-01
**Baseline:** 02-UI-SPEC.md (approved)
**Screenshots:** Not captured — no dev server on ports 3000/5173/8080. Code-only audit. Live site: https://ikra-web.vercel.app/

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 3/4 | All locked copy matches; badge SVGs are custom recreations, not official Apple/Google assets |
| 2. Visuals | 3/4 | Layout, watermark, and phone-frame patterns correct; shadcn Card double-border leaks through |
| 3. Color | 4/4 | 60/30/10 split respected; accent usage confined to spec-declared elements; no hardcoded brand hex outside badge SVGs |
| 4. Typography | 3/4 | All four roles applied correctly; `font-medium` from shadcn card.tsx base leaks into CardTitle (not used here but present in bundle) |
| 5. Spacing | 4/4 | All spacing via spec tokens; no arbitrary px/rem values in product components; section container pattern exact |
| 6. Experience Design | 4/4 | Hover states on cards and badges correct; interactions follow spec; static content has no loading/error requirements |

**Overall: 18/24**

---

## Top 3 Priority Fixes

1. **WARNING — shadcn Card `ring-1 ring-foreground/10` double-border** — The shadcn Card default class string includes `ring-1 ring-foreground/10`. Features.tsx overrides the background and border color but does not cancel the ring. On screen the card renders with both `border border-navy-800/10` (from the className prop) AND a `ring-1 ring-foreground/10` outline. This produces a doubled border that deviates from the spec's single `border border-navy-800/10`. Fix: add `ring-0` or `shadow-none` (if ring is rendered via shadow) to the Card className in Features.tsx, or switch from `<Card>` to a plain `<div>` since the shadcn Card primitive conflicts with the spec's custom border contract.

2. **WARNING — Store badge SVGs are custom recreations, not official Apple/Google marketing assets** — The spec requires "Official Apple + Google marketing SVGs — do NOT modify color, shape, or proportions." `StoreBadges.tsx` contains hand-drawn SVG paths (e.g., the Apple logo glyph at line 33 uses a non-official simplified path; the Google Play icon at lines 96-99 uses four geometric shapes that approximate the logo but are not the trademarked assets). Using unofficial badge artwork violates Apple's and Google's badge guidelines and risks App Store rejection or takedown notice. Fix: download the official SVG badge files from Apple's Marketing Resources page and Google Play's badge assets page and replace the hand-drawn paths verbatim.

3. **WARNING — shadcn Card `flex flex-col gap-4` default conflicts with child margin strategy** — The shadcn Card base class includes `flex flex-col gap-4` (16px gap between all direct children). Features.tsx card children also apply `mb-md` (16px) on the icon wrapper div and `mb-sm` (8px) on h3. With both flex gap and margin-bottom active, spacing between the icon and h3 becomes 16px (gap) + 16px (mb-md) = 32px, and between h3 and description 16px (gap) + 8px (mb-sm) = 24px. This inflates card height and creates inconsistent internal rhythm. Fix: remove `mb-md` from the icon wrapper and `mb-sm` from h3, letting the Card's `gap-4` (or override to `gap-md`) control all child spacing, OR add `gap-0` to the Card className and keep the explicit margins.

---

## Detailed Findings

### Pillar 1: Copywriting (3/4)

**PASS — All locked copy matches verbatim:**
- Hero h1: "Quran Verses & Sahih Hadith on Your Lock Screen" — exact match (Hero.tsx:11)
- Hero subheading: "Authentic verses and Sahih hadith, refreshed throughout the day — quietly present on your home and lock screens." — exact match (Hero.tsx:14)
- Section headers: "What İkra Offers" (Features.tsx:55), "See It in Action" (Showcase.tsx:34), "By the Numbers" (Stats.tsx:14) — all exact match including capital I in "In"
- All 6 feature titles and descriptions match spec verbatim (Features.tsx:12-49)
- All 6 stat values and captions match spec: "6 Reciters", "6,236 Verses", "99 Names" / "of Allah", "6 Languages", "Offline" / "Always available", "Free" / "Forever" (Stats.tsx:1-8)
- Badge aria-labels: "Download on the App Store" (StoreBadges.tsx:6), "Get it on Google Play" (StoreBadges.tsx:70) — exact match
- Screenshot alt text: all 4 alts match spec exactly (Showcase.tsx:3-13)
- TODO comments present: "TODO(launch): fill App Store URL" and "TODO(launch): fill Google Play URL" (StoreBadges.tsx:4, 68)
- Tone: reverent throughout; no FOMO language, no "Download now", no sales imperatives confirmed

**WARNING — Badge SVG inner text diverges from official format:**
- Apple badge renders "Download on the" + "App Store" as SVG `<text>` elements drawn in Inter (or system sans). Official Apple badge uses San Francisco / Helvetica Neue at specific tracked sizes with Apple's exact layout geometry. The text positioning and font choice are non-standard.
- Google Play badge renders "GET IT ON" + "Google Play" — official badge uses the Roboto wordmark at specific weight; custom SVG uses a generic system sans-serif. Not a copy violation per se (the words are correct), but the visual output does not match official badge guidelines.
- Score deducted from 4 to 3 because the spec explicitly requires official SVGs unmodified, and what is shipped is a hand-authored approximation.

---

### Pillar 2: Visuals (3/4)

**PASS — Layout structure:**
- Hero section root `relative overflow-hidden py-section` — exact match (Hero.tsx:6)
- Two-column grid `grid grid-cols-1 md:grid-cols-2 gap-xl items-center` — exact match (Hero.tsx:8)
- Phone image: `rotate-3 drop-shadow-xl`, width=280, height=560, `priority` — exact match (Hero.tsx:25-31)
- Watermark: `absolute top-0 right-0 opacity-[0.06] pointer-events-none`, width=320, height=320, `alt=""`, `aria-hidden="true"` — exact match (Hero.tsx:37-44)
- Showcase PhoneFrame: `rounded-3xl border-4 border-navy-800/10 shadow-sm overflow-hidden snap-start flex-shrink-0` — exact match (Showcase.tsx:18)
- Showcase mobile strip: `flex overflow-x-auto snap-x snap-mandatory gap-md pb-sm lg:hidden` — exact match (Showcase.tsx:38)
- Showcase desktop grid: `hidden lg:grid grid-cols-4 gap-md` — exact match (Showcase.tsx:44)
- All 4 screenshot images present in public/screenshots/ and watermark-glyph.png present in public/

**WARNING — shadcn Card double-border:**
- The `<Card>` primitive (card.tsx:15) injects `ring-1 ring-foreground/10` as a default class. This renders a 1px outline separate from the `border border-navy-800/10` applied via className override. On screen, feature cards have two visible borders: one from `ring-1` (using --foreground/10 ≈ a gray at 10% opacity) and one from `border-navy-800/10`. The visual effect is a slightly blurry doubled card edge. The spec only specifies a single border. The fix is to add `ring-0` to the Card className string in Features.tsx:62.
- Score deducted from 4 to 3 for this unintended visual artifact.

**INFO — No hover scale transform confirmed:**
- Features.tsx card hover is `hover:border-gold-500/30 hover:bg-surface-card-hover transition-colors duration-fast` — no scale transform, matching spec interaction contract.

---

### Pillar 3: Color (4/4)

**Gold-500 usage — confined to spec-declared elements:**
- Feature card icons: `text-gold-500` (Features.tsx:65) — spec-declared
- Stats dot dividers: `text-gold-500` (Stats.tsx:34) — spec-declared
- Feature card hover border: `hover:border-gold-500/30` (Features.tsx:62) — spec-declared
- Footer link hover: `hover:text-gold-500` (Footer.tsx:21, 27, 33) — spec-declared (inherited Phase 1)
- Total gold-500 usage: 4 unique element classes — well within the accent 10% budget

**Emerald-600 usage:**
- Hero h1: `text-emerald-600` (Hero.tsx:11) — spec-declared
- Stat numbers: `text-emerald-600` (Stats.tsx:21) — spec-declared
- Footer brand mark: `text-emerald-600` (Footer.tsx:8) — Phase 1 inherited, spec-consistent

**Navy-800 usage:**
- Body text, section headers, feature card text, hero subheading, borders — all using specified opacity variants (/80, /70, /10) consistent with spec

**Background distribution:**
- `bg-cream` on body (layout.tsx:24), Hero (inherits), Features (Features.tsx:53), Stats (Stats.tsx:12) — dominant 60%
- `bg-surface-card` on footer and feature cards — secondary 30%
- Showcase section has no explicit bg, correctly inheriting body bg-cream

**Hardcoded hex:**
- StoreBadges.tsx contains #000000, #A6A6A6, #FFFFFF, #EA4335, #FBBC04, #34A853, #4285F4 — these are inside official badge SVG markup and are the Apple/Google brand colors required by their guidelines. The spec explicitly sanctions this ("do NOT modify color, shape, or proportions"). Not a violation.
- No hardcoded brand hex (#006B3F, #D4A843, #1B2A4A) found outside globals.css token definitions.

**INFO — globals.css `.dark` block:**
- A `.dark {}` CSS variable block (lines 154-186) was injected by `npx shadcn init`. No `.dark` class is applied anywhere in the application HTML. The block is inert dead CSS. Per the scope note in this audit, this is INFO only, not a D-04 violation.

---

### Pillar 4: Typography (3/4)

**Font sizes in use across product components:**
- `text-2xl` (28px Display) — Hero h1, Stats number/word: 2 occurrences — correct
- `text-xl` (20px Heading) — Features h2/h3, Showcase h2, Stats h2, Footer brand: 6 occurrences — correct
- `text-base` (16px Body) — Hero subheading, feature descriptions: 6 occurrences — correct
- `text-sm` (14px Label) — Stats captions, footer text: 10 occurrences — correct
- `text-xs` — 1 occurrence (unrelated to product components; not found in marketing components)
- Total distinct sizes: 4 (Display/Heading/Body/Label) — matches spec's 4-role system

**Font weights:**
- `font-semibold` — h1, h2, h3, stat numbers, footer brand: 7 occurrences — correct
- `font-medium` — 2 occurrences in `components/ui/card.tsx` and `components/ui/button.tsx` base classes (CardTitle and Button defaults) — these shadcn primitives are not used in their default form (no CardTitle, CardHeader, or Button rendered in any marketing component), so font-medium does not appear in rendered output

**Roles mapped correctly:**
- Display (text-2xl font-semibold leading-tight): Hero h1 (Hero.tsx:11), stat values (Stats.tsx:21) — correct
- Heading (text-xl font-semibold leading-tight): all section h2s and feature h3s — correct
- Body (text-base leading-relaxed): hero subheading, feature descriptions — correct
- Label (text-sm): stat captions (navy-800/70), footer links and tagline — correct

**WARNING — font-medium in shadcn primitives:**
- card.tsx:41 includes `font-medium` in CardTitle default. button.tsx:7 includes `font-medium` in Button default. Neither CardTitle nor Button is used in the marketing page, so this is not a rendered violation. However, if a future component inadvertently uses `<CardTitle>` or `<Button>`, an undeclared font weight would appear. Score stays at 3 (WARNING) for the unvetted weight present in the component bundle.

**Font chain:**
- `next/font/google` injects `--font-inter`; `@theme` maps `--font-sans: var(--font-inter),...`; `<html className={inter.variable}>` activates the variable; body `font-sans` applies Inter. Chain is valid. Note: `layout.tsx` names the variable `--font-inter` but spec states `--font-sans`. The chain resolves correctly because globals.css maps `--font-sans` to `var(--font-inter)`. No breakage.

---

### Pillar 5: Spacing (4/4)

**Token usage across all marketing components — full compliance:**

| Token | Expected Usage | Actual Usage | Status |
|-------|---------------|--------------|--------|
| `py-section` (64px) | All section roots | Hero.tsx:6, Features.tsx:53, Showcase.tsx:32, Stats.tsx:12 | PASS |
| `max-w-6xl mx-auto px-screen` | Container pattern | All 4 sections + app/privacy/terms/support | PASS |
| `gap-xl` (32px) | Feature grid gap, hero grid gap | Features.tsx:58, Hero.tsx:8 | PASS |
| `p-lg` (24px) | Feature card padding | Features.tsx:62 | PASS |
| `mb-xl` (32px) | Section headers mb | Features.tsx:55, Showcase.tsx:34, Stats.tsx:14 | PASS |
| `gap-md` (16px) | Badge gap, showcase gap, stats row | Hero.tsx:18, Showcase.tsx:38/44, Stats.tsx:17, Footer | PASS |
| `mt-md` (16px) | Hero subheading top margin | Hero.tsx:14 | PASS |
| `mt-xl` (32px) | StoreBadges row top margin | Hero.tsx:18 | PASS |
| `mb-sm` (8px) | Feature h3 bottom margin | Features.tsx:67 | PASS |
| `mb-md` (16px) | Icon wrapper bottom margin | Features.tsx:64 | PASS |
| `pb-sm` (8px) | Showcase strip scroll padding | Showcase.tsx:38 | PASS |
| `mt-xs` (4px) | Stat caption top margin | Stats.tsx:25 | PASS |
| `min-h-touch` (44px) | Badge minimum height | StoreBadges.tsx:8, 72 | PASS |

**Arbitrary values:** Only `opacity-[0.06]` found (Hero.tsx:43, watermark) — this is spec-required and is an opacity value, not a spacing value. No arbitrary `px` or `rem` spacing found in product components.

**Footer deviation:** Footer uses `max-w-5xl` instead of `max-w-6xl` (Phase 1 pattern, pre-existing, out of scope for Phase 2 audit).

---

### Pillar 6: Experience Design (4/4)

**Interaction compliance:**
- Feature card hover: `hover:border-gold-500/30 hover:bg-surface-card-hover transition-colors duration-fast` (Features.tsx:62) — spec requires `duration-fast` (150ms), `border-gold-500/30`, `bg-surface-card-hover`; all three present. No scale transform. PASS
- Store badge hover: `transition-opacity duration-fast hover:opacity-90` (StoreBadges.tsx:8, 72) — spec requires `opacity-90` at `duration-fast`; exact match. PASS
- Footer link hover: `hover:text-gold-500 transition-colors duration-fast` (Footer.tsx:21, 27, 33) — Phase 1 inherited pattern, correct. PASS
- Watermark: `pointer-events-none` (Hero.tsx:43) — no interaction, spec-required. PASS
- Showcase strip: `overflow-x-auto snap-x snap-mandatory` (Showcase.tsx:38) — native scroll, no JS carousel, spec-required. PASS

**State coverage:**
- Loading states: Not required — all content is static, no async data. PASS
- Error boundaries: Not required — static marketing page with no runtime user-facing errors. PASS
- Empty states: Not required — no dynamic lists. PASS
- Destructive actions: None in Phase 2. PASS

**Accessibility:**
- Badge aria-labels present and correct: "Download on the App Store", "Get it on Google Play" (StoreBadges.tsx:6, 70)
- Stat dot dividers: `aria-hidden="true"` (Stats.tsx:34) — correct
- Watermark: `alt=""` + `aria-hidden="true"` (Hero.tsx:39-40) — correct
- Footer nav: `aria-label="Footer"` (Footer.tsx:18) — inherited, correct
- Hero image `priority` set — CLS prevention for above-fold asset. PASS
- Showcase images have no `priority` — correct per spec (lazy)

**INFO — TODO comments for launch:**
- Both store badge hrefs are `#` with `{/* TODO(launch): fill App Store URL */}` comments (StoreBadges.tsx:4, 68). Correct per D-09 and spec contract.

---

## Registry Safety

shadcn initialized: yes (`components.json` present, `components/ui/` contains `button.tsx` and `card.tsx`)
Third-party registries declared in UI-SPEC.md: none
Registry audit: 0 third-party blocks checked. No flags. Shadcn official `button` + `card` only.

---

## Files Audited

| File | Role |
|------|------|
| `/app/page.tsx` | Section composition |
| `/app/layout.tsx` | Font wiring, global bg, body classes |
| `/app/globals.css` | Token definitions, @theme, @layer base, .dark block |
| `/components/Hero.tsx` | Hero section |
| `/components/Features.tsx` | Feature cards grid |
| `/components/Showcase.tsx` | Screenshot strip / grid |
| `/components/Stats.tsx` | Stat tile row |
| `/components/StoreBadges.tsx` | Apple / Google badge SVGs |
| `/components/Footer.tsx` | Global footer (Phase 1, unchanged) |
| `/components/ui/card.tsx` | shadcn Card primitive |
| `/components/ui/button.tsx` | shadcn Button primitive |
| `/.planning/phases/02-landing-page-content/02-UI-SPEC.md` | Design contract |
| `/.planning/phases/02-landing-page-content/02-CONTEXT.md` | Implementation decisions |
| `/.planning/phases/01-foundation-deployable-skeleton/01-UI-SPEC.md` | Inherited base system |
