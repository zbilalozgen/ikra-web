# İkra Web

Marketing site for **İkra** — a Quran verses & Sahih hadith widget mobile app (Expo/React Native, pre-launch at v3.5). The site presents the app's value to prospective users and hosts the Privacy Policy, Support, and Terms pages required for App Store and Google Play submission. English-only, deployed on Vercel. Visual identity mirrors the app's brand (emerald/gold/navy).

## Stack

- **Next.js 16 (App Router)** + TypeScript
- **Tailwind CSS v4** (`@theme` directive in `app/globals.css` — no `tailwind.config.js`)
- **Inter** via `next/font`
- Deployed on **Vercel** (git-push auto-deploy)

## Local Development

Install dependencies:

```bash
npm install
```

Start dev server (http://localhost:3000):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server locally:

```bash
npm start
```

Lint:

```bash
npm run lint
```

## Environment Variables

- `NEXT_PUBLIC_SITE_URL` — Absolute URL of the production site (e.g. `https://ikra-web.vercel.app`). Used by Next.js `metadataBase` to resolve Open Graph / Twitter image URLs and the canonical link tag to absolute URLs.
- Default: `https://ikra-web.vercel.app` (hard-coded fallback in `app/layout.tsx` when the variable is unset).
- Set in: Vercel project **Settings → Environment Variables**, scoped to Production and Preview environments.

## Deployment

Production deploys happen automatically on every push to `main` via the Vercel GitHub integration. No manual action required.

**Production URL:** https://ikra-web.vercel.app/ (live — HTTP/2 200)

## Brand

Brand tokens (emerald `#006B3F`, gold `#D4A843`, navy `#1B2A4A`, cream `#F2F2F7`) are ported from the İkra mobile app at `/Users/zbilalozgen/repos/wip-muslim` into `app/globals.css` `@theme` as `--color-*` CSS variables. Utility class names (`bg-emerald-600`, `text-gold-500`, `bg-navy-800`, `bg-cream`) match the mobile app verbatim.
