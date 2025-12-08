"use server";

import { cache } from "react";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { createCaseService } from "./cases.service";

export const loadCase = cache(async (caseId: string) => {
  const client = getSupabaseServerClient();
  const service = createCaseService(client);

  return service.getCase(caseId);
});

export const loadRandomCase = cache(async () => {
  const client = getSupabaseServerClient();
  const service = createCaseService(client);

  return service.getRandomCase();
});

export const loadRandomCaseByUserLevel = cache(async (userLevel: number) => {
  const client = getSupabaseServerClient();
  const service = createCaseService(client);

  return service.getRandomCaseByUserLevel(userLevel);
});

export const loadAllCases = cache(async () => {
  const client = getSupabaseServerClient();
  const service = createCaseService(client);

  return service.getAllCases();
});
