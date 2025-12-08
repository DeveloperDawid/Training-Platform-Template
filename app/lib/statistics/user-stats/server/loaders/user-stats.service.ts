import { Database } from "@/lib/supabase/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { UserStats } from "../../types";

export function createUserStatsService(client: SupabaseClient<Database>) {
  return new UserStatsService(client);
}

class UserStatsService {
  constructor(private readonly client: SupabaseClient<Database>) {}

  async getUserStats(userId: string): Promise<UserStats> {
    const { data, error } = await this.client
      .from("user_stats")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      throw new Error("User stats not found");
    }
    return data;
  }
}
