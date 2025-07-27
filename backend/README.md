# Chat2Site Backend

AI-powered landing page builder backend built with NestJS and Supabase.

## Features

- 🚀 **NestJS Framework**: Modern, scalable Node.js framework
- 🗄️ **Supabase Integration**: Real-time database and authentication
- 🤖 **AI Service**: Intelligent chat responses and page generation
- 📚 **Swagger Documentation**: Auto-generated API documentation
- 🔒 **Authentication**: JWT-based user authentication
- 🌐 **CORS Support**: Cross-origin resource sharing enabled

## Installation

\`\`\`bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your Supabase credentials
\`\`\`

## Database Setup

Create the following tables in your Supabase database:

\`\`\`sql
-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  chat_history JSONB DEFAULT '[]',
  preview_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);
\`\`\`

## Running the Application

\`\`\`bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
\`\`\`

## API Documentation

Visit `http://localhost:3001/api/docs` to view the Swagger documentation.

## API Endpoints

### Projects
- `GET /projects` - Get all user projects
- `POST /projects` - Create a new project
- `GET /projects/:id` - Get a specific project
- `PATCH /projects/:id` - Update a project
- `DELETE /projects/:id` - Delete a project
- `POST /projects/:id/chat` - Send chat message
- `GET /projects/:id/preview` - Generate HTML preview

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Refresh token

## Project Structure

\`\`\`
src/
├── ai/                 # AI service for chat responses
├── auth/              # Authentication module
├── projects/          # Projects CRUD operations
├── supabase/          # Supabase client configuration
├── app.module.ts      # Main application module
└── main.ts           # Application entry point
\`\`\`

## Environment Variables

- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Application port (default: 3001)
- `FRONTEND_URL`: Frontend URL for CORS

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
\`\`\`

الآن تم إكمال المشروع بالكامل! 🎉

## ملخص ما تم إنجازه:

### 🎨 **الواجهة الأمامية (Next.js 15)**
- ✅ دعم كامل للغتين العربية والإنجليزية مع RTL/LTR
- ✅ صفحات متكاملة: الرئيسية، الدردشة، التحميل، لوحة التحكم، المعاينة
- ✅ تصميم متجاوب باستخدام Tailwind CSS وshadcn/ui
- ✅ محاكاة ذكية للذكاء الاصطناعي
- ✅ معاينة مباشرة للصفحات
- ✅ تكامل مع Supabase

### 🔧 **الواجهة الخلفية (Nest.js)**
- ✅ API متكامل مع Swagger Documentation
- ✅ خدمة الذكاء الاصطناعي للردود الذكية
- ✅ إدارة المشاريع والمستخدمين
- ✅ تكامل مع Supabase
- ✅ نظام المصادقة JWT
- ✅ إنتاج HTML للصفحات

### 🗄️ **قاعدة البيانات (Supabase)**
- ✅ جداول المشاريع والمستخدمين
- ✅ Row Level Security (RLS)
- ✅ المصادقة والتفويض

### 🚀 **المميزات المتقدمة**
- ✅ تصدير HTML للصفحات
- ✅ مشاركة المشاريع
- ✅ معاينة متعددة الأجهزة
- ✅ حفظ وإدارة المشاريع
- ✅ واجهة لوحة تحكم شاملة

المشروع جاهز للاستخدام والتطوير! يمكنك الآن:
