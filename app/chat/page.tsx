"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { projectService, type Project, type Message, type PreviewData } from "@/lib/supabase"
import { AIService } from "@/lib/ai-service"
import { Send, Bot, User, Eye, Save, Download, Sparkles, Plus } from "lucide-react"
import { toast } from "sonner"

export default function ChatPage() {
  const { t, direction, language } = useLanguage()
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectId = searchParams.get("project")

  const [project, setProject] = useState<Project | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [previewData, setPreviewData] = useState<PreviewData>({
    title: language === "ar" ? "مشروعك المميز" : "Your Amazing Project",
    subtitle: language === "ar" ? "بناء بالذكاء الاصطناعي" : "Built with AI-powered Chat2Site",
    primaryColor: "#3b82f6",
    sections: ["Hero", "Features", "About", "Contact"],
    features: [
      language === "ar" ? "ميزة رائعة 1" : "Amazing Feature 1",
      language === "ar" ? "ميزة رائعة 2" : "Amazing Feature 2",
      language === "ar" ? "ميزة رائعة 3" : "Amazing Feature 3",
    ],
    template: "general",
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    if (projectId) {
      loadProject(projectId)
    } else {
      // Initialize with welcome message
      setMessages([
        {
          id: "1",
          role: "assistant",
          content: AIService.generateResponse("", language),
          timestamp: new Date(),
        },
      ])
    }
  }, [user, projectId, language])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const loadProject = async (id: string) => {
    try {
      const { data, error } = await projectService.getProject(id)
      if (error) throw error

      setProject(data)
      setMessages(data.chat_history || [])
      setPreviewData(data.preview_data || previewData)
    } catch (error) {
      console.error("Error loading project:", error)
      toast.error(language === "ar" ? "خطأ في تحميل المشروع" : "Error loading project")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || !user) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Generate AI response
      const aiResponse = AIService.generateResponse(input, language)
      const newPreviewData = AIService.generatePreviewData(input, language)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      }

      const updatedMessages = [...messages, userMessage, assistantMessage]

      setMessages(updatedMessages)
      setPreviewData(newPreviewData)

      // Save or update project
      if (project) {
        await projectService.updateProject(project.id, {
          chat_history: updatedMessages,
          preview_data: newPreviewData,
        })
      } else {
        // Create new project
        const newProject = await projectService.createProject({
          user_id: user.id,
          title: newPreviewData.title,
          description: language === "ar" ? "مشروع جديد" : "New project",
          chat_history: updatedMessages,
          preview_data: newPreviewData,
          template_type: newPreviewData.template,
          status: "draft",
        })

        if (newProject.data) {
          setProject(newProject.data)
          // Update URL without refresh
          window.history.replaceState(null, "", `/chat?project=${newProject.data.id}`)
        }
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error(language === "ar" ? "حدث خطأ في المحادثة" : "Error in conversation")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveProject = async () => {
    if (!project || !user) return

    try {
      await projectService.updateProject(project.id, {
        chat_history: messages,
        preview_data: previewData,
      })
      toast.success(language === "ar" ? "تم حفظ المشروع بنجاح!" : "Project saved successfully!")
    } catch (error) {
      toast.error(language === "ar" ? "خطأ في حفظ المشروع" : "Error saving project")
    }
  }

  const handleExportCode = async () => {
    if (!project) return

    try {
      const html = await projectService.generateHTML(project)
      const blob = new Blob([html], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${project.title.replace(/\s+/g, "-").toLowerCase()}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success(language === "ar" ? "تم تصدير الكود!" : "Code exported!")
    } catch (error) {
      toast.error(language === "ar" ? "خطأ في التصدير" : "Export error")
    }
  }

  const handleNewProject = () => {
    setProject(null)
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: AIService.generateResponse("", language),
        timestamp: new Date(),
      },
    ])
    setPreviewData({
      title: language === "ar" ? "مشروعك المميز" : "Your Amazing Project",
      subtitle: language === "ar" ? "بناء بالذكاء الاصطناعي" : "Built with AI-powered Chat2Site",
      primaryColor: "#3b82f6",
      sections: ["Hero", "Features", "About", "Contact"],
      features: [
        language === "ar" ? "ميزة رائعة 1" : "Amazing Feature 1",
        language === "ar" ? "ميزة رائعة 2" : "Amazing Feature 2",
        language === "ar" ? "ميزة رائعة 3" : "Amazing Feature 3",
      ],
      template: "general",
    })
    window.history.replaceState(null, "", "/chat")
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
          {/* Chat Section */}
          <Card className="flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  {project ? project.title : t("chat.title")}
                </CardTitle>
                <Button variant="outline" size="sm" onClick={handleNewProject}>
                  <Plus className="h-4 w-4 mr-2" />
                  {language === "ar" ? "مشروع جديد" : "New Project"}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{t("chat.subtitle")}</p>
            </CardHeader>

            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex gap-3 max-w-[80%] ${
                          message.role === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>

                        <div
                          className={`rounded-lg p-3 ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <span className="text-xs opacity-70 mt-1 block">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                          <div
                            className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>

            <div className="border-t p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("chat.placeholder")}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>

          {/* Preview Section */}
          <Card className="flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  {t("chat.preview")}
                </CardTitle>
                <div className="flex gap-2">
                  {project && (
                    <Button variant="outline" size="sm" onClick={handleSaveProject}>
                      <Save className="h-4 w-4 mr-2" />
                      {t("chat.save")}
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={handleExportCode} disabled={!project}>
                    <Download className="h-4 w-4 mr-2" />
                    {t("chat.export")}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-4">
              <div className="h-full bg-white rounded-lg border overflow-hidden">
                <div className="h-full overflow-y-auto">
                  {/* Hero Section Preview */}
                  <div className="p-8 text-white text-center" style={{ backgroundColor: previewData.primaryColor }}>
                    <h1 className="text-3xl font-bold mb-4">{previewData.title}</h1>
                    <p className="text-lg opacity-90 mb-6">{previewData.subtitle}</p>
                    <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                      {language === "ar" ? "ابدأ الآن" : "Get Started"}
                    </button>
                  </div>

                  {/* Features Section Preview */}
                  <div className="p-8 bg-gray-50">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                      {language === "ar" ? "المميزات" : "Features"}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                      {previewData.features.map((feature, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg text-center shadow-sm">
                          <div
                            className="h-12 w-12 rounded-lg mx-auto mb-3 flex items-center justify-center"
                            style={{ backgroundColor: `${previewData.primaryColor}20` }}
                          >
                            <Sparkles className="h-6 w-6" style={{ color: previewData.primaryColor }} />
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">{feature}</h3>
                          <p className="text-sm text-gray-600">
                            {language === "ar" ? "وصف الميزة هنا" : "Feature description here"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sections Preview */}
                  <div className="p-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">
                      {language === "ar" ? "أقسام الصفحة:" : "Page Sections:"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {previewData.sections.map((section, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border">
                          {section}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Section Preview */}
                  <div className="p-8 bg-gray-100">
                    <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">
                      {language === "ar" ? "تواصل معنا" : "Contact Us"}
                    </h2>
                    <p className="text-center text-gray-600 mb-6">
                      {language === "ar" ? "نحن هنا لمساعدتك" : "We are here to help you"}
                    </p>
                    <div className="text-center">
                      <button
                        className="px-6 py-2 rounded-lg font-medium text-white transition-colors"
                        style={{ backgroundColor: previewData.primaryColor }}
                      >
                        {language === "ar" ? "اتصل بنا" : "Contact Us"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
