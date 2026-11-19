export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white">
                ✍️
              </div>
              <span className="font-bold text-slate-800 dark:text-white">كاتب الرسائل الذكي</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              أنشئ أي رسالة احترافية خلال ثوانٍ باستخدام الذكاء الاصطناعي.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-3">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/create" className="text-slate-500 dark:text-slate-400 hover:text-brand-600">إنشاء رسالة</a></li>
              <li><a href="/templates" className="text-slate-500 dark:text-slate-400 hover:text-brand-600">القوالب</a></li>
              <li><a href="/pricing" className="text-slate-500 dark:text-slate-400 hover:text-brand-600">الأسعار</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-3">عن التطبيق</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              مدعوم بالذكاء الاصطناعي. يعمل على Cloudflare Workers.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-400">
          © 2026 كاتب الرسائل الذكي — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}
