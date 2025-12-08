"use client";

import { PlatformType, ProductType } from "@/app/lib/types";
import { loadRandomMcQuestionsByProductTypeAndPlatformAndUserLevel } from "@/app/lib/multiple-choice/server/loaders/mc_questions.loader";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { McQuestionWithShuffledOptions } from "@/app/lib/multiple-choice/types";

interface QuizloaderProps {
  count: number;
  product_type: ProductType;
  platform_type: PlatformType;
  onQuestionsLoaded: (questions: McQuestionWithShuffledOptions[]) => void;
  onBackToSetup: () => void;
  userLevel: number;
}

const Quizloader = ({
  count,
  product_type,
  platform_type,
  onQuestionsLoaded,
  onBackToSetup,
  userLevel,
}: QuizloaderProps) => {
  const [loading, setLoading] = useState(true);
  const [noQuestionsFound, setNoQuestionsFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setNoQuestionsFound(false);
        setError(null);

        const questions =
          await loadRandomMcQuestionsByProductTypeAndPlatformAndUserLevel(
            count,
            product_type,
            platform_type,
            userLevel
          );

        // Check if any questions were found
        if (!questions || questions.length === 0) {
          setNoQuestionsFound(true);
          return;
        }

        // Shuffle options for each question
        const questionsWithShuffledOptions = questions.map((question) => {
          const options = [
            { text: question.option_1, isCorrect: true },
            { text: question.option_2, isCorrect: false },
            { text: question.option_3, isCorrect: false },
            { text: question.option_4, isCorrect: false },
          ];

          // Fisher-Yates shuffle
          for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
          }

          return {
            ...question,
            shuffledOptions: options,
          };
        });

        onQuestionsLoaded(questionsWithShuffledOptions);
      } catch (error) {
        console.error("Error loading questions:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load questions"
        );
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [count, product_type, platform_type, onQuestionsLoaded, userLevel]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            Loading {count} questions for {product_type} + {platform_type}...
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  if (noQuestionsFound) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-orange-600 dark:text-orange-400">
            No Questions Found
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            No multiple choice questions were found for the combination of{" "}
            <strong>{product_type}</strong> and <strong>{platform_type}</strong>
            .
          </p>
          <p className="text-sm text-muted-foreground">
            Try a different combination or create new questions for these
            categories first.
          </p>
          <Button onClick={onBackToSetup} variant="outline">
            Back to Setup
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-destructive">
            Loading Error
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            An error occurred while loading the questions:
          </p>
          <p className="text-sm text-destructive font-mono bg-destructive/10 p-2 rounded">
            {error}
          </p>

          <Button onClick={onBackToSetup} variant="outline">
            Back to Setup
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null; // Component will be replaced by QuizQuestions once questions are loaded
};

export default Quizloader;
