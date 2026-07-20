import { GoogleGenAI } from "@google/genai";

interface api_request {
  method?: string;
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
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You estimate the implementation complexity of Roblox programming commissions for Lukako, a fast developer with around four years of experience. Consider the number of distinct systems, networking, persistence, security, cross-platform support, integrations, scalability, edge cases, testing, and ambiguity. Return a conservative complexity_score from 0 to 12, where 0-1 is a tiny isolated task, 1-2.5 is a standard small system, 2.5-4.5 is a medium system such as basic combat, 4.5-6.5 is a large multi-feature system, 6.5-9 is complex production work, and above 9 is a full backend or similarly broad commission. Do not lower complexity merely because the developer is fast. Also provide an estimated completion time and 2-3 brief, actionable considerations specific to the requested system.",
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
