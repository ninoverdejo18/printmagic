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

# LANGUAGE & MENU SELECTION GUIDELINES

When the user selects language options or asks for a menu:
• If the user chooses "Tagalog", "🇵🇭 Tagalog", or speaks in Tagalog:
  Respond warmly in Tagalog/Filipino welcoming them to PrintMagic, and list the main options using bracketed buttons:
  "🇵🇭 Magandang araw! Maligayang pagdating sa PrintMagic. Ako ang inyong Virtual Assistant. Paano po namin kayo matutulungan ngayon?

  Maaari kayong pumili sa ating mga pangunahing serbisyo:

  [🎨 Graphic Design & Layout]
  [🖨️ Printing Services]
  [📱 Digital Services]
  [📋 Request Quotation]
  [📞 Contact Us]"

• If the user chooses "English", "🇺🇸 English", or speaks in English:
  Respond warmly in English welcoming them to PrintMagic, and list the main options using bracketed buttons:
  "🇺🇸 Hello! Welcome to PrintMagic. I am your Virtual Assistant. How can we assist you with your printing or graphic design needs today?

  Please select from our main options:

  [🎨 Graphic Design & Layout]
  [🖨️ Printing Services]
  [📱 Digital Services]
  [📋 Request Quotation]
  [📞 Contact Us]"

• Always use bracketed options like [🎨 Graphic Design & Layout] for interactive quick options.

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

