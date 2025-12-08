"use server";

import { revalidatePath } from "next/cache";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { CaseInsert, CaseUpdate } from "../types";

export async function createCaseAction(data: CaseInsert) {
  const supabase = getSupabaseServerClient();

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { data: insertedData, error } = await supabase
    .from("cases")
    .insert({
      title: data.title,
      problem_description: data.problem_description,
      solution: data.solution,
      ai_instructions: data.ai_instructions,
      product_type: data.product_type,
      platform_type: data.platform_type,
      tags: data.tags || [],
      difficulty: data.difficulty,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating case:", error);
    throw new Error("Failed to create case");
  }

  // Revalidate relevant paths
  revalidatePath("/home/training");

  return { success: true, case: insertedData };
}

export async function updateCaseAction(id: string, data: CaseUpdate) {
  const supabase = getSupabaseServerClient();

  const { data: updatedData, error } = await supabase
    .from("cases")
    .update({
      title: data.title,
      problem_description: data.problem_description,
      solution: data.solution,
      ai_instructions: data.ai_instructions,
      product_type: data.product_type,
      platform_type: data.platform_type,
      tags: data.tags || [],
      difficulty: data.difficulty,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating case:", error);
    throw new Error("Failed to update case");
  }

  // Revalidate relevant paths
  revalidatePath("/home/training");

  return { success: true, case: updatedData };
}

export async function deleteCaseAction(id: string) {
  const supabase = getSupabaseServerClient();

  const { error } = await supabase.from("cases").delete().eq("id", id);

  if (error) {
    console.error("Error deleting case:", error);
    throw new Error("Failed to delete case");
  }

  // Revalidate relevant paths
  revalidatePath("/home/training");

  return { success: true };
}
