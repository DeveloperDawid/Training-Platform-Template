"use client";

import { useState, useEffect } from "react";
import { Case } from "@/app/lib/cases/types";
import { IncreaseUpdateUserStatsCasesAction } from "@/app/lib/statistics/user-stats/server/server-actions";
import { IncreaseUpdateCaseStatsAction } from "@/app/lib/statistics/case-stats/server/server-actions";
import { loadRandomCaseByUserLevel } from "@/app/lib/cases/server/loaders/cases.loader";
import ProblemDescription from "./1ProblemDescription";
import TimerWithNewCaseButton from "./0TimerWithNewCaseButton";
import SolutionInput from "./2SolutionInput";
import AIEvaluationResults from "./3AIEvaluation";

interface EvaluationResult {
  score: number;
  feedback: string;
  improvements: string[];
  thoughts?: string; // Optional: AI's thinking process
}

interface AISimulationClientProps {
  initialCase: Case;
  userLevel: number;
  accountId: string;
}

const AISimulationClient = ({
  initialCase,
  userLevel,
  accountId,
}: AISimulationClientProps) => {
  const [currentCase, setCurrentCase] = useState<Case>(initialCase);
  const [isLoadingNewCase, setIsLoadingNewCase] = useState(false);

  const [userSolution, setUserSolution] = useState("");

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);

  // Timer states
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [caseDurationMs, setCaseDurationMs] = useState(0);

  // Start timer and update current time every second
  useEffect(() => {
    // Set start time on first render
    if (startTime === null) {
      setStartTime(Date.now());
      return;
    }

    // Create interval for live timer updates when timer is running
    if (startTime && !evaluation) {
      const interval = setInterval(() => {
        setCurrentTime(Date.now() - startTime);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, evaluation]);

  const evaluateSolution = async () => {
    if (!userSolution.trim()) return;

    // Stop timer immediately when evaluation starts
    const endTime = Date.now();
    const durationMs = startTime ? endTime - startTime : 0;
    setCaseDurationMs(durationMs);

    setIsEvaluating(true);
    setEvaluation(null);

    try {
      const response = await fetch("/api/ai/Gemini/evaluate-case", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caseId: currentCase.id,
          userSolution: userSolution.trim(),
          correctSolution: currentCase.solution,
          caseDescription: currentCase.problem_description,
          aiInstructions: currentCase.ai_instructions,
          productType: currentCase.product_type,
          includeThoughts: true, // Set to false to disable AI thinking process
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to evaluate solution");
      }

      const result = await response.json();
      setEvaluation(result);

      // Update both user stats and case stats (convert to seconds for database)
      if (durationMs > 0) {
        const durationSeconds = Math.round(durationMs / 1000);
        await Promise.all([
          IncreaseUpdateUserStatsCasesAction(accountId, durationSeconds),
          IncreaseUpdateCaseStatsAction(accountId, {
            ai_score: result.score,
            product_type: currentCase.product_type,
            platform_type: currentCase.platform_type,
          }),
        ]);
      }
    } catch (error) {
      console.error("Error evaluating solution:", error);
      setEvaluation({
        score: 0,
        feedback: "Error evaluating solution. Please try again.",
        improvements: [],
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const loadNewCase = async () => {
    setIsLoadingNewCase(true);
    setUserSolution("");
    setEvaluation(null);

    // Reset timer
    setStartTime(null);
    setCurrentTime(0);
    setCaseDurationMs(0);

    try {
      const newCase = await loadRandomCaseByUserLevel(userLevel);
      setCurrentCase(newCase);
      // Timer will be restarted in useEffect
    } catch (error) {
      console.error("Error loading new case:", error);
    } finally {
      setIsLoadingNewCase(false);
    }
  };

  return (
    <div className="space-y-6">
      <TimerWithNewCaseButton
        onLoadNewCase={loadNewCase}
        isLoadingNewCase={isLoadingNewCase}
        startTime={startTime}
        currentTime={currentTime}
        caseDurationMs={caseDurationMs}
      />
      <ProblemDescription currentCase={currentCase} />

      <SolutionInput
        userSolution={userSolution}
        setUserSolution={setUserSolution}
        onEvaluateSolution={evaluateSolution}
        isEvaluating={isEvaluating}
      />

      {evaluation && (
        <AIEvaluationResults
          evaluation={evaluation}
          currentCase={currentCase}
        />
      )}
    </div>
  );
};

export default AISimulationClient;
