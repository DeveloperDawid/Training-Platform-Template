"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/layout/Logo";
import { AuthButton } from "@/components/supabase-components/auth-button";
import { ThemeSwitcher } from "@/components/supabase-components/theme-switcher";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  Home,
  Bot,
  ListChecks,
  List,
  LifeBuoy,
  Globe,
  CirclePlus,
  BarChart3,
  MessageSquare,
  Medal,
} from "lucide-react";

const navigationSections = [
  {
    items: [
      {
        title: "Home",
        href: "/home",
        icon: Home,
      },
    ],
  },
  {
    label: "Training",
    items: [
      {
        title: "Cases with AI-Feedback",
        href: "/home/training/cases-with-ai",
        icon: Bot,
      },
      {
        title: "Chat Training",
        href: "/home/training/chat",
        icon: MessageSquare,
      },
      {
        title: "Multiple Choice",
        href: "/home/training/multiple-choice",
        icon: ListChecks,
      },
    ],
  },
  {
    label: "Statistics",
    items: [
      {
        title: "Your Statistics",
        href: "/home/statistics",
        icon: BarChart3,
      },
      {
        title: "Leaderboard",
        href: "/home/statistics/leaderboard",
        icon: Medal,
      },
    ],
  },
  {
    label: "Training Creation",
    items: [
      {
        title: "List Cases",
        href: "/home/training-creation/cases-with-ai/list",
        icon: List,
      },
      {
        title: "Create Cases",
        href: "/home/training-creation/cases-with-ai/create",
        icon: CirclePlus,
      },
      {
        title: "List Multiple Choice",
        href: "/home/training-creation/multiple-choice/list",
        icon: List,
      },
      {
        title: "Create Multiple Choice",
        href: "/home/training-creation/multiple-choice/create",
        icon: CirclePlus,
      },
    ],
  },
  {
    label: "Other",
    items: [
      {
        title: "Help Center",
        href: "/home/help",
        icon: LifeBuoy,
      },
      {
        title: "Public Home",
        href: "/",
        icon: Globe,
      },
      // {
      //   title: "Settings",
      //   href: "/settings",
      //   icon: Settings,
      // },
    ],
  },
];

export function UserSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div className="px-2 py-2">
          <Logo
            showText={true}
            className="text-sidebar-foreground group-data-[collapsible=icon]:hidden"
          />
          <div className="group-data-[collapsible=icon]:flex hidden justify-center py-2">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navigationSections.map((section, sectionIdx) => (
          <SidebarGroup key={section.label ?? `section-${sectionIdx}`}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item, itemIdx) => {
                  const isActive = pathname === item.href;
                  const groupKey = section.label ?? `section-${sectionIdx}`;
                  return (
                    <SidebarMenuItem
                      key={`${groupKey}-${item.href ?? itemIdx}`}
                    >
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <ThemeSwitcher isSidebar={true} />
        <AuthButton isSidebar={true} />
      </SidebarFooter>
    </Sidebar>
  );
}
