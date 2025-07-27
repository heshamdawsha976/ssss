import { createClient } from "@supabase/supabase-js"
import { crypto } from "node:crypto"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  language: "ar" | "en"
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  user_id: string
  title: string
  description: string
  chat_history: Message[]
  preview_data: PreviewData
  template_type: string
  status: "draft" | "published" | "archived"
  html_content?: string
  css_content?: string
  js_content?: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface PreviewData {
  title: string
  subtitle: string
  primaryColor: string
  sections: string[]
  features: string[]
  template: string
}

export interface Template {
  id: string
  name: string
  description: string
  category: string
  preview_image?: string
  html_template: string
  css_template?: string
  js_template?: string
  config: any
  is_active: boolean
  created_at: string
}

export interface ProjectShare {
  id: string
  project_id: string
  share_token: string
  is_public: boolean
  password_hash?: string
  expires_at?: string
  view_count: number
  created_at: string
}

// Database operations
export const authService = {
  async signUp(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    return { data, error }
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getCurrentUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  },

  async getProfile(userId: string) {
    const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()
    return { data, error }
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase.from("user_profiles").update(updates).eq("id", userId).select().single()
    return { data, error }
  },
}

export const projectService = {
  async createProject(project: Omit<Project, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase.from("projects").insert([project]).select().single()
    return { data, error }
  },

  async getProject(id: string) {
    const { data, error } = await supabase.from("projects").select("*").eq("id", id).single()
    return { data, error }
  },

  async updateProject(id: string, updates: Partial<Project>) {
    const { data, error } = await supabase.from("projects").update(updates).eq("id", id).select().single()
    return { data, error }
  },

  async getUserProjects(userId: string) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
    return { data, error }
  },

  async deleteProject(id: string) {
    const { error } = await supabase.from("projects").delete().eq("id", id)
    return { error }
  },

  async generateHTML(project: Project): Promise<string> {
    const template = await templateService.getTemplate(project.template_type)
    if (!template.data) return ""

    // Simple template engine - replace placeholders
    let html = template.data.html_template
    const { preview_data } = project

    html = html.replace(/\{\{title\}\}/g, preview_data.title)
    html = html.replace(/\{\{subtitle\}\}/g, preview_data.subtitle)
    html = html.replace(/\{\{language\}\}/g, "en") // TODO: get from user preference
    html = html.replace(/\{\{direction\}\}/g, "ltr") // TODO: get from user preference

    // Handle features array
    const featuresHtml = preview_data.features.map((feature) => `<div class="feature-item">${feature}</div>`).join("")
    html = html.replace(/\{\{#each features\}\}.*?\{\{\/each\}\}/gs, featuresHtml)

    return html
  },
}

export const templateService = {
  async getTemplates() {
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
    return { data, error }
  },

  async getTemplate(id: string) {
    const { data, error } = await supabase.from("templates").select("*").eq("id", id).single()
    return { data, error }
  },

  async getTemplateByCategory(category: string) {
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("category", category)
      .eq("is_active", true)
      .limit(1)
      .single()
    return { data, error }
  },
}

export const shareService = {
  async createShare(projectId: string, isPublic = true, expiresAt?: string) {
    const { data, error } = await supabase
      .from("project_shares")
      .insert([
        {
          project_id: projectId,
          is_public: isPublic,
          expires_at: expiresAt,
          share_token: crypto.randomUUID(), // Will be replaced by DB function
        },
      ])
      .select()
      .single()
    return { data, error }
  },

  async getSharedProject(token: string) {
    const { data, error } = await supabase.rpc("get_shared_project", { token })
    return { data, error }
  },

  async getProjectShares(projectId: string) {
    const { data, error } = await supabase.from("project_shares").select("*").eq("project_id", projectId)
    return { data, error }
  },

  async deleteShare(shareId: string) {
    const { error } = await supabase.from("project_shares").delete().eq("id", shareId)
    return { error }
  },
}
