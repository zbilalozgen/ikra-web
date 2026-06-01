---
phase: 01
created: 2026-06-01
pillars_graded: 6
overall_score: 20/24
baseline: 01-UI-SPEC.md
screenshots: not captured (no dev server detected)
---

# Phase 01 — UI Review

**Phase:** Foundation & Deployable Skeleton
**Audited:** 2026-06-01
**Baseline:** 01-UI-SPEC.md (approved, light-mode only per D-04)
**Screenshots:** Not captured — no dev server at localhost:3000/5173/8080; code-only audit.

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 4/4 | All spec strings match verbatim across all 6 files |
| 2. Visuals | 4/4 | Clear hierarchy, touch target met, clean cream/white separation |
| 3. Color | 3/4 | Three undeclared surface tokens added; gold correctly restricted to hover only |
| 4. Typography | 3/4 | `text-xs` used for copyright falls outside declared 4-role type scale; `leading-tight` (1.25) diverges from spec line-height 1.2 |
| 5. Spacing | 3/4 | `--spacing-xs` (4px) declared in spec but absent from `@theme`; two arbitrary `calc(100vh - *rem)` values in page files |
| 6. Registry Safety | 3/4 | Footer links use `duration-150` hardcoded instead of the `duration-fast` token added in CR-02/WR-02 fix; no registry risk (shadcn not initialized) |

**Overall: 20/24**

---

## Top 3 Priority Fixes

1. **Footer links use `duration-150` instead of `duration-fast`** — The WR-02 fix in 01-REVIEW-FIX.md renamed `--transition-duration-fast` to `--duration-fast` expressly so the utility class `duration-fast` would be generated and used. All three `<Link>` elements in `components/Footer.tsx` (lines 21, 27, 33) still hardcode `duration-150`, defeating the purpose of the token and creating a future drift risk if the spec duration changes. Fix: replace `duration-150` with `duration-fast` on all three links.

2. **`--spacing-xs` (4px) absent from `@theme`** — The UI-SPEC spacing scale (xs=4px, sm=8px...) declares `xs` as the base unit for "icon gaps, inline padding." The CR-02 fix added sm..3xl but omitted xs. Any Phase 2 component needing 4px gaps must either use Tailwind's default `gap-1` (which is 4px only if the default scale is not overridden) or introduce an arbitrary value. Fix: add `--spacing-xs: 4px;` to the `@theme` spacing block in `app/globals.css`.

3. **`text-xs` copyright text falls outside declared type scale** — The UI-SPEC defines four typography roles: Body (text-base/16px), Label (text-sm/14px), Heading (text-xl/20px), Display (text-2xl). The copyright line in `components/Footer.tsx` (line 40) uses `text-xs` (12px), which is a fifth size not declared in the spec. This is not a critical rendering problem but violates the contract. Either add an explicit "Fine Print" role to the spec or change copyright to `text-sm` (Label role).

---

## Detailed Findings

### Pillar 1: Copywriting (4/4)

All UI-SPEC Copywriting Contract strings are implemented verbatim.

| Element | Spec | Implemented | File |
|---------|------|-------------|------|
| Skeleton heading | İkra — Quran Verses & Hadith | Matches | `app/page.tsx:5` |
| Skeleton subheading | Coming soon. | Matches | `app/page.tsx:7` |
| Footer brand mark | İkra | Matches | `components/Footer.tsx:9` |
| Footer tagline | Quran Verses & Sahih Hadith Widget App | Matches | `components/Footer.tsx:13` |
| Footer Privacy link | Privacy Policy | Matches | `components/Footer.tsx:20-22` |
| Footer Terms link | Terms of Service | Matches | `components/Footer.tsx:26-28` |
| Footer Support link | Support | Matches | `components/Footer.tsx:32-34` |
| Footer copyright | © 2025 İkra. All rights reserved. | Matches | `components/Footer.tsx:40` |
| Stub page body | This page is under construction. | Matches (all 3 routes) | `app/privacy/page.tsx:10`, `app/terms/page.tsx:10`, `app/support/page.tsx:10` |

No generic labels ("Submit", "OK", "Cancel"), no sales language found. Tone is appropriate: minimal and reverent. No grepped deviations.

