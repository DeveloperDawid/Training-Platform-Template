import { Database } from "@/lib/supabase/database.types";

export type UserStats = Database["public"]["Tables"]["user_stats"]["Row"];
export type UserStatsInsert =
  Database["public"]["Tables"]["user_stats"]["Insert"];
export type UserStatsUpdate =
  Database["public"]["Tables"]["user_stats"]["Update"];
