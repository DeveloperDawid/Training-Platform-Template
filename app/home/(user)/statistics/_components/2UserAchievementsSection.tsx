"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  MessageCircle,
  Crown,
  Star,
  Zap,
  CheckCircle,
  Search,
  Target,
  BookOpen,
  Brain,
  GraduationCap,
  Play,
  Calendar,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  UserAchievements,
  Achievement,
} from "@/app/lib/statistics/user-achievements/types";
import { formatDate } from "@/app/lib/utils/time-formatter";

// Simple icon mapping
const iconMap: Record<string, React.ElementType> = {
  Trophy,
  MessageCircle,
  MessageSquare: MessageCircle,
  Crown,
  Star,
  Zap,
  CheckCircle,
  Search,
  Target,
  BookOpen,
  Brain,
  GraduationCap,
  Play,
  Calendar,
};

// Function to get matching icon and border color for achievements
const getIconAndBorderColor = (bgColor: string) => {
  if (bgColor.includes("blue"))
    return {
      icon: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
    };
  if (bgColor.includes("green"))
    return {
      icon: "text-green-600 dark:text-green-400",
      border: "border-green-200 dark:border-green-800",
    };
  if (bgColor.includes("purple"))
    return {
      icon: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
    };
  if (bgColor.includes("yellow"))
    return {
      icon: "text-yellow-600 dark:text-yellow-400",
      border: "border-yellow-200 dark:border-yellow-800",
    };
  if (bgColor.includes("orange"))
    return {
      icon: "text-orange-600 dark:text-orange-400",
      border: "border-orange-200 dark:border-orange-800",
    };
  if (bgColor.includes("red"))
    return {
      icon: "text-red-600 dark:text-red-400",
      border: "border-red-200 dark:border-red-800",
    };
  return { icon: "text-foreground", border: "border-border" };
};

// Define all categories
const ALL_CATEGORIES = ["general", "chat", "case", "mc"] as const;

interface UserAchievementsSectionProps {
  userAchievements: UserAchievements[];
  allAchievements: Achievement[];
}

export function UserAchievementsSection({
  userAchievements,
  allAchievements,
}: UserAchievementsSectionProps) {
  const [showAll, setShowAll] = useState(false);

  // Create a map of unlocked achievement IDs for quick lookup
  const unlockedIds = new Set(userAchievements.map((ua) => ua.achievement_id));

  // Get locked achievements and group by category
  const lockedAchievements = allAchievements.filter(
    (achievement) => !unlockedIds.has(achievement.id)
  );

  const groupedLockedAchievements = lockedAchievements.reduce(
    (groups, achievement) => {
      const category = achievement.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(achievement);
      return groups;
    },
    {} as Record<string, typeof allAchievements>
  );

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "chat":
        return "Chat Training";
      case "case":
        return "Case Solving";
      case "mc":
        return "Multiple Choice";
      case "general":
        return "General";
      default:
        return category;
    }
  };

  const totalXP = userAchievements.reduce(
    (sum, achievement) => sum + (achievement.achievements.xp_reward || 0),
    0
  );

  // Group achievements by category
  const groupedAchievements = userAchievements.reduce((groups, achievement) => {
    const category = achievement.achievements.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(achievement);
    return groups;
  }, {} as Record<string, UserAchievements[]>);

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">Achievements</h2>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge variant="secondary">
                {userAchievements.length} unlocked
              </Badge>
              <Badge variant="outline">{totalXP} XP</Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="gap-2"
            >
              {showAll ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Hide All
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Show All
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {ALL_CATEGORIES.map((category) => {
              const achievements = groupedAchievements[category] || [];
              const categoryLockedAchievements =
                groupedLockedAchievements[category] || [];

              return (
                <div key={category}>
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="font-semibold">
                      {getCategoryLabel(category)}
                    </h4>
                    <Badge variant="outline">
                      {achievements.length} achievement
                      {achievements.length !== 1 ? "s" : ""}
                    </Badge>
                  </div>

                  {achievements.length === 0 &&
                  categoryLockedAchievements.length === 0 ? (
                    <div className="border border-dashed rounded-lg p-6 text-center">
                      <Trophy className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Complete trainings to unlock achievements
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {achievements.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {achievements.map((achievement) => {
                            const IconComponent =
                              iconMap[
                                achievement.achievements.icon || "Trophy"
                              ] || Trophy;
                            const colors = getIconAndBorderColor(
                              achievement.achievements.color || ""
                            );

                            return (
                              <div
                                key={achievement.id}
                                className={`border-2 ${colors.border} rounded-lg p-4 bg-card hover:shadow-md transition-shadow`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex-shrink-0">
                                    <IconComponent
                                      className={`h-8 w-8 ${colors.icon}`}
                                    />
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm text-foreground mb-1">
                                      {achievement.achievements.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                      {achievement.achievements.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                      <Badge
                                        variant="secondary"
                                        className="text-xs font-semibold"
                                      >
                                        +
                                        {achievement.achievements.xp_reward ||
                                          0}{" "}
                                        XP
                                      </Badge>
                                      <span className="text-xs text-muted-foreground">
                                        {achievement.unlocked_at &&
                                          formatDate(achievement.unlocked_at)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {showAll && categoryLockedAchievements.length > 0 && (
                        <div className="pt-4 border-t">
                          <p className="text-sm font-semibold text-muted-foreground mb-3">
                            Locked Achievements
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {categoryLockedAchievements.map(
                              (achievement: Achievement) => {
                                const IconComponent =
                                  iconMap[achievement.icon || "Trophy"] ||
                                  Trophy;

                                return (
                                  <div
                                    key={achievement.id}
                                    className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-muted/50 opacity-50"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="flex-shrink-0">
                                        <IconComponent className="h-8 w-8 text-gray-400" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-1">
                                          {achievement.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                                          {achievement.description}
                                        </p>
                                        <Badge
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          +{achievement.xp_reward || 0} XP
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
