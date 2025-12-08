"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { UpdateMcStatsSchema } from "../schema/mc-stats.schema";
import { AwardTrainingXpAction } from "../../user-xp/server/server-actions";
import { processNewAchievementXp } from "../../user-achievements/server/achievement-xp.helper";
import { PRODUCTS, PLATFORMS } from "@/lib/config/app-config";

interface McStatsInput {
  questionsAnswered: number;
  correctAnswers: number;
  quizScore: number; // percentage (0-100)
  productTypeStats: { [key: string]: { correct: number; total: number } };
  platformTypeStats: { [key: string]: { correct: number; total: number } };
}

export async function IncreaseUpdateMcStatsAction(
  userId: string,
  quizData: McStatsInput
) {
  const supabase = getSupabaseServerClient();

  // First, get the current values
  const { data: currentStats, error: fetchError } = await supabase
    .from("mc_stats")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (fetchError) {
    console.error("Error fetching current mc stats:", fetchError);
    throw new Error("Failed to fetch current mc stats");
  }

  // Calculate new aggregate values
  const newTotalQuizzes = (currentStats.total_quizzes_completed || 0) + 1;
  const newTotalQuestions =
    (currentStats.total_questions_answered || 0) + quizData.questionsAnswered;
  const newTotalCorrect =
    (currentStats.total_correct_answers || 0) + quizData.correctAnswers;

  // Calculate new average score (weighted by total questions)
  const currentTotalQuestions = currentStats.total_questions_answered || 0;
  const currentAverage = currentStats.average_score || 0;
  const newAverageScore =
    currentTotalQuestions === 0
      ? quizData.quizScore
      : (currentAverage * currentTotalQuestions +
          quizData.quizScore * quizData.questionsAnswered) /
        newTotalQuestions;

  // Update best score if current quiz score is better
  const newBestScore = Math.max(
    currentStats.best_score || 0,
    quizData.quizScore
  );

  // Calculate product type and platform type statistics
  const productTypeUpdates = {
    product_a_correct:
      ((currentStats as any).product_a_correct || 0) +
      (quizData.productTypeStats[PRODUCTS.PRODUCT_A.id]?.correct || 0),
    product_a_total:
      ((currentStats as any).product_a_total || 0) +
      (quizData.productTypeStats[PRODUCTS.PRODUCT_A.id]?.total || 0),
    product_b_correct:
      ((currentStats as any).product_b_correct || 0) +
      (quizData.productTypeStats[PRODUCTS.PRODUCT_B.id]?.correct || 0),
    product_b_total:
      ((currentStats as any).product_b_total || 0) +
      (quizData.productTypeStats[PRODUCTS.PRODUCT_B.id]?.total || 0),
    product_other_correct:
      ((currentStats as any).product_other_correct || 0) +
      (quizData.productTypeStats[PRODUCTS.OTHER.id]?.correct || 0),
    product_other_total:
      ((currentStats as any).product_other_total || 0) +
      (quizData.productTypeStats[PRODUCTS.OTHER.id]?.total || 0),
  };

  const platformTypeUpdates = {
    platform_a_correct:
      ((currentStats as any).platform_a_correct || 0) +
      (quizData.platformTypeStats[PLATFORMS.PLATFORM_A.id]?.correct || 0),
    platform_a_total:
      ((currentStats as any).platform_a_total || 0) +
      (quizData.platformTypeStats[PLATFORMS.PLATFORM_A.id]?.total || 0),
    platform_b_correct:
      ((currentStats as any).platform_b_correct || 0) +
      (quizData.platformTypeStats[PLATFORMS.PLATFORM_B.id]?.correct || 0),
    platform_b_total:
      ((currentStats as any).platform_b_total || 0) +
      (quizData.platformTypeStats[PLATFORMS.PLATFORM_B.id]?.total || 0),
    platform_other_correct:
      ((currentStats as any).platform_other_correct || 0) +
      (quizData.platformTypeStats[PLATFORMS.OTHER.id]?.correct || 0),
    platform_other_total:
      ((currentStats as any).platform_other_total || 0) +
      (quizData.platformTypeStats[PLATFORMS.OTHER.id]?.total || 0),
  };

  const updateData = {
    total_quizzes_completed: newTotalQuizzes,
    total_questions_answered: newTotalQuestions,
    total_correct_answers: newTotalCorrect,
    average_score: newAverageScore,
    best_score: newBestScore,
    ...productTypeUpdates,
    ...platformTypeUpdates,
  };

  const validatedUpdateData = UpdateMcStatsSchema.parse(updateData);

  const { data: updatedData, error } = await supabase
    .from("mc_stats")
    .update(validatedUpdateData)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating mc stats:", error);
    throw new Error("Failed to update mc stats");
  }

  // Revalidate relevant paths
  revalidatePath("/home/training");
  revalidatePath("/home/statistics");

  // Award XP for MC training
  console.log(
    `[MC STATS] Attempting to award XP for MC training. User: ${userId.substring(
      0,
      8
    )}..., Score: ${quizData.quizScore}%`
  );
  try {
    const xpResult = await AwardTrainingXpAction(
      userId,
      "mc",
      quizData.quizScore
    );
    if (xpResult) {
      console.log(`[MC STATS] ✅ XP awarded successfully:`, {
        xpAwarded: xpResult.xp_awarded,
        totalXp: xpResult.total_xp,
        leveledUp: xpResult.level_up_result.leveled_up,
        currentLevel: xpResult.level_up_result.new_level,
      });
    }
  } catch (error) {
    console.error("[MC STATS] ❌ Error awarding XP for MC training:", error);
    // Don't throw here - we don't want to fail the whole operation if XP fails
  }

  // Check for newly unlocked achievements and award XP
  try {
    await processNewAchievementXp(userId);
  } catch (error) {
    console.error("[MC STATS] ❌ Error processing achievement XP:", error);
  }

  return { success: true, stats: updatedData };
}
