"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeSwitcherProps {
  isSidebar?: boolean;
}

const themeConfig = {
  light: { icon: Sun, label: "Light" },
  dark: { icon: Moon, label: "Dark" },
  system: { icon: Laptop, label: "System" },
} as const;

const ThemeSwitcher = ({ isSidebar = false }: ThemeSwitcherProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme as keyof typeof themeConfig;
  const CurrentIcon = themeConfig[currentTheme]?.icon || Laptop;
  const currentLabel = themeConfig[currentTheme]?.label || "System";

  const DropdownContent = () => (
    <DropdownMenuContent className="w-content" align="start">
      <DropdownMenuRadioGroup value={theme} onValueChange={(e) => setTheme(e)}>
        {Object.entries(themeConfig).map(([key, { icon: Icon, label }]) => (
          <DropdownMenuRadioItem key={key} className="flex gap-2" value={key}>
            <Icon className="text-muted-foreground" />
            <span>{label}</span>
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isSidebar ? (
          <SidebarMenuButton>
            <CurrentIcon className="text-muted-foreground" />
            <span>Theme: {currentLabel}</span>
          </SidebarMenuButton>
        ) : (
          <Button variant="ghost" size="sm">
            <CurrentIcon className="text-muted-foreground" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownContent />
    </DropdownMenu>
  );
};

export { ThemeSwitcher };
