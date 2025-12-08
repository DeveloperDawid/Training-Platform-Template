import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { McQuestionWithShuffledOptions } from "@/app/lib/multiple-choice/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuizResults } from "./5QuizResults";
import QuizCompletion from "./4QuizCompletion";
import { formatTime } from "@/app/lib/utils/time-formatter";
import {
  DifficultyBadge,
  type DifficultyLevel,
} from "@/components/reusable/difficulty-badge";

export type AnsweredQuestion = {
  question: McQuestionWithShuffledOptions;
  selectedOption: string;
  correctOption: string;
  isCorrect: boolean;
};

interface QuizQuestionsProps {
  mc_questions: McQuestionWithShuffledOptions[];
  onReset: () => void;
  accountId: string;
}

const QuizQuestions = ({
  mc_questions,
  onReset,
  accountId,
}: QuizQuestionsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] =
    useState<McQuestionWithShuffledOptions | null>(
      () => mc_questions[0] || null
    );
  const [selectedAnswers, setSelectedAnswers] = useState<AnsweredQuestion[]>(
    []
  );
  const [currentAnswer, setCurrentAnswer] = useState<{
    option: string;
    isCorrect: boolean;
  } | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Timer states
  const [startTime, setStartTime] = useState<number | null>(null);
  const [quizDurationMs, setQuizDurationMs] = useState(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  // Set current question when index changes (but not on initial mount)
  useEffect(() => {
    if (currentIndex > 0 && mc_questions[currentIndex]) {
      setCurrentQuestion(mc_questions[currentIndex]);
    }
  }, [currentIndex, mc_questions]);

  // Start timer when quiz begins (first question is displayed)
  useEffect(() => {
    if (currentIndex === 0 && mc_questions.length > 0 && startTime === null) {
      setStartTime(Date.now());
    }
  }, [currentIndex, mc_questions.length, startTime]);

  // Update current time every second for live timer display
  useEffect(() => {
    if (startTime && !quizCompleted) {
      const interval = setInterval(() => {
        setCurrentTime(Date.now() - startTime);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, quizCompleted]);

  const handleAnswer = (optionText: string, isCorrect: boolean) => {
    if (!currentQuestion) return;

    setCurrentAnswer({ option: optionText, isCorrect });

    // Add to selected answers
    const answeredQuestion: AnsweredQuestion = {
      question: currentQuestion,
      correctOption: currentQuestion.option_1, // option_1 is always correct in DB
      selectedOption: optionText,
      isCorrect: isCorrect,
    };

    setSelectedAnswers((prev) => [...prev, answeredQuestion]);

    // Move to next question or complete quiz after a short delay
    setTimeout(() => {
      if (currentIndex < mc_questions.length - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setCurrentAnswer(null);
      } else {
        // Quiz completed - calculate duration
        if (startTime) {
          const endTime = Date.now();
          const durationMs = endTime - startTime;
          setQuizDurationMs(durationMs);
        }
        setQuizCompleted(true);
        setCurrentAnswer(null);
      }
    }, 1500);
  };

  // Show completion screen with "Finish Quiz" button
  if (quizCompleted && selectedAnswers.length > 0 && !showResults) {
    return (
      <QuizCompletion
        selectedAnswers={selectedAnswers}
        quizDurationMs={quizDurationMs}
        accountId={accountId}
        onShowResults={() => setShowResults(true)}
      />
    );
  }

  // Show final results after clicking "Finish Quiz"
  if (showResults && selectedAnswers.length > 0) {
    return (
      <QuizResults
        selectedAnswers={selectedAnswers}
        onReset={onReset}
        onRetake={() => {
          setCurrentIndex(0);
          setCurrentQuestion(mc_questions[0] || null);
          setSelectedAnswers([]);
          setCurrentAnswer(null);
          setQuizCompleted(false);
          setShowResults(false);
          setStartTime(null);
          setQuizDurationMs(0);
          setCurrentTime(0);
        }}
        accountId={accountId}
      />
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <CardTitle>Quiz - {mc_questions.length} Questions</CardTitle>
            <div className="flex items-center gap-4">
              {startTime && (
                <div className="text-sm font-mono bg-muted px-3 py-1 rounded">
                  ⏱️ {formatTime(currentTime)}
                </div>
              )}
              <Button variant="outline" onClick={onReset}>
                Back to Setup
              </Button>
            </div>
          </div>
          <CardTitle>Progress:</CardTitle>
          <Progress
            value={(currentIndex / mc_questions.length) * 100}
            className="h-2 rounded-full"
          />
        </CardHeader>

        <CardContent>
          <div className="flex items-start justify-between gap-2 mb-4">
            <CardTitle>Question {currentIndex + 1}</CardTitle>
            <DifficultyBadge
              difficulty={currentQuestion.difficulty as DifficultyLevel}
            />
          </div>
          <CardTitle className="py-4 text-xl ">
            {currentQuestion.question_text}
          </CardTitle>
          {currentQuestion?.shuffledOptions?.map((option, index) => {
            let btnClass = "w-full text-left justify-start mb-2";
            if (currentAnswer !== null) {
              if (currentAnswer.option === option.text && option.isCorrect) {
                btnClass +=
                  " bg-green-100 dark:bg-green-900/30 border-green-600 dark:border-green-700 text-green-700 dark:text-green-300";
              } else if (
                currentAnswer.option === option.text &&
                !option.isCorrect
              ) {
                btnClass +=
                  " bg-destructive/10 border-destructive text-destructive";
              } else {
                btnClass += " border border-input";
              }
            } else {
              btnClass += " border border-input";
            }
            return (
              <Button
                variant={"outline"}
                key={index}
                className={btnClass}
                onClick={() => handleAnswer(option.text, option.isCorrect)}
                disabled={currentAnswer !== null}
              >
                {option.text}
              </Button>
            );
          })}

          {currentAnswer !== null && (
            <div className="mt-4 p-4 rounded-lg bg-muted">
              <p
                className={`font-semibold ${
                  currentAnswer.isCorrect
                    ? "text-green-600"
                    : "text-destructive"
                }`}
              >
                {currentAnswer.isCorrect ? "Correct!" : "Incorrect!"}
              </p>
              {!currentAnswer.isCorrect && (
                <p className="text-sm text-muted-foreground mt-1">
                  The correct answer was: {currentQuestion.option_1}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizQuestions;
