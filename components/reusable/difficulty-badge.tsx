import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type DifficultyLevel = "easy" | "medium" | "hard";

interface DifficultyBadgeProps {
  difficulty: DifficultyLevel;
  className?: string;
}

const difficultyConfig = {
  easy: {
    label: "Easy",
    color: "bg-green-100 text-green-700 border-green-300 hover:bg-green-100",
    icon: "🟢",
  },
  medium: {
    label: "Medium",
    color:
      "bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-100",
    icon: "🟡",
  },
  hard: {
    label: "Hard",
    color: "bg-red-100 text-red-700 border-red-300 hover:bg-red-100",
    icon: "🔴",
  },
};

export function DifficultyBadge({
  difficulty,
  className,
}: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];

  return (
    <Badge
      variant="outline"
      className={cn(config.color, "font-semibold", className)}
    >
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  );
}