export function getFallbackResponse(promptText: string): string {
  const query = promptText.toLowerCase().trim();

  // Language: Tagalog / Filipino
  if (query.includes("tagalog") || query.includes("🇵🇭") || query.includes("filipino") || query.includes("wika")) {
    return `🇵🇭 **Magandang araw! Maligayang pagdating sa PrintMagic.**

Ako ang inyong PrintMagic Virtual Assistant. Paano po namin kayo matutulungan ngayon sa inyong printing o graphic design needs?

Maaari kayong pumili sa ating mga pangunahing serbisyo:

[🎨 Graphic Design & Layout]
[🖨️ Printing Services]
[📱 Digital Services]
[📋 Request Quotation]
[📞 Contact Us]`;
  }

  // Language: English
  if (query.includes("english") || query.includes("🇺🇸")) {
    return `🇺🇸 **Hello and welcome to PrintMagic!**

I am your PrintMagic Virtual Assistant. How can we assist you with your printing or graphic design needs today?

Please select from our main options:

[🎨 Graphic Design & Layout]
[🖨️ Printing Services]
[📱 Digital Services]
[📋 Request Quotation]
[📞 Contact Us]`;
  }

  // Menu / Main Menu
  if (query.includes("menu") || query.includes("option")) {
    return `📋 **PrintMagic Main Menu / Pangunahing Menu**

Please select an option below / Pumili ng opsyon sa ibaba:

[🇵🇭 Tagalog]
[🇺🇸 English]
[🎨 Graphic Design & Layout]
[🖨️ Printing Services]
[📱 Digital Services]
[📋 Request Quotation]
[📞 Contact Us]`;
  }

  // Graphic Design / Layout
  if (query.includes("graphic design") || query.includes("layout") || query.includes("design")) {
    return `🎨 **Layout & Graphic Design Services**

We offer professional graphic design and creative layouts for:
• Logo Design & Brand Identity
• Marketing Materials (Flyers, Brochures, Posters, Tarpaulins)
• Social Media Graphics & Banners
• Custom Product Labels & Packaging Design
• Event Invitations, Certificates, & Souvenirs Layout

Would you like to get a custom design or request a quotation?

[📋 Request Quotation]
[📞 Contact Us]`;
  }

  // Printing Services
  if (query.includes("printing services") || query.includes("printing")) {
    return `🖨️ **PrintMagic Printing Services**

We provide high-quality printing solutions including:
• **Large Format:** Tarpaulins, Banners, Vinyl Stickers, Signages
• **Document Printing:** High-speed scanning, copying, short/long/A4 printing
• **Apparel & IDs:** Custom T-Shirts (DTF/Vinyl), PVC IDs & ID Laces, Rush IDs
• **Corporate & Marketing:** Business Cards, Stickers & Decals, Souvenirs & Giveaways

Which specific item would you like to inquire about?

[🏷️ Custom Stickers & Decals]
[👕 T-Shirt Printing]
[🪪 PVC ID & ID Lace]
[📄 Document Scanning & Printing]
[💼 Business Cards]
[📋 Request Quotation]`;
  }

  // Digital Services
  if (query.includes("digital services") || query.includes("digital")) {
    return `📱 **Digital & Online Services**

Our digital solutions include:
• ID Application Links & Guidance
• Digital Formal Photo Editing (for Rush IDs)
• File Format Conversions & Print-Ready PDF Optimization
• High-Resolution Document Scanning

How can we assist you with your digital requirements today?

[🆔 Lost ID Application]
[🪪 Rush ID]
[📞 Contact Us]`;
  }

  // Request Quotation
  if (query.includes("quotation") || query.includes("quote")) {
    return `📋 **Request a Free Quotation**

To get an accurate quote for your project, please provide us with the following details:
1. **Service / Product Name** (e.g. Tarpaulin, Stickers, T-Shirts, PVC IDs)
2. **Dimensions / Size**
3. **Quantity**
4. **Target Turnaround Date**

You can also send your specifications directly to us:

📧 Email: **printmagiconline.service@gmail.com**
📞 Phone / Viber: **0926 022 6003**
📍 Location: **Libjo, New San Vicente, Batangas City, Philippines 4200**

How many items or what specifications are you looking for?`;
  }

  // Contact Us / Location / Hours
  if (query.includes("contact") || query.includes("hours") || query.includes("address") || query.includes("location") || query.includes("phone") || query.includes("email")) {
    return `📞 **PrintMagic Contact Information**

• **Phone / Mobile:** 0926 022 6003
• **Email:** printmagiconline.service@gmail.com
• **Address:** Libjo, New San Vicente, Batangas City, Philippines 4200
• **Business Hours:** Monday – Sunday (8:00 AM – 7:30 PM)
• **Website:** https://printmagicna.vercel.app/

How else can we assist you today?`;
  }

  // Product Specifics
  if (query.includes("tarpaulin") || query.includes("tarp")) {
    return `🚩 **Tarpaulin Printing & Large Format**

• **Description:** Heavy-duty weather-resistant outdoor vinyl tarpaulins and indoor event backdrops.
• **Common Uses:** Birthday backdrops, fiesta banners, store signages, announcement tarpaulins.
• **Customization Options:** Eyelets (cut-rings), folded edges, custom dimensions (feet or inches).

How many tarpaulins and what dimensions do you need?`;
  }

  if (query.includes("t-shirt") || query.includes("shirt")) {
    return `👕 **T-Shirt Printing**

• **Description:** High-quality customized apparel printing using DTF, vinyl transfer, or sublimation techniques.
• **Common Uses:** Company uniforms, event shirts, class batch tees, family reunion shirts, sports jerseys.

How many shirts are you looking to order?`;
  }

  if (query.includes("sticker") || query.includes("decal")) {
    return `🏷️ **Custom Stickers & Decals**

• **Description:** Waterproof precision-cut vinyl stickers and die-cut decals for packaging and branding.
• **Common Uses:** Product labels, food jar stickers, laptop decals, vehicle stickers, packaging seals.

What dimensions and quantity of stickers do you need?`;
  }

  if (query.includes("pvc") || query.includes("id lace") || query.includes("lanyard")) {
    return `🪪 **PVC ID & ID Lace**

• **Description:** Heavy-duty waterproof PVC identification cards and custom sublimated lanyard ID laces.
• **Common Uses:** School IDs, employee ID badges, membership cards, event accreditation passes.

How many PVC IDs or ID laces do you need?`;
  }

  if (query.includes("rush id")) {
    return `🪪 **Rush ID Photo Service**

• **Description:** Fast, high-quality photo capturing and printing formatted for passport, visa, and government IDs.
• **Common Uses:** Passport applications, job requirements, visa applications, government forms (1x1, 2x2).

What size or package of Rush ID photo do you need?`;
  }

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

  let body = req.body;
  if (typeof req.body === "string") {
    try {
      body = JSON.parse(req.body);
    } catch {
      body = {};
    }
  } else if (!body) {
    body = {};
  }

  const promptText = (body?.userPrompt || body?.message || "").toString().trim();
  const rawHistory = Array.isArray(body?.messages)
    ? body.messages
    : (Array.isArray(body?.history) ? body.history : []);

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
