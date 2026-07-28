import { GoogleGenAI } from "@google/genai";

// System Instruction as strictly mandated for PrintMagic Official Virtual Assistant
const SYSTEM_INSTRUCTION = `
# PRINTMAGIC OFFICIAL VIRTUAL ASSISTANT

You are the official customer service assistant of PrintMagic.

Your role is to assist customers, answer questions, recommend services, help customers request quotations, and guide them through PrintMagic's services.

You represent PrintMagic exactly like a professional customer service representative.

Never mention being an AI, chatbot, Gemini, Google AI, or language model.

Always answer as PrintMagic.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# COMPANY INFORMATION

Business Name
PrintMagic

Website
https://printmagicna.vercel.app/

Email
printmagiconline.service@gmail.com

Phone
0926 022 6003

Address
Libjo, New San Vicente,
Batangas City,
Philippines 4200

Business Hours

Monday – Sunday

8:00 AM – 7:30 PM

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# COMPANY PROFILE

Established in August 2022.

Founder & Owner:
When asked about the founder or owner of PrintMagic, inform the user that he is the founder and owner of PrintMagic.

PrintMagic provides high-quality printing services and creative graphic design solutions for individuals, businesses, schools, government offices, and organizations throughout Batangas City and nearby areas.

VISION

To become one of the most recognized and trusted printing providers in the region.

MISSION

To ensure our clients achieve their goals by providing affordable, creative, and high-quality printing services.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# PERSONALITY

Always be

• Friendly
• Professional
• Helpful
• Knowledgeable
• Honest
• Patient
• Positive

Keep responses concise.

Avoid large paragraphs.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# UNKNOWN INFORMATION POLICY FOR CHATBOT

If you do not have enough verified information to answer a customer's question, NEVER guess, assume, or fabricate an answer.

Instead:

1. Clearly state that you don't have enough verified information.
2. Recommend contacting PrintMagic directly for the most accurate assistance.
3. Provide all official contact information.
4. Remain professional, friendly, and helpful.

Always include:

📧 Email:
printmagiconline.service@gmail.com

📞 Phone:
0926 022 6003

🌐 Website:
https://printmagicna.vercel.app/

📍 Address:
Libjo, New San Vicente,
Batangas City, Philippines 4200

Business Hours:
Monday – Sunday
8:00 AM – 7:30 PM
`;

function getFallbackResponse(promptText: string): string {
  const query = promptText.toLowerCase();

  if (query.includes("owner") || query.includes("founder") || query.includes("who owns") || query.includes("who founded") || query.includes("who started")) {
    return `👨‍💼 **Founder & Owner Information**

He is the founder and owner of PrintMagic. Established in August 2022, PrintMagic provides high-quality printing services and creative graphic design solutions throughout Batangas City and nearby areas.

If you have any questions or would like to discuss a project with our team, please feel free to reach out to us:

📧 Email: printmagiconline.service@gmail.com
📞 Phone: 0926 022 6003
🌐 Website: https://printmagicna.vercel.app/
📍 Address: Libjo, New San Vicente, Batangas City, Philippines 4200`;
  }

  return `I don't have enough verified information to answer that accurately. For the most up-to-date and accurate details, please contact PrintMagic directly. Our team will be happy to assist you.

📧 Email:
printmagiconline.service@gmail.com

📞 Phone:
0926 022 6003

🌐 Website:
https://printmagicna.vercel.app/

📍 Address:
Libjo, New San Vicente,
Batangas City, Philippines 4200

Business Hours:
Monday – Sunday
8:00 AM – 7:30 PM`;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST" && req.method !== "post") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const promptText = (req.body?.userPrompt || req.body?.message || "").toString().trim();
  const rawHistory = Array.isArray(req.body?.messages)
    ? req.body.messages
    : (Array.isArray(req.body?.history) ? req.body.history : []);

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      const responseText = getFallbackResponse(promptText);
      return res.status(200).json({ reply: responseText, response: responseText, fallback: true });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const formattedHistory: Array<{ role: string; parts: Array<{ text: string }> }> = [];
    for (const msg of rawHistory) {
      let contentStr = "";
      if (typeof msg === "string") {
        contentStr = msg.trim();
      } else if (msg && typeof msg.content === "string") {
        contentStr = msg.content.trim();
      } else if (msg && Array.isArray(msg.parts) && msg.parts[0]?.text) {
        contentStr = msg.parts[0].text.trim();
      }

      if (contentStr) {
        formattedHistory.push({
          role: msg?.role === "user" ? "user" : "model",
          parts: [{ text: contentStr }]
        });
      }
    }

    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [...formattedHistory];
    if (promptText) {
      contents.push({ role: "user", parts: [{ text: promptText }] });
    } else if (contents.length === 0) {
      const responseText = getFallbackResponse("");
      return res.status(200).json({ reply: responseText, response: responseText, fallback: true });
    }

    const modelsToTry = ["gemini-3.6-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
    let replyText = "";

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        });
        if (response.text) {
          replyText = response.text;
          break;
        }
      } catch (err: any) {
        console.warn(`[Gemini API Vercel] ${modelName} failed:`, err?.message || err);
        continue;
      }
    }

    if (!replyText) {
      replyText = getFallbackResponse(promptText);
      return res.status(200).json({ reply: replyText, response: replyText, fallback: true });
    }

    return res.status(200).json({ reply: replyText, response: replyText, fallback: false });
  } catch (error: any) {
    const fallbackText = getFallbackResponse(promptText);
    return res.status(200).json({ reply: fallbackText, response: fallbackText, fallback: true });
  }
}
