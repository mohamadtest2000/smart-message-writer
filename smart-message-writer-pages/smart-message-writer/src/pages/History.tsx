import { useState, useMemo } from "react";
import { useApp } from "@/contexts/AppContext";
import MessageResult from "@/components/MessageResult";

export default function History() {
  const { messages, deleteMessage, updateMessage } = useApp();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return messages;
    const q = search.trim().toLowerCase();
    return messages.filter(
      (m) => m.prompt.toLowerCase().includes(q) || m.content.toLowerCase().includes(q)
    );
  }, [messages, search]);

  const selected = messages.find((m) => m.id === selectedId) || null;

  if (messages.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="text-6xl mb-4">📜</div>
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">لا توجد رسائل بعد</h2>
        <p className="text-slate-400 mb-6">ابدأ بإنشاء رسالتك الأولى</p>
        <a href="/create" className="btn-primary inline-block">✨ إنشاء رسالة</a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">📜 سجل الرسائل</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">{messages.length} رسالة محفوظة</p>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 ابحث في رسائلك..."
          className="input-field"
        />
      </div>

      {/* Messages list */}
      <div className="space-y-3">
        {filtered.map((msg) => (
          <div key={msg.id} className="card p-4 hover:shadow-md transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setSelectedId(msg.id === selectedId ? null : msg.id)}>
                <div className="flex items-center gap-2 mb-1">
                  {msg.favorite && <span className="text-amber-400">⭐</span>}
                  <span className="text-xs text-slate-400">
                    {new Date(msg.createdAt).toLocaleDateString("ar", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
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
                  onClick={() => deleteMessage(msg.id)}
                  className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 text-sm"
                >
                  🗑️
                </button>
              </div>
            </div>

            {msg.id === selectedId && selected && (
              <div className="mt-4">
                <MessageResult
                  message={selected}
                  onUpdate={(content) => {
                    updateMessage(msg.id, { content });
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-10 text-slate-400">لا توجد نتائج مطابقة</div>
      )}
    </div>
  );
}
