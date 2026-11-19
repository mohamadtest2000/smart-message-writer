import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MessageForm from "@/components/MessageForm";
import MessageResult from "@/components/MessageResult";
import { generateMessage } from "@/lib/api";
import { useApp } from "@/contexts/AppContext";
import type { GenerateRequest, SavedMessage } from "@/types";

export default function Create() {
  const navigate = useNavigate();
  const { addMessage, incrementDailyCount, canGenerate } = useApp();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SavedMessage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [initialPrompt, setInitialPrompt] = useState("");

  // Read template-selected prompt from sessionStorage
  useEffect(() => {
    const selected = sessionStorage.getItem("smw-selected-prompt");
    if (selected) {
      setInitialPrompt(selected);
      sessionStorage.removeItem("smw-selected-prompt");
    }
  }, []);

  const handleGenerate = async (req: GenerateRequest) => {
    if (!canGenerate) {
      navigate("/pricing");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const content = await generateMessage(req);
      const msg: SavedMessage = {
        id: `msg-${Date.now()}`,
        prompt: req.prompt,
        content,
        language: req.language,
        dialect: req.dialect,
        tone: req.tone,
        length: req.length,
        createdAt: new Date().toISOString(),
        favorite: false,
      };
      setResult(msg);
      addMessage(msg);
      incrementDailyCount();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
          ✨ إنشاء رسالة جديدة
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          اكتب ما تريد، اختر الإعدادات، واحصل على رسالة احترافية فوراً
        </p>
      </div>

      <div className="card p-6 sm:p-8">
        <MessageForm onGenerate={handleGenerate} loading={loading} initialPrompt={initialPrompt} />
      </div>

      {error && (
        <div className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm animate-fade-in">
          ⚠️ {error}
        </div>
      )}

      {result && (
        <div className="mt-6">
          <MessageResult
            message={result}
            onUpdate={(content) => {
              const updated = { ...result, content };
              setResult(updated);
            }}
          />
        </div>
      )}
    </div>
  );
}
