"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "ar" | "en"
type Direction = "rtl" | "ltr"

interface LanguageContextType {
  language: Language
  direction: Direction
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.chat": "إنشاء صفحة",
    "nav.features": "المميزات",
    "nav.pricing": "الأسعار",

    // Home page
    "home.title": "أنشئ صفحة هبوط احترافية في دقائق",
    "home.subtitle": "منصة ذكية تستخدم الذكاء الاصطناعي لبناء صفحات هبوط مخصصة من خلال دردشة تفاعلية بسيطة",
    "home.cta": "ابدأ الآن مجاناً",
    "home.demo": "شاهد العرض التوضيحي",

    // Features
    "features.title": "لماذا Chat2Site؟",
    "features.ai.title": "ذكاء اصطناعي متقدم",
    "features.ai.desc": "يفهم احتياجاتك ويبني صفحة مثالية",
    "features.realtime.title": "معاينة فورية",
    "features.realtime.desc": "شاهد صفحتك تُبنى أمام عينيك",
    "features.multilang.title": "دعم متعدد اللغات",
    "features.multilang.desc": "عربي وإنجليزي مع دعم RTL كامل",
    "features.responsive.title": "تصميم متجاوب",
    "features.responsive.desc": "يعمل بشكل مثالي على جميع الأجهزة",

    // Chat page
    "chat.title": "أخبرني عن مشروعك",
    "chat.subtitle": "سأساعدك في إنشاء صفحة هبوط مثالية خطوة بخطوة",
    "chat.placeholder": "اكتب رسالتك هنا...",
    "chat.send": "إرسال",
    "chat.preview": "معاينة",
    "chat.save": "حفظ المشروع",
    "chat.export": "تصدير الكود",

    // Loading
    "loading.title": "جاري إنشاء صفحتك...",
    "loading.analyzing": "تحليل المتطلبات",
    "loading.designing": "تصميم الواجهة",
    "loading.generating": "إنتاج الكود",
    "loading.finalizing": "اللمسات الأخيرة",

    // Common
    "common.loading": "جاري التحميل...",
    "common.error": "حدث خطأ",
    "common.success": "تم بنجاح",
    "common.cancel": "إلغاء",
    "common.confirm": "تأكيد",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.chat": "Create Page",
    "nav.features": "Features",
    "nav.pricing": "Pricing",

    // Home page
    "home.title": "Create Professional Landing Pages in Minutes",
    "home.subtitle": "AI-powered platform that builds custom landing pages through simple interactive chat",
    "home.cta": "Start Free Now",
    "home.demo": "Watch Demo",

    // Features
    "features.title": "Why Chat2Site?",
    "features.ai.title": "Advanced AI",
    "features.ai.desc": "Understands your needs and builds the perfect page",
    "features.realtime.title": "Real-time Preview",
    "features.realtime.desc": "Watch your page being built before your eyes",
    "features.multilang.title": "Multi-language Support",
    "features.multilang.desc": "Arabic and English with full RTL support",
    "features.responsive.title": "Responsive Design",
    "features.responsive.desc": "Works perfectly on all devices",

    // Chat page
    "chat.title": "Tell me about your project",
    "chat.subtitle": "I'll help you create the perfect landing page step by step",
    "chat.placeholder": "Type your message here...",
    "chat.send": "Send",
    "chat.preview": "Preview",
    "chat.save": "Save Project",
    "chat.export": "Export Code",

    // Loading
    "loading.title": "Creating your page...",
    "loading.analyzing": "Analyzing requirements",
    "loading.designing": "Designing interface",
    "loading.generating": "Generating code",
    "loading.finalizing": "Final touches",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const direction: Direction = language === "ar" ? "rtl" : "ltr"

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = lang
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && (savedLang === "ar" || savedLang === "en")) {
      setLanguage(savedLang)
    }
  }, [])

  return <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
