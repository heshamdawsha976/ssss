"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { projectService, type Project } from "@/lib/supabase"
import { ArrowLeft, Download, Share2, Code, Smartphone, Monitor, Tablet } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function PreviewPage() {
  const params = useParams()
  const { language } = useLanguage()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")

  useEffect(() => {
    if (params.id) {
      loadProject(params.id as string)
    }
  }, [params.id])

  const loadProject = async (projectId: string) => {
    try {
      const projectData = await projectService.getProject(projectId)
      setProject(projectData)
    } catch (error) {
      console.error("Error loading project:", error)
      // Mock data for demo
      setProject({
        id: projectId,
        user_id: "demo-user-123",
        title: language === "ar" ? "مطعم الذواقة" : "Gourmet Restaurant",
        description: language === "ar" ? "صفحة هبوط لمطعم فاخر" : "Landing page for fine dining restaurant",
        chat_history: [],
        preview_data: {
          title: language === "ar" ? "مطعم الذواقة" : "Gourmet Restaurant",
          subtitle: language === "ar" ? "تجربة طعام لا تُنسى" : "An Unforgettable Dining Experience",
          primaryColor: "#dc2626",
          sections: ["Hero", "Menu", "About", "Reservations", "Contact"],
          features:
            language === "ar"
              ? ["مكونات طازجة", "طهاة خبراء", "أجواء مريحة"]
              : ["Fresh Ingredients", "Expert Chefs", "Cozy Atmosphere"],
          template: "restaurant",
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    if (!project) return

    const htmlContent = generateHTML(project)
    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${project.title.replace(/\s+/g, "-").toLowerCase()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success(language === "ar" ? "تم تصدير الملف بنجاح!" : "File exported successfully!")
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project?.title,
          text: project?.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast.success(language === "ar" ? "تم نسخ الرابط!" : "Link copied!")
    }
  }

  const generateHTML = (project: Project) => {
    const { preview_data } = project
    return `
<!DOCTYPE html>
<html lang="${language}" dir="${language === "ar" ? "rtl" : "ltr"}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${preview_data.title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: ${language === "ar" ? "Cairo" : "Inter"}, sans-serif; }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Hero Section -->
    <section class="py-20 text-white text-center" style="background-color: ${preview_data.primaryColor}">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">${preview_data.title}</h1>
            <p class="text-xl mb-8 opacity-90">${preview_data.subtitle}</p>
            <button class="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                ${language === "ar" ? "ابدأ الآن" : "Get Started"}
            </button>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12 text-gray-900">
                ${language === "ar" ? "المميزات" : "Features"}
            </h2>
            <div class="grid md:grid-cols-3 gap-8">
                ${preview_data.features
                  .map(
                    (feature) => `
                    <div class="text-center p-6 rounded-lg border">
                        <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style="background-color: ${preview_data.primaryColor}20">
                            <svg class="w-8 h-8" style="color: ${preview_data.primaryColor}" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold mb-2 text-gray-900">${feature}</h3>
                        <p class="text-gray-600">${language === "ar" ? "وصف الميزة هنا" : "Feature description here"}</p>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="py-20 bg-gray-100">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold mb-8 text-gray-900">
                ${language === "ar" ? "تواصل معنا" : "Contact Us"}
            </h2>
            <p class="text-xl text-gray-600 mb-8">
                ${language === "ar" ? "نحن هنا لمساعدتك" : "We are here to help you"}
            </p>
            <button class="px-8 py-3 rounded-lg font-semibold text-white transition-colors" style="background-color: ${preview_data.primaryColor}">
                ${language === "ar" ? "اتصل بنا" : "Contact Us"}
            </button>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 bg-gray-900 text-white text-center">
        <p>&copy; 2024 ${preview_data.title}. ${language === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved"}.</p>
        <p class="mt-2 text-sm text-gray-400">
            ${language === "ar" ? "تم الإنشاء بواسطة" : "Created with"} Chat2Site
        </p>
    </footer>
</body>
</html>`
  }

  const getViewModeClass = () => {
    switch (viewMode) {
      case "mobile":
        return "max-w-sm mx-auto"
      case "tablet":
        return "max-w-2xl mx-auto"
      default:
        return "w-full"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <Card className="text-center p-8">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">{language === "ar" ? "المشروع غير موجود" : "Project not found"}</h2>
            <Button asChild>
              <Link href="/dashboard">{language === "ar" ? "العودة للوحة التحكم" : "Back to Dashboard"}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {language === "ar" ? "العودة" : "Back"}
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold">{project.title}</h1>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* View Mode Selector */}
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === "desktop" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("desktop")}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "tablet" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("tablet")}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "mobile" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("mobile")}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>

              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                {language === "ar" ? "مشاركة" : "Share"}
              </Button>

              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                {language === "ar" ? "تصدير HTML" : "Export HTML"}
              </Button>

              <Button asChild size="sm">
                <Link href={`/chat?project=${project.id}`}>
                  <Code className="h-4 w-4 mr-2" />
                  {language === "ar" ? "تحرير" : "Edit"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="container py-8">
        <div className={`transition-all duration-300 ${getViewModeClass()}`}>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe srcDoc={generateHTML(project)} className="w-full h-[800px] border-0" title="Preview" />
          </div>
        </div>
      </div>
    </div>
  )
}
