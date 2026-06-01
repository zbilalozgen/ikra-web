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

## Deployment

Production deploys happen automatically on every push to `main` via the Vercel GitHub integration. No manual action required.

**Production URL:** https://ikra-web.vercel.app/ (live — HTTP/2 200)

## Brand

Brand tokens (emerald `#006B3F`, gold `#D4A843`, navy `#1B2A4A`, cream `#F2F2F7`) are ported from the İkra mobile app at `/Users/zbilalozgen/repos/wip-muslim` into `app/globals.css` `@theme` as `--color-*` CSS variables. Utility class names (`bg-emerald-600`, `text-gold-500`, `bg-navy-800`, `bg-cream`) match the mobile app verbatim.
