import { Database } from "@/lib/supabase/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { XpLevel } from "../../types";

export function createXpLevelsService(client: SupabaseClient<Database>) {
  return new XpLevelsService(client);
}

class XpLevelsService {
  constructor(private readonly client: SupabaseClient<Database>) {}

  async getAllLevels(): Promise<XpLevel[]> {
    const { data, error } = await this.client
      .from("xp_levels")
      .select("*")
      .order("level", { ascending: true });

    if (error || !data) {
      throw new Error(`Failed to fetch XP levels: ${error?.message}`);
    }

    return data;
  }

  async getLevelByLevel(level: number): Promise<XpLevel | null> {
    const { data, error } = await this.client
      .from("xp_levels")
      .select("*")
      .eq("level", level)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No rows returned
        return null;
      }
      throw new Error(`Failed to fetch level ${level}: ${error.message}`);
    }

    return data;
  }
}
