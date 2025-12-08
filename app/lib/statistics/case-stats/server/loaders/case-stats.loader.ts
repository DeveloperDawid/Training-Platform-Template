"use server";

import { cache } from "react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { createCaseStatsService } from "./case-stats.service";

export const loadCaseStats = cache(async (userId: string) => {
  const client = getSupabaseServerClient();
  const service = createCaseStatsService(client);

  return service.getCaseStats(userId);
});
