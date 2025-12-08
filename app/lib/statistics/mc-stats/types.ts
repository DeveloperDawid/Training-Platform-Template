import { Database } from "@/lib/supabase/database.types";

export type McStats = Database["public"]["Tables"]["mc_stats"]["Row"];
export type McStatsInsert = Database["public"]["Tables"]["mc_stats"]["Insert"];
export type McStatsUpdate = Database["public"]["Tables"]["mc_stats"]["Update"];
