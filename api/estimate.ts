import { GoogleGenAI } from "@google/genai";
import { estimate_elaboration_message, validate_estimate_spec } from '../src/lib/estimate-guard';

const rate_limit = 7;
const rate_window_seconds = 86_400;
const local_rate_buckets = new Map<string, { count: number; expires_at: number }>();

interface api_request {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  body?: {
    prompt?: string;
  };
}

interface api_response {
  setHeader: (name: string, value: string | boolean) => void;
  status: (code: number) => api_response;
  json: (body: unknown) => api_response;
  end: () => void;
}

interface rate_limit_result {
  allowed: boolean;
  retry_after: number;
  unavailable?: boolean;
}

function get_client_key(req: api_request): string {
  const forwarded = req.headers?.['x-forwarded-for'];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return raw?.split(',')[0]?.trim() || 'unknown-client';
}

function take_local_rate_limit(client_key: string): rate_limit_result {
  const now = Date.now();
  const current = local_rate_buckets.get(client_key);
  const bucket = current && current.expires_at > now
    ? current
    : { count: 0, expires_at: now + rate_window_seconds * 1000 };

  bucket.count += 1;
  local_rate_buckets.set(client_key, bucket);
  return {
    allowed: bucket.count <= rate_limit,
    retry_after: Math.max(1, Math.ceil((bucket.expires_at - now) / 1000)),
  };
}

async function take_rate_limit(client_key: string): Promise<rate_limit_result> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    if (process.env.VERCEL_ENV === 'production') {
      return { allowed: false, retry_after: 0, unavailable: true };
    }
    return take_local_rate_limit(client_key);
  }

  try {
    const key = `portfolio:estimate:${client_key}`;
    const response = await fetch(`${url.replace(/\/$/, '')}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['incr', key],
        ['expire', key, String(rate_window_seconds), 'nx'],
        ['ttl', key],
      ]),
    });
    if (!response.ok) return { allowed: false, retry_after: 0, unavailable: true };

    const data: Array<{ result?: unknown }> = await response.json();
    const count = Number(data[0]?.result);
    const retry_after = Number(data[2]?.result);
    if (!Number.isFinite(count)) return { allowed: false, retry_after: 0, unavailable: true };

    return {
      allowed: count <= rate_limit,
      retry_after: Number.isFinite(retry_after) && retry_after > 0 ? retry_after : rate_window_seconds,
    };
  } catch {
    return { allowed: false, retry_after: 0, unavailable: true };
  }
}

export default async function handler(req: api_request, res: api_response) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured." });
    }

    const { prompt } = req.body ?? {};
    if (typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: estimate_elaboration_message });
    }

    const validation_error = validate_estimate_spec(prompt);
    if (validation_error) {
      return res.status(400).json({ error: validation_error });
    }

    const limit = await take_rate_limit(get_client_key(req));
    if (limit.unavailable) {
      return res.status(503).json({ error: 'The estimator is temporarily unavailable. Please try again shortly.' });
    }
    if (!limit.allowed) {
      res.setHeader('Retry-After', String(limit.retry_after));
      return res.status(429).json({
        error: 'You have used all 7 estimates for this 24-hour period. Please come back later or message me on Discord with your spec.',
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You estimate the implementation complexity of Roblox programming commissions for Lukako, a fast developer with around five years of experience. Consider the number of distinct systems, networking, persistence, security, cross-platform support, integrations, scalability, edge cases, testing, and ambiguity. Return a conservative complexity_score from 0 to 12, where 0-1 is a tiny isolated task, 1-2.5 is a standard small system, 2.5-4.5 is a medium system such as basic combat, 4.5-6.5 is a large multi-feature system, 6.5-9 is complex production work, and above 9 is a full backend or similarly broad commission. A basic standalone round system should remain at or below 2.5 unless the specification includes additional systems or complexity. Do not lower complexity merely because the developer is fast. Also provide an estimated completion time and 2-3 brief, actionable considerations specific to the requested system. If the client types a nonsense thing, such as a dot, a comma or something you can't estimate, do not respond or ask to elaborate.",
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            complexity_score: {
              type: "number",
              description: "Conservative implementation complexity from 0 to 12.",
            },
            time: {
              type: "string",
              description: "Estimated completion time, e.g., '1 - 2 days'",
            },
            considerations: {
              type: "array",
              items: {
                type: "string",
              },
              description: "2-3 brief, actionable key considerations or common pitfalls for this specific project in Roblox.",
            },
          },
          required: ["complexity_score", "time", "considerations"],
        },
      },
    });

    res.status(200).json({ result: response.text });
  } catch (error: unknown) {
    console.error("Estimation error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate estimate.";
    res.status(500).json({ error: message });
  }
}
