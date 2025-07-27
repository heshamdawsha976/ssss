"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { shareService } from "@/lib/supabase"
import { Download, ExternalLink } from "lucide-react"
import { toast } from "sonner"

interface SharedProject {
  project_id: string
  title: string
  description: string
  html_content: string
  css_content: string
  js_content: string
  preview_data: any
}

export default function SharePage() {
  const params = useParams()
  const token = params.token as string
  const [project, setProject] = useState<SharedProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (token) {
      loadSharedProject(token)
    }
  }, [token])

  const loadSharedProject = async (shareToken: string) => {
    try {
      const { data, error } = await shareService.getSharedProject(shareToken)
      if (error) throw error

      if (!data || data.length === 0) {
        setError("Project not found or link has expired")
        return
      }

      setProject(data[0])
    } catch (error) {
      console.error("Error loading shared project:", error)
      setError("Failed to load shared project")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!project) return

    const html = generateFullHTML(project)
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${project.title.replace(/\s+/g, "-").toLowerCase()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success("File downloaded successfully!")
  }

  const generateFullHTML = (project: SharedProject) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.title}</title>
    <meta name="description" content="${project.description}">
    <script src="https://cdn.tailwindcss.com"></script>
    ${project.css_content ? `<style>${project.css_content}</style>` : ""}
</head>
<body>
    ${project.html_content || generateDefaultHTML(project)}
    ${project.js_content ? `<script>${project.js_content}</script>` : ""}
</body>
</html>`
  }

  const generateDefaultHTML = (project: SharedProject) => {
    const { preview_data } = project
    return `
    <section class="py-20 text-white text-center" style="background-color: ${preview_data.primaryColor}">
        <div class="container mx-auto px-4">
            <h1 class="text-5xl font-bold mb-6">${preview_data.title}</h1>
            <p class="text-xl mb-8 opacity-90">${preview_data.subtitle}</p>
            <button class="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
                Get Started
            </button>
        </div>
    </section>
    
    <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">Features</h2>
            <div class="grid md:grid-cols-3 gap-8">
                ${
                  preview_data.features
                    ?.map(
                      (feature: string) => `
                    <div class="text-center p-6 border rounded-lg">
                        <h3 class="text-xl font-semibold mb-2">${feature}</h3>
                        <p class="text-gray-600">Feature description here</p>
                    </div>
                `,
                    )
                    .join("") || ""
                }
            </div>
        </div>
    </section>`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <Card className="text-center p-8 max-w-md">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
            <p className="text-muted-foreground mb-6">
              {error || "The shared project could not be found or the link has expired."}
            </p>
            <Button asChild>
              <a href="/">Go to Homepage</a>
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
            <div>
              <h1 className="text-2xl font-bold">{project.title}</h1>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download HTML
              </Button>
              <Button asChild>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Create Your Own
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="container py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe
            srcDoc={generateFullHTML(project)}
            className="w-full h-[800px] border-0"
            title="Shared Project Preview"
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-muted-foreground">
          <p>
            Created with{" "}
            <a href="/" className="text-primary hover:underline font-semibold">
              Chat2Site
            </a>{" "}
            - AI-Powered Landing Page Builder
          </p>
        </div>
      </div>
    </div>
  )
}
