import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { formatTime } from "@/app/lib/utils/time-formatter";

interface TimerWithNewCaseButtonProps {
  onLoadNewCase: () => Promise<void>;
  isLoadingNewCase: boolean;
  startTime: number | null;
  currentTime: number;
  caseDurationMs: number;
}

const TimerWithNewCaseButton = ({
  onLoadNewCase,
  isLoadingNewCase,
  startTime,
  currentTime,
  caseDurationMs,
}: TimerWithNewCaseButtonProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        {startTime && caseDurationMs === 0 && (
          <div className="text-sm font-mono bg-muted px-3 py-1 rounded">
            ⏱️ {formatTime(currentTime)}
          </div>
        )}
        {caseDurationMs > 0 && (
          <div className="text-sm font-mono bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-3 py-1 rounded border border-green-200 dark:border-green-800">
            ✅ Completed in {formatTime(caseDurationMs)}
          </div>
        )}
      </div>
      <Button
        onClick={onLoadNewCase}
        disabled={isLoadingNewCase}
        variant="outline"
      >
        {isLoadingNewCase ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : null}
        New Case
      </Button>
    </div>
  );
};

export default TimerWithNewCaseButton;
