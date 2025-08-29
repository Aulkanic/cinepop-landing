# CinePOP Countdown Landing

Single-page landing with age gate, countdown, teaser modal, features, releases, email capture, and footer. Built with Vite + React + TypeScript + Tailwind.

## Scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview build
- `npm run test` – run unit tests

## Env

- `VITE_TARGET_DATE` – ISO date for countdown target. Example: `2030-01-01T20:00:00Z`

## Run

1. Install deps: `npm i`
2. Start dev: `npm run dev`

## Notes

- Age gate persists in localStorage. Content is blocked until confirmed 18+.
- Countdown is timezone-aware and swaps to Live state at zero.
- Email capture uses mock service in `src/lib/notify.ts` with 5% error rate.
- Releases data from `/mocks/releases.json`.
