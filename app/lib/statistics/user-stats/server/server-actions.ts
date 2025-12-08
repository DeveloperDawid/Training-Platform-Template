"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { UpdateUserStatsSchema } from "../schema/user-stats.schema";

export async function IncreaseUpdateUserStatsMcAction(
  userId: string,
  timeSeconds: number
) {
  const supabase = getSupabaseServerClient();

  // First, get all current values
  const { data: currentStats, error: fetchError } = await supabase
    .from("user_stats")
    .select(
      "total_sessions_mc, total_time_seconds_mc, streak_days, last_activity_date"
    )
    .eq("user_id", userId)
    .single();

  if (fetchError) {
    console.error("Error fetching current user stats:", fetchError);
    throw new Error("Failed to fetch current user stats");
  }

  const newTotalSessions = (currentStats.total_sessions_mc || 0) + 1;
  const newTotalTime = (currentStats.total_time_seconds_mc || 0) + timeSeconds;
  // Calculate new streak days - only increment if last activity was on a different date
  const today = new Date().toISOString().split("T")[0]; // Get YYYY-MM-DD format
  const lastActivityDate = currentStats.last_activity_date;

  let newStreakDays = currentStats.streak_days || 0;
  if (!lastActivityDate || lastActivityDate !== today) {
    newStreakDays += 1;
  }

  const updateData = {
    total_sessions_mc: newTotalSessions,
    total_time_seconds_mc: newTotalTime,
    streak_days: newStreakDays,
    last_activity_date: today,
  };

  const validatedUpdateData = UpdateUserStatsSchema.parse(updateData);

  const { data: updatedData, error } = await supabase
    .from("user_stats")
    .update(validatedUpdateData)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating MC user stats:", error);
    throw new Error("Failed to update MC user stats");
  }

  // Revalidate relevant paths
  revalidatePath("/home/training");
  revalidatePath("/home/statistics");

  return { success: true, data: updatedData };
}

export async function IncreaseUpdateUserStatsCasesAction(
  userId: string,
  timeSeconds: number
) {
  const supabase = getSupabaseServerClient();

  // First, get all current values
  const { data: currentStats, error: fetchError } = await supabase
    .from("user_stats")
    .select(
      "total_sessions_cases, total_time_seconds_cases, streak_days, last_activity_date"
    )
    .eq("user_id", userId)
    .single();

  if (fetchError) {
    console.error("Error fetching current user stats:", fetchError);
    throw new Error("Failed to fetch current user stats");
  }

  const newTotalSessions = (currentStats.total_sessions_cases || 0) + 1;
  const newTotalTime =
    (currentStats.total_time_seconds_cases || 0) + timeSeconds;

  // Calculate new streak days - only increment if last activity was on a different date
  const today = new Date().toISOString().split("T")[0]; // Get YYYY-MM-DD format
  const lastActivityDate = currentStats.last_activity_date;

  let newStreakDays = currentStats.streak_days || 0;
  if (!lastActivityDate || lastActivityDate !== today) {
    newStreakDays += 1;
  }

  const updateData = {
    total_sessions_cases: newTotalSessions,
    total_time_seconds_cases: newTotalTime,
    streak_days: newStreakDays,
    last_activity_date: today,
  };

  const validatedUpdateData = UpdateUserStatsSchema.parse(updateData);

  const { data: updatedData, error } = await supabase
    .from("user_stats")
    .update(validatedUpdateData)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating Cases user stats:", error);
    throw new Error("Failed to update Cases user stats");
  }

  // Revalidate relevant paths
  revalidatePath("/home/training");
  revalidatePath("/home/statistics");

  return { success: true, data: updatedData };
}

export async function IncreaseUpdateUserStatsChatAction(
  userId: string,
  timeSeconds: number
) {
  const supabase = getSupabaseServerClient();

  // First, get all current values
  const { data: currentStats, error: fetchError } = await supabase
    .from("user_stats")
    .select(
      "total_sessions_chat, total_time_seconds_chat, streak_days, last_activity_date"
    )
    .eq("user_id", userId)
    .single();

  if (fetchError) {
    console.error("Error fetching current user stats:", fetchError);
    throw new Error("Failed to fetch current user stats");
  }

  const newTotalSessions = (currentStats.total_sessions_chat || 0) + 1;
  const newTotalTime =
    (currentStats.total_time_seconds_chat || 0) + timeSeconds;

  // Calculate new streak days - only increment if last activity was on a different date
  const today = new Date().toISOString().split("T")[0]; // Get YYYY-MM-DD format
  const lastActivityDate = currentStats.last_activity_date;

  let newStreakDays = currentStats.streak_days || 0;
  if (!lastActivityDate || lastActivityDate !== today) {
    newStreakDays += 1;
  }

  const updateData = {
    total_sessions_chat: newTotalSessions,
    total_time_seconds_chat: newTotalTime,
    streak_days: newStreakDays,
    last_activity_date: today,
  };

  const validatedUpdateData = UpdateUserStatsSchema.parse(updateData);

  const { data: updatedData, error } = await supabase
    .from("user_stats")
    .update(validatedUpdateData)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating Chat user stats:", error);
    throw new Error("Failed to update Chat user stats");
  }

  // Revalidate relevant paths
  revalidatePath("/home/training");
  revalidatePath("/home/statistics");

  return { success: true, data: updatedData };
}
