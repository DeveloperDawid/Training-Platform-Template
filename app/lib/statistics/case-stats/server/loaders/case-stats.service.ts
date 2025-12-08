import { Database } from "@/lib/supabase/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { CaseStats } from "../../types";

export function createCaseStatsService(client: SupabaseClient<Database>) {
  return new CaseStatsService(client);
}

class CaseStatsService {
  constructor(private readonly client: SupabaseClient<Database>) {}

  async getCaseStats(userId: string): Promise<CaseStats> {
    const { data, error } = await this.client
      .from("case_stats")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      throw new Error("Case stats not found");
    }
    return data;
  }
}
