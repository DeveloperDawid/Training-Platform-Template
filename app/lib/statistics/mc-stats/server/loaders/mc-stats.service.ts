import { Database } from "@/lib/supabase/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { McStats } from "../../types";

export function createMcStatsService(client: SupabaseClient<Database>) {
  return new McStatsService(client);
}

class McStatsService {
  constructor(private readonly client: SupabaseClient<Database>) {}

  async getMcStats(userId: string): Promise<McStats> {
    const { data, error } = await this.client
      .from("mc_stats")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      throw new Error("Multiple choice stats not found");
    }
    return data;
  }
}
