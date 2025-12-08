import { z } from "zod";

export const UpdateCaseStatsSchema = z.object({
  total_cases_attempted: z.number().int().min(0).optional(),
  total_cases_completed: z.number().int().min(0).optional(),
  average_ai_score: z.number().min(0).max(10).optional(),
  best_ai_score: z.number().min(0).max(10).optional(),

  // Score distribution (AI evaluation 0-10)
  scores_0_3: z.number().int().min(0).optional(), // Poor (0-3)
  scores_4_6: z.number().int().min(0).optional(), // Fair (4-6)
  scores_7_8: z.number().int().min(0).optional(), // Good (7-8)
  scores_9_10: z.number().int().min(0).optional(), // Excellent (9-10)

  // Performance by product type
  product_a_avg_score: z.number().min(0).max(10).optional(),
  product_b_avg_score: z.number().min(0).max(10).optional(),
  platform_a_avg_score: z.number().min(0).max(10).optional(),
  platform_b_avg_score: z.number().min(0).max(10).optional(),
  platform_other_avg_score: z.number().min(0).max(10).optional(),
  product_other_avg_score: z.number().min(0).max(10).optional(),

  // Product type attempt counters
  product_a_attempts: z.number().int().min(0).optional(),
  product_b_attempts: z.number().int().min(0).optional(),
  platform_a_attempts: z.number().int().min(0).optional(),
  platform_b_attempts: z.number().int().min(0).optional(),
  platform_other_attempts: z.number().int().min(0).optional(),
  product_other_attempts: z.number().int().min(0).optional(),
});
