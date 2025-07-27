# Chat2Site - AI-Powered Landing Page Builder

🚀 **منصة ذكية لبناء صفحات الهبوط باستخدام الذكاء الاصطناعي**

Chat2Site هو تطبيق ويب متطور يتيح للمستخدمين إنشاء صفحات هبوط احترافية من خلال محادثة تفاعلية مع الذكاء الاصطناعي. يدعم التطبيق اللغتين العربية والإنجليزية مع دعم كامل لـ RTL.

## 🌟 المميزات الرئيسية

### 🎨 **الواجهة الأمامية (Next.js 15)**
- ✅ **دعم متعدد اللغات**: عربي وإنجليزي مع RTL/LTR كامل
- ✅ **تصميم متجاوب**: يعمل على جميع الأجهزة والشاشات
- ✅ **واجهة حديثة**: باستخدام Tailwind CSS و shadcn/ui
- ✅ **معاينة مباشرة**: شاهد صفحتك وهي تُبنى أمام عينيك
- ✅ **نظام مصادقة**: تسجيل دخول وإنشاء حسابات آمن
- ✅ **لوحة تحكم شاملة**: إدارة المشاريع والإحصائيات

### 🤖 **الذكاء الاصطناعي**
- ✅ **محادثة ذكية**: فهم طبيعي للمتطلبات
- ✅ **إنتاج تلقائي**: توليد المحتوى والتصميم
- ✅ **قوالب متنوعة**: مطاعم، تطبيقات تقنية، متاجر إلكترونية
- ✅ **تخصيص ديناميكي**: تعديل الألوان والمحتوى حسب السياق

### 🗄️ **قاعدة البيانات (Supabase)**
- ✅ **PostgreSQL**: قاعدة بيانات قوية وموثوقة
- ✅ **Row Level Security**: أمان على مستوى الصفوف
- ✅ **Real-time**: تحديثات فورية
- ✅ **Authentication**: نظام مصادقة متكامل

### 🔧 **الواجهة الخلفية (Nest.js)**
- ✅ **API RESTful**: واجهات برمجية منظمة
- ✅ **Swagger Documentation**: توثيق تلقائي
- ✅ **TypeScript**: كود آمن ومنظم
- ✅ **Validation**: التحقق من البيانات

## 🏗️ **البنية التقنية**

