"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { UpdateCaseStatsSchema } from "../schema/case-stats.schema";
import { AwardTrainingXpAction } from "../../user-xp/server/server-actions";
import { processNewAchievementXp } from "../../user-achievements/server/achievement-xp.helper";
import { PRODUCTS, PLATFORMS } from "@/lib/config/app-config";

interface CaseStatsInput {
  ai_score: number;
  product_type: string;
  platform_type: string;
}

export async function IncreaseUpdateCaseStatsAction(
  userId: string,
  data: CaseStatsInput
) {
  const supabase = getSupabaseServerClient();

  // First, get all current values
  const { data: currentStats, error: fetchError } = await supabase
    .from("case_stats")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (fetchError) {
    console.error("Error fetching current case stats:", fetchError);
    throw new Error("Failed to fetch current case stats");
  }

  // Calculate new totals
  const newTotalAttempted = (currentStats.total_cases_attempted || 0) + 1;
  const newTotalCompleted = (currentStats.total_cases_completed || 0) + 1;

  // Calculate new average AI score (weighted average, store raw value)
  const currentAverage = currentStats.average_ai_score || 0;
  const currentTotal = currentStats.total_cases_completed || 0;
  const newAverage =
    currentTotal === 0
      ? data.ai_score
      : (currentAverage * currentTotal + data.ai_score) / newTotalCompleted;

  // Update best score if needed
  const newBestScore = Math.max(currentStats.best_ai_score || 0, data.ai_score);

  // Update score ranges
  let newScores_0_3 = currentStats.scores_0_3 || 0;
  let newScores_4_6 = currentStats.scores_4_6 || 0;
  let newScores_7_8 = currentStats.scores_7_8 || 0;
  let newScores_9_10 = currentStats.scores_9_10 || 0;

  if (data.ai_score >= 0 && data.ai_score <= 3) newScores_0_3++;
  else if (data.ai_score >= 4 && data.ai_score <= 6) newScores_4_6++;
  else if (data.ai_score >= 7 && data.ai_score <= 8) newScores_7_8++;
  else if (data.ai_score >= 9 && data.ai_score <= 10) newScores_9_10++;

  // Calculate product type and platform type statistics
  const productTypeUpdates: Record<string, number> = {};
  const platformTypeUpdates: Record<string, number> = {};

  // Calculate product type statistics (store raw average)
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

  // Calculate platform type statistics (store raw average)
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
    total_cases_attempted: newTotalAttempted,
    total_cases_completed: newTotalCompleted,
    average_ai_score: newAverage,
    best_ai_score: newBestScore,
    scores_0_3: newScores_0_3,
    scores_4_6: newScores_4_6,
    scores_7_8: newScores_7_8,
    scores_9_10: newScores_9_10,
    ...productTypeUpdates,
    ...platformTypeUpdates,
  };

  const validatedUpdateData = UpdateCaseStatsSchema.parse(updateData);

  const { data: updatedData, error } = await supabase
    .from("case_stats")
    .update(validatedUpdateData)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating case stats:", error);
    throw new Error("Failed to update case stats");
  }

  // Revalidate relevant paths
  revalidatePath("/home/statistics");
  revalidatePath("/home/training");

  // Award XP for case training
  console.log(
    `[CASE STATS] Attempting to award XP for case training. User: ${userId.substring(
      0,
      8
    )}..., Score: ${data.ai_score}`
  );
  try {
    const xpResult = await AwardTrainingXpAction(userId, "case", data.ai_score);
    if (xpResult) {
      console.log(`[CASE STATS] ✅ XP awarded successfully:`, {
        xpAwarded: xpResult.xp_awarded,
        totalXp: xpResult.total_xp,
        leveledUp: xpResult.level_up_result.leveled_up,
        currentLevel: xpResult.level_up_result.new_level,
      });
    }
  } catch (error) {
    console.error(
      "[CASE STATS] ❌ Error awarding XP for case training:",
      error
    );
    // Don't throw here - we don't want to fail the whole operation if XP fails
  }

  // Check for newly unlocked achievements and award XP
  try {
    await processNewAchievementXp(userId);
  } catch (error) {
    console.error("[CASE STATS] ❌ Error processing achievement XP:", error);
  }

  return { success: true, data: updatedData };
}
