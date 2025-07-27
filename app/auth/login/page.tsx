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
import { MessageSquare, Eye, EyeOff, Mail, Lock } from "lucide-react"
import { toast } from "sonner"

export default function LoginPage() {
  const { t, language } = useLanguage()
  const { signIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await signIn(formData.email, formData.password)

      if (error) {
        toast.error(
          language === "ar" ? "خطأ في تسجيل الدخول. تحقق من البيانات." : "Login failed. Please check your credentials.",
        )
      } else {
        toast.success(language === "ar" ? "تم تسجيل الدخول بنجاح!" : "Login successful!")
        router.push("/dashboard")
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
          <CardTitle className="text-2xl">{language === "ar" ? "تسجيل الدخول" : "Sign In"}</CardTitle>
          <p className="text-muted-foreground">
            {language === "ar" ? "ادخل إلى حسابك للمتابعة" : "Enter your account to continue"}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? language === "ar"
                  ? "جاري تسجيل الدخول..."
                  : "Signing in..."
                : language === "ar"
                  ? "تسجيل الدخول"
                  : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {language === "ar" ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
              <Link href="/auth/register" className="text-primary hover:underline">
                {language === "ar" ? "إنشاء حساب" : "Sign up"}
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
