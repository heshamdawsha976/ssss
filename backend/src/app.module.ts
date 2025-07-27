import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { ProjectsModule } from "./projects/projects.module"
import { AuthModule } from "./auth/auth.module"
import { AiModule } from "./ai/ai.module"
import { SupabaseModule } from "./supabase/supabase.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule,
    AuthModule,
    ProjectsModule,
    AiModule,
  ],
})
export class AppModule {}
