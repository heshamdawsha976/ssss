import { Injectable } from "@nestjs/common"
import type { ConfigService } from "@nestjs/config"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>("SUPABASE_URL")
    const supabaseKey = this.configService.get<string>("SUPABASE_ANON_KEY")

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase URL and Key must be provided")
    }

    this.supabase = createClient(supabaseUrl, supabaseKey)
  }

  get client(): SupabaseClient {
    return this.supabase
  }

  async createTables() {
    // Create projects table
    const { error: projectsError } = await this.supabase.rpc("create_projects_table")
    if (projectsError) {
      console.error("Error creating projects table:", projectsError)
    }

    // Create users table if needed
    const { error: usersError } = await this.supabase.rpc("create_users_table")
    if (usersError) {
      console.error("Error creating users table:", usersError)
    }
  }
}
