"use server";

import { cache } from "react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { createChatStatsService } from "./chat-stats.service";

export const loadChatStats = cache(async (userId: string) => {
  const client = getSupabaseServerClient();
  const service = createChatStatsService(client);

  return service.getChatStats(userId);
});
