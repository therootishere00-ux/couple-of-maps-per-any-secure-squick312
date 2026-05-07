# Compass Proxy Mini App

Telegram Mini App UI scaffold for `React + Next.js + Tailwind CSS` in strict black-and-white style.

## Local run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Structure

- `src/app` - Next.js entrypoint and global layout
- `src/views/dashboard` - dashboard split into small components
- `src/views/settings` - settings split into small components
- `src/views/servers` - server selection split into small components
- `src/components` - shared components (header, common UI)
- `src/lib/telegram` - Telegram WebApp bootstrap hook
- `src/data` - static data (servers list)
- `src/types` - domain + Telegram types
- `public/icons` - custom SVG icon assets

## Telegram WebApp integration

- `src/app/layout.tsx` loads Telegram script:
  `https://telegram.org/js/telegram-web-app.js`
- `src/lib/telegram/use-telegram-webapp.ts` calls:
  - `ready()`
  - `expand()`
  - `disableVerticalSwipes()` (if available)
  - black header/background colors

## Required SVG icons (`public/icons`)

- `app-logo.svg`
- `connect.svg`
- `shield.svg`
- `latency.svg`
- `devices.svg`
- `settings.svg`
- `chevron-left.svg`
- `chevron-right.svg`
- `server.svg`
- `signal-1.svg`
- `signal-2.svg`
- `signal-3.svg`
- `check.svg`
- `gift.svg`
- `close.svg`

## Deploy

### Vercel

1. Import repository into Vercel.
2. Framework preset: `Next.js`.
3. Build command: `npm run build`.
4. Environment variables: add from `.env.example` and Telegram-related vars if needed.

### GitHub CI

The workflow `.github/workflows/ci.yml` runs on push/PR:

- `npm install`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
