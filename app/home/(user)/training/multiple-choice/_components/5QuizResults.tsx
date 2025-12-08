import React from "react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { AnsweredQuestion } from "./3QuizQuestions";

export const QuizResults = ({
  selectedAnswers,
  onReset,
  onRetake,
}: {
  selectedAnswers: AnsweredQuestion[];
  onReset: () => void;
  onRetake: () => void;
  accountId: string;
}) => {
  const correctAnswers = selectedAnswers.filter(
    (answer) => answer.isCorrect
  ).length;
  const percentage = Math.round(
    (correctAnswers / selectedAnswers.length) * 100
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <div className="flex-1">
              <CardTitle>Quiz Complete!</CardTitle>
              <CardDescription>
                You scored {correctAnswers} out of {selectedAnswers.length}{" "}
                questions correct ({percentage}%)
              </CardDescription>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button onClick={onReset} variant="outline">
                Back to Setup
              </Button>
              <Button onClick={onRetake}>Retake Quiz</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress
            value={percentage}
            className={
              percentage <= 30
                ? "[&>div]:bg-red-500"
                : percentage <= 70
                ? "[&>div]:bg-yellow-500"
                : "[&>div]:bg-green-500"
            }
          />

          <div className="space-y-2">
            <h3 className="font-semibold">Review:</h3>
            {selectedAnswers.map((answer, idx) => (
              <div
                key={idx}
                className={`p-2 rounded ${
                  answer.isCorrect
                    ? "bg-green-100 dark:bg-green-900/20"
                    : "bg-destructive/10"
                }`}
              >
                <p className="text-sm font-medium text-foreground">
                  Question {idx + 1}: {answer.question.question_text}
                </p>
                <p
                  className={`text-sm ${
                    answer.isCorrect ? "text-green-600" : "text-destructive"
                  }`}
                >
                  Your answer: {answer.selectedOption}{" "}
                  {answer.isCorrect ? "✓" : "✗"}
                </p>
                {!answer.isCorrect && (
                  <p className="text-sm text-muted-foreground">
                    Correct answer: {answer.correctOption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