\`\`\`
Chat2Site/
├── Frontend (Next.js 15)
│   ├── app/                    # App Router
│   ├── components/             # UI Components
│   ├── lib/                    # Utilities & Services
│   └── public/                 # Static Assets
├── Backend (Nest.js)
│   ├── src/
│   │   ├── auth/              # Authentication
│   │   ├── projects/          # Projects CRUD
│   │   ├── ai/                # AI Service
│   │   └── supabase/          # Database Client
└── Database (Supabase)
    ├── Tables                 # Data Structure
    ├── Functions              # Stored Procedures
    └── Policies               # Security Rules
\`\`\`

## 📋 **متطلبات النظام**

- Node.js 18+ 
- npm أو yarn
- حساب Supabase
- Git

## 🚀 **خطوات التنفيذ**

### 1️⃣ **إعداد قاعدة البيانات**

\`\`\`bash
# 1. إنشاء مشروع جديد في Supabase
# 2. نسخ بيانات الاتصال من Dashboard
# 3. تشغيل SQL Scripts
\`\`\`

**SQL Scripts المطلوبة:**
\`\`\`sql
-- في Supabase SQL Editor، قم بتشغيل الملفات بالترتيب:
-- 1. scripts/01-create-tables.sql
-- 2. scripts/02-setup-rls.sql  
-- 3. scripts/03-insert-templates.sql
-- 4. scripts/04-create-functions.sql
\`\`\`

### 2️⃣ **إعداد الواجهة الأمامية**

\`\`\`bash
# استنساخ المشروع
git clone <repository-url>
cd chat2site

# تثبيت التبعيات
npm install

# إنشاء ملف البيئة
cp .env.example .env.local

# إضافة متغيرات البيئة
NEXT_PUBLIC_SUPABASE_URL="https://fmvbkhiyewlsyeltrmgq.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# تشغيل التطبيق
npm run dev
\`\`\`

### 3️⃣ **إعداد الواجهة الخلفية**

\`\`\`bash
# الانتقال لمجلد Backend
cd backend

# تثبيت التبعيات
npm install

# إنشاء ملف البيئة
cp .env.example .env

# إضافة متغيرات البيئة
SUPABASE_URL="https://fmvbkhiyewlsyeltrmgq.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
JWT_SECRET="your-jwt-secret"
PORT=3001

# تشغيل الخادم
npm run start:dev
\`\`\`

## 🔐 **متغيرات البيئة المطلوبة**

### Frontend (.env.local)
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL="https://fmvbkhiyewlsyeltrmgq.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtdmJraGl5ZXdsc3llbHRybWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MTMwODksImV4cCI6MjA2OTE4OTA4OX0.n1Ugc4AUP2py2xr-g2_MzDdU6AbzY7z_BYknAPoqkWI"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtdmJraGl5ZXdsc3llbHRybWdxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzYxMzA4OSwiZXhwIjoyMDY5MTg5MDg5fQ.-9Be16_Bz2NcZBR10kpncUDIH139Olescnwn6gXDmM8"
\`\`\`

### Backend (.env)
\`\`\`env
SUPABASE_URL="https://fmvbkhiyewlsyeltrmgq.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtdmJraGl5ZXdsc3llbHRybWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MTMwODksImV4cCI6MjA2OTE4OTA4OX0.n1Ugc4AUP2py2xr-g2_MzDdU6AbzY7z_BYknAPoqkWI"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtdmJraGl5ZXdsc3llbHRybWdxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzYxMzA4OSwiZXhwIjoyMDY5MTg5MDg5fQ.-9Be16_Bz2NcZBR10kpncUDIH139Olescnwn6gXDmM8"
JWT_SECRET="lDfnY0BySotHaWsniNS7gyEg36rzr5OhbKp+TX0tDpGGlVjWUvMKh6Q/skBozBsIIXqwu+FPjm8mXQZE8zShPA=="
PORT=3001
FRONTEND_URL="http://localhost:3000"
\`\`\`

## 📊 **هيكل قاعدة البيانات**

### الجداول الرئيسية:

1. **user_profiles** - ملفات المستخدمين
2. **projects** - المشاريع والصفحات
3. **templates** - القوالب الجاهزة
4. **project_shares** - مشاركة المشاريع

### العلاقات:
- User → Projects (One to Many)
- Project → Shares (One to Many)
- Templates → Projects (Many to Many)

## 🎯 **الصفحات والمسارات**

### Frontend Routes:
- `/` - الصفحة الرئيسية
- `/auth/login` - تسجيل الدخول
- `/auth/register` - إنشاء حساب
- `/dashboard` - لوحة التحكم
- `/chat` - صفحة الدردشة
- `/chat?project=id` - تحرير مشروع
- `/preview/[id]` - معاينة المشروع
- `/share/[token]` - مشاركة المشروع
- `/settings` - الإعدادات

### Backend API:
- `GET /projects` - جلب المشاريع
- `POST /projects` - إنشاء مشروع
- `GET /projects/:id` - جلب مشروع محدد
- `PATCH /projects/:id` - تحديث مشروع
- `DELETE /projects/:id` - حذف مشروع
- `POST /projects/:id/chat` - إرسال رسالة
- `GET /projects/:id/preview` - معاينة HTML

## 🔧 **الأوامر المفيدة**

\`\`\`bash
# Frontend
npm run dev          # تشغيل التطوير
npm run build        # بناء الإنتاج
npm run start        # تشغيل الإنتاج
npm run lint         # فحص الكود

# Backend
npm run start:dev    # تشغيل التطوير
npm run build        # بناء الإنتاج
npm run start:prod   # تشغيل الإنتاج
npm run test         # تشغيل الاختبارات
\`\`\`

## 🚀 **النشر (Deployment)**

### Frontend (Vercel):
\`\`\`bash
# ربط المشروع بـ Vercel
vercel

# إضافة متغيرات البيئة في Vercel Dashboard
# نشر المشروع
vercel --prod
\`\`\`

### Backend (Railway/Heroku):
\`\`\`bash
# Railway
railway login
railway init
railway add
railway deploy

# Heroku
heroku create chat2site-api
heroku config:set SUPABASE_URL=...
git push heroku main
\`\`\`

## 📈 **الإحصائيات والمراقبة**

- **Supabase Dashboard**: مراقبة قاعدة البيانات
- **Vercel Analytics**: إحصائيات الواجهة الأمامية
- **Railway Metrics**: مراقبة الخادم

## 🔒 **الأمان**

- ✅ Row Level Security (RLS)
- ✅ JWT Authentication
- ✅ Input Validation
- ✅ CORS Protection
- ✅ Environment Variables
- ✅ SQL Injection Prevention

## 🐛 **استكشاف الأخطاء**

### مشاكل شائعة:

1. **خطأ في الاتصال بقاعدة البيانات**
   \`\`\`bash
   # تحقق من متغيرات البيئة
   echo $NEXT_PUBLIC_SUPABASE_URL
   \`\`\`

2. **خطأ في المصادقة**
   \`\`\`bash
   # تحقق من صحة المفاتيح
   # تأكد من تفعيل RLS
   \`\`\`

3. **خطأ في CORS**
   \`\`\`bash
   # تحقق من إعدادات CORS في Backend
   \`\`\`

## 📚 **الموارد والمراجع**

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

## 🤝 **المساهمة**

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للـ branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📄 **الترخيص**

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 👥 **الفريق**

- **المطور الرئيسي**: Chat2Site Team
- **التصميم**: UI/UX Team
- **الذكاء الاصطناعي**: AI Team

## 📞 **التواصل**

- **البريد الإلكتروني**: support@chat2site.com
- **الموقع**: https://chat2site.com
- **GitHub**: https://github.com/chat2site

---

## 🎉 **تم إكمال المشروع بنجاح!**

المشروع جاهز للاستخدام والتطوير. جميع المكونات تعمل بشكل متكامل:

✅ **قاعدة البيانات**: جداول وعلاقات وأمان  
✅ **الواجهة الأمامية**: صفحات ومكونات وتفاعل  
✅ **الواجهة الخلفية**: API ومنطق العمل  
✅ **المصادقة**: تسجيل دخول وحسابات  
✅ **الذكاء الاصطناعي**: محادثة وإنتاج  
✅ **المشاركة**: روابط عامة للمشاريع  
✅ **التصدير**: HTML جاهز للنشر  

**المشروع يدعم الآن:**
- إنشاء حسابات جديدة
- تسجيل الدخول والخروج
- إنشاء مشاريع جديدة
- الدردشة مع الذكاء الاصطناعي
- معاينة مباشرة للصفحات
- حفظ وإدارة المشاريع
- مشاركة المشاريع عبر روابط
- تصدير HTML للنشر
- دعم كامل للعربية والإنجليزية

🚀 **ابدأ الآن واستمتع بتجربة بناء صفحات الهبوط بالذكاء الاصطناعي!**
