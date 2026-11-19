import { useState } from "react";
import type { SavedMessage, Language } from "@/types";
import { refineMessage } from "@/lib/api";
import { useApp } from "@/contexts/AppContext";

interface Props {
  message: SavedMessage;
  onUpdate: (content: string) => void;
}

export default function MessageResult({ message, onUpdate }: Props) {
  const { toggleFavorite, addMessage, deleteMessage } = useApp();
  const [refining, setRefining] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefine = async (action: "rewrite" | "improve" | "shorten" | "lengthen" | "translate") => {
    setRefining(action);
    try {
      const result = await refineMessage({
        text: message.content,
        action,
        language: message.language === "ar" ? "en" : "ar",
      });
      onUpdate(result);
    } catch (err) {
      alert(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setRefining(null);
    }
  };

  const handleDownloadPDF = () => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html dir="rtl"><head><meta charset="utf-8"><title>رسالة</title>
      <style>body{font-family:Cairo,sans-serif;padding:40px;line-height:1.8;font-size:16px;white-space:pre-wrap;}</style>
      </head><body>${message.content}</body></html>
    `);
    win.document.close();
    win.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: message.content, title: "رسالة من كاتب الرسائل الذكي" });
      } catch {}
    } else {
      handleCopy();
    }
  };

  const handleSaveNew = () => {
    const newMsg: SavedMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      favorite: false,
    };
    addMessage(newMsg);
    alert("تم حفظ الرسالة في سجلك");
  };

  const actions = [
    { label: "نسخ", icon: "📋", action: handleCopy },
    { label: "إعادة الصياغة", icon: "🔄", action: () => handleRefine("rewrite") },
    { label: "تحسين", icon: "✨", action: () => handleRefine("improve") },
    { label: "اختصار", icon: "✂️", action: () => handleRefine("shorten") },
    { label: "إطالة", icon: "📏", action: () => handleRefine("lengthen") },
    { label: "ترجمة", icon: "🌐", action: () => handleRefine("translate") },
    { label: "مشاركة", icon: "📤", action: handleShare },
    { label: "PDF", icon: "📄", action: handleDownloadPDF },
  ];

  return (
    <div className="card p-6 animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <span className="text-xl">📝</span> الرسالة
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(message.id)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="مفضلة"
          >
            {message.favorite ? "⭐" : "☆"}
          </button>
          <button
            onClick={handleSaveNew}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm"
            aria-label="حفظ"
          >
            💾
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 mb-4 min-h-[120px]">
        <p className="text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap text-base">
          {message.content}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={a.action}
            disabled={refining !== null}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900/30 dark:hover:text-brand-300 transition-all disabled:opacity-50 flex items-center gap-1.5"
          >
            {refining && a.action.toString().includes("refine") ? (
              <span className="w-3 h-3 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>{a.icon}</span>
            )}
            {a.label}
          </button>
        ))}
      </div>

      {copied && (
        <div className="mt-3 text-sm text-green-600 dark:text-green-400 animate-fade-in">
          ✓ تم النسخ إلى الحافظة
        </div>
      )}
    </div>
  );
}
