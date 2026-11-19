import type { Template, TemplateCategory } from "@/types";

export const templateCategories: TemplateCategory[] = [
  { id: "whatsapp", name: "رسائل واتساب", nameEn: "WhatsApp", icon: "💬" },
  { id: "email", name: "بريد إلكتروني", nameEn: "Email", icon: "📧" },
  { id: "apology", name: "رسائل اعتذار", nameEn: "Apology", icon: "🙏" },
  { id: "thanks", name: "رسائل شكر", nameEn: "Thanks", icon: "🌟" },
  { id: "congrats", name: "رسائل تهنئة", nameEn: "Congratulations", icon: "🎉" },
  { id: "leave", name: "طلبات إجازة", nameEn: "Leave Request", icon: "📅" },
  { id: "complaint", name: "اعتراضات", nameEn: "Complaint", icon: "⚠️" },
  { id: "official", name: "خطابات رسمية", nameEn: "Official Letter", icon: "📋" },
  { id: "love", name: "رسائل حب", nameEn: "Love", icon: "❤️" },
  { id: "invitation", name: "دعوات", nameEn: "Invitation", icon: "💌" },
  { id: "job", name: "طلبات عمل", nameEn: "Job Application", icon: "💼" },
  { id: "resume", name: "سيرة ذاتية", nameEn: "Resume", icon: "📄" },
  { id: "ads", name: "إعلانات", nameEn: "Advertisement", icon: "📢" },
  { id: "social", name: "سوشيال ميديا", nameEn: "Social Media", icon: "📱" },
  { id: "customer", name: "رسائل للعملاء", nameEn: "Customer", icon: "🤝" },
  { id: "followup", name: "رسائل متابعة", nameEn: "Follow-up", icon: "🔄" },
  { id: "support", name: "خدمة العملاء", nameEn: "Support", icon: "🎧" },
  { id: "wedding", name: "دعوات زفاف", nameEn: "Wedding", icon: "💍" },
];

