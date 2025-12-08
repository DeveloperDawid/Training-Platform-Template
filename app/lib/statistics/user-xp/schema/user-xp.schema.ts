import { z } from "zod";

export const UpdateUserXpSchema = z.object({
  total_xp: z.number().int().min(0).optional(),
  current_level: z.number().int().min(1).max(100).optional(),
  xp_to_next_level: z.number().int().min(0).optional(),
});

export const AwardXpSchema = z.object({
  user_id: z.uuid(),
  xp_amount: z.number().int().min(1),
  source: z.enum([
    "chat_completion",
    "chat_high_score",
    "chat_perfect_score",
    "case_completion",
    "case_high_score",
    "case_perfect_score",
    "mc_completion",
    "mc_high_score",
    "mc_perfect_score",
    "achievement_unlock",
    "daily_bonus",
  ]),
});

export const CalculateXpRewardsSchema = z.object({
  activity_type: z.enum(["chat", "case", "mc"]),
  score: z.number().min(0).max(10),
});
