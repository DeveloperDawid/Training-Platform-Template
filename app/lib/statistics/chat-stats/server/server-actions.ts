"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { UpdateChatStatsSchema } from "../schema/chat-stats.schema";
import { AwardTrainingXpAction } from "../../user-xp/server/server-actions";
import { processNewAchievementXp } from "../../user-achievements/server/achievement-xp.helper";
import { PRODUCTS, PLATFORMS } from "@/lib/config/app-config";

interface ChatStatsInput {
  ai_score: number;
  product_type: string;
  platform_type: string;
  message_count: number;
  conversation_time_seconds: number;
}

export async function IncreaseUpdateChatStatsAction(
  userId: string,
  data: ChatStatsInput
) {
  const supabase = getSupabaseServerClient();

  // First, get all current values
  const { data: currentStats, error: fetchError } = await supabase
    .from("chat_stats")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (fetchError) {
    console.error("Error fetching current chat stats:", fetchError);
    throw new Error("Failed to fetch current chat stats");
  }

  // Calculate new totals
  const newTotalAttempted = (currentStats.total_chats_attempted || 0) + 1;
  const newTotalCompleted = (currentStats.total_chats_completed || 0) + 1;
  const newTotalMessages =
    (currentStats.total_messages_sent || 0) + data.message_count;

  // Calculate new average AI score (weighted average)
  const currentAverage = currentStats.average_ai_score || 0;
  const currentTotal = currentStats.total_chats_completed || 0;
  const newAverage =
    currentTotal === 0
      ? data.ai_score
      : (currentAverage * currentTotal + data.ai_score) / newTotalCompleted;

  // Update best AI score if this one is better
  const newBestScore = Math.max(currentStats.best_ai_score || 0, data.ai_score);

  // Update score distribution
  let newScores_0_3 = currentStats.scores_0_3 || 0;
  let newScores_4_6 = currentStats.scores_4_6 || 0;
  let newScores_7_8 = currentStats.scores_7_8 || 0;
  let newScores_9_10 = currentStats.scores_9_10 || 0;

  if (data.ai_score <= 3) newScores_0_3++;
  else if (data.ai_score <= 6) newScores_4_6++;
  else if (data.ai_score <= 8) newScores_7_8++;
  else newScores_9_10++;

  // Calculate conversation time metrics (weighted average)
  const currentAvgTime = currentStats.average_conversation_time || 0;
  const totalTimeBeforeUpdate = currentAvgTime * currentTotal;
  const newTotalTime = totalTimeBeforeUpdate + data.conversation_time_seconds;
  const newAverageConversationTime = newTotalTime / newTotalCompleted;

  // Calculate average messages per chat
  const newAverageMessagesPerChat = newTotalMessages / newTotalCompleted;

  // Update shortest chat (minimum message count)
  const newShortestChat = Math.min(
    currentStats.shortest_chat || data.message_count,
    data.message_count
  );

  // Update longest chat (maximum message count)
  const newLongestChat = Math.max(
    currentStats.longest_chat || 0,
    data.message_count
  );

  // Product and platform specific updates
  const productTypeUpdates: Record<string, number> = {};
  const platformTypeUpdates: Record<string, number> = {};

  // Product type updates
  if (data.product_type === PRODUCTS.PRODUCT_A.id) {
    const currentAttempts = (currentStats as any).product_a_attempts || 0;
    const currentAvgScore = (currentStats as any).product_a_avg_score || 0;
    const newAttempts = currentAttempts + 1;
    const newAvgScore =
      currentAttempts === 0
        ? data.ai_score
        : (currentAvgScore * currentAttempts + data.ai_score) / newAttempts;

    productTypeUpdates.product_a_attempts = newAttempts;
    productTypeUpdates.product_a_avg_score = newAvgScore;
  } else if (data.product_type === PRODUCTS.PRODUCT_B.id) {
    const currentAttempts = (currentStats as any).product_b_attempts || 0;
    const currentAvgScore = (currentStats as any).product_b_avg_score || 0;
    const newAttempts = currentAttempts + 1;
    const newAvgScore =
      currentAttempts === 0
        ? data.ai_score
        : (currentAvgScore * currentAttempts + data.ai_score) / newAttempts;

    productTypeUpdates.product_b_attempts = newAttempts;
    productTypeUpdates.product_b_avg_score = newAvgScore;
  } else {
    const currentAttempts = currentStats.product_other_attempts || 0;
    const currentAvgScore = currentStats.product_other_avg_score || 0;
    const newAttempts = currentAttempts + 1;
    const newAvgScore =
      currentAttempts === 0
        ? data.ai_score
        : (currentAvgScore * currentAttempts + data.ai_score) / newAttempts;

    productTypeUpdates.product_other_attempts = newAttempts;
    productTypeUpdates.product_other_avg_score = newAvgScore;
  }

  // Platform type updates
  if (data.platform_type === PLATFORMS.PLATFORM_A.id) {
    const currentAttempts = (currentStats as any).platform_a_attempts || 0;
    const currentAvgScore = (currentStats as any).platform_a_avg_score || 0;
    const newAttempts = currentAttempts + 1;
    const newAvgScore =
      currentAttempts === 0
        ? data.ai_score
        : (currentAvgScore * currentAttempts + data.ai_score) / newAttempts;

    platformTypeUpdates.platform_a_attempts = newAttempts;
    platformTypeUpdates.platform_a_avg_score = newAvgScore;
  } else if (data.platform_type === PLATFORMS.PLATFORM_B.id) {
    const currentAttempts = (currentStats as any).platform_b_attempts || 0;
    const currentAvgScore = (currentStats as any).platform_b_avg_score || 0;
    const newAttempts = currentAttempts + 1;
    const newAvgScore =
      currentAttempts === 0
        ? data.ai_score
        : (currentAvgScore * currentAttempts + data.ai_score) / newAttempts;

    platformTypeUpdates.platform_b_attempts = newAttempts;
    platformTypeUpdates.platform_b_avg_score = newAvgScore;
  } else {
    const currentAttempts = currentStats.platform_other_attempts || 0;
    const currentAvgScore = currentStats.platform_other_avg_score || 0;
    const newAttempts = currentAttempts + 1;
    const newAvgScore =
      currentAttempts === 0
        ? data.ai_score
        : (currentAvgScore * currentAttempts + data.ai_score) / newAttempts;

    platformTypeUpdates.platform_other_attempts = newAttempts;
    platformTypeUpdates.platform_other_avg_score = newAvgScore;
  }

  const updateData = {
    total_chats_attempted: newTotalAttempted,
    total_chats_completed: newTotalCompleted,
    total_messages_sent: newTotalMessages,
    average_conversation_time: newAverageConversationTime,
    average_ai_score: newAverage,
    best_ai_score: newBestScore,
    scores_0_3: newScores_0_3,
    scores_4_6: newScores_4_6,
    scores_7_8: newScores_7_8,
    scores_9_10: newScores_9_10,
    average_messages_per_chat: newAverageMessagesPerChat,
    shortest_chat: newShortestChat,
    longest_chat: newLongestChat,
    ...productTypeUpdates,
    ...platformTypeUpdates,
  };

  const validatedUpdateData = UpdateChatStatsSchema.parse(updateData);

  const { data: updatedData, error } = await supabase
    .from("chat_stats")
    .update(validatedUpdateData)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating chat stats:", error);
    throw new Error("Failed to update chat stats");
  }

  // Revalidate relevant paths
  revalidatePath("/home/statistics");
  revalidatePath("/home/training");

  // Award XP for chat training
  console.log(
    `[CHAT STATS] Attempting to award XP for chat training. User: ${userId.substring(
      0,
      8
    )}..., Score: ${data.ai_score}`
  );
  try {
    const xpResult = await AwardTrainingXpAction(userId, "chat", data.ai_score);
    if (xpResult) {
      console.log(`[CHAT STATS] ✅ XP awarded successfully:`, {
        xpAwarded: xpResult.xp_awarded,
        totalXp: xpResult.total_xp,
        leveledUp: xpResult.level_up_result.leveled_up,
        currentLevel: xpResult.level_up_result.new_level,
      });
    }
  } catch (error) {
    console.error(
      "[CHAT STATS] ❌ Error awarding XP for chat training:",
      error
    );
    // Don't throw here - we don't want to fail the whole operation if XP fails
  }

  // Check for newly unlocked achievements and award XP
  try {
    await processNewAchievementXp(userId);
  } catch (error) {
    console.error("[CHAT STATS] ❌ Error processing achievement XP:", error);
  }

  return { success: true, data: updatedData };
}
