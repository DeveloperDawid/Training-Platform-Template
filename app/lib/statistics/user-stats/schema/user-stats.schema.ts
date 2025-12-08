import { z } from "zod";

export const UpdateUserStatsSchema = z.object({
  total_sessions_mc: z.number().int().min(0).optional(),
  total_time_seconds_mc: z.number().int().min(0).optional(),
  total_sessions_cases: z.number().int().min(0).optional(),
  total_time_seconds_cases: z.number().int().min(0).optional(),
  total_sessions_chat: z.number().int().min(0).optional(),
  total_time_seconds_chat: z.number().int().min(0).optional(),

  streak_days: z.number().int().min(0).optional(),
  last_activity_date: z.string().date().optional(),
});
