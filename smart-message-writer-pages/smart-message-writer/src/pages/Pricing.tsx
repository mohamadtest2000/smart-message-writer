export default function Pricing() {
  const plans = [
    {
      name: "المجانية",
      price: "0",
      period: "مجاناً للأبد",
      features: [
        "10 رسائل يومياً",
        "جميع اللهجات والنبرات",
        "مكتبة القوالب الكاملة",
        "حفظ الرسائل محلياً",
        "المفضلة والبحث",
      ],
      cta: "ابدأ مجاناً",
      ctaLink: "/create",
      highlight: false,
    },
    {
      name: "المدفوعة",
      price: "29",
      period: "ريال / شهرياً",
      features: [
        "رسائل غير محدودة",
        "إعادة صياغة احترافية",
        "تحميل PDF و Word",
        "ترجمة فورية",
        "حفظ غير محدود",
        "دعم ذو أولوية",
        "بدون إعلانات",
      ],
      cta: "اشترك الآن",
      ctaLink: "/create",
      highlight: true,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">💎 الأسعار</h1>
        <p className="text-slate-500 dark:text-slate-400">اختر الخطة المناسبة لك</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`card p-8 relative ${
              plan.highlight
                ? "border-brand-500 dark:border-brand-500 shadow-xl shadow-brand-600/10"
                : ""
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 right-1/2 translate-x-1/2 px-4 py-1 bg-gradient-to-r from-brand-500 to-brand-700 text-white text-xs font-bold rounded-full">
                الأكثر شعبية
              </div>
            )}

            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold text-brand-600 dark:text-brand-400">
                {plan.price}
              </span>
              <span className="text-sm text-slate-400">{plan.period}</span>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="text-green-500">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={plan.ctaLink}
              className={`block text-center py-3 rounded-xl font-bold transition-all ${
                plan.highlight
                  ? "bg-gradient-to-r from-brand-500 to-brand-700 text-white hover:shadow-lg hover:shadow-brand-600/30"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>

      <div className="text-center mt-10 text-sm text-slate-400">
        💳 جميع البطاقات مقبولة — إلغاء في أي وقت
      </div>
    </div>
  );
}
