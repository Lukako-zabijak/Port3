export type Tier = 'small' | 'standard' | 'medium' | 'large' | 'complex' | 'xl';

export interface Estimate {
  tier: Tier;
  price: string;
  time: string;
  considerations: string[];
  source: 'live' | 'local';
}

interface Rule {
  pattern: RegExp;
  weight: number;
  tip: string;
}

const RULES: Rule[] = [
  {
    pattern: /combat|weapon|hitbox|melee|parry|block|sword|gun|fps/i,
    weight: 3,
    tip: 'Raycast and hitbox checks must run on the server — client-side hit detection is a free win for exploiters.',
  },
  {
    pattern: /anti[- ]?cheat|exploit|security|ban|moderation/i,
    weight: 3,
    tip: 'Log before you ban: aggressive instant-bans catch legit high-ping players. Confidence scoring avoids the angry DMs.',
  },
  {
    pattern: /data ?store|saving|save|profile|inventory data|progress/i,
    weight: 2.5,
    tip: 'Session-locked profiles are non-negotiable for saving — without them, rejoin-duping is a matter of time.',
  },
  {
    pattern: /round|lobby|matchmaking|game ?loop|queue/i,
    weight: 1.5,
    tip: 'Round loops need graceful handling for players leaving mid-match, or the state machine eventually deadlocks.',
  },
  {
    pattern: /ui|shop|menu|interface|hud|inventory screen/i,
    weight: 1.5,
    tip: 'UI art is on you — wiring, tweening and state are on me. Clear assets up front keeps this fast.',
  },
  {
    pattern: /npc|boss|enemy|pathfind|ai\b/i,
    weight: 2,
    tip: 'State-machine NPCs stay cheap on the server; per-frame raycast spam does not. Worth deciding early.',
  },
  {
    pattern: /framework|oop|modular|architecture/i,
    weight: 2,
    tip: 'A modular core pays for itself the moment you add a second system — slightly slower start, much faster everything after.',
  },
  {
    pattern: /trad(e|ing)|economy|currency|market/i,
    weight: 2.5,
    tip: 'Trading needs atomic server transactions. Two-step commits are how duplication glitches are born.',
  },
  {
    pattern: /admin|command|mod tool/i,
    weight: 1.5,
    tip: 'Admin commands should log every call — moderation without an audit trail always ends badly.',
  },
  {
    pattern: /pet|simulator|clicker|tycoon/i,
    weight: 2,
    tip: 'Simulator-style games live or die on data design. Batched writes keep DataStore limits far away.',
  },
  {
    pattern: /vehicle|car|plane|boat/i,
    weight: 2,
    tip: 'Network ownership matters for vehicles — the server should arbitrate, not simulate, every bump.',
  },
  {
    pattern: /vfx|effect|animation|tween|cutscene/i,
    weight: 0.5,
    tip: 'Client-side VFX with server triggers keeps the game smooth without trusting the client with gameplay.',
  },
];

const scope_signals: Array<{ pattern: RegExp; weight: number }> = [
  { pattern: /full game|complete game|entire (?:game|backend)|all systems/i, weight: 6 },
  { pattern: /cross[- ]server|messagingservice|teleportservice|global matchmaking/i, weight: 2.5 },
  { pattern: /multiplayer|replication|networking|remoteevent|remotefunction/i, weight: 1.5 },
  { pattern: /mobile|controller|console|cross[- ]platform/i, weight: 1 },
  { pattern: /production[- ]ready|scalable|performance|load test|\d+ players/i, weight: 1.5 },
  { pattern: /integration|webhook|httpservice|external api|third[- ]party/i, weight: 1.5 },
  { pattern: /procedural|customizable|configurable|multiple (?:modes|maps|classes|teams)/i, weight: 1.5 },
];

const GENERIC_TIPS = [
  'Everything critical gets validated server-side — the client is a view, never a source of truth.',
  'A clear spec up front is the single biggest factor in keeping the price at the low end.',
  'Systems are built modular, so extending this later costs hours, not days.',
];

function scoreSpec(spec: string): { score: number; tips: string[] } {
  let score = 0;
  const tips: string[] = [];
  for (const rule of RULES) {
    if (rule.pattern.test(spec)) {
      score += rule.weight;
      tips.push(rule.tip);
    }
  }
  for (const signal of scope_signals) {
    if (signal.pattern.test(spec)) score += signal.weight;
  }

  const feature_separators = spec.match(/,|;|\band\b/gi)?.length ?? 0;
  score += Math.min(feature_separators * 0.35, 1.75);

  // longer, more detailed specs usually mean a broader scope
  const words = spec.trim().split(/\s+/).length;
  if (words > 100) score += 2.5;
  else if (words > 60) score += 1.5;
  else if (words > 25) score += 0.75;
  return { score, tips };
}

function estimate_from_score(
  score: number,
  tips: string[],
  source: Estimate['source'],
  time_override?: string,
): Estimate {
  let tier: Tier;
  let price: string;
  let time: string;
  if (score <= 1) {
    tier = 'small';
    price = '$40 – $75';
    time = '2 – 6 hours';
  } else if (score <= 2.5) {
    tier = 'standard';
    price = '$75 – $140';
    time = '6 – 12 hours';
  } else if (score <= 4.5) {
    tier = 'medium';
    price = '$170 – $200';
    time = '1 – 2 days';
  } else if (score <= 6.5) {
    tier = 'large';
    price = '$200 – $350';
    time = '3 – 7 days';
  } else if (score <= 9) {
    tier = 'complex';
    price = '$350 – $500';
    time = '5 – 10 days';
  } else {
    tier = 'xl';
    price = '$500+';
    time = '1 – 2 weeks';
  }

  const considerations = [...tips, ...GENERIC_TIPS].slice(0, 3);
  return { tier, price, time: time_override ?? time, considerations, source };
}

export function localEstimate(spec: string): Estimate {
  const { score, tips } = scoreSpec(spec);
  return estimate_from_score(score, tips, 'local');
}

/**
 * Tries the live estimator endpoint first (same contract as the original
 * /api/estimate serverless function). Falls back to the built-in engine
 * when the endpoint isn't reachable, so the tool always answers.
 */
export async function getEstimate(spec: string): Promise<Estimate> {
  const local_result = scoreSpec(spec);
  const baseline = estimate_from_score(local_result.score, local_result.tips, 'local');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);

  try {
    const res = await fetch('/api/estimate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `System specification: ${spec}` }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error('endpoint unavailable');

    const data = await res.json();
    let jsonStr = (data?.result ?? '').trim();
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
    }
    const parsed = JSON.parse(jsonStr);
    const ai_score = Number(parsed.complexity_score);
    if (Number.isFinite(ai_score) && parsed.time && Array.isArray(parsed.considerations)) {
      const final_score = Math.max(local_result.score, Math.min(Math.max(ai_score, 0), 12));
      return estimate_from_score(final_score, parsed.considerations, 'live', parsed.time);
    }
    throw new Error('bad payload');
  } catch {
    return baseline;
  } finally {
    clearTimeout(timeout);
  }
}

export const THINKING_STEPS = [
  'Reading spec…',
  'Breaking it into systems…',
  'Scoping server vs client work…',
  'Pricing against past builds…',
];
