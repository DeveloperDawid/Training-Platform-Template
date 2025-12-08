import { getSupabaseServerClient } from "@/lib/supabase/server";
import { createMcStatsService } from "./mc-stats.service";
import { cache } from "react";

export const loadMcStats = cache(async (userId: string) => {
  const client = getSupabaseServerClient();
  const service = createMcStatsService(client);
  
  return await service.getMcStats(userId);
});
