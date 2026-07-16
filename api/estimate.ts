import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
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

    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are an AI estimator for a 15-year-old highly skilled Roblox developer named Lukako. He specializes in OOP, Raycasting, Anti-Cheat, and Core Game Loops. He is an exceptionally fast worker. Prices should be very affordable for indie game devs but still moneyworthy (e.g., small UI/systems $3-$15, medium systems like combat $15-$45, full game loops $40-$100+). Time estimates should reflect extreme speed (e.g., 2-12 hours for small tasks, 1-2 days for medium systems, 3-7 days for large/full games). Analyze the system specification and provide an estimated price range in USD, an estimated completion time, and 2-3 brief, actionable 'Key Considerations' or 'Common Pitfalls' specific to building this system in Roblox.",
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
  } catch (error: any) {
    console.error("Estimation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate estimate." });
  }
}
