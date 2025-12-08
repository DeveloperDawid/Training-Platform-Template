import { Database } from "@/lib/supabase/database.types";

export type ChatStats = Database["public"]["Tables"]["chat_stats"]["Row"];
export type ChatStatsInsert =
  Database["public"]["Tables"]["chat_stats"]["Insert"];
export type ChatStatsUpdate =
  Database["public"]["Tables"]["chat_stats"]["Update"];
