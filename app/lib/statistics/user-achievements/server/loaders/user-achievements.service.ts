import { Database } from "@/lib/supabase/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { UserAchievements } from "../../types";

export function createUserAchievementsService(
  client: SupabaseClient<Database>
) {
  return new UserAchievementsService(client);
}

class UserAchievementsService {
  constructor(private readonly client: SupabaseClient<Database>) {}

  async getUserAchievements(userId: string): Promise<UserAchievements[]> {
    const { data, error } = await this.client
      .from("user_achievements")
      .select(
        `
        id,
        user_id,
        achievement_id,
        unlocked_at,
        xp_awarded,
        achievements (
          id,
          title,
          description,
          icon,
          color,
          category,
          xp_reward
        )
      `
      )
      .eq("user_id", userId);

    if (error || !data) {
      throw new Error("User achievements not found");
    }
    return data;
  }

  async getAllAchievements() {
    const { data, error } = await this.client.from("achievements").select(
      `
        id,
        title,
        description,
        icon,
        color,
        category,
        xp_reward
      `
    );

    if (error || !data) {
      throw new Error("Achievements not found");
    }
    return data;
  }
}
