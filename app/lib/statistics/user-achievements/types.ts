import { Database } from "@/lib/supabase/database.types";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  color: string | null;
  category: string;
  xp_reward: number | null;
};

export type UserAchievements =
  Database["public"]["Tables"]["user_achievements"]["Row"] & {
    achievements: Achievement;
  };
