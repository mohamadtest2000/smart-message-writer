import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { templates, templateCategories } from "@/data/templates";
import TemplateCard from "@/components/TemplateCard";

export default function Templates() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = templates;
    if (activeCategory) {
      result = result.filter((t) => t.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.titleEn.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeCategory]);

  const handleTemplateClick = (prompt: string) => {
    navigate(`/create`);
    // Store selected prompt for the create page
    sessionStorage.setItem("smw-selected-prompt", prompt);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
          📋 مكتبة القوالب
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          {templates.length}+ قالب جاهز لكل المناسبات
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 ابحث في القوالب..."
            className="input-field pr-12"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`chip ${activeCategory === null ? "chip-active" : "chip-inactive"}`}
        >
          الكل
        </button>
        {templateCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
            className={`chip ${activeCategory === cat.id ? "chip-active" : "chip-inactive"}`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Templates grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <div className="text-5xl mb-4">🔍</div>
          لا توجد قوالب مطابقة
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((tpl) => (
            <TemplateCard
              key={tpl.id}
              template={tpl}
              onClick={() => handleTemplateClick(tpl.prompt)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
