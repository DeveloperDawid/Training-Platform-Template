import { Database } from "@/lib/supabase/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { UserXp, UserXpWithLevel } from "../../types";

export function createUserXpService(client: SupabaseClient<Database>) {
  return new UserXpService(client);
}

class UserXpService {
  constructor(private readonly client: SupabaseClient<Database>) {}

  async getUserXp(userId: string): Promise<UserXp> {
    const { data, error } = await this.client
      .from("user_xp")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      throw new Error(`Failed to fetch user XP: ${error.message}`);
    }

    return data;
  }

  async getUserXpWithLevel(userId: string): Promise<UserXpWithLevel> {
    // Get user XP
    const userXp = await this.getUserXp(userId);

    // Get current level info
    const { data: currentLevelInfo } = await this.client
      .from("xp_levels")
      .select("*")
      .eq("level", userXp.current_level)
      .single();

    // Get next level info
    const { data: nextLevelInfo } = await this.client
      .from("xp_levels")
      .select("*")
      .eq("level", userXp.current_level + 1)
      .single();

    return {
      ...userXp,
      current_level_info: currentLevelInfo || undefined,
      next_level_info: nextLevelInfo || undefined,
    };
  }

  async getLeaderboard(limit?: number): Promise<UserXpWithLevel[]> {
    // Get top users by XP (or all users if no limit specified)
    let query = this.client
      .from("user_xp")
      .select("*")
      .order("total_xp", { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data: users, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch leaderboard: ${error.message}`);
    }

    // Get all user IDs
    const userIds = (users || []).map((user) => user.user_id);

    // Fetch only id and name for all users (no sensitive data like email or role)
    const { data: accounts } = await this.client
      .from("accounts")
      .select("id, name")
      .in("id", userIds);

    // Create a map of user_id to account name
    const accountMap = new Map(
      (accounts || []).map((acc) => [acc.id, acc.name])
    );

    // Enrich each user with level info and account name
    const enrichedUsers = await Promise.all(
      (users || []).map(async (user) => {
        const { data: currentLevelInfo } = user.current_level
          ? await this.client
              .from("xp_levels")
              .select("*")
              .eq("level", user.current_level)
              .single()
          : { data: null };

        return {
          ...user,
          current_level_info: currentLevelInfo || undefined,
          accounts: accountMap.has(user.user_id)
            ? { name: accountMap.get(user.user_id)! }
            : null,
        };
      })
    );

    return enrichedUsers;
  }

  async getUserRank(userId: string): Promise<number | null> {
    const userXp = await this.getUserXp(userId);
    if (!userXp) return null;

    const { count, error } = await this.client
      .from("user_xp")
      .select("*", { count: "exact", head: true })
      .gt("total_xp", userXp.total_xp || 0);

    if (error) {
      throw new Error(`Failed to calculate user rank: ${error.message}`);
    }

    return (count || 0) + 1;
  }

  async getUserLevel(userId: string): Promise<number> {
    const { data, error } = await this.client
      .from("user_xp")
      .select("current_level")
      .eq("user_id", userId)
      .single();

    if (error) {
      throw new Error(`Failed to fetch user level: ${error.message}`);
    }

    return data.current_level || 0;
  }
}
