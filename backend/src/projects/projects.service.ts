import { Injectable, NotFoundException } from "@nestjs/common"
import type { SupabaseService } from "../supabase/supabase.service"
import type { CreateProjectDto, UpdateProjectDto } from "./dto/project.dto"
import type { Project } from "./entities/project.entity"

@Injectable()
export class ProjectsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(userId: string, createProjectDto: CreateProjectDto): Promise<Project> {
    const { data, error } = await this.supabaseService.client
      .from("projects")
      .insert([
        {
          ...createProjectDto,
          user_id: userId,
        },
      ])
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create project: ${error.message}`)
    }

    return data
  }

  async findAll(userId: string): Promise<Project[]> {
    const { data, error } = await this.supabaseService.client
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch projects: ${error.message}`)
    }

    return data || []
  }

  async findOne(id: string, userId: string): Promise<Project> {
    const { data, error } = await this.supabaseService.client
      .from("projects")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single()

    if (error || !data) {
      throw new NotFoundException("Project not found")
    }

    return data
  }

  async update(id: string, userId: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const { data, error } = await this.supabaseService.client
      .from("projects")
      .update(updateProjectDto)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single()

    if (error || !data) {
      throw new NotFoundException("Project not found or update failed")
    }

    return data
  }

  async remove(id: string, userId: string): Promise<void> {
    const { error } = await this.supabaseService.client.from("projects").delete().eq("id", id).eq("user_id", userId)

    if (error) {
      throw new Error(`Failed to delete project: ${error.message}`)
    }
  }

  async generatePreview(projectId: string, userId: string): Promise<string> {
    const project = await this.findOne(projectId, userId)

    // Generate HTML preview based on project data
    const html = this.generateHTMLFromProject(project)

    return html
  }

  private generateHTMLFromProject(project: Project): string {
    const { preview_data } = project

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${preview_data.title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <section class="py-20 text-white text-center" style="background-color: ${preview_data.primaryColor}">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">${preview_data.title}</h1>
            <p class="text-xl mb-8 opacity-90">${preview_data.subtitle}</p>
            <button class="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold">
                Get Started
            </button>
        </div>
    </section>
    
    <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">Features</h2>
            <div class="grid md:grid-cols-3 gap-8">
                ${preview_data.features
                  .map(
                    (feature) => `
                    <div class="text-center p-6 rounded-lg border">
                        <h3 class="text-xl font-semibold mb-2">${feature}</h3>
                        <p class="text-gray-600">Feature description here</p>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
    </section>
</body>
</html>`
  }
}
