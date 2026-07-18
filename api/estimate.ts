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
        systemInstruction: "You are an AI estimator for a highly skilled Roblox developer named Lukako with around four years of programming experience. He specializes in OOP, raycasting, anti-cheat, and core game loops. He is an exceptionally fast worker. Use conservative price ranges that reflect the full likely scope: small UI or systems $65-$125, medium systems such as combat $225-$375, large systems $400-$750, and full game backends $750+. Time estimates should reflect his fast turnaround, such as 2-12 hours for small tasks, 1-2 days for medium systems, 3-7 days for large systems, and 1-2 weeks for full backends. Analyze the system specification and provide an estimated price range in USD, an estimated completion time, and 2-3 brief, actionable key considerations or common pitfalls specific to building this system in Roblox.",
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            price: {
              type: "string",
              description: "Estimated price range in USD, e.g., '$15 - $30'",
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
          required: ["price", "time", "considerations"],
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
