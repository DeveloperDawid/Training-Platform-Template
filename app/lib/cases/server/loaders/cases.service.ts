import { Database } from "@/lib/supabase/database.types";

import { SupabaseClient } from "@supabase/supabase-js";
import { Case } from "../../types";
import type { DifficultyLevel } from "@/components/reusable/difficulty-badge";

export function createCaseService(client: SupabaseClient<Database>) {
  return new CaseService(client);
}

class CaseService {
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

  async getCase(id: string): Promise<Case> {
    const { data, error } = await this.client
      .from("cases")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      throw new Error("Case not found");
    }
    return data;
  }

  async getRandomCase(): Promise<Case> {
    // First get count of all cases
    const { count } = await this.client
      .from("cases")
      .select("*", { count: "exact", head: true });

    if (!count || count === 0) {
      throw new Error("No cases found");
    }

    // Generate random offset
    const randomOffset = Math.floor(Math.random() * count);

    // Get random case using offset
    const { data, error } = await this.client
      .from("cases")
      .select("*")
      .range(randomOffset, randomOffset)
      .single();

    if (error || !data) {
      throw new Error("No random case found");
    }
    return data;
  }

  async getRandomCaseByUserLevel(userLevel: number): Promise<Case> {
    const allowedDifficulties = this.getAllowedDifficulties(userLevel);

    // First get count of cases with allowed difficulties
    const { count } = await this.client
      .from("cases")
      .select("*", { count: "exact", head: true })
      .in("difficulty", allowedDifficulties);

    if (!count || count === 0) {
      throw new Error("No cases found for this level");
    }

    // Generate random offset
    const randomOffset = Math.floor(Math.random() * count);

    // Get random case using offset
    const { data, error } = await this.client
      .from("cases")
      .select("*")
      .in("difficulty", allowedDifficulties)
      .range(randomOffset, randomOffset)
      .single();

    if (error || !data) {
      throw new Error("No random case found");
    }
    return data;
  }

  async getAllCases(): Promise<Case[]> {
    const { data, error } = await this.client.from("cases").select("*");

    if (error || !data) {
      throw new Error("No cases found");
    }
    return data;
  }

  async getAllCasesByUserLevel(userLevel: number): Promise<Case[]> {
    const allowedDifficulties = this.getAllowedDifficulties(userLevel);

    const { data, error } = await this.client
      .from("cases")
      .select("*")
      .in("difficulty", allowedDifficulties);

    if (error || !data) {
      throw new Error("No cases found");
    }
    return data;
  }
}
