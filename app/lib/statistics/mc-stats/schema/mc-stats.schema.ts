import { z } from "zod";

export const UpdateMcStatsSchema = z.object({
  total_quizzes_completed: z.number().int().min(0).optional(),
  total_questions_answered: z.number().int().min(0).optional(),
  total_correct_answers: z.number().int().min(0).optional(),
  average_score: z.number().min(0).max(999.99).optional(),
  best_score: z.number().min(0).max(999.99).optional(),

  // Performance by product type
  product_a_correct: z.number().int().min(0).optional(),
  product_a_total: z.number().int().min(0).optional(),
  product_b_correct: z.number().int().min(0).optional(),
  product_b_total: z.number().int().min(0).optional(),
  platform_a_correct: z.number().int().min(0).optional(),
  platform_a_total: z.number().int().min(0).optional(),
  platform_b_correct: z.number().int().min(0).optional(),
  platform_b_total: z.number().int().min(0).optional(),
  platform_other_correct: z.number().int().min(0).optional(),
  platform_other_total: z.number().int().min(0).optional(),
  product_other_correct: z.number().int().min(0).optional(),
  product_other_total: z.number().int().min(0).optional(),
});
