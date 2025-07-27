import { Controller, Get, Post, Patch, Param, Delete, Request } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import type { ProjectsService } from "./projects.service"
import type { CreateProjectDto, UpdateProjectDto, ChatMessageDto } from "./dto/project.dto"
import type { AiService } from "../ai/ai.service"

@ApiTags("projects")
@Controller("projects")
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly aiService: AiService,
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new project" })
  @ApiResponse({ status: 201, description: "Project created successfully" })
  create(createProjectDto: CreateProjectDto, @Request() req: any) {
    // For demo purposes, using a mock user ID
    const userId = req.user?.id || "demo-user-123"
    return this.projectsService.create(userId, createProjectDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all user projects' })
  @ApiResponse({ status: 200, description: 'Projects retrieved successfully' })
  findAll(@Request() req: any) {
    const userId = req.user?.id || 'demo-user-123';
    return this.projectsService.findAll(userId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a specific project" })
  @ApiResponse({ status: 200, description: "Project retrieved successfully" })
  findOne(@Param('id') id: string, @Request() req: any) {
    const userId = req.user?.id || "demo-user-123"
    return this.projectsService.findOne(id, userId)
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a project" })
  @ApiResponse({ status: 200, description: "Project updated successfully" })
  update(@Param('id') id: string, updateProjectDto: UpdateProjectDto, @Request() req: any) {
    const userId = req.user?.id || "demo-user-123"
    return this.projectsService.update(id, userId, updateProjectDto)
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a project" })
  @ApiResponse({ status: 200, description: "Project deleted successfully" })
  remove(@Param('id') id: string, @Request() req: any) {
    const userId = req.user?.id || "demo-user-123"
    return this.projectsService.remove(id, userId)
  }

  @Post(":id/chat")
  @ApiOperation({ summary: "Send a chat message for project" })
  @ApiResponse({ status: 200, description: "AI response generated" })
  async chat(@Param('id') id: string, chatMessageDto: ChatMessageDto, @Request() req: any) {
    const userId = req.user?.id || "demo-user-123"
    const project = await this.projectsService.findOne(id, userId)

    // Generate AI response
    const aiResponse = this.aiService.generateResponse(chatMessageDto.message, chatMessageDto.language || "en")

    // Generate updated preview data
    const previewData = this.aiService.generatePreviewData(chatMessageDto.message, chatMessageDto.language || "en")

    // Update project with new chat history and preview data
    const updatedChatHistory = [
      ...(project.chat_history || []),
      {
        id: Date.now().toString(),
        role: "user",
        content: chatMessageDto.message,
        timestamp: new Date(),
      },
      {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      },
    ]

    await this.projectsService.update(id, userId, {
      chat_history: updatedChatHistory,
      preview_data: previewData,
    })

    return {
      response: aiResponse,
      preview_data: previewData,
    }
  }

  @Get(":id/preview")
  @ApiOperation({ summary: "Generate HTML preview for project" })
  @ApiResponse({ status: 200, description: "HTML preview generated" })
  generatePreview(@Param('id') id: string, @Request() req: any) {
    const userId = req.user?.id || "demo-user-123"
    return this.projectsService.generatePreview(id, userId)
  }
}
