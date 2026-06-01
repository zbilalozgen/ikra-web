---
phase: 02-landing-page-content
reviewed: 2026-06-01T00:00:00Z
depth: standard
files_reviewed: 10
files_reviewed_list:
  - components/Hero.tsx
  - components/Features.tsx
  - components/Showcase.tsx
  - components/Stats.tsx
  - components/StoreBadges.tsx
  - app/page.tsx
  - app/globals.css
  - components/ui/button.tsx
  - components/ui/card.tsx
  - package.json
findings:
  critical: 2
  warning: 5
  info: 3
  total: 10
status: fixed
---

# Phase 02: Code Review Report

**Reviewed:** 2026-06-01
**Depth:** standard
**Files Reviewed:** 10
**Status:** issues_found

---

## Summary

Phase 2 delivers a structurally sound static marketing page. Section composition, heading hierarchy, CLS-safe images, spacing token usage, and dark-mode isolation are all correct. Two blockers require attention before Phase 3 starts: fabricated store badge SVGs that violate Apple/Google brand guidelines, and a double-outline visual defect on feature cards caused by shadcn's Card base `ring-1` not being neutralised when a `border` class is passed in. Five warnings cover compounding margin+gap spacing in feature cards, the duplicate DOM issue in Showcase's CSS-only responsive pattern, missing `bg-cream` on the Hero section root, the contradictory `role="img"` + `aria-hidden` on badge SVGs, and the dark-mode CSS block that ships despite D-04 deferral.

---

## Critical Issues

### CR-01: Fabricated Store Badge SVGs Violate Apple and Google Brand Guidelines

**File:** `components/StoreBadges.tsx:10-59` (Apple), `components/StoreBadges.tsx:74-123` (Google)

**Issue:** Both SVG badges are hand-constructed approximations, not the official marketing assets published by Apple and Google. The Apple glyph (`d="M31.8 14.6c..."`) is a custom path reconstruction, not the licensed Apple logo. The Google Play icon is four basic geometric triangles — not the officially curved Play button shape. Both Apple App Store and Google Play badge guidelines explicitly prohibit custom reproductions; non-compliance can cause App Store/Play Store review rejection. The context document (02-CONTEXT.md specifics) states "Apple's official badge guidelines: do not modify the SVG (color, shape, proportions). Same for Google Play."

**Fix:** Replace both custom SVGs with the officially licensed badge images:

