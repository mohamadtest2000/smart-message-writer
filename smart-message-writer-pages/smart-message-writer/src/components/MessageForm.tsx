import { useState } from "react";
import type { Language, Dialect, Tone, Length, GenerateRequest } from "@/types";
import { useApp } from "@/contexts/AppContext";

interface Props {
  onGenerate: (req: GenerateRequest) => Promise<void>;
  loading: boolean;
  initialPrompt?: string;
}

const dialects: { value: Dialect; label: string }[] = [
  { value: "fusha", label: "فصحى" },
  { value: "saudi", label: "سعودية" },
  { value: "gulf", label: "خليجية" },
  { value: "egyptian", label: "مصرية" },
  { value: "levantine", label: "شامية" },
];

const tones: { value: Tone; label: string }[] = [
  { value: "formal", label: "رسمية" },
  { value: "friendly", label: "ودية" },
  { value: "professional", label: "احترافية" },
  { value: "concise", label: "مختصرة" },
  { value: "emotional", label: "مؤثرة" },
  { value: "funny", label: "مضحكة" },
];

const lengths: { value: Length; label: string }[] = [
  { value: "short", label: "قصير" },
  { value: "medium", label: "متوسط" },
  { value: "long", label: "طويل" },
];

const examples = [
  "أريد الاعتذار لمديري عن التأخير",
  "أريد كتابة رسالة واتساب لعميل",
  "أريد خطاب اعتراض",
  "أريد طلب إجازة",
  "أريد رسالة حب",
  "أريد دعوة زفاف",
  "أريد رسالة شكر",
  "أريد رسالة رسمية",
  "أريد إعلان",
  "أريد منشور إنستغرام",
];

export default function MessageForm({ onGenerate, loading, initialPrompt = "" }: Props) {
  const { canGenerate, dailyCount } = useApp();
  const [prompt, setPrompt] = useState(initialPrompt);
  const [language, setLanguage] = useState<Language>("ar");
  const [dialect, setDialect] = useState<Dialect>("fusha");
  const [tone, setTone] = useState<Tone>("professional");
  const [length, setLength] = useState<Length>("medium");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;
    await onGenerate({ prompt: prompt.trim(), language, dialect, tone, length });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Prompt input */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
          ماذا تريد أن تكتب؟
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="مثال: أريد الاعتذار لمديري عن التأخير في العمل اليوم..."
          rows={4}
          className="input-field resize-none"
          disabled={loading}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {examples.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setPrompt(ex)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900/30 dark:hover:text-brand-300 transition-all"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">اللغة</label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setLanguage("ar")}
            className={`chip ${language === "ar" ? "chip-active" : "chip-inactive"}`}
          >
            🇸🇦 العربية
          </button>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`chip ${language === "en" ? "chip-active" : "chip-inactive"}`}
          >
            🇬🇧 English
          </button>
        </div>
      </div>

      {/* Dialect */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">اللهجة</label>
        <div className="flex flex-wrap gap-2">
          {dialects.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => setDialect(d.value)}
              className={`chip ${dialect === d.value ? "chip-active" : "chip-inactive"}`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tone */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">النبرة</label>
        <div className="flex flex-wrap gap-2">
          {tones.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTone(t.value)}
              className={`chip ${tone === t.value ? "chip-active" : "chip-inactive"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Length */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">الطول</label>
        <div className="flex gap-2">
          {lengths.map((l) => (
            <button
              key={l.value}
              type="button"
              onClick={() => setLength(l.value)}
              className={`chip ${length === l.value ? "chip-active" : "chip-inactive"}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <div className="pt-2">
        {!canGenerate ? (
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-sm text-center">
            لقد استخدمت حدك اليومي (10 رسائل). اشترك في الخطة المدفوعة لرسائل غير محدودة.
          </div>
        ) : (
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="w-full py-4 bg-gradient-to-r from-brand-500 to-brand-700 text-white rounded-2xl font-bold text-lg transition-all duration-200 hover:shadow-xl hover:shadow-brand-600/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                جاري الإنشاء...
              </span>
            ) : (
              "✨ إنشاء الرسالة"
            )}
          </button>
        )}
        <p className="text-center text-xs text-slate-400 mt-2">
          المتبقي اليوم: {10 - dailyCount} رسائل
        </p>
      </div>
    </form>
  );
}
