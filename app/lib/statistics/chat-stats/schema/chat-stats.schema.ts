import { z } from "zod";

export const UpdateChatStatsSchema = z.object({
  // Chat session statistics
  total_chats_attempted: z.number().int().min(0).optional(),
  total_chats_completed: z.number().int().min(0).optional(),
  total_messages_sent: z.number().int().min(0).optional(),
  average_conversation_time: z.number().min(0).optional(),
  average_messages_per_chat: z.number().min(0).optional(),

  // Performance statistics (AI evaluation 0-10)
  average_ai_score: z.number().min(0).max(10).optional(),
  best_ai_score: z.number().min(0).max(10).optional(),

  // Score distribution (AI evaluation 0-10)
  scores_0_3: z.number().int().min(0).optional(), // Poor (0-3)
  scores_4_6: z.number().int().min(0).optional(), // Fair (4-6)
  scores_7_8: z.number().int().min(0).optional(), // Good (7-8)
  scores_9_10: z.number().int().min(0).optional(), // Excellent (9-10)

  // Conversation quality metrics
  shortest_chat: z.number().int().min(0).optional(),
  longest_chat: z.number().int().min(0).optional(),

  // Performance by product type
  product_a_avg_score: z.number().min(0).max(10).optional(),
  product_a_attempts: z.number().int().min(0).optional(),
  product_b_avg_score: z.number().min(0).max(10).optional(),
  product_b_attempts: z.number().int().min(0).optional(),
  product_other_avg_score: z.number().min(0).max(10).optional(),
  product_other_attempts: z.number().int().min(0).optional(),

  // Performance by platform type
  platform_a_avg_score: z.number().min(0).max(10).optional(),
  platform_a_attempts: z.number().int().min(0).optional(),
  platform_b_avg_score: z.number().min(0).max(10).optional(),
  platform_b_attempts: z.number().int().min(0).optional(),
  platform_other_avg_score: z.number().min(0).max(10).optional(),
  platform_other_attempts: z.number().int().min(0).optional(),
});