- Apple: Download the official "Download on the App Store" SVG/PNG from [Apple Marketing Resources](https://developer.apple.com/app-store/marketing/guidelines/) and place in `public/badges/app-store.svg`. Serve via `<Image>`.
- Google: Download the official "Get it on Google Play" badge from [Google Play Brand Guidelines](https://play.google.com/intl/en_us/badges/) and place in `public/badges/google-play.png`. Serve via `<Image>`.

Replace the inline SVG `<a>` wrappers with:

```tsx
// AppStoreBadge
<a href="#" aria-label="Download on the App Store"
   className="inline-flex items-center min-h-touch transition-opacity duration-fast hover:opacity-90">
  {/* TODO(launch): fill App Store URL */}
  <Image src="/badges/app-store.svg" alt="" aria-hidden="true" width={160} height={48} />
</a>

// GooglePlayBadge
<a href="#" aria-label="Get it on Google Play"
   className="inline-flex items-center min-h-touch transition-opacity duration-fast hover:opacity-90">
  {/* TODO(launch): fill Google Play URL */}
  <Image src="/badges/google-play.png" alt="" aria-hidden="true" width={160} height={48} />
</a>
```

---

### CR-02: Feature Cards Render with Double Outline (ring-1 + border Coexist)

**File:** `components/Features.tsx:60-73` + `components/ui/card.tsx:15`

**Issue:** The shadcn `Card` base class string includes `ring-1 ring-foreground/10` (an inset box-shadow border). `Features.tsx` passes `border border-navy-800/10` in `className`. `tailwind-merge` does not resolve conflicts between `ring-*` and `border` utilities because they target different CSS properties (`box-shadow` vs `border`). Both survive the merge. Every feature card therefore renders with two simultaneous outlines: a semi-transparent ring plus the brand navy/10 border. On hover the `border-gold-500/30` transitions in as a third visible stroke alongside the unchanged ring. This is a visible brand-fidelity defect and was not called for in the UI-SPEC.

**Fix:** Neutralise the Card's ring in the `className` override by adding `ring-0` (or remove it from the base if this project has customised the card primitive):

```tsx
// Features.tsx — add ring-0 to cancel the shadcn base ring
<Card
  key={title}
  className="bg-surface-card border border-navy-800/10 rounded-lg p-lg ring-0 transition-colors duration-fast hover:border-gold-500/30 hover:bg-surface-card-hover"
>
```

Alternatively, edit `components/ui/card.tsx` line 15 and remove `ring-1 ring-foreground/10` from the base class string, since this project uses explicit `border` classes throughout.

---

## Warnings

### WR-01: Card Base `gap-4` + Child Margin Classes Cause Double Spacing Inside Feature Cards

**File:** `components/Features.tsx:64-71`

**Issue:** The shadcn `Card` root renders as `flex flex-col gap-4` (16px gap between all direct children). The feature card children are `<div className="mb-md">` (margin-bottom: 16px), `<h3 className="... mb-sm">` (margin-bottom: 8px), and `<p>`. CSS `gap` and `margin-bottom` accumulate: the icon wrapper gets 16px gap + 16px margin = 32px before the `<h3>`; the `<h3>` gets 16px gap + 8px margin = 24px before `<p>`. The UI-SPEC calls for `mb-md` below icon and `mb-sm` below title, implying those margins alone control the spacing — but the Card's gap doubles it.

**Fix:** Either remove the individual margin classes from children (let `gap-4` from Card handle spacing) or add `gap-0` to the Card's `className` and keep the explicit margins. The spec-defined intent is `mb-md` under icon and `mb-sm` under title, so removing `gap-4` is the cleaner approach:

```tsx
<Card
  key={title}
  className="bg-surface-card border border-navy-800/10 rounded-lg p-lg ring-0 gap-0 transition-colors duration-fast hover:border-gold-500/30 hover:bg-surface-card-hover"
>
  <div className="mb-md">
    <Icon className="w-6 h-6 text-gold-500" />
  </div>
  <h3 className="text-xl font-semibold leading-tight text-navy-800 mb-sm">{title}</h3>
  <p className="text-base leading-relaxed text-navy-800/80">{description}</p>
</Card>
```

---

### WR-02: Showcase Dual-DOM Pattern Exposes Duplicate Image Descriptions to Screen Readers

**File:** `components/Showcase.tsx:38-51`

**Issue:** The Showcase renders the same four `<PhoneFrame>` instances in both a mobile flex strip (`lg:hidden`) and a desktop grid (`hidden lg:grid`). All eight `<Image>` elements are present in the DOM simultaneously; only CSS visibility differs. Screen readers that parse the accessibility tree (including VoiceOver and NVDA) will encounter all eight `alt` strings and may announce them twice in succession. The four distinct `alt` strings are already informative, so this doubles the verbosity.

**Fix:** Add `aria-hidden="true"` to the mobile strip so only the desktop grid is exposed to AT, or vice versa. For a static site with no JS toggling, marking the visually-hidden layer as `aria-hidden` is safe and correct:

```tsx
{/* Mobile: hidden from AT; desktop grid is the accessible copy */}
<div aria-hidden="true" className="flex overflow-x-auto snap-x snap-mandatory gap-md pb-sm lg:hidden">
  {screenshots.map(({ src, alt }) => (
    <PhoneFrame key={src} src={src} alt={alt} />
  ))}
</div>
{/* Desktop: accessible copy */}
<div className="hidden lg:grid grid-cols-4 gap-md">
  {screenshots.map(({ src, alt }) => (
    <PhoneFrame key={src} src={src} alt={alt} />
  ))}
</div>
```

---

### WR-03: Hero Section Root Missing `bg-cream` — Fragile Dependency on Body Background

**File:** `components/Hero.tsx:6`

**Issue:** The Hero section root has `relative overflow-hidden py-section` with no background class. The cream background is inherited from the body. This works today because `layout.tsx` body has `bg-cream`, but it is fragile: any future page that does not share the body's bg, or any wrapper element added between body and `<Hero>`, would expose a white flash or the wrong background. The spec (02-UI-SPEC.md Color table) lists cream as the Hero section background. Features and Stats both explicitly declare `bg-cream`; Hero should too for consistency and resilience.

**Fix:**
```tsx
<section className="relative overflow-hidden py-section bg-cream">
```

---

### WR-04: `globals.css` Ships a `.dark` Rule Block Despite D-04 Light-Mode-Only Constraint

**File:** `app/globals.css:154-186`

**Issue:** The shadcn `init` wrote a full `.dark { ... }` block with remapped CSS variables (e.g., `--background: oklch(0.145 0 0)`, dark card/muted/sidebar tokens). Decision D-04 explicitly deferred dark mode indefinitely. If a user's OS is set to prefer-dark and any code (third-party script, browser extension, future component) adds the `.dark` class to `<html>`, the entire site will flip to a black-background dark scheme with no brand colours. The custom-variant declaration at line 5 (`@custom-variant dark (&:is(.dark *))`) also registers a Tailwind variant that could be accidentally used.

**Fix:** Remove the `.dark { ... }` block (lines 154-186) and the `@custom-variant dark` declaration (line 5) from `globals.css`. If dark mode is revisited in a future phase, it can be restored from the shadcn init template at that time. Note: `dark:` utilities remain in `components/ui/button.tsx` — those are low-risk since Button is not currently rendered on any page, but should also be cleaned up at the same time.

---

### WR-05: StoreBadge SVGs Have Contradictory `role="img"` and `aria-hidden="true"`

**File:** `components/StoreBadges.tsx:16`, `components/StoreBadges.tsx:79`

**Issue:** Each SVG carries both `role="img"` and `aria-hidden="true"`. These are contradictory: `role="img"` declares the element as an image for AT, while `aria-hidden="true"` removes it from the accessibility tree entirely. `aria-hidden` wins per spec, making `role="img"` a dead attribute that adds confusion. The containing `<a>` already has an `aria-label` that fully describes the action, so the SVG should be purely `aria-hidden`.

**Fix:** Remove `role="img"` from both SVG elements. Keep `aria-hidden="true"` (or alternatively keep `role="img"` and add a meaningful `aria-label` to the SVG — but hiding it is cleaner given the parent `<a>` has the label):

```tsx
<svg
  width="160"
  height="48"
  viewBox="0 0 160 48"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
```

---

## Info

### IN-01: `AppStoreBadge` and `GooglePlayBadge` Wrapped in Unnecessary Fragment

**File:** `components/StoreBadges.tsx:3`, `components/StoreBadges.tsx:66`

**Issue:** Each exported function wraps a single `<a>` element in a `<>` fragment. A fragment is only needed when returning multiple sibling elements; here it adds noise with no purpose.

**Fix:** Return the `<a>` directly:
```tsx
export function AppStoreBadge() {
  return (
    <a href="#" ...>
      ...
    </a>
  );
}
```

---

### IN-02: `package.json` Lists `shadcn` as a Runtime Dependency

**File:** `package.json:19`

**Issue:** `"shadcn": "^4.10.0"` appears in `dependencies` (runtime) rather than `devDependencies`. The `shadcn` package is a CLI code generator — it is not imported or required at runtime. Shipping it in `dependencies` increases the production bundle by the weight of the CLI.

**Fix:** Move to `devDependencies`:
```json
"devDependencies": {
  "shadcn": "^4.10.0",
  ...
}
```

---

### IN-03: Card Base Applies `text-sm` to Root; Feature Card Text May Be Affected if `text-base` Child Override Is Lost

**File:** `components/ui/card.tsx:15` / `components/Features.tsx:70`

**Issue:** The Card base class includes `text-sm` for the entire card root. Feature card descriptions use `text-base` on the `<p>` element directly, which overrides the inherited `text-sm` at the child level — so this does not currently cause visible text-size regression. However, it is a latent fragility: any future feature card content that does not explicitly set a font size will silently render at 14px (text-sm) instead of the expected 16px (text-base). This is worth noting since the entire project has a 16px body text baseline.

**Fix:** For clarity, document the override intent or strip `text-sm` from the card base in `components/ui/card.tsx` to align with the project's 16px body default. Low priority until Card is used in other contexts.

---

_Reviewed: 2026-06-01_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
