import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IncreaseUpdateUserStatsMcAction } from "@/app/lib/statistics/user-stats/server/server-actions";
import { IncreaseUpdateMcStatsAction } from "@/app/lib/statistics/mc-stats/server/server-actions";
import { formatTime } from "@/app/lib/utils/time-formatter";
import { AnsweredQuestion } from "./3QuizQuestions";

interface QuizCompletionProps {
  selectedAnswers: AnsweredQuestion[];
  quizDurationMs: number;
  accountId: string;
  onShowResults: () => void;
}

const QuizCompletion = ({
  selectedAnswers,
  quizDurationMs,
  accountId,
  onShowResults,
}: QuizCompletionProps) => {
  const calculateProductTypeStats = (answers: AnsweredQuestion[]) => {
    const productStats: { [key: string]: { correct: number; total: number } } =
      {};
    const platformStats: { [key: string]: { correct: number; total: number } } =
      {};

    answers.forEach((answer) => {
      const productType = answer.question.product_type;
      if (productType) {
        if (!productStats[productType]) {
          productStats[productType] = { correct: 0, total: 0 };
        }
        productStats[productType].total += 1;
        if (answer.isCorrect) {
          productStats[productType].correct += 1;
        }
      }

      const platformType = answer.question.platform_type;
      if (platformType) {
        if (!platformStats[platformType]) {
          platformStats[platformType] = { correct: 0, total: 0 };
        }
        platformStats[platformType].total += 1;
        if (answer.isCorrect) {
          platformStats[platformType].correct += 1;
        }
      }
    });

    return { productStats, platformStats };
  };

  const correctAnswers = selectedAnswers.filter(
    (answer) => answer.isCorrect
  ).length;
  const percentage = Math.round(
    (correctAnswers / selectedAnswers.length) * 100
  );

  const handleFinishQuiz = async () => {
    const typeStats = calculateProductTypeStats(selectedAnswers);

    const quizDurationSeconds = Math.round(quizDurationMs / 1000);
    await Promise.all([
      IncreaseUpdateUserStatsMcAction(accountId, quizDurationSeconds),
      IncreaseUpdateMcStatsAction(accountId, {
        questionsAnswered: selectedAnswers.length,
        correctAnswers: correctAnswers,
        quizScore: percentage,
        productTypeStats: typeStats.productStats,
        platformTypeStats: typeStats.platformStats,
      }),
    ]);

    onShowResults();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            🎉 Quiz Complete!
          </CardTitle>
          <CardDescription className="text-center text-lg">
            You answered all {selectedAnswers.length} questions in{" "}
            {formatTime(quizDurationMs)}!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 flex flex-col items-center justify-center">
          <Button onClick={handleFinishQuiz} className="mx-auto">
            Finish Quiz & View Results
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizCompletion;
