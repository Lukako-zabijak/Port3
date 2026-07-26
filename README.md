# lukako.

Portfolio site for a Roblox programmer (Luau). Single-page scroll site with a
canvas background that reacts to the active theme, plus a live commission
estimator that prices a written spec.

**Live:** _add your deploy URL here_

## Stack

- React 19 + TypeScript + Vite 7
- Tailwind CSS 3.4 with shadcn/ui (Radix primitives)
- `motion` for animation, `react-router` for the `/terms` route
- Vitest + jsdom for unit tests
- Deployed on Vercel (`vercel.json`, serverless function in `api/`)

## Run it

Node 22.x / npm 10.x.

```bash
npm install
npm run dev
```

```bash
npm run build   # tsc -b && vite build -> dist/
npm run lint
npm test
```

## Structure

```
api/estimate.ts        Serverless estimator endpoint (Gemini + rate limiting)
src/sections/          Page sections in scroll order
src/components/        Nav, Preloader, Cursor, SilkBg, Estimator, shared bits
src/components/ui/     shadcn/ui primitives
src/lib/content.ts     All copy: projects, services, pricing, FAQ, reviews
src/lib/estimate.ts    Pricing engine + live endpoint client
src/lib/estimate-guard.ts  Spec validation before an estimate runs
src/lib/themes.ts      Theme definitions and persistence
src/lib/terms.ts       Terms of service content
src/pages/TermsPage.tsx    /terms route
```

Page order: Hero, Work, Showcase, Client review, About, Services, Process,
Pricing, Estimator, FAQ, Contact.

## Themes

Five canvas-driven themes: **Terminal**, **Aurora**, **Ember**, **Frost**,
**Neon** (default). Switch from the nav; the choice is written to
`localStorage` and drives CSS variables (`--ac`, `--ac2`, `--bg`, `--panel`)
plus the animated `SilkBg` canvas.

## The estimator

`src/components/Estimator.tsx` turns a written spec into a tier, price range,
and timeframe. Two paths:

1. **Live** — POSTs to `/api/estimate`, which asks Gemini for a complexity
   score. Set `GEMINI_API_KEY` in the deploy environment (see `.env.example`).
   Add `KV_REST_API_URL` and `KV_REST_API_TOKEN` from an Upstash Redis database
   for a consistent three-minute cooldown across serverless instances; without
   Redis the endpoint falls back to a best-effort per-instance cooldown.
2. **Built-in engine** — if the endpoint is unreachable or returns junk, the
   spec is scored locally against the same keyword and scope rules. Rejected
   specs and rate-limit responses never silently fall back; the terminal asks
   for more detail or tells the client when to come back.

The live score is floored at the local score, so the AI can widen scope but
never underprice a build. Six tiers from `small` ($40 - $75) to `xl` ($500+).
One estimate per client every three minutes.

## Tests

Vitest covers the pricing engine (tier boundaries, keyword and scope scoring,
live/local fallback), spec validation, theme persistence, terms content, and
content integrity.

## Contact

- Discord ID: 1059109501313237114
- Roblox ID: 1829644134
