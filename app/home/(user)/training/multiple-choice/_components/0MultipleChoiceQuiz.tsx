"use client";

import React, { useState } from "react";
import QuizSetup from "./1QuizSetup";
import QuizQuestions from "./3QuizQuestions";
import { McQuestionWithShuffledOptions } from "@/app/lib/multiple-choice/types";
import Quizloader from "./2QuizLoader";
import { PlatformType, ProductType } from "@/app/lib/types";

interface QuizConfig {
  questions_amount: number;
  product_type: ProductType;
  platform_type: PlatformType;
}

interface MultipleChoiceQuizProps {
  accountId: string;
  userLevel: number;
}

const MultipleChoiceQuiz = ({
  accountId,
  userLevel,
}: MultipleChoiceQuizProps) => {
  const [currentStep, setCurrentStep] = useState<
    "setup" | "loading" | "questions"
  >("setup");
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [mcQuestionsWithShuffledOptions, setMcQuestionsWithShuffledOptions] =
    useState<McQuestionWithShuffledOptions[]>([]);

  const handleStartQuiz = (config: QuizConfig) => {
    setQuizConfig(config);
    setCurrentStep("loading");
  };

  const handleQuestionsLoaded = (
    questions: McQuestionWithShuffledOptions[]
  ) => {
    setMcQuestionsWithShuffledOptions(questions);
    setCurrentStep("questions");
  };

  const handleResetQuiz = () => {
    setCurrentStep("setup");
    setQuizConfig(null);
    setMcQuestionsWithShuffledOptions([]);
  };

  // Step 1: Quiz Setup
  if (currentStep === "setup") {
    return <QuizSetup onStartQuiz={handleStartQuiz} />;
  }

  // Step 2: Loading Questions via quizloader
  if (currentStep === "loading" && quizConfig) {
    return (
      <Quizloader
        count={quizConfig.questions_amount}
        product_type={quizConfig.product_type}
        platform_type={quizConfig.platform_type}
        onQuestionsLoaded={handleQuestionsLoaded}
        onBackToSetup={handleResetQuiz}
        userLevel={userLevel}
      />
    );
  }

  // Step 3: Display Quiz Questions
  if (currentStep === "questions") {
    return (
      <QuizQuestions
        mc_questions={mcQuestionsWithShuffledOptions}
        onReset={handleResetQuiz}
        accountId={accountId}
      />
    );
  }

  return <div>Loading...</div>;
};

export default MultipleChoiceQuiz;
