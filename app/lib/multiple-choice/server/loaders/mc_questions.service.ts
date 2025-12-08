import { Database } from "@/lib/supabase/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { McQuestion } from "../../types";
import { PlatformType, ProductType } from "@/app/lib/types";
import type { DifficultyLevel } from "@/components/reusable/difficulty-badge";

export function createMcQuestionService(client: SupabaseClient<Database>) {
  return new McQuestionService(client);
}

class McQuestionService {
  constructor(private readonly client: SupabaseClient<Database>) {}

  // Helper function to get allowed difficulties based on user level
  private getAllowedDifficulties(userLevel: number): DifficultyLevel[] {
    if (userLevel < 5) {
      return ["easy"];
    } else if (userLevel < 10) {
      return ["easy", "medium"];
    } else {
      return ["easy", "medium", "hard"];
    }
  }

  async getMcQuestion(id: string): Promise<McQuestion> {
    const { data, error } = await this.client
      .from("mc_questions")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      throw new Error("MC Question not found");
    }
    return data;
  }

  async getRandomMcQuestions(count: number = 5): Promise<McQuestion[]> {
    // First get total count of all questions
    const { count: totalCount } = await this.client
      .from("mc_questions")
      .select("*", { count: "exact", head: true });

    if (!totalCount || totalCount === 0) {
      throw new Error("No MC questions found");
    }

    // If requested count is greater than available, return all
    const actualCount = Math.min(count, totalCount);

    // Generate random offsets
    const randomOffsets = new Set<number>();
    while (randomOffsets.size < actualCount) {
      randomOffsets.add(Math.floor(Math.random() * totalCount));
    }

    // Fetch questions at random offsets
    const promises = Array.from(randomOffsets).map(async (offset) => {
      const { data, error } = await this.client
        .from("mc_questions")
        .select("*")
        .range(offset, offset)
        .single();

      if (error || !data) {
        throw new Error("Failed to fetch random question");
      }
      return data;
    });

    const questions = await Promise.all(promises);
    return questions;
  }

  async getRandomMcQuestionsByUserLevel(
    userLevel: number,
    count: number = 5
  ): Promise<McQuestion[]> {
    const allowedDifficulties = this.getAllowedDifficulties(userLevel);

    const { data, error } = await this.client
      .from("mc_questions")
      .select("*")
      .in("difficulty", allowedDifficulties)
      .limit(count * 2); // Fetch more to have better randomization

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    // Return empty array if no questions found instead of throwing error
    if (!data || data.length === 0) {
      return [];
    }

    // Shuffle the results and return the requested count
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  async getRandomMcQuestionsByProductTypeAndPlatform(
    productType: ProductType,
    platformType: PlatformType,
    count: number = 5
  ): Promise<McQuestion[]> {
    const { data, error } = await this.client
      .from("mc_questions")
      .select("*")
      .eq("product_type", productType)
      .eq("platform_type", platformType)
      .limit(count * 2); // Fetch more to have better randomization

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    // Return empty array if no questions found instead of throwing error
    if (!data || data.length === 0) {
      return [];
    }

    // Shuffle the results and return the requested count
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  async getRandomMcQuestionsByProductTypeAndPlatformAndUserLevel(
    productType: ProductType,
    platformType: PlatformType,
    userLevel: number,
    count: number = 5
  ): Promise<McQuestion[]> {
    const allowedDifficulties = this.getAllowedDifficulties(userLevel);

    const { data, error } = await this.client
      .from("mc_questions")
      .select("*")
      .eq("product_type", productType)
      .eq("platform_type", platformType)
      .in("difficulty", allowedDifficulties)
      .limit(count * 2); // Fetch more to have better randomization

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    // Return empty array if no questions found instead of throwing error
    if (!data || data.length === 0) {
      return [];
    }

    // Shuffle the results and return the requested count
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  async getAllMcQuestions(): Promise<McQuestion[]> {
    const { data, error } = await this.client
      .from("mc_questions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      throw new Error("No MC questions found");
    }
    return data;
  }
}
