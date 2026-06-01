---
phase: 01-foundation-deployable-skeleton
reviewed: 2026-06-01T00:00:00Z
depth: standard
files_reviewed: 12
files_reviewed_list:
  - app/globals.css
  - app/layout.tsx
  - app/page.tsx
  - app/privacy/page.tsx
  - app/terms/page.tsx
  - app/support/page.tsx
  - components/Footer.tsx
  - next.config.ts
  - eslint.config.mjs
  - postcss.config.mjs
  - tsconfig.json
  - package.json
findings:
  critical: 2
  warning: 3
  info: 2
  total: 7
status: fixed
created: 2026-06-01
---

# Phase 01: Code Review Report

**Reviewed:** 2026-06-01
**Depth:** standard
**Files Reviewed:** 12
**Status:** issues_found

---

## Summary

| Severity | Count | Files Affected |
|----------|-------|----------------|
| Critical | 2 | `app/globals.css`, `app/layout.tsx` + all consumer files |
| Warning | 3 | `app/globals.css`, `components/Footer.tsx`, `app/page.tsx` |
| Info | 2 | `app/globals.css`, `components/Footer.tsx` |

Two ship-blockers exist. CR-01 means the Inter font is never actually applied — the body renders in the system sans-serif stack despite the `next/font` setup. CR-02 means every layout utility that uses a named spacing token (`px-screen`, `py-section`, `gap-md`, `py-xl`, `mt-sm`) silently produces no CSS — padding, gap, and margin are absent on every page and the footer, breaking visual structure. Both issues will be invisible in a dev-mode build that hot-reloads class names but produce broken output in any accurate CSS audit.

---

## Critical Issues

### CR-01: Inter font loaded but never applied — body renders in system fonts

**File:** `app/layout.tsx:8,23` / `app/globals.css` (no mapping)

**Issue:** `next/font` injects `--font-inter` as a CSS custom property scoped to the `<html>` element via `inter.variable`. The body then applies `font-sans`. In Tailwind v4, `font-sans` resolves to the built-in `--font-sans` token (`ui-sans-serif, system-ui, sans-serif, …`) — it does NOT pick up `--font-inter` automatically. No `@theme` rule maps `--font-sans` to `var(--font-inter)`, so Inter is loaded (network cost paid) but the fallback system font stack renders instead. Every page displays in system-ui, not Inter.

**Fix:** Add a mapping in `app/globals.css` inside the `@theme` block:

```css
@theme {
  /* Wire next/font Inter variable to Tailwind's font-sans utility */
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';

  /* … existing color tokens … */
}
```

This ensures `font-sans` (used on `<body>`) resolves to Inter with the correct system fallback stack.

---

### CR-02: Undefined spacing tokens — padding, gap, and margin silently absent on every page

**File:** `app/page.tsx:3`, `app/privacy/page.tsx:9`, `app/terms/page.tsx:9`, `app/support/page.tsx:9`, `components/Footer.tsx:6,18,40`

**Issue:** The following Tailwind utility classes are used throughout but their backing CSS custom properties are never defined in `app/globals.css` or anywhere else:

| Class | Expected token | Defined in `@theme`? |
|-------|---------------|----------------------|
| `px-screen` | `--spacing-screen` | No |
| `py-section` | `--spacing-section` | No |
| `gap-md` | `--spacing-md` | No |
| `py-xl` | `--spacing-xl` | No |
| `mt-sm` | `--spacing-sm` | No |

In Tailwind v4 the JIT engine generates utilities only for tokens that exist. An undefined `--spacing-md` means `.gap-md` produces no CSS rule at all — no fallback, no error, just missing spacing. Every page section and the footer have zero padding, zero gap, and zero margin-top where the spec requires them. Note: `min-h-touch` is the one exception — `--spacing-touch: 44px` IS defined and works correctly.

**Fix:** Add the missing spacing aliases to the `@theme` block in `app/globals.css`:

```css
@theme {
  /* … color tokens … */

  /* ── Spacing Aliases ────────────────────────────────────────────────── */
  --spacing-sm:      8px;   /* gap-sm, mt-sm, mb-sm, etc. */
  --spacing-md:     16px;   /* gap-md, px-md, py-md, etc. */
  --spacing-lg:     24px;   /* gap-lg, px-lg, py-lg, etc. */
  --spacing-xl:     32px;   /* py-xl, etc. */
  --spacing-2xl:    48px;
  --spacing-3xl:    64px;
  --spacing-screen: 24px;   /* px-screen — horizontal page inset */
  --spacing-section: 64px;  /* py-section — vertical section padding */
  --spacing-touch:  44px;   /* min-h-touch — already present, keep */
}
```

