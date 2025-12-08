import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Use the Next.js way to access environment variables in the client
  // These are replaced at build time by Next.js
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!url || !anonKey) {
    console.error("❌ Missing Supabase credentials!", {
      NEXT_PUBLIC_SUPABASE_URL: url,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: anonKey ? "exists" : "missing",
      env: typeof process !== "undefined" ? "defined" : "undefined",
    });
    throw new Error(
      "Supabase URL and Anon Key are required. Please check your environment variables."
    );
  }

  return createBrowserClient(url, anonKey);
}
