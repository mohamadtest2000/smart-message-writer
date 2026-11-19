import { Link } from "react-router-dom";
import { templates, templateCategories } from "@/data/templates";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-white dark:from-brand-950/20 dark:via-slate-900 dark:to-slate-900" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-200/30 dark:bg-brand-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-100/20 dark:bg-brand-900/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6 animate-fade-in">
            <span>⚡</span> مدعوم بالذكاء الاصطناعي
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-800 dark:text-white mb-4 leading-tight animate-slide-up">
            كاتب الرسائل الذكي
          </h1>

          <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 mb-8 max-w-2xl mx-auto animate-slide-up">
            أنشئ أي رسالة احترافية خلال ثوانٍ باستخدام الذكاء الاصطناعي.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Link
              to="/create"
              className="px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-700 text-white rounded-2xl font-bold text-lg transition-all duration-200 hover:shadow-xl hover:shadow-brand-600/30 active:scale-95"
            >
              ✨ ابدأ الآن
            </Link>
            <Link
              to="/templates"
              className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-lg transition-all duration-200 hover:border-brand-300 dark:hover:border-brand-700 active:scale-95"
            >
              📋 تصفح القوالب
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-12">
            <div>
              <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">{templates.length}+</div>
              <div className="text-sm text-slate-400">قالب جاهز</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">{templateCategories.length}</div>
              <div className="text-sm text-slate-400">فئة رسائل</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">5+</div>
              <div className="text-sm text-slate-400">لهجات عربية</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 dark:text-white mb-10">
          لماذا كاتب الرسائل الذكي؟
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "⚡", title: "سريع جداً", desc: "أنشئ رسالتك في ثوانٍ معدودة" },
            { icon: "🌍", title: "لهجات متعددة", desc: "فصحى، سعودية، مصرية، خليجية، شامية" },
            { icon: "🎨", title: "نبرات متنوعة", desc: "رسمية، ودية، احترافية، مؤثرة، مضحكة" },
            { icon: "📱", title: "يعمل كتطبيق", desc: "ثبّته على هاتفك كتطبيق PWA" },
          ].map((f) => (
            <div key={f.title} className="card p-6 text-center hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-3xl mx-auto mb-4">
                {f.icon}
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-1">{f.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 dark:text-white mb-10">
          فئات الرسائل
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {templateCategories.map((cat) => (
            <Link
              key={cat.id}
              to="/templates"
              className="card p-5 text-center hover:shadow-lg hover:border-brand-300 dark:hover:border-brand-700 transition-all group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <div className="text-sm font-medium text-slate-700 dark:text-slate-200">{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="card p-10 bg-gradient-to-br from-brand-50 to-white dark:from-slate-800 dark:to-slate-900">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
            جاهز لكتابة رسالتك الأولى؟
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            ابدأ الآن مجاناً — 10 رسائل يومياً بدون أي تكلفة
          </p>
          <Link
            to="/create"
            className="inline-block px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-700 text-white rounded-2xl font-bold text-lg transition-all duration-200 hover:shadow-xl hover:shadow-brand-600/30 active:scale-95"
          >
            ✨ إنشاء رسالة الآن
          </Link>
        </div>
      </section>
    </div>
  );
}
