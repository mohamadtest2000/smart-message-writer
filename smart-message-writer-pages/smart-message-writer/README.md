# كاتب الرسائل الذكي — Smart Message Writer

أنشئ أي رسالة احترافية خلال ثوانٍ باستخدام الذكاء الاصطناعي.

## ✨ المميزات

- **إنشاء رسائل بالذكاء الاصطناعي** — اكتب ما تريد واحصل على رسالة احترافية فوراً
- **لهجات متعددة** — فصحى، سعودية، خليجية، مصرية، شامية
- **نبرات متنوعة** — رسمية، ودية، احترافية، مختصرة، مؤثرة، مضحكة
- **أطوال مختلفة** — قصير، متوسط، طويل
- **أكثر من 100 قالب جاهز** — رسائل واتساب، بريد إلكتروني، اعتذارات، شكر، دعوات، إعلانات، سوشيال ميديا والمزيد
- **سجل الرسائل** — حفظ، تعديل، حذف، إعادة استخدام
- **المفضلة** — حفظ الرسائل المميزة
- **البحث** — ابحث في جميع الرسائل والقوالب
- **أدوات الرسالة** — نسخ، إعادة صياغة، تحسين، اختصار، إطالة، ترجمة، مشاركة، تحميل PDF
- **الوضع الليلي والنهاري** — مع حفظ التفضيل
- **PWA** — يعمل كتطبيق على الهاتف
- **SEO** — دعم محركات البحث
- **متجاوب** — يعمل على الجوال والكمبيوتر

## 🛠️ التقنيات

- **React** + **TypeScript**
- **Tailwind CSS** — تصميم عصري
- **Cloudflare Pages** — استضافة + Functions (API)
- **Workers AI** — توليد الرسائل (أو OpenAI API عند توفر المفتاح)
- **Vite** — بناء سريع

## 🚀 النشر عبر لوحة تحكم Cloudflare (بدون أوامر برمجية)

### 1. ارفع الكود إلى GitHub
1. أنشئ حساب على [GitHub.com](https://github.com)
2. أنشئ مستودعاً جديداً (New Repository)
3. ارفع جميع ملفات المشروع إلى المستودع

### 2. اربط Cloudflare بـ GitHub
1. افتح [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. اذهب إلى **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. اختر مستودع المشروع من GitHub

### 3. إعدادات البناء
- **Framework preset:** `Vite`
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- اضغط **Save and Deploy**

### 4. تفعيل الذكاء الاصطناعي
في لوحة تحكم Cloudflare Pages:
1. اذهب إلى **Settings** → **Functions**
2. أضف متغير البيئة (Environment Variable):
   - اسم: `OPENAI_API_KEY`
   - القيمة: مفتاح OpenAI API الخاص بك
3. أو فعّل **Workers AI binding** (مجاني) من إعدادات Functions

> بدون مفتاح API، سيظهر للمستخدمين رسالة تطلب من المدير إضافة المفتاح.

## 💻 التشغيل المحلي (للمطورين)

```bash
npm install
npm run dev
```

افتح المتصفح على `http://localhost:5173`

## 📁 هيكل الملفات

```
smart-message-writer/
├── functions/            # Cloudflare Pages Functions (API)
│   └── api/
│       ├── generate.ts   # POST /api/generate
│       ├── refine.ts     # POST /api/refine
│       └── stats.ts      # GET /api/stats
├── src/
│   ├── components/        # مكونات قابلة لإعادة الاستخدام
│   ├── contexts/          # Theme + App state
│   ├── data/              # القوالب
│   ├── lib/               # API helper
│   ├── pages/             # الصفحات
│   ├── types/             # TypeScript types
│   ├── App.tsx            # Router
│   ├── main.tsx           # Entry
│   └── index.css          # Tailwind + styles
├── public/               # PWA manifest + service worker
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

## 📄 الصفحات

| الصفحة | المسار | الوصف |
|--------|--------|-------|
| الرئيسية | `/` | واجهة ترحيبية + مميزات + فئات |
| إنشاء رسالة | `/create` | نموذج الإنشاء + النتيجة |
| القوالب | `/templates` | مكتبة 100+ قالب |
| سجلي | `/history` | الرسائل المحفوظة |
| المفضلة | `/favorites` | الرسائل المميزة |
| الأسعار | `/pricing` | خطط مجانية ومدفوعة |
| الإدارة | `/admin` | لوحة إحصائيات |
