# Phase 1: Foundation & Deployable Skeleton - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-01
**Phase:** 01-foundation-deployable-skeleton
**Mode:** advisor (calibration tier: minimal_decisive)
**Areas discussed:** Tailwind version & token port, Deploy & domain, Footer link targets, Dark-mode config strategy

---

## Tailwind Version & Token Port

| Option | Description | Selected |
|--------|-------------|----------|
| v4 + @theme (Recommended) | Tailwind v4, current create-next-app default. Port brand hex values into @theme in globals.css as --color-* vars. Same utility class names as the app. Actual ramp values read from app config at plan time. | ✓ |
| v3 + config file | Pin tailwindcss@3, replicate app's tailwind.config.js structure. Off the current default; nativewind/preset bits won't port, so not a true 1:1 copy. | |

**User's choice:** v4 + @theme
**Notes:** Researcher noted the app's `tailwind.config.js` uses `nativewind/preset` so the "copy-paste" advantage of v3 is illusory. Recorded a planning-time directive to read the actual ramp values from `wip-muslim/tailwind.config.js` rather than trust the researcher's guessed ramps.

---

## Deploy & Domain

| Option | Description | Selected |
|--------|-------------|----------|
| CLI + Vercel subdomain (Recommended) | `vercel --prod` from local → live Vercel subdomain. No GitHub remote or DNS needed. Migrate to git auto-deploy + custom domain later. | |
| GitHub repo + auto-deploy | Create GitHub remote now, connect Vercel for git-push auto-deploy + PR previews. Vercel default subdomain. | ✓ |
| I have a custom domain | Already have a marketing domain. | |

**User's choice:** GitHub repo + auto-deploy
**Notes:** User opted to set up GitHub remote + Vercel git integration up front rather than the lighter CLI-only path. Vercel default subdomain still used for Phase 1 (no custom domain confirmed).

---

## Footer Link Targets

| Option | Description | Selected |
|--------|-------------|----------|
| Real stub routes (Recommended) | Create /privacy, /terms, /support as minimal "under construction" pages so links resolve (no 404s). Phase 3 replaces body content in place. | ✓ |
| href="#" placeholders | Footer links point to # until Phase 3 builds the pages. Broken links in production, second footer edit later. | |

**User's choice:** Real stub routes
**Notes:** Aligns with App Store / Google Play submission posture — reviewers click footer links.

---

## Dark-Mode Config Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| class/selector + next-themes (Recommended) | darkMode 'selector' (v4) with next-themes defaultTheme='system'. Toggle-ready. | |
| media (pure prefers-color-scheme) | darkMode 'media', zero JS, no dependency. Simplest. | |
| Skip dark mode entirely | Drop dark mode from v1. Contradicts UI-02, ROADMAP SC#2, UI-SPEC dark-palette sections. | ✓ |

**User's choice:** Skip dark mode entirely (clarified via follow-up)
**Notes:** Initial response "no need to dark mode" was ambiguous between "skip dark mode entirely" and "skip the strategy decision." Follow-up clarification confirmed user wants to drop dark mode from v1 scope. This amends UI-02 (REQUIREMENTS.md), Phase 1 SC#2 (ROADMAP.md), and the dark-mode sections of UI-SPEC.md — flagged in CONTEXT.md D-04 as pending edits the user opted to do outside this command (per scope-bounded preference).

---

## Claude's Discretion

- Standard `create-next-app` App Router scaffolding (TypeScript, ESLint)
- Footer component location & composition (`components/Footer.tsx`, used in `app/layout.tsx`)
- Favicon: copy `wip-muslim/src/assets/images/icon.png` → `app/icon.png`
- Footer brand mark: text logotype "İkra" per UI-SPEC
- README content & dev/build/deploy commands
- Git branch name (`main`), commit conventions

## Deferred Ideas

- Custom marketing domain — defer until a domain is chosen
- Manual dark/light toggle — dark mode fully out of v1
- shadcn/ui initialization — Phase 2
- Footer brand mark as SVG/image — possibly Phase 4 polish