Verify each value against the UI-SPEC spacing table (sm=8px, md=16px, lg=24px, xl=32px, 2xl=48px, 3xl=64px). The `screen` and `section` values need product confirmation — use the closest UI-SPEC equivalents until confirmed.

---

## Warnings

### WR-01: Navy color ramp (50–500) is copy-pasted from Tailwind's default blue palette

**File:** `app/globals.css:29-34`

**Issue:** `--color-navy-50` through `--color-navy-500` are identical to Tailwind v4's built-in `blue-50` through `blue-500` (`#EFF6FF`, `#DBEAFE`, `#BFDBFE`, `#93C5FD`, `#60A5FA`, `#3B82F6`). The brand navy is a dark, desaturated blue-navy (`navy-800: #1B2A4A`), not a generic sky-blue. Using generic blue values for the lighter navy shades means any future usage of `text-navy-400` or `bg-navy-200` renders in a mismatched hue family rather than the brand navy family. The source of truth (`wip-muslim/tailwind.config.js`) should be re-consulted — these light shades should be desaturated, dark-navy-tinted variants, not pure blue.

**Fix:** Cross-reference `/Users/zbilalozgen/repos/wip-muslim/tailwind.config.js` for the correct navy-50 through navy-500 values. If those shades are genuinely unused in v1, leave them with a comment noting they are placeholders pending verification rather than silently shipping wrong values.

---

### WR-02: Orphaned `--transition-duration-fast` token generates no utility class

**File:** `app/globals.css:52`

**Issue:** `--transition-duration-fast: 150ms` is declared in `@theme` but Tailwind v4 generates `duration-*` utilities from `--duration-*` tokens, not `--transition-duration-*` tokens. The declared name does not match the Tailwind v4 naming convention, so no `duration-fast` utility class is generated. The token is dead weight. Meanwhile the footer uses hardcoded `duration-150` (which works because Tailwind v4 has `--default-transition-duration` at 150ms and ships `duration-150` by default), making the `@theme` declaration redundant regardless.

**Fix — option A (remove the dead token):**
```css
/* Remove this line from @theme: */
/* --transition-duration-fast: 150ms; */
```

**Fix — option B (rename to generate a real utility):**
```css
--duration-fast: 150ms;
```
Then use `duration-fast` in components instead of hardcoded `duration-150`.

---

### WR-03: Footer `<nav>` missing `aria-label` — two landmarks with no distinguishing label

**File:** `components/Footer.tsx:18`

**Issue:** The footer contains a `<nav>` element with no `aria-label`. When assistive technologies enumerate page landmarks they will expose two unlabeled navigation regions (the implicit page `<nav>` in layouts where one exists, plus this footer nav). Screen reader users cannot distinguish footer navigation from primary navigation without a label.

**Fix:**
```tsx
<nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-md">
```

---

## Info

### IN-01: Copyright year is 2025 but the current date is 2026

**File:** `components/Footer.tsx:41`

**Issue:** `© 2025 İkra. All rights reserved.` — the year is already stale (today is 2026-06-01). This matches the UI-SPEC copy exactly (the spec was written with 2025), but the spec itself needs updating. A hardcoded year will always drift.

**Fix (short-term):** Update to `© 2026 İkra. All rights reserved.` for accuracy. Long-term, use a JS expression so the year stays current:

```tsx
<p className="text-xs text-navy-800/60 mt-sm">
  © {new Date().getFullYear()} İkra. All rights reserved.
</p>
```

---

### IN-02: `--color-surface-warm` and `--color-surface-card-hover` defined but unused in Phase 1

**File:** `app/globals.css:44,46`

**Issue:** Two surface tokens — `--color-surface-warm: #FFF5E6` and `--color-surface-card-hover: #FFFAF2` — are defined in `@theme` but not referenced in any component in this phase. They are forward-declared speculative tokens. This is not a bug, but they add surface area to the token system without being validated by real usage.

**Fix:** No action required for Phase 1. Document intended usage in a comment or defer to the phase that first consumes them, to avoid confusion for future contributors:

```css
/* Reserved for Phase 2 card hover states */
--color-surface-warm: #FFF5E6;
--color-surface-card-hover: #FFFAF2;
```

---

_Reviewed: 2026-06-01_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
