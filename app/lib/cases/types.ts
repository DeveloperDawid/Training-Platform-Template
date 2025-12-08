import { Database } from "@/lib/supabase/database.types";

export type Case = Database["public"]["Tables"]["cases"]["Row"];
export type CaseInsert = Database["public"]["Tables"]["cases"]["Insert"];
export type CaseUpdate = Database["public"]["Tables"]["cases"]["Update"];
