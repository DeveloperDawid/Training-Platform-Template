import { Database } from "@/lib/supabase/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { ChatStats } from "../../types";

export function createChatStatsService(client: SupabaseClient<Database>) {
  return new ChatStatsService(client);
}

class ChatStatsService {
  constructor(private readonly client: SupabaseClient<Database>) {}

  async getChatStats(userId: string): Promise<ChatStats> {
    const { data, error } = await this.client
      .from("chat_stats")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      throw new Error("Chat stats not found");
    }
    return data;
  }
}
