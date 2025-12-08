import { Database } from "@/lib/supabase/database.types";
import {
  PRODUCT_IDS,
  PLATFORM_IDS,
  DIFFICULTY_IDS,
} from "@/lib/config/app-config";

// Re-export from central config
export {
  PRODUCT_IDS as PRODUCT_TYPES,
  PLATFORM_IDS as PLATFORM_TYPES,
  DIFFICULTY_IDS as DIFFICULTY_TYPES,
} from "@/lib/config/app-config";

export type ProductType = Database["public"]["Enums"]["product_type"];
export type PlatformType = Database["public"]["Enums"]["platform_type"];
