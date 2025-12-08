"use server";

import { cache } from "react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { createMcQuestionService } from "./mc_questions.service";
import { PlatformType, ProductType } from "@/app/lib/types";

export const loadMcQuestion = cache(async (questionId: string) => {
  const client = getSupabaseServerClient();
  const service = createMcQuestionService(client);

  return service.getMcQuestion(questionId);
});

export const loadAllMcQuestions = cache(async () => {
  const client = getSupabaseServerClient();
  const service = createMcQuestionService(client);

  return service.getAllMcQuestions();
});

export const loadRandomMcQuestions = cache(async (count: number = 5) => {
  const client = getSupabaseServerClient();
  const service = createMcQuestionService(client);

  return service.getRandomMcQuestions(count);
});

export const loadRandomMcQuestionsByUserLevel = cache(
  async (userLevel: number, count: number = 5) => {
    const client = getSupabaseServerClient();
    const service = createMcQuestionService(client);

    return service.getRandomMcQuestionsByUserLevel(userLevel, count);
  }
);

export const loadRandomMcQuestionsByProductTypeAndPlatform = cache(
  async (count: number = 5, productType: string, platformType: string) => {
    const client = getSupabaseServerClient();
    const service = createMcQuestionService(client);

    return service.getRandomMcQuestionsByProductTypeAndPlatform(
      productType as ProductType,
      platformType as PlatformType,
      count
    );
  }
);

export const loadRandomMcQuestionsByProductTypeAndPlatformAndUserLevel = cache(
  async (
    count: number = 5,
    productType: string,
    platformType: string,
    userLevel: number
  ) => {
    const client = getSupabaseServerClient();
    const service = createMcQuestionService(client);

    return service.getRandomMcQuestionsByProductTypeAndPlatformAndUserLevel(
      productType as ProductType,
      platformType as PlatformType,
      userLevel,
      count
    );
  }
);
