interface GenerateBody {
  prompt: string;
  language: string;
  dialect: string;
  tone: string;
  length: string;
}

const DIALECT_MAP: Record<string, string> = {
  fusha: "العربية الفصحى", saudi: "اللهجة السعودية", gulf: "اللهجة الخليجية",
  egyptian: "اللهجة المصرية", levantine: "اللهجة الشامية",
};

const TONE_MAP: Record<string, string> = {
  formal: "رسمية", friendly: "ودية", professional: "احترافية",
  concise: "مختصرة", emotional: "مؤثرة", funny: "مضحكة",
};

const LENGTH_MAP: Record<string, string> = {
  short: "قصيرة", medium: "متوسطة", long: "طويلة",
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

    const systemPrompt = `You are a professional message writer. Write a ${tone} message in ${lang}${dialect ? ` using ${dialect}` : ""}. The message should be ${length}. Write ONLY the message content.`;
    const userPrompt = `اكتب رسالة بناءً على الطلب التالي:\n\n${body.prompt}`;

    if (!env.AI) {
      return new Response(JSON.stringify({ error: "ربط AI غير مفعّل. يرجى تفعيله من إعدادات Cloudflare." }), { status: 500 });
    }

    const aiRes = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 1024,
    });

    let content = "";
    if (typeof aiRes === "string") {
      content = aiRes;
    } else if (aiRes && typeof aiRes === "object") {
      content = aiRes.response || aiRes.text || "";
    }

    content = content.trim();

    if (!content) {
      return new Response(JSON.stringify({ error: "لم يتمكن الذكاء الاصطناعي من إنشاء نص. جرب صياغة طلب مختلف." }), { status: 500 });
    }

    return new Response(JSON.stringify({ content }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "حدث خطأ غير متوقع" }), { status: 500 });
  }
}
