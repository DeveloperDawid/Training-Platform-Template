// server: load-user-workspace.ts
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const loadUserWorkspace = async () => {
  const client = getSupabaseServerClient();

  const { data, error } = await client.rpc("user_workspace");
  if (error) throw error;

  // compact to match usage style
  return {
    account: {
      id: data?.[0]?.id,
      role: data?.[0]?.role,
      permissions: data?.[0]?.permissions ?? [],
    },
  };
};
