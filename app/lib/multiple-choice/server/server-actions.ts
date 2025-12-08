"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { McQuestionInsert, McQuestionUpdate } from "../types";

export async function createMcQuestionAction(data: McQuestionInsert) {
  const supabase = getSupabaseServerClient();

  const { data: insertedData, error } = await supabase
    .from("mc_questions")
    .insert({
      question_text: data.question_text,
      product_type: data.product_type,
      platform_type: data.platform_type,
      tags: data.tags || [],
      option_1: data.option_1,
      option_2: data.option_2,
      option_3: data.option_3,
      option_4: data.option_4,
      correct_option: data.correct_option,
      difficulty: data.difficulty,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating MC question:", error);
    throw new Error("Failed to create MC question");
  }

  // Revalidate relevant paths
  revalidatePath("/home/training");

  return { success: true, mcQuestion: insertedData };
}

export async function updateMcQuestionAction(
  id: string,
  data: McQuestionUpdate
) {
  const supabase = getSupabaseServerClient();

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { data: updatedData, error } = await supabase
    .from("mc_questions")
    .update({
      question_text: data.question_text,
      product_type: data.product_type,
      platform_type: data.platform_type,
      tags: data.tags || [],
      option_1: data.option_1,
      option_2: data.option_2,
      option_3: data.option_3,
      option_4: data.option_4,
      correct_option: data.correct_option,
      difficulty: data.difficulty,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating MC question:", error);
    throw new Error("Failed to update MC question");
  }

  // Revalidate relevant paths
  revalidatePath("/home/training");

  return { success: true, mcQuestion: updatedData };
}

export async function deleteMcQuestionAction(id: string) {
  const supabase = getSupabaseServerClient();

  const { error } = await supabase.from("mc_questions").delete().eq("id", id);

  if (error) {
    console.error("Error deleting MC question:", error);
    throw new Error("Failed to delete MC question");
  }

  // Revalidate relevant paths
  revalidatePath("/home/training");

  return { success: true };
}
