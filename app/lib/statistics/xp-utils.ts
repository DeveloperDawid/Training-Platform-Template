import { XpSource } from "./user-xp/types";
import { XpLevel } from "./xp-levels/types";

// XP Rewards Configuration
export const XP_REWARDS: Record<XpSource, number> = {
  // Chat Training
  chat_completion: 10,
  chat_high_score: 25,
  chat_perfect_score: 50,

  // Case Training
  case_completion: 15,
  case_high_score: 30,
  case_perfect_score: 75,

  // Multiple Choice
  mc_completion: 5,
  mc_high_score: 15,
  mc_perfect_score: 25,

  // Achievements
  achievement_unlock: 100,

  // Daily Bonus
  daily_bonus: 20,
};

// Score thresholds
export const SCORE_THRESHOLDS = {
  HIGH_SCORE: 8,
  PERFECT_SCORE: 10,
  MC_HIGH_SCORE_PERCENTAGE: 80,
  MC_PERFECT_SCORE_PERCENTAGE: 100,
} as const;

/**
 * Calculate which XP rewards a user should get based on activity and score
 */
export function calculateXpRewards(
  activityType: "chat" | "case" | "mc",
  score: number
): { sources: XpSource[]; totalXp: number } {
  const sources: XpSource[] = [];
  let totalXp = 0;

  // Base completion reward
  const completionSource = `${activityType}_completion` as XpSource;
  sources.push(completionSource);
  totalXp += XP_REWARDS[completionSource];

  // Score-based bonuses
  if (activityType === "mc") {
    // Multiple choice uses percentage
    if (score >= SCORE_THRESHOLDS.MC_PERFECT_SCORE_PERCENTAGE) {
      sources.push("mc_perfect_score");
      totalXp += XP_REWARDS.mc_perfect_score;
    } else if (score >= SCORE_THRESHOLDS.MC_HIGH_SCORE_PERCENTAGE) {
      sources.push("mc_high_score");
      totalXp += XP_REWARDS.mc_high_score;
    }
  } else {
    // Chat and case use 1-10 scale
    if (score >= SCORE_THRESHOLDS.PERFECT_SCORE) {
      const perfectSource = `${activityType}_perfect_score` as XpSource;
      sources.push(perfectSource);
      totalXp += XP_REWARDS[perfectSource];
    } else if (score >= SCORE_THRESHOLDS.HIGH_SCORE) {
      const highSource = `${activityType}_high_score` as XpSource;
      sources.push(highSource);
      totalXp += XP_REWARDS[highSource];
    }
  }

  return { sources, totalXp };
}

/**
 * Calculate level progression for given XP amount
 */
export function calculateLevelProgression(
  currentXp: number,
  xpLevels: XpLevel[]
): {
  currentLevel: number;
  currentLevelInfo: XpLevel;
  nextLevelInfo: XpLevel | null;
  xpToNextLevel: number;
  progressPercentage: number;
} {
  // Find current level (highest level where xp_required <= currentXp)
  let currentLevelInfo = xpLevels[0]; // Default to level 1

  for (const level of xpLevels) {
    if (currentXp >= level.xp_required) {
      currentLevelInfo = level;
    } else {
      break;
    }
  }

  // Find next level (just level + 1)
  const nextLevelInfo =
    xpLevels.find((level) => level.level === currentLevelInfo.level + 1) ||
    null;

  // Calculate XP to next level
  const xpToNextLevel = nextLevelInfo
    ? nextLevelInfo.xp_required - currentXp
    : 0;

  // Calculate progress percentage
  let progressPercentage = 100; // Default to 100% if at max level

  if (nextLevelInfo) {
    const currentLevelXp = currentLevelInfo.xp_required;
    const nextLevelXp = nextLevelInfo.xp_required;
    const xpInCurrentLevel = currentXp - currentLevelXp;
    const xpNeededForNextLevel = nextLevelXp - currentLevelXp;

    progressPercentage = Math.round(
      (xpInCurrentLevel / xpNeededForNextLevel) * 100
    );
  }

  return {
    currentLevel: currentLevelInfo.level,
    currentLevelInfo,
    nextLevelInfo,
    xpToNextLevel,
    progressPercentage: Math.max(0, Math.min(100, progressPercentage)),
  };
}
