"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { LogoutButton } from "./logout-button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User as UserIcon, LogOut } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

interface AuthButtonProps {
  isSidebar?: boolean;
}

export function AuthButton({ isSidebar = false }: AuthButtonProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    // Get initial user
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const newUser = session?.user ?? null;
      setUser(newUser);
      setLoading(false);

      if (event === "SIGNED_OUT") {
        router.push("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // Loading state
  if (loading) {
    if (isSidebar) {
      return (
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="px-2 py-2">
              <div className="h-4 bg-gray-200 animate-pulse rounded w-20"></div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      );
    }
    return (
      <div className="flex items-center gap-4">
        <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  // Authenticated user
  if (user) {
    if (isSidebar) {
      return (
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/profile">
                <UserIcon />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">Profile</span>
                  <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                    {user.email}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={async () => {
                const supabase = createClient();
                await supabase.auth.signOut();
              }}
            >
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      );
    }
    return (
      <div className="flex items-center gap-4">
        Hey, {user.email}!
        <LogoutButton />
      </div>
    );
  }

  // Unauthenticated user
  if (isSidebar) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="px-2 py-2 text-sm text-muted-foreground">
            Not logged in
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Login</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