---

### Pillar 2: Visuals (4/4)

Visual hierarchy is clear and appropriate for a walking skeleton:

- **Focal point:** h1 in emerald-600 at font-semibold is immediately the dominant element on cream background. Muted navy-800/70 subheading creates contrast subordination. Correct.
- **Footer separation:** `border-t border-navy-800/10` creates a subtle but present separator between cream page body and white footer surface. Clean.
- **Brand mark touch target:** `min-h-touch` on the brand mark div (`components/Footer.tsx:8`) satisfies the 44px accessibility minimum declared in the spec.
- **No icon-only buttons present** — nothing to audit for aria-labels on icon controls. Footer `<nav>` has `aria-label="Footer"` (WR-03 fix applied).
- **No extraneous visual complexity** — correct for Phase 1 scope. No decorative elements were added beyond spec.

No visual hierarchy violations found.

---

### Pillar 3: Color (3/4)

**WARNING — Three undeclared surface tokens added to `@theme`.**

UI-SPEC declares these light-mode surface tokens:
- `cream` (#F2F2F7) — page background
- `surface.card` (#FFFFFF) — footer surface

Implemented in `app/globals.css` (lines 52-54):
```
--color-surface-warm: #FFF5E6;
--color-surface-card: #FFFFFF;
--color-surface-card-hover: #FFFAF2;
```

`surface-warm` and `surface-card-hover` are not declared in UI-SPEC and were not required by Phase 1 scope. They are unused in Phase 1 components but pollute the token namespace. `surface-card-hover` (#FFFAF2) is a warm off-white that could be confused with `surface-warm` (#FFF5E6) by future developers. These should either be removed or formally added to the spec before Phase 2.

**Accent (gold) correctly restricted:** `hover:text-gold-500` appears only on footer navigation links — not on any structural or decorative element. 0 instances of `text-primary` / `bg-primary` / `border-primary` (no shadcn default color leakage).

**No hardcoded hex values** in any component file. All colors route through `@theme` tokens.

**60/30/10 distribution:** `bg-cream` on body (dominant), `bg-surface-card` on footer (secondary), gold-500 as hover-only accent (accent) — matches spec intent.

---

### Pillar 4: Typography (3/4)

**WARNING — `text-xs` is a fifth size outside the 4-role type scale. `leading-tight` diverges from spec line-height.**

Sizes found in source:

| Class | Resolved | Spec Role | File |
|-------|----------|-----------|------|
| `text-2xl` | 24px (1.5rem) | Display (spec says 28px — see note) | `app/page.tsx:4` |
| `text-xl` | 20px (1.25rem) | Heading | `components/Footer.tsx:8` |
| `text-base` | 16px | Body | `app/page.tsx:7`, stub pages |
| `text-sm` | 14px | Label | `components/Footer.tsx:13,21,27,33` |
| `text-xs` | 12px | **Not declared in spec** | `components/Footer.tsx:40` |

Weights found: `font-semibold` only — correct (spec Heading/Display = semibold; Body/Label = regular implied by absence of weight class, which defaults to 400).

**Note on Display size (24px vs 28px):** The UI-SPEC states "text-2xl=28" in the typography notes. In Tailwind v4, `text-2xl` resolves to `1.5rem = 24px` (confirmed from `node_modules/tailwindcss/theme.css`). The spec annotation is factually wrong about Tailwind v4's value. The implementation used `text-2xl` in good faith following the spec. If the true intent was 28px, a custom `--text-display` token is required. This is a spec error, not an implementation error — but the rendered h1 is 4px smaller than the spec's stated intent.

**Line-height:** `leading-tight` resolves to 1.25 (confirmed from theme.css). Spec declares Display/Heading line-height = 1.2. Deviation of 0.05 is minor but present.

---

### Pillar 5: Spacing (3/4)

**WARNING — `--spacing-xs` missing; two arbitrary calc() values present.**

Spacing tokens defined in `app/globals.css`:
- sm (8px), md (16px), lg (24px), xl (32px), 2xl (48px), 3xl (64px), screen (24px), section (64px), touch (44px)
- **`--spacing-xs` (4px) absent** — declared in UI-SPEC table as the base icon-gap unit, but omitted from the CR-02 fix and the current `@theme` block.

Spacing token usage in components:
- `gap-md`, `px-screen`, `py-section`, `py-xl`, `mt-sm`, `min-h-touch` — all resolve to spec-defined tokens. Correct.
- `mx-auto`, `max-w-5xl`, `min-h-screen` — Tailwind defaults, acceptable.

Arbitrary values found:

| Value | File | Issue |
|-------|------|-------|
| `min-h-[calc(100vh-4rem)]` | `app/page.tsx:3` | Hardcoded `4rem` — assumes footer height; fragile |
| `min-h-[calc(100vh-8rem)]` | `app/privacy/page.tsx:9`, `app/terms/page.tsx:9`, `app/support/page.tsx:9` | Hardcoded `8rem` — assumes header+footer height; `8rem` not in spacing scale |

These values are functional but use arbitrary rem measurements outside the declared spacing scale. They should reference the touch/section tokens or be replaced with a flex-grow layout strategy.

---

### Pillar 6: Registry Safety / Experience Design (3/4)

**WARNING — `duration-fast` token unused in Footer links despite WR-02 fix wiring it.**

**Registry audit:** `components.json` not present — shadcn not initialized. No third-party blocks. Registry safety: clean.

**Interaction contract compliance:**

| Spec requirement | Implementation | Status |
|-----------------|----------------|--------|
| Footer links: `hover:text-gold-500` | `hover:text-gold-500` on all 3 links | PASS |
| Transition at 150ms (`transition-fast`) | `duration-150` hardcoded — `duration-fast` token unused | FAIL |
| `transition-colors` property | Present on all 3 links | PASS |
| Brand mark: static, no interaction | Correct — no Link/button wrapping brand mark | PASS |

The WR-02 fix (commit 1cd13be) renamed `--transition-duration-fast` to `--duration-fast` specifically to generate the `duration-fast` utility class. The intent was to replace hardcoded `duration-150` with the semantic token. That replacement was not applied. The behavior is identical at runtime (both produce 150ms) but the semantic token is now orphaned — it generates a CSS utility class that nothing consumes.

**State coverage:** Phase 1 has no interactive states beyond link hover. No loading, error, or empty states are in scope per UI-SPEC ("Build error state: Not applicable"). Full coverage for defined scope.

---

## Recommendations

### Must fix before Phase 2 starts

1. **`components/Footer.tsx` lines 21, 27, 33** — Replace `duration-150` with `duration-fast` on all three `<Link>` elements. The token exists; it just isn't consumed.

2. **`app/globals.css` spacing block** — Add `--spacing-xs: 4px;` after the `@theme` block open. The spec declares it; it's missing.

### Fix before Phase 2 uses the type scale

3. **`components/Footer.tsx` line 40** — Change `text-xs` to `text-sm` (Label role) on the copyright paragraph, or formally add a "Fine Print / text-xs" role to 01-UI-SPEC.md before Phase 2 inherits the scale.

4. **`app/globals.css` surface tokens** — Remove `--color-surface-warm` and `--color-surface-card-hover` or add them to the spec. They are unused in Phase 1 and undeclared.

### Spec correction (not an implementation fix)

5. **01-UI-SPEC.md typography note** — The annotation "text-2xl=28" is wrong; Tailwind v4 `text-2xl` = 24px. If Display role must be 28px, add `--text-display: 1.75rem` to `@theme` and use it explicitly. Otherwise correct the spec annotation to read "text-2xl=24px" and accept the 24px size as-is.

---

## Files Audited

- `app/globals.css`
- `app/layout.tsx`
- `app/page.tsx`
- `app/privacy/page.tsx`
- `app/terms/page.tsx`
- `app/support/page.tsx`
- `components/Footer.tsx`
- `.planning/phases/01-foundation-deployable-skeleton/01-UI-SPEC.md`
- `.planning/phases/01-foundation-deployable-skeleton/01-CONTEXT.md`
- `.planning/phases/01-foundation-deployable-skeleton/01-REVIEW-FIX.md`
- `node_modules/tailwindcss/theme.css` (Tailwind v4 default token values)
