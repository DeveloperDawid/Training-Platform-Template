import { Database } from "@/lib/supabase/database.types";

export type XpLevel = Database["public"]["Tables"]["xp_levels"]["Row"];

// Extended type for UI with level progression info
export interface UserXpWithLevel {
  id?: string | null;
  user_id: string;
  total_xp: number | null;
  current_level: number | null;
  xp_to_next_level: number | null;
  updated_at: string | null;
  current_level_info: XpLevel;
  next_level_info: XpLevel | null;
  progress_percentage: number;
}
