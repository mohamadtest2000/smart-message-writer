import type { Template } from "@/types";

interface Props {
  template: Template;
  onClick: () => void;
}

export default function TemplateCard({ template, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="card p-5 text-right hover:shadow-lg hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-200 group"
    >
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
          {template.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-800 dark:text-white text-sm mb-1 truncate">
            {template.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {template.description}
          </p>
        </div>
      </div>
    </button>
  );
}
