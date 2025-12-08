"use server";

import { cache } from "react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { createXpLevelsService } from "./xp-levels.service";

export const loadAllXpLevels = cache(async () => {
  const client = getSupabaseServerClient();
  const service = createXpLevelsService(client);

  return service.getAllLevels();
});

export const loadXpLevelByLevel = cache(async (level: number) => {
  const client = getSupabaseServerClient();
  const service = createXpLevelsService(client);

  return service.getLevelByLevel(level);
});
