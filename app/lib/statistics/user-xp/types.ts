import { Database } from "@/lib/supabase/database.types";

export type UserXp = Database["public"]["Tables"]["user_xp"]["Row"];
export type UserXpInsert = Database["public"]["Tables"]["user_xp"]["Insert"];
export type UserXpUpdate = Database["public"]["Tables"]["user_xp"]["Update"];

// Extended type for UserXp with joined level information and account data
export type UserXpWithLevel = UserXp & {
  current_level_info?: Database["public"]["Tables"]["xp_levels"]["Row"];
  next_level_info?: Database["public"]["Tables"]["xp_levels"]["Row"];
  accounts?: {
    name: string;
  } | null;
};

// XP Sources - where XP can be earned
export type XpSource =
  | "chat_completion"
  | "chat_high_score"
  | "chat_perfect_score"
  | "case_completion"
  | "case_high_score"
  | "case_perfect_score"
  | "mc_completion"
  | "mc_high_score"
  | "mc_perfect_score"
  | "achievement_unlock"
  | "daily_bonus";

// Level up result
export interface LevelUpResult {
  leveled_up: boolean;
  old_level: number;
  new_level: number;
  new_level_info?: Database["public"]["Tables"]["xp_levels"]["Row"];
}

// XP Award result
export interface XpAwardResult {
  xp_awarded: number;
  total_xp: number;
  level_up_result: LevelUpResult;
  user_xp: UserXp;
}
