import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import MessageResult from "@/components/MessageResult";

export default function Favorites() {
  const { favorites, toggleFavorite, updateMessage } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = favorites.find((m) => m.id === selectedId) || null;

  if (favorites.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="text-6xl mb-4">⭐</div>
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">لا توجد مفضلات</h2>
        <p className="text-slate-400 mb-6">اضغط على نجمة ⭐ بجانب أي رسالة لإضافتها للمفضلة</p>
        <a href="/create" className="btn-primary inline-block">✨ إنشاء رسالة</a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">⭐ المفضلة</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">{favorites.length} رسالة مميزة</p>

      <div className="space-y-3">
        {favorites.map((msg) => (
          <div key={msg.id} className="card p-4 hover:shadow-md transition-all">
            <div className="flex items-start justify-between gap-3">
              <div
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => setSelectedId(msg.id === selectedId ? null : msg.id)}
              >
                <span className="text-xs text-slate-400">
                  {new Date(msg.createdAt).toLocaleDateString("ar", { day: "numeric", month: "short" })}
                </span>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate mt-1">
                  {msg.prompt}
                </p>
                <p className="text-xs text-slate-400 truncate mt-1">
                  {msg.content.substring(0, 100)}...
                </p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button
                  onClick={() => setSelectedId(msg.id === selectedId ? null : msg.id)}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-sm"
                >
                  {msg.id === selectedId ? "▲" : "▼"}
                </button>
                <button
                  onClick={() => toggleFavorite(msg.id)}
                  className="p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 text-amber-400 text-sm"
                >
                  ⭐
                </button>
              </div>
            </div>

            {msg.id === selectedId && selected && (
              <div className="mt-4">
                <MessageResult
                  message={selected}
                  onUpdate={(content) => updateMessage(msg.id, { content })}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
