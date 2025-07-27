import { IsString, IsObject, IsOptional, IsArray } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateProjectDto {
  @ApiProperty({ description: "Project title" })
  @IsString()
  title: string

  @ApiProperty({ description: "Project description" })
  @IsString()
  description: string

  @ApiProperty({ description: "Chat history", required: false })
  @IsOptional()
  @IsArray()
  chat_history?: any[]

  @ApiProperty({ description: "Preview data", required: false })
  @IsOptional()
  @IsObject()
  preview_data?: {
    title: string
    subtitle: string
    primaryColor: string
    sections: string[]
    features: string[]
    template: string
  }
}

export class UpdateProjectDto {
  @ApiProperty({ description: "Project title", required: false })
  @IsOptional()
  @IsString()
  title?: string

  @ApiProperty({ description: "Project description", required: false })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ description: "Chat history", required: false })
  @IsOptional()
  @IsArray()
  chat_history?: any[]

  @ApiProperty({ description: "Preview data", required: false })
  @IsOptional()
  @IsObject()
  preview_data?: {
    title: string
    subtitle: string
    primaryColor: string
    sections: string[]
    features: string[]
    template: string
  }
}

export class ChatMessageDto {
  @ApiProperty({ description: "User message" })
  @IsString()
  message: string

  @ApiProperty({ description: "Language preference", required: false })
  @IsOptional()
  @IsString()
  language?: "ar" | "en"
}
