import { z } from "zod";

/**
 * Returns and validates the Supabase client keys from the environment.
 */
export function getSupabaseClientKeys() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return z
    .object({
      url: z.string({
        message: `Please provide the variable NEXT_PUBLIC_SUPABASE_URL`,
      }),
      anonKey: z
        .string({
          message: `Please provide the variable NEXT_PUBLIC_SUPABASE_ANON_KEY`,
        })
        .min(1, "Supabase anon key cannot be empty"),
    })
    .parse({
      url,
      anonKey,
    });
}
