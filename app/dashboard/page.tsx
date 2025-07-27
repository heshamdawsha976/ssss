"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { projectService, shareService, type Project } from "@/lib/supabase"
import { Plus, MessageSquare, Calendar, Trash2, Edit, Eye, Share2, MoreHorizontal } from "lucide-react"
import { toast } from "sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
  const { language } = useLanguage()
  const { user } = useAuth()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }
    loadProjects()
  }, [user])

  const loadProjects = async () => {
    if (!user) return

    try {
      const { data, error } = await projectService.getUserProjects(user.id)
      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error("Error loading projects:", error)
      toast.error(language === "ar" ? "خطأ في تحميل المشاريع" : "Error loading projects")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm(language === "ar" ? "هل تريد حذف هذا المشروع؟" : "Are you sure you want to delete this project?")) {
      return
    }

    try {
      const { error } = await projectService.deleteProject(projectId)
      if (error) throw error

      setProjects(projects.filter((p) => p.id !== projectId))
      toast.success(language === "ar" ? "تم حذف المشروع بنجاح" : "Project deleted successfully")
    } catch (error) {
      toast.error(language === "ar" ? "خطأ في حذف المشروع" : "Error deleting project")
    }
  }

  const handleShareProject = async (projectId: string) => {
    try {
      const { data, error } = await shareService.createShare(projectId, true)
      if (error) throw error

      const shareUrl = `${window.location.origin}/share/${data.share_token}`
      await navigator.clipboard.writeText(shareUrl)
      toast.success(language === "ar" ? "تم نسخ رابط المشاركة!" : "Share link copied!")
    } catch (error) {
      toast.error(language === "ar" ? "خطأ في إنشاء رابط المشاركة" : "Error creating share link")
    }
  }

  const getTemplateColor = (template: string) => {
    switch (template) {
      case "restaurant":
        return "bg-red-100 text-red-800"
      case "tech":
        return "bg-purple-100 text-purple-800"
      case "ecommerce":
        return "bg-green-100 text-green-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  if (!user) {
    return null // Will redirect to login
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{language === "ar" ? "لوحة التحكم" : "Dashboard"}</h1>
            <p className="text-muted-foreground">
              {language === "ar" ? "إدارة مشاريعك وصفحات الهبوط" : "Manage your projects and landing pages"}
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/chat" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {language === "ar" ? "مشروع جديد" : "New Project"}
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {language === "ar" ? "إجمالي المشاريع" : "Total Projects"}
                  </p>
                  <p className="text-2xl font-bold">{projects.length}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {language === "ar" ? "منشورة" : "Published"}
                  </p>
                  <p className="text-2xl font-bold">{projects.filter((p) => p.status === "published").length}</p>
                </div>
                <Eye className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{language === "ar" ? "مسودات" : "Drafts"}</p>
                  <p className="text-2xl font-bold">{projects.filter((p) => p.status === "draft").length}</p>
                </div>
                <Edit className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {language === "ar" ? "هذا الشهر" : "This Month"}
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      projects.filter((p) => {
                        const projectDate = new Date(p.created_at)
                        const now = new Date()
                        return (
                          projectDate.getMonth() === now.getMonth() && projectDate.getFullYear() === now.getFullYear()
                        )
                      }).length
                    }
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {language === "ar" ? "لا توجد مشاريع بعد" : "No projects yet"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {language === "ar" ? "ابدأ بإنشاء مشروعك الأول" : "Start by creating your first project"}
              </p>
              <Button asChild>
                <Link href="/chat">{language === "ar" ? "إنشاء مشروع" : "Create Project"}</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 line-clamp-1">{project.title}</CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/chat?project=${project.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            {language === "ar" ? "تحرير" : "Edit"}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/preview/${project.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            {language === "ar" ? "معاينة" : "Preview"}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShareProject(project.id)}>
                          <Share2 className="mr-2 h-4 w-4" />
                          {language === "ar" ? "مشاركة" : "Share"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteProject(project.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          {language === "ar" ? "حذف" : "Delete"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2">
                      <Badge className={getTemplateColor(project.template_type)}>{project.template_type}</Badge>
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>
                      {language === "ar" ? "تم الإنشاء:" : "Created:"}{" "}
                      {new Date(project.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Link href={`/chat?project=${project.id}`}>
                        <Edit className="h-4 w-4 mr-2" />
                        {language === "ar" ? "تحرير" : "Edit"}
                      </Link>
                    </Button>

                    <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Link href={`/preview/${project.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        {language === "ar" ? "معاينة" : "Preview"}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
