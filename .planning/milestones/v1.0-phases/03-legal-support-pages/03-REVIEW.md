---
phase: 03-legal-support-pages
reviewed: 2026-06-01T00:00:00Z
depth: standard
files_reviewed: 5
files_reviewed_list:
  - app/privacy/page.tsx
  - app/terms/page.tsx
  - app/support/page.tsx
  - app/globals.css
  - package.json
findings:
  critical: 1
  warning: 3
  info: 1
  total: 5
status: issues_found
---

# Phase 03: Code Review Report

**Reviewed:** 2026-06-01
**Depth:** standard
**Files Reviewed:** 5
**Status:** issues_found

## Summary

Three static legal/support pages replacing Phase 1 stubs. Structure, routing, aria-labels, TOC anchors, mailto links, heading hierarchy, cross-links, metadata exports, and governing-law clause all check out. One ship-blocker: the Privacy Policy lists Google AdMob as an active third-party data processor, but the project's confirmed dependency manifest (D-21) contains no AdMob SDK. Publishing a false processor disclosure is a legal compliance defect that will also invite App Store reviewer scrutiny. Three warnings cover accessibility (inline links undecorated by default), a `devDependencies` placement risk for the typography plugin, and a character-encoding inconsistency.

---

## Critical Issues

### CR-01: AdMob listed as active third-party processor — SDK not present in app

**File:** `app/privacy/page.tsx:196–218`

**Issue:** Section 3 ("Third-party services") lists **Google AdMob** as an active data processor and explicitly states personalized ads are shown when ATT consent is granted. The ATT entry (lines 202–205) repeats "ad personalization (AdMob)." Per D-21 (canonical reference), the mobile app's `package.json` contains no AdMob or any advertising SDK. Firebase, RevenueCat, Expo Notifications, Expo Tracking Transparency, and AppsFlyer are confirmed; AdMob is not.

Disclosing a processor the app does not use is a false legal claim in a document filed with the App Store and Google Play. It may trigger App Store metadata rejection ("privacy disclosures must accurately reflect your app") and creates unnecessary regulatory surface (CCPA/GDPR) for a service that doesn't exist in the product.

**Fix:** Remove the AdMob `<li>` block (lines 214–218) entirely. Also remove "and ad personalization (AdMob)" from the ATT entry (line 204) so it reads:

```tsx
{/* Section 3, ATT entry — corrected */}
<li>
  <strong>Apple App Tracking Transparency</strong> (iOS framework)
  — iOS prompts you before any cross-app tracking begins. We use your
  choice to govern the downstream attribution SDK (AppsFlyer). If you
  decline, AppsFlyer does not use your device identifiers for
  attribution.
</li>
```

After removal, Section 3 will list 8 processors — matching the count specified in D-21.

---

## Warnings

### WR-01: Inline prose links lack underline by default — color-only distinction

**File:** `app/privacy/page.tsx:13`, `app/terms/page.tsx:13`, `app/support/page.tsx:13`

**Issue:** All three pages apply `prose-a:no-underline` then restore underlines only on hover (`hover:prose-a:underline`). TOC links use `not-prose` so they are unaffected, but the inline mailto `<a>` links within paragraph text (Privacy §5 line 238, §6 lines 258/288, §9 line 288; Terms §11 line 249; Support lines 70/83/111/117) are distinguished from surrounding body text by color alone in their resting state. WCAG SC 1.4.1 requires that links within text be visually distinct by more than color unless the contrast ratio between link and non-link text meets 3:1. Gold-500 (`#D4A843`) against navy-800 (`#1B2A4A`) body text does not reliably meet that ratio.

D-27 explicitly specifies: `<a>` uses `underline underline-offset-4`. The implementation inverts this — underline only on hover.

**Fix:** Replace `prose-a:no-underline hover:prose-a:underline` with `prose-a:underline` on all three article `className` strings:

```tsx
// Before (all three pages, article className)
prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-emerald-600

// After
prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-emerald-600
```

### WR-02: `@tailwindcss/typography` in `devDependencies` — production build risk

**File:** `package.json:24`

**Issue:** `@tailwindcss/typography` is registered as a `devDependency`. Vercel's build environment installs both `dependencies` and `devDependencies` by default, so this does not fail on Vercel today. However:

- If `NODE_ENV=production` is set and `npm ci --omit=dev` (or `npm install --production`) is used in any future CI pipeline, the `@plugin "@tailwindcss/typography"` directive in `globals.css` will resolve to a missing module and the build will fail silently or loudly depending on Tailwind v4's plugin resolution.
- Tailwind CSS itself (`tailwindcss`) is also in `devDependencies`, establishing a precedent — but Tailwind's PostCSS plugin is treated as a build tool, while the typography plugin is content of the CSS file, making it closer to a build-time stylesheet dependency.

**Fix:** Move `@tailwindcss/typography` to `dependencies` to guarantee it is always available wherever the CSS build runs:

```json
"dependencies": {
  "@tailwindcss/typography": "^0.5.19",
  ...
}
```

### WR-03: Privacy Policy references "this website" in meta description but body claims site collects nothing

**File:** `app/privacy/page.tsx:6–8`

**Issue:** The `metadata.description` reads: *"How İkra collects, uses, and protects your data — covering the iOS and Android app, **this website**, and third-party services."* The body (Overview, Section 2) accurately states the website collects nothing. The meta description implies the website is a subject of the data-collection discussion, which may mislead users scanning search results or App Store review notes into thinking the site collects data.

This is not a legal error but a messaging inconsistency that could generate user questions or App Store reviewer queries about website data collection.

**Fix:** Update the description to clarify the website's zero-collection posture:

```tsx
description:
  "How İkra collects, uses, and protects your data — the app uses anonymous analytics only; this website collects nothing.",
```

---

## Info

### IN-01: Raw middle-dot literal in terms cross-link strip — inconsistent encoding

**File:** `app/terms/page.tsx:265`

**Issue:** The separator between cross-links uses a raw Unicode middle-dot character `·` (U+00B7). The equivalent separators in `privacy/page.tsx` (lines 304, 313) and `support/page.tsx` (lines 138, 147) use the HTML entity `&middot;`. This is a minor inconsistency in encoding practice, not a rendering defect.

**Fix:** Replace the raw character with the entity to match the other two pages:

```tsx
// terms/page.tsx line 265
<span aria-hidden="true" className="text-gold-500">
  &middot;
</span>
```

---

_Reviewed: 2026-06-01_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
