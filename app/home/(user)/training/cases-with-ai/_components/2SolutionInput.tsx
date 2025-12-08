import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface SolutionInputProps {
  userSolution: string;
  setUserSolution: (solution: string) => void;
  onEvaluateSolution: () => Promise<void>;
  isEvaluating: boolean;
}

const SolutionInput = ({
  userSolution,
  setUserSolution,
  onEvaluateSolution,
  isEvaluating,
}: SolutionInputProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Solution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Describe in detail how you would solve this problem..."
            value={userSolution}
            onChange={(e) => setUserSolution(e.target.value)}
            rows={10}
          />
          <Button
            onClick={onEvaluateSolution}
            disabled={!userSolution.trim() || isEvaluating}
            className="w-full"
          >
            {isEvaluating ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : null}
            Evaluate Solution
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolutionInput;
