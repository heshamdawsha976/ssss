"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { MessageSquare, Zap, Eye, Globe, Smartphone, ArrowRight, Play } from "lucide-react"

export default function HomePage() {
  const { t, direction } = useLanguage()

  const features = [
    {
      icon: MessageSquare,
      title: t("features.ai.title"),
      description: t("features.ai.desc"),
    },
    {
      icon: Eye,
      title: t("features.realtime.title"),
      description: t("features.realtime.desc"),
    },
    {
      icon: Globe,
      title: t("features.multilang.title"),
      description: t("features.multilang.desc"),
    },
    {
      icon: Smartphone,
      title: t("features.responsive.title"),
      description: t("features.responsive.desc"),
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10"></div>
        <div className="container relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              AI-Powered Landing Page Builder
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">{t("home.title")}</h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{t("home.subtitle")}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/chat" className="flex items-center gap-2">
                  {t("home.cta")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Play className="h-5 w-5 mr-2" />
                {t("home.demo")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("features.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              منصة متكاملة تجمع بين قوة الذكاء الاصطناعي وسهولة الاستخدام
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">كيف يعمل Chat2Site؟</h2>
            <p className="text-xl text-muted-foreground">ثلاث خطوات بسيطة لإنشاء صفحة هبوط احترافية</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "أخبرنا عن مشروعك",
                description: "ابدأ محادثة واشرح فكرة مشروعك وأهدافك",
              },
              {
                step: "2",
                title: "شاهد الإنشاء المباشر",
                description: "راقب صفحتك وهي تُبنى أمام عينيك في الوقت الفعلي",
              },
              {
                step: "3",
                title: "احفظ وشارك",
                description: "احفظ مشروعك وصدّر الكود أو انشره مباشرة",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">جاهز لإنشاء صفحتك؟</h2>
          <p className="text-xl mb-8 opacity-90">ابدأ الآن واكتشف قوة الذكاء الاصطناعي في بناء المواقع</p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link href="/chat" className="flex items-center gap-2">
              ابدأ مجاناً الآن
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl gradient-text">Chat2Site</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>© 2024 Chat2Site. All rights reserved.</span>
              <div className="flex items-center gap-1">Made with ❤️ using AI</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