function makeTemplates(): Template[] {
  const t: Template[] = [];
  let id = 1;

  const add = (
    category: string,
    title: string,
    titleEn: string,
    icon: string,
    prompt: string,
    description: string
  ) => {
    t.push({ id: `tpl-${id++}`, title, titleEn, category, icon, prompt, description });
  };

  // WhatsApp
  add("whatsapp", "رسالة واتساب لعميل", "WhatsApp to Customer", "💬", "اكتب رسالة واتساب مهذبة لعميل لتأكيد موعد", "تأكيد موعد مع عميل");
  add("whatsapp", "رسالة واتساب لمدير", "WhatsApp to Manager", "💬", "اكتب رسالة واتساب لمديري في العمل لإبلاغه بإنجاز مهمة", "إبلاغ المدير بإنجاز");
  add("whatsapp", "رسالة واتساب لصديق", "WhatsApp to Friend", "💬", "اكتب رسالة واتساب ودية لصديق لدعوته للخروج", "دعوة صديق للخروج");
  add("whatsapp", "رسالة واتساب اعتذار", "WhatsApp Apology", "💬", "اكتب رسالة واتساب للاعتذار عن عدم الحضور", "اعتذار عن عدم الحضور");
  add("whatsapp", "رسالة واتساب تهنئة", "WhatsApp Congrats", "💬", "اكتب رسالة واتساب لتهنئة صديق بمناسبة", "تهنئة بمناسبة");
  add("whatsapp", "رسالة واتساب متابعة", "WhatsApp Follow-up", "💬", "اكتب رسالة واتساب لمتابعة طلب مع عميل", "متابعة طلب عميل");
  add("whatsapp", "رسالة واتساب ترحيب", "WhatsApp Welcome", "💬", "اكتب رسالة واتساب للترحيب بعضو جديد في مجموعة", "ترحيب بعضو جديد");

  // Email
  add("email", "بريد إلكتروني رسمي", "Formal Email", "📧", "اكتب بريداً إلكترونياً رسمياً لطلب اجتماع مع مدير", "طلب اجتماع");
  add("email", "بريد إلكتروني للعميل", "Email to Customer", "📧", "اكتب بريداً إلكترونياً لعميل لتقديم عرض سعر", "تقديم عرض سعر");
  add("email", "بريد إلكتروني شكر", "Thank You Email", "📧", "اكتب بريداً إلكترونياً لشكر زميل على مساعدته", "شكر زميل");
  add("email", "بريد إلكتروني اعتذار", "Apology Email", "📧", "اكتب بريداً إلكترونياً للاعتذار عن تأخير في تسليم مشروع", "اعتذار عن تأخير");
  add("email", "بريد إلكتروني استقالة", "Resignation Email", "📧", "اكتب بريداً إلكترونياً لطلب الاستقالة من العمل بشكل مهني", "طلب استقالة");
  add("email", "بريد إلكتروني طلب توصية", "Recommendation Email", "📧", "اكتب بريداً إلكترونياً لطلب رسالة توصية من أستاذ", "طلب توصية");
  add("email", "بريد إلكتروني متابعة", "Follow-up Email", "📧", "اكتب بريداً إلكترونياً لمتابعة طلب وظيفي بعد مقابلة", "متابعة بعد مقابلة");

  // Apology
  add("apology", "اعتذار للمدير عن التأخير", "Apology to Manager for Lateness", "🙏", "اكتب رسالة اعتذار لمديري عن التأخير في الحضور للعمل", "اعتذار عن تأخير");
  add("apology", "اعتذار لصديق", "Apology to Friend", "🙏", "اكتب رسالة اعتذار لصديق عن سوء فهم حدث بيننا", "اعتذار عن سوء فهم");
  add("apology", "اعتذار لعميل", "Apology to Customer", "🙏", "اكتب رسالة اعتذار لعميل عن تأخير في تسليم الطلب", "اعتذار عن تأخير تسليم");
  add("apology", "اعتذار لزوجة", "Apology to Wife", "🙏", "اكتب رسالة اعتذار لزوجتي عن نسيان مناسبة مهمة", "اعتذار لزوجة");
  add("apology", "اعتذار لوالدين", "Apology to Parents", "🙏", "اكتب رسالة اعتذار لوالديّ عن قلة التواصل", "اعتذار لوالدين");
  add("apology", "اعتذار رسمي", "Formal Apology", "🙏", "اكتب رسالة اعتذار رسمية لإدارة الشركة عن خطأ في تقرير", "اعتذار رسمي");

  // Thanks
  add("thanks", "شكر لمدير", "Thanks to Manager", "🌟", "اكتب رسالة شكر لمديري على دعمه وتوجيهاته", "شكر للمدير");
  add("thanks", "شكر لمعلم", "Thanks to Teacher", "🌟", "اكتب رسالة شكر لمعلمي على جهوده في التدريس", "شكر لمعلم");
  add("thanks", "شكر لزميل", "Thanks to Colleague", "🌟", "اكتب رسالة شكر لزميل ساعدني في مشروع", "شكر لزميل");
  add("thanks", "شكر لعميل", "Thanks to Customer", "🌟", "اكتب رسالة شكر لعميل على ثقته وتعامله معنا", "شكر لعميل");
  add("thanks", "شكر لطبيب", "Thanks to Doctor", "🌟", "اكتب رسالة شكر لطبيب على رعايته ومتابعته", "شكر لطبيب");
  add("thanks", "شكر بعد مقابلة", "Post-Interview Thanks", "🌟", "اكتب رسالة شكر بعد مقابلة عمل", "شكر بعد مقابلة");

  // Congrats
  add("congrats", "تهنئة تخرج", "Graduation Congrats", "🎉", "اكتب رسالة تهنئة لصديق بمناسبة تخرجه", "تهنئة تخرج");
  add("congrats", "تهنئة زواج", "Wedding Congrats", "🎉", "اكتب رسالة تهنئة بمناسبة الزواج", "تهنئة زواج");
  add("congrats", "تهنئة مولود", "New Baby Congrats", "🎉", "اكتب رسالة تهنئة بمناسبة مولود جديد", "تهنئة مولود");
  add("congrats", "تهنئة ترقية", "Promotion Congrats", "🎉", "اكتب رسالة تهنئة زميل بمناسبة ترقيته", "تهنئة ترقية");
  add("congrats", "تهنئة نجاح", "Success Congrats", "🎉", "اكتب رسالة تهنئة بمناسبة النجاح في امتحان", "تهنئة نجاح");
  add("congrats", "تهنئة عمل جديد", "New Job Congrats", "🎉", "اكتب رسالة تهنئة بمناسبة الحصول على عمل جديد", "تهنئة عمل جديد");
  add("congrats", "تهنئة عيد", "Eid Congrats", "🎉", "اكتب رسالة تهنئة بمناسبة عيد الفطر", "تهنئة عيد");

  // Leave
  add("leave", "طلب إجازة سنوية", "Annual Leave", "📅", "اكتب طلب إجازة سنوية رسمي للمدير", "إجازة سنوية");
  add("leave", "طلب إجازة مرضية", "Sick Leave", "📅", "اكتب طلب إجازة مرضية للمدير", "إجازة مرضية");
  add("leave", "طلب إجازة عرضية", "Casual Leave", "📅", "اكتب طلب إجازة عرضية لظرف طارئ", "إجازة عرضية");
  add("leave", "طلب إجازة زواج", "Marriage Leave", "📅", "اكتب طلب إجازة لمناسبة الزواج", "إجازة زواج");
  add("leave", "طلب إجازة أمومة", "Maternity Leave", "📅", "اكتب طلب إجازة أمومة رسمي", "إجازة أمومة");
  add("leave", "طلب إجازة بدون راتب", "Unpaid Leave", "📅", "اكتب طلب إجازة بدون راتب", "إجازة بدون راتب");

  // Complaint
  add("complaint", "اعتراض على قرار", "Objection to Decision", "⚠️", "اكتب خطاب اعتراض على قرار إداري", "اعتراض على قرار");
  add("complaint", "شكوى لشركة", "Company Complaint", "⚠️", "اكتب رسالة شكوى لشركة عن منتج معيب", "شكوى عن منتج");
  add("complaint", "اعتراض على فاتورة", "Bill Objection", "⚠️", "اكتب رسالة اعتراض على فاتورة غير صحيحة", "اعتراض على فاتورة");
  add("complaint", "شكوى لمدرسة", "School Complaint", "⚠️", "اكتب رسالة شكوى لإدارة المدرسة", "شكوى لمدرسة");
  add("complaint", "اعتراض على تقييم", "Performance Objection", "⚠️", "اكتب خطاب اعتراض على تقييم أداء", "اعتراض على تقييم");
  add("complaint", "شكوى خدمة", "Service Complaint", "⚠️", "اكتب رسالة شكوى عن خدمة سيئة", "شكوى خدمة");

  // Official
  add("official", "خطاب رسمي للإدارة", "Official Letter to Management", "📋", "اكتب خطاباً رسمياً لإدارة الشركة لطلب موافقة", "خطاب للإدارة");
  add("official", "خطاب تعريف", "Introduction Letter", "📋", "اكتب خطاب تعريف رسمي عن شركة", "خطاب تعريف");
  add("official", "خطاب تكليف بمهمة", "Task Assignment Letter", "📋", "اكتب خطاب تكليف رسمي بمهمة عمل", "تكليف بمهمة");
  add("official", "خطاب إنذار", "Warning Letter", "📋", "اكتب خطاب إنذار رسمي لموظف", "خطاب إنذار");
  add("official", "خطاب معروض", "Petition Letter", "📋", "اكتب خطاب معروض رسمي لجهة حكومية", "خطاب معروض");
  add("official", "خطاب توصية", "Recommendation Letter", "📋", "اكتب خطاب توصية رسمي لموظف", "خطاب توصية");

  // Love
  add("love", "رسالة حب رومانسية", "Romantic Love Letter", "❤️", "اكتب رسالة حب رومانسية لشريك حياتي", "رسالة حب");
  add("love", "رسالة اشتياق", "Missing You Letter", "❤️", "اكتب رسالة اشتياق لشريكي البعيد عني", "رسالة اشتياق");
  add("love", "رسالة اعتذار للحبيب", "Apology to Lover", "❤️", "اكتب رسالة اعتذار لشريكي عن خطأ", "اعتذار للحبيب");
  add("love", "رسالة بمناسبة ذكرى", "Anniversary Love Letter", "❤️", "اكتب رسالة حب بمناسبة ذكرى زواجنا", "رسالة ذكرى");
  add("love", "رسالة إعجاب", "Admiration Letter", "❤️", "اكتب رسالة إعجاب لشخص أحبه", "رسالة إعجاب");

  // Invitation
  add("invitation", "دعوة عرس", "Wedding Invitation", "💌", "اكتب بطاقة دعوة لحفل زفاف", "دعوة زفاف");
  add("invitation", "دعوة عيد", "Eid Invitation", "💌", "اكتب بطاقة دعوة لغداء عيد", "دعوة عيد");
  add("invitation", "دعوة عيد ميلاد", "Birthday Invitation", "💌", "اكتب بطاقة دعوة لحفل عيد ميلاد", "دعوة عيد ميلاد");
  add("invitation", "دعوة اجتماع", "Meeting Invitation", "💌", "اكتب بطاقة دعوة رسمية لاجتماع عمل", "دعوة اجتماع");
  add("invitation", "دعوة افتتاح", "Opening Invitation", "💌", "اكتب بطاقة دعوة لافتتاح متجر", "دعوة افتتاح");
  add("invitation", "دعوة تخرج", "Graduation Invitation", "💌", "اكتب بطاقة دعوة لحفل تخرج", "دعوة تخرج");

  // Job
  add("job", "طلب توظيف", "Job Application", "💼", "اكتب رسالة طلب توظيف لوظيفة محاسب", "طلب توظيف");
  add("job", "طلب ترقية", "Promotion Request", "💼", "اكتب رسالة طلب ترقية من مديري", "طلب ترقية");
  add("job", "طلب نقل", "Transfer Request", "💼", "اكتب رسالة طلب نقل إلى قسم آخر", "طلب نقل");
  add("job", "خطاب تغطية", "Cover Letter", "💼", "اكتب خطاب تغطية لوظيفة مطور برمجيات", "خطاب تغطية");
  add("job", "طلب زيادة راتب", "Salary Raise Request", "💼", "اكتب رسالة طلب زيادة الراتب", "طلب زيادة راتب");
  add("job", "شكر بعد مقابلة عمل", "Post-Interview Thank You", "💼", "اكتب رسالة شكر بعد مقابلة عمل ناجحة", "شكر بعد مقابلة");

  // Resume
  add("resume", "ملخص سيرة ذاتية", "Resume Summary", "📄", "اكتب ملخصاً احترافياً للسيرة الذاتية لمحاسب", "ملخص سيرة ذاتية");
  add("resume", "وصف خبرة عملية", "Work Experience", "📄", "اكتب وصفاً احترافياً لخبرة عملية في التسويق", "وصف خبرة");
  add("resume", "مهارات تقنية", "Technical Skills", "📄", "اكتب قائمة مهارات تقنية لمطور ويب", "مهارات تقنية");
  add("resume", "الهدف الوظيفي", "Career Objective", "📄", "اكتب هدفاً وظيفياً احترافياً للسيرة الذاتية", "هدف وظيفي");
  add("resume", "خطاب مقدمة", "Cover Letter", "📄", "اكتب خطاب مقدمة احترافي للسيرة الذاتية", "خطاب مقدمة");

  // Ads
  add("ads", "إعلان منتج", "Product Ad", "📢", "اكتب إعلاناً جذاباً لمنتج عطر جديد", "إعلان منتج");
  add("ads", "إعلان خصم", "Sale Ad", "📢", "اكتب إعلاناً عن خصم 50٪ على المنتجات", "إعلان خصم");
  add("ads", "إعلان خدمة", "Service Ad", "📢", "اكتب إعلاناً لخدمة تنظيف منازل", "إعلان خدمة");
  add("ads", "إعلان مطعم", "Restaurant Ad", "📢", "اكتب إعلاناً لمطعم يفتح فرعاً جديداً", "إعلان مطعم");
  add("ads", "إعلان عقار", "Real Estate Ad", "📢", "اكتب إعلاناً لشقة للبيع", "إعلان عقار");
  add("ads", "إعلان فعالية", "Event Ad", "📢", "اكتب إعلاناً لفعالية ثقافية", "إعلان فعالية");

  // Social
  add("social", "منشور إنستغرام", "Instagram Post", "📱", "اكتب منشور إنستغرام جذاباً عن منتج جديد", "منشور إنستغرام");
  add("social", "منشور تويتر", "Twitter Post", "📱", "اكتب منشور تويتر قصيراً عن نصيحة في العمل", "منشور تويتر");
  add("social", "منشور فيسبوك", "Facebook Post", "📱", "اكتب منشور فيسبوك عن إطلاق خدمة جديدة", "منشور فيسبوك");
  add("social", "منشور لينكدإن", "LinkedIn Post", "📱", "اكتب منشور لينكدإن احترافياً عن إنجاز", "منشور لينكدإن");
  add("social", "وصف حساب إنستغرام", "Instagram Bio", "📱", "اكتب وصفاً احترافياً لحساب إنستغرام لمتجر", "وصف حساب");
  add("social", "هاشتاغات", "Hashtags", "📱", "اكتب مجموعة هاشتاغات لمنشور عن السفر", "هاشتاغات");
  add("social", "منشور تيك توك", "TikTok Post", "📱", "اكتب وصفاً لفيديو تيك توك عن وصفة طبخ", "منشور تيك توك");

  // Customer
  add("customer", "عرض للعميل", "Customer Offer", "🤝", "اكتب رسالة عرض خاص لعميل مميز", "عرض للعميل");
  add("customer", "تأكيد طلب", "Order Confirmation", "🤝", "اكتب رسالة تأكيد طلب لعميل", "تأكيد طلب");
  add("customer", "اعتذار للعميل", "Customer Apology", "🤝", "اكتب رسالة اعتذار لعميل عن مشكلة في الخدمة", "اعتذار للعميل");
  add("customer", "طلب تقييم", "Review Request", "🤝", "اكتب رسالة طلب تقييم من عميل", "طلب تقييم");
  add("customer", "عرض ولاء", "Loyalty Offer", "🤝", "اكتب رسالة عرض ولاء للعملاء الدائمين", "عرض ولاء");
  add("customer", "إعلان خدمة جديدة", "New Service Announcement", "🤝", "اكتب رسالة إعلان عن خدمة جديدة للعملاء", "إعلان خدمة");

  // Follow-up
  add("followup", "متابعة بعد اجتماع", "Post-Meeting Follow-up", "🔄", "اكتب رسالة متابعة بعد اجتماع عمل", "متابعة اجتماع");
  add("followup", "متابعة عرض", "Proposal Follow-up", "🔄", "اكتب رسالة متابعة عرض تجاري أرسلته لعميل", "متابعة عرض");
  add("followup", "متابعة طلب وظيفة", "Job Application Follow-up", "🔄", "اكتب رسالة متابعة طلب وظيفة بعد أسبوع", "متابعة وظيفة");
  add("followup", "متابعة دفع", "Payment Follow-up", "🔄", "اكتب رسالة متابعة دفع فاتورة متأخرة", "متابعة دفع");
  add("followup", "متابعة عميل محتمل", "Lead Follow-up", "🔄", "اكتب رسالة متابعة لعميل محتمل", "متابعة عميل");

  // Support
  add("support", "رد استفسار", "Inquiry Response", "🎧", "اكتب رد خدمة عملاء على استفسار عن منتج", "رد استفسار");
  add("support", "حل مشكلة", "Issue Resolution", "🎧", "اكتب رد خدمة عملاء بحل لمشكلة فنية", "حل مشكلة");
  add("support", "اعتذار عن تأخير", "Delay Apology Support", "🎧", "اكتب رد خدمة عملاء للاعتذار عن تأخير الرد", "اعتذار عن تأخير");
  add("support", "توجيه لقسم آخر", "Department Redirect", "🎧", "اكتب رد خدمة عملاء يحول العميل لقسم آخر", "تحويل لقسم");
  add("support", "تأكيد حل", "Resolution Confirmation", "🎧", "اكتب رد خدمة عملاء لتأكيد حل المشكلة", "تأكيد حل");

  // Wedding
  add("wedding", "دعوة زفاف رسمية", "Formal Wedding Invitation", "💍", "اكتب بطاقة دعوة زفاف رسمية", "دعوة زفاف رسمية");
  add("wedding", "دعوة حناء", "Henna Invitation", "💍", "اكتب بطاقة دعوة حناء للعروس", "دعوة حناء");
  add("wedding", "شكر على حضور الزفاف", "Wedding Thanks", "💍", "اكتب رسالة شكر للحضور حفل الزفاف", "شكر حضور زفاف");
  add("wedding", "تهنئة عروسين", "Wedding Congrats", "💍", "اكتب رسالة تهنئة للعروسين", "تهنئة عروسين");
  add("wedding", "دعوة وصول", "Wedding Save the Date", "💍", "اكتب رسالة دعوة مبدئية لحفظ التاريخ", "دعوة مبدئية");

  return t;
}

export const templates: Template[] = makeTemplates();
