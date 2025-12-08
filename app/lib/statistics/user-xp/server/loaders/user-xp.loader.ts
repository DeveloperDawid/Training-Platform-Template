"use server";

import { cache } from "react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { createUserXpService } from "./user-xp.service";

export const loadUserXpWithLevel = cache(async (userId: string) => {
  const client = getSupabaseServerClient();
  const service = createUserXpService(client);

  return service.getUserXpWithLevel(userId);
});

export const loadXpLeaderboard = cache(async (limit?: number) => {
  const client = getSupabaseServerClient();
  const service = createUserXpService(client);

  return service.getLeaderboard(limit);
});

export const loadUserRank = cache(async (userId: string) => {
  const client = getSupabaseServerClient();
  const service = createUserXpService(client);

  return service.getUserRank(userId);
});

export const loadUserLevel = cache(async (userId: string) => {
  const client = getSupabaseServerClient();
  const service = createUserXpService(client);

  return service.getUserLevel(userId);
});
