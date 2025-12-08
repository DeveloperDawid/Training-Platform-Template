"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { AwardXpAction } from "../../user-xp/server/server-actions";

/**
 * Check for achievements where XP hasn't been awarded yet and award it
 * Uses xp_awarded flag to ensure XP is only given once per achievement
 */
export async function processNewAchievementXp(userId: string): Promise<void> {
  try {
    const supabase = getSupabaseServerClient();

    console.log(
      `[ACHIEVEMENT XP] Checking for unaward XP for user ${userId.substring(
        0,
        8
      )}...`
    );

    // Get all user achievements where XP hasn't been awarded yet
    const { data: unawardedAchievements, error } = await supabase
      .from("user_achievements")
      .select(
        `
        id,
        achievement_id,
        unlocked_at,
        achievements (
          title,
          xp_reward
        )
      `
      )
      .eq("user_id", userId)
      .eq("xp_awarded", false) // Only get achievements where XP not yet awarded
      .order("unlocked_at", { ascending: true }); // Oldest first

    if (error) {
      console.error(
        "[ACHIEVEMENT XP] Error fetching unawarded achievements:",
        error
      );
      return;
    }

    if (!unawardedAchievements || unawardedAchievements.length === 0) {
      console.log("[ACHIEVEMENT XP] No unawarded achievements found");
      return;
    }

    console.log(
      `[ACHIEVEMENT XP] Found ${unawardedAchievements.length} unawarded achievement(s)`
    );

    // Award XP for each unawarded achievement
    for (const userAchievement of unawardedAchievements) {
      const achievement = userAchievement.achievements;

      if (!achievement) {
        console.warn(
          "[ACHIEVEMENT XP] Achievement data missing for user_achievement:",
          userAchievement.id
        );
        continue;
      }

      console.log(
        `[ACHIEVEMENT XP] 🏆 Processing achievement: "${achievement.title}" (+${achievement.xp_reward} XP)`
      );

      const xpReward = achievement.xp_reward || 10; // Default to 10 if null

      try {
        // Award XP
        const xpResult = await AwardXpAction(
          userId,
          xpReward,
          "achievement_unlock"
        );

        if (xpResult) {
          console.log(
            `[ACHIEVEMENT XP] ✅ XP awarded for "${achievement.title}":`,
            {
              xpAwarded: xpResult.xp_awarded,
              totalXp: xpResult.total_xp,
              leveledUp: xpResult.level_up_result.leveled_up,
              currentLevel: xpResult.level_up_result.new_level,
            }
          );

          // Mark XP as awarded in database
          const { error: updateError } = await supabase
            .from("user_achievements")
            .update({ xp_awarded: true })
            .eq("id", userAchievement.id);

          if (updateError) {
            console.error(
              `[ACHIEVEMENT XP] ⚠️ Failed to mark XP as awarded for achievement ${userAchievement.id}:`,
              updateError
            );
            // Don't throw - XP was still awarded, we just couldn't update the flag
          } else {
            console.log(
              `[ACHIEVEMENT XP] ✓ Marked achievement ${userAchievement.id} as XP awarded`
            );
          }
        }
      } catch (xpError) {
        console.error(
          `[ACHIEVEMENT XP] ❌ Error awarding XP for achievement "${achievement.title}":`,
          xpError
        );
        // Continue with other achievements even if one fails
      }
    }

    console.log(
      `[ACHIEVEMENT XP] Finished processing ${unawardedAchievements.length} achievement(s)`
    );
  } catch (error) {
    console.error(
      "[ACHIEVEMENT XP] Fatal error in processNewAchievementXp:",
      error
    );
    // Don't throw - we don't want to break the main flow
  }
}
