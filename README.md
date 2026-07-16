# lukako.

My portfolio — Roblox programmer (Luau). Built as a dev workspace: file
explorer, command palette, editor tabs, git-log process, and a terminal
estimator for quotes.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS
- motion for animation
- Canvas-driven color themes (Terminal / Aurora / Ember / Frost) — press
  `Ctrl+K` and type "theme" to switch

## Run it

```bash
npm install
npm run dev
```

## Tests

```bash
npm test
```

Vitest covers the pricing engine (tier boundaries, spec scoring, build
notes) and theme persistence.

## Build

```bash
npm run build
```

Static output in `dist/`.

## The estimator

`src/components/TerminalEstimator.tsx` answers quotes one of two ways:

1. **Live** — POSTs to `api/estimate.ts` (Vercel-style serverless function).
   Set `GEMINI_API_KEY` in the deploy env (see `.env.example`).
2. **Built-in engine** — when the endpoint isn't reachable, it prices the
   spec locally against the same ranges. The terminal always answers.

## Contact

- Discord ID: 1059109501313237114
- Roblox ID: 1829644134
