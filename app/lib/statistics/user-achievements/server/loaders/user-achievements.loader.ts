import { getSupabaseServerClient } from "@/lib/supabase/server";

import { cache } from "react";
import { createUserAchievementsService } from "./user-achievements.service";

export const loadUserAchievements = cache(async (userId: string) => {
  const client = getSupabaseServerClient();
  const service = createUserAchievementsService(client);

  return await service.getUserAchievements(userId);
});

export const loadAllAchievements = cache(async () => {
  const client = getSupabaseServerClient();
  const service = createUserAchievementsService(client);

  return await service.getAllAchievements();
});
