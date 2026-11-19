/**
 * Cloudflare Pages Function: POST /api/generate
 */

interface GenerateBody {
  prompt: string;
  language: string;
  dialect: string;
  tone: string;
  length: string;
}

const DIALECT_MAP: Record<string, string> = {
  fusha: "العربية الفصحى",
  saudi: "اللهجة السعودية",
  gulf: "اللهجة الخليجية",
  egyptian: "اللهجة المصرية",
  levantine: "اللهجة الشامية",
};

const TONE_MAP: Record<string, string> = {
  formal: "رسمية",
  friendly: "ودية",
  professional: "احترافية",
  concise: "مختصرة وموجزة",
  emotional: "مؤثرة وعاطفية",
  funny: "مضحكة ومرحة",
};

const LENGTH_MAP: Record<string, string> = {
  short: "قصيرة (2-3 جمل)",
  medium: "متوسطة (فقرة كاملة)",
  long: "طويلة (فقرتين أو أكثر)",
};

export async function onRequestPost(context: any) {
  const { request, env } = context;
  
  try {
    const body = await request.json() as GenerateBody;
    
    if (!body.prompt?.trim()) {
      return new Response(JSON.stringify({ error: "الرجاء إدخال وصف الرسالة" }), { status: 400 });
    }

    const lang = body.language === "en" ? "English" : "العربية";
    const dialect = body.language === "ar" ? (DIALECT_MAP[body.dialect] || "العربية الفصحى") : "";
    const tone = TONE_MAP[body.tone] || "احترافية";
    const length = LENGTH_MAP[body.length] || "متوسطة";

    const systemPrompt = `You are a professional message writer. Write a ${tone} message in ${lang}${dialect ? ` using ${dialect}` : ""}. The message should be ${length}. Write ONLY the message content, no explanations, no preamble, no meta-text. Do not add subject lines unless it's an email. Output the message directly.`;
    const userPrompt = `اكتب رسالة بناءً على الطلب التالي:\n\n${body.prompt}`;

    let content = "";

    // 1. Try OpenAI if configured
    if (env.OPENAI_API_KEY) {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          max_tokens: 1024,
        }),
      });
      const data = await res.json();
      content = data.choices[0].message.content.trim();
    } 
    // 2. Fallback to Workers AI
    else if (env.AI) {
      const response = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 1024,
      });
      content = (typeof aiRes === "string" ? aiRes : (aiRes.response || aiRes.text || "")).trim();
    } else {
      throw new Error("الذكاء الاصطناعي غير متاح حالياً.");
    }

    return new Response(JSON.stringify({ content }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
