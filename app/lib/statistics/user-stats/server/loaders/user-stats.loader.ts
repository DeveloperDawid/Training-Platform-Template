"use server";

import { cache } from "react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { createUserStatsService } from "./user-stats.service";

export const loadUserStats = cache(async (userId: string) => {
  const client = getSupabaseServerClient();
  const service = createUserStatsService(client);

  return service.getUserStats(userId);
});
