/**
 * Cloudflare Pages Function: POST /api/refine
 */

interface RefineBody {
  text: string;
  action: "rewrite" | "improve" | "shorten" | "lengthen" | "translate";
  language?: string;
}

const ACTION_MAP: Record<string, string> = {
  rewrite: "أعد صياغة الرسالة التالية بأسلوب مختلف مع الحفاظ على المعنى",
  improve: "حسّن الرسالة التالية لغوياً وأسلوبياً مع الحفاظ على المعنى",
  shorten: "اختصار الرسالة التالية مع الحفاظ على المعنى الأساسي",
  lengthen: "وسّع وأطِل الرسالة التالية بإضافة تفاصيل أكثر",
  translate: "ترجم الرسالة التالية إلى اللغة المطلوبة",
};

export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    const body = await request.json() as RefineBody;

    if (!body.text?.trim()) {
      return new Response(JSON.stringify({ error: "لا يوجد نص للمعالجة" }), { status: 400 });
    }

    const actionPrompt = ACTION_MAP[body.action] || body.action;
    const targetLang = body.language === "en" ? "English" : "العربية";
    
    // For translation, we need to be explicit
    const finalAction = body.action === "translate" 
      ? `${actionPrompt} إلى ${targetLang}` 
      : actionPrompt;

    const systemPrompt = "You are a professional editor. Follow the instruction and output ONLY the revised message, no explanations, no preamble, no meta-text.";
    const userPrompt = `${finalAction}:\n\n${body.text}`;

    let content = "";

    // 1. Try OpenAI
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
