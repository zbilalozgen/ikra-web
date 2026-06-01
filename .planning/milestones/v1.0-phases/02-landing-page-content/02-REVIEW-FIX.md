---
phase: 02-landing-page-content
fixed_at: 2026-06-01T00:00:00Z
review_path: .planning/phases/02-landing-page-content/02-REVIEW.md
iteration: 1
findings_in_scope: 8
fixed: 8
skipped: 0
status: all_fixed
---

# Phase 02: Code Review Fix Report

**Fixed at:** 2026-06-01
**Source review:** .planning/phases/02-landing-page-content/02-REVIEW.md
**Iteration:** 1

**Summary:**
- Findings in scope: 8 (CR-01, CR-02, WR-01, WR-02, WR-03, WR-04, WR-05, IN-02)
- Fixed: 8
- Skipped: 0

## Fixed Issues

### CR-01: Fabricated Store Badge SVGs Violate Apple and Google Brand Guidelines

**Files modified:** `components/StoreBadges.tsx`
**Commit:** 6ea54fa
**Applied fix:** Replaced both hand-drawn SVG badge approximations with clearly-labeled placeholder pill buttons (`bg-navy-800 text-cream rounded-full px-lg py-md`). Added prominent file-header comment block directing to official Apple/Google badge resources. Kept `href="#"`, `aria-label`, and `aria-hidden="true"` on SVGs. Removed outer fragments (resolves IN-01 as a side effect).

---

### CR-02: Feature Cards Render with Double Outline (ring-1 + border Coexist)

**Files modified:** `components/Features.tsx`
**Commit:** 64e8654
**Applied fix:** Added `ring-0` to each Card's className to cancel shadcn's base `ring-1 ring-foreground/10`. Combined with WR-01 fix in same commit.

---

### WR-01: Card Base `gap-4` + Child Margin Classes Cause Double Spacing

**Files modified:** `components/Features.tsx`
**Commit:** 64e8654
**Applied fix:** Added `gap-0` to Card className alongside `ring-0`, neutralizing the shadcn `flex flex-col gap-4` so child `mb-md`/`mb-sm` margins control spacing exclusively as the spec intends.

---

### WR-02: Showcase Dual-DOM Pattern Exposes Duplicate Image Descriptions

**Files modified:** `components/Showcase.tsx`
**Commit:** 39b0461
**Applied fix:** Added `aria-hidden="true"` to the mobile `lg:hidden` flex strip. Desktop grid remains the accessible copy with all alt text intact.

---

### WR-03: Hero Section Root Missing `bg-cream`

**Files modified:** `components/Hero.tsx`
**Commit:** f45dba1
**Applied fix:** Added `bg-cream` to the Hero section root className, matching Features and Stats which already declare it explicitly.

---

### WR-04: `.dark` Block in `globals.css` Contradicts D-04 Light-Mode-Only Constraint

**Files modified:** `app/globals.css`
**Commit:** 0cc12e0
**Applied fix:** Removed the entire `.dark { ... }` block (33 lines of variable remaps) and the `@custom-variant dark` declaration. The `:root` block and all other tokens are preserved for shadcn primitive compatibility.

---

### WR-05: StoreBadge SVGs Have Contradictory `role="img"` and `aria-hidden="true"`

**Files modified:** `components/StoreBadges.tsx`
**Commit:** 6ea54fa
**Applied fix:** Resolved as part of CR-01 rewrite. New placeholder SVGs have only `aria-hidden="true"` and `focusable="false"` — no `role="img"`. Parent `<a>` retains the descriptive `aria-label`.

---

### IN-02: `package.json` Lists `shadcn` as a Runtime Dependency

**Files modified:** `package.json`
**Commit:** c00c9ac
**Applied fix:** Moved `"shadcn": "^4.10.0"` from `dependencies` to `devDependencies`.

---

## Skipped Issues

None — all findings were fixed.

---

**Build verification:** `npm run build` exits 0 with all 7 routes generating successfully after all fixes applied.

---

_Fixed: 2026-06-01_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
