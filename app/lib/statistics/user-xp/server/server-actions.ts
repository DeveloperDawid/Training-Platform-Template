"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { loadAllXpLevels } from "../../xp-levels/server/loaders/xp-levels.loader";
import { loadUserXpWithLevel } from "./loaders/user-xp.loader";
import { calculateXpRewards, calculateLevelProgression } from "../../xp-utils";
import { XpSource, XpAwardResult, LevelUpResult } from "../types";
import { UpdateUserXpSchema } from "../schema/user-xp.schema";

/**
 * Award XP to a user and handle level progression (UPDATE operation)
 */
export async function AwardXpAction(
  userId: string,
  xpAmount: number,
  source: XpSource
): Promise<XpAwardResult> {
  const supabase = getSupabaseServerClient();

  console.log(
    `[XP] Awarding ${xpAmount} XP to user ${userId.substring(
      0,
      8
    )}... (source: ${source})`
  );

  try {
    // Get current user XP and all levels
    const [currentUserXp, xpLevels] = await Promise.all([
      loadUserXpWithLevel(userId),
      loadAllXpLevels(),
    ]);

    if (!currentUserXp) {
      throw new Error("User XP not found. User may need to be initialized.");
    }

    // Calculate new XP totals
    const oldTotalXp = currentUserXp.total_xp || 0;
    const newTotalXp = oldTotalXp + xpAmount;

    console.log(`[XP] User XP: ${oldTotalXp} → ${newTotalXp} (+${xpAmount})`);

    // Calculate level progression
    const oldProgression = calculateLevelProgression(oldTotalXp, xpLevels);
    const newProgression = calculateLevelProgression(newTotalXp, xpLevels);

    // Check for level up
    const levelUpResult: LevelUpResult = {
      leveled_up: newProgression.currentLevel > oldProgression.currentLevel,
      old_level: oldProgression.currentLevel,
      new_level: newProgression.currentLevel,
      new_level_info: newProgression.currentLevelInfo,
    };

    if (levelUpResult.leveled_up) {
      console.log(
        `[XP] 🎉 LEVEL UP! User ${userId.substring(
          0,
          8
        )}... leveled up: Level ${oldProgression.currentLevel} → Level ${
          newProgression.currentLevel
        }`
      );
    }

    // Prepare update data
    const updateData = {
      total_xp: newTotalXp,
      current_level: newProgression.currentLevel,
      xp_to_next_level: newProgression.xpToNextLevel,
    };

    // Validate update data
    const validatedUpdateData = UpdateUserXpSchema.parse(updateData);

    // Update user XP in database
    const { data: updatedUserXp, error } = await supabase
      .from("user_xp")
      .update({
        ...validatedUpdateData,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .select()
      .single();

    if (error || !updatedUserXp) {
      console.error(`[XP] ❌ Failed to update user XP in database:`, error);
      throw new Error(`Failed to update user XP: ${error?.message}`);
    }

    console.log(
      `[XP] ✅ Successfully updated user XP in database. New total: ${updatedUserXp.total_xp}, Level: ${updatedUserXp.current_level}`
    );

    // Revalidate relevant paths
    revalidatePath("/home/statistics");
    revalidatePath("/home");

    return {
      xp_awarded: xpAmount,
      total_xp: newTotalXp,
      level_up_result: levelUpResult,
      user_xp: updatedUserXp,
    };
  } catch (error) {
    console.error("[XP] ❌ Error in AwardXpAction:", error);
    throw new Error("Failed to award XP");
  }
}

/**
 * Award XP for training activity (simplified interface)
 */
export async function AwardTrainingXpAction(
  userId: string,
  activityType: "chat" | "case" | "mc",
  score: number
): Promise<XpAwardResult | null> {
  try {
    console.log(
      `[XP] 📚 Training completed - Type: ${activityType}, Score: ${score}`
    );

    // Calculate XP rewards
    const xpRewards = calculateXpRewards(activityType, score);

    console.log(`[XP] Calculated rewards:`, {
      sources: xpRewards.sources,
      totalXp: xpRewards.totalXp,
    });

    // Award total XP with completion source as primary
    const completionSource = `${activityType}_completion` as XpSource;
    return await AwardXpAction(userId, xpRewards.totalXp, completionSource);
  } catch (error) {
    console.error(
      `[XP] ❌ Error awarding XP for ${activityType} training:`,
      error
    );
    return null;
  }
}

/**
 * Calculate XP rewards for an activity (utility function)
 */
export async function CalculateXpRewardsAction(
  activityType: "chat" | "case" | "mc",
  score: number
): Promise<{ sources: XpSource[]; totalXp: number }> {
  return calculateXpRewards(activityType, score);
}
