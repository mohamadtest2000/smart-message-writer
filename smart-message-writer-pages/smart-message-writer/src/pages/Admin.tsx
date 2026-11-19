import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { templates, templateCategories } from "@/data/templates";
import { getStats } from "@/lib/api";

export default function Admin() {
  const { messages } = useApp();
  const [stats, setStats] = useState({ users: 0, messages: 0, templates: 0, topTemplates: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then((s) => setStats(s))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Local stats from client data
  const localMessages = messages.length;
  const localFavorites = messages.filter((m) => m.favorite).length;

  const statCards = [
    { title: "المستخدمون", value: stats.users || "—", icon: "👥", color: "text-blue-500" },
    { title: "الرسائل المنشأة", value: stats.messages || localMessages, icon: "📝", color: "text-green-500" },
    { title: "القوالب", value: templates.length, icon: "📋", color: "text-purple-500" },
    { title: "الفئات", value: templateCategories.length, icon: "📁", color: "text-amber-500" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">🔧 لوحة الإدارة</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">نظرة عامة على النظام</p>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((s) => (
          <div key={s.title} className="card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{s.icon}</span>
            </div>
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-slate-400 mt-1">{s.title}</div>
          </div>
        ))}
      </div>

      {/* Local stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="card p-6">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4">📊 إحصائيات محلية</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-700">
              <span className="text-sm text-slate-500">رسائل محفوظة على هذا الجهاز</span>
              <span className="font-bold text-brand-600">{localMessages}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-700">
              <span className="text-sm text-slate-500">رسائل مفضلة</span>
              <span className="font-bold text-amber-500">{localFavorites}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">إجمالي القوالب</span>
              <span className="font-bold text-purple-500">{templates.length}</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4">📁 فئات القوالب</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
            {templateCategories.map((cat) => {
              const count = templates.filter((t) => t.category === cat.id).length;
              return (
                <div key={cat.id} className="flex justify-between items-center py-1.5">
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {cat.icon} {cat.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top templates */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4">🏆 أكثر القوالب استخداماً</h3>
        {loading ? (
          <div className="text-sm text-slate-400">جاري التحميل...</div>
        ) : stats.topTemplates.length > 0 ? (
          <div className="space-y-2">
            {stats.topTemplates.map((t, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {i + 1}. {t.title}
                </span>
                <span className="font-bold text-brand-600">{t.count}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {templates.slice(0, 5).map((t, i) => (
              <div key={t.id} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {i + 1}. {t.icon} {t.title}
                </span>
                <span className="text-xs text-slate-400">—</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Admin note */}
      <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-sm text-blue-700 dark:text-blue-300">
        💡 هذه لوحة إدارة تجريبية. لتفعيل إدارة المستخدمين والاشتراكات، اربط قاعدة بيانات (D1) ونظام مصادقة.
      </div>
    </div>
  );
}
