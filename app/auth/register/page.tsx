"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { MessageSquare, Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { toast } from "sonner"

export default function RegisterPage() {
  const { t, language } = useLanguage()
  const { signUp } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error(language === "ar" ? "كلمات المرور غير متطابقة" : "Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      toast.error(
        language === "ar" ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل" : "Password must be at least 6 characters",
      )
      return
    }

    setLoading(true)

    try {
      const { error } = await signUp(formData.email, formData.password, formData.fullName)

      if (error) {
        toast.error(
          language === "ar" ? "خطأ في إنشاء الحساب. حاول مرة أخرى." : "Registration failed. Please try again.",
        )
      } else {
        toast.success(
          language === "ar"
            ? "تم إنشاء الحساب بنجاح! تحقق من بريدك الإلكتروني."
            : "Account created successfully! Check your email for verification.",
        )
        router.push("/auth/login")
      }
    } catch (error) {
      toast.error(language === "ar" ? "حدث خطأ غير متوقع" : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">{language === "ar" ? "إنشاء حساب" : "Create Account"}</CardTitle>
          <p className="text-muted-foreground">
            {language === "ar"
              ? "أنشئ حسابك للبدء في استخدام Chat2Site"
              : "Create your account to start using Chat2Site"}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{language === "ar" ? "الاسم الكامل" : "Full Name"}</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={language === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{language === "ar" ? "البريد الإلكتروني" : "Email"}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{language === "ar" ? "كلمة المرور" : "Password"}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={language === "ar" ? "أدخل كلمة المرور" : "Enter your password"}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {language === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={language === "ar" ? "أعد إدخال كلمة المرور" : "Confirm your password"}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? language === "ar"
                  ? "جاري إنشاء الحساب..."
                  : "Creating account..."
                : language === "ar"
                  ? "إنشاء حساب"
                  : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {language === "ar" ? "لديك حساب بالفعل؟" : "Already have an account?"}{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                {language === "ar" ? "تسجيل الدخول" : "Sign in"}
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
              {language === "ar" ? "العودة للرئيسية" : "Back to Home"}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
