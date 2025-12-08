import { Database } from "@/lib/supabase/database.types";

export type CaseStats = Database["public"]["Tables"]["case_stats"]["Row"];
export type CaseStatsInsert =
  Database["public"]["Tables"]["case_stats"]["Insert"];
export type CaseStatsUpdate =
  Database["public"]["Tables"]["case_stats"]["Update"];
