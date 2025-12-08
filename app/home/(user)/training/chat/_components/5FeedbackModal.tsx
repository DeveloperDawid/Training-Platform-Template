"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Star, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { Case } from "@/app/lib/cases/types";
import { Feedback } from "./types";

interface FeedbackModalProps {
  open: boolean;
  isAnalyzing: boolean;
  feedback: Feedback | null;
  caseData: Case;
  isLoadingNewCase: boolean;
  onStartNewCase: () => void;
  onRetry: () => void;
  onClose: () => void;
}

export default function FeedbackModal({
  open,
  isAnalyzing,
  feedback,
  caseData,
  isLoadingNewCase,
  onStartNewCase,
  onRetry,
  onClose,
}: FeedbackModalProps) {
  const getScoreBadgeVariant = (score: number) => {
    if (score >= 8) return "default";
    if (score >= 6) return "secondary";
    return "destructive";
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto [&>button]:hidden">
        {isAnalyzing && !feedback && (
          <div className="flex  items-center justify-center gap-2">
            <DialogTitle className="flex items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              Analyzing your support performance...
            </DialogTitle>
          </div>
        )}

        {feedback && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Support Performance Evaluation
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="flex items-center gap-2">
                {feedback.problemSolved ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-destructive" />
                )}
                <span
                  className={
                    feedback.problemSolved
                      ? "text-green-600"
                      : "text-destructive"
                  }
                >
                  {feedback.problemSolved
                    ? "Problem was resolved"
                    : "Problem was not resolved"}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">
                    <Badge
                      variant={getScoreBadgeVariant(feedback.friendlinessScore)}
                    >
                      {feedback.friendlinessScore}/10
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Communication
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">
                    <Badge
                      variant={getScoreBadgeVariant(
                        feedback.professionalismScore
                      )}
                    >
                      {feedback.professionalismScore}/10
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Professionalism
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">
                    <Badge
                      variant={getScoreBadgeVariant(feedback.helpfulnessScore)}
                    >
                      {feedback.helpfulnessScore}/10
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Helpfulness
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">
                    <Badge
                      variant={getScoreBadgeVariant(feedback.overallScore)}
                    >
                      {feedback.overallScore}/10
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Overall Score
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">Detailed Feedback:</h4>
                <p className="text-muted-foreground">{feedback.feedback}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">What You Did Well:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {feedback.positiveAspects.map((aspect, index) => (
                    <li key={index} className="text-muted-foreground">
                      {aspect}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Areas for Improvement:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {feedback.improvements.map((improvement, index) => (
                    <li key={index} className="text-muted-foreground">
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div className="bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-green-800 dark:text-green-300 flex items-center gap-2">
                  Correct Solution Reference:
                </h4>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  {caseData.solution}
                </p>
                <p className="text-green-600 dark:text-green-400 text-xs mt-2 italic">
                  This is how the problem should ideally be resolved. Compare
                  this with your approach to identify learning opportunities.
                </p>
              </div>

              <div className="pt-4 space-y-2">
                <Button
                  onClick={onStartNewCase}
                  className="w-full"
                  disabled={isLoadingNewCase}
                >
                  {isLoadingNewCase ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Loading New Case...
                    </>
                  ) : (
                    <>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Start New Case
                    </>
                  )}
                </Button>
                <Button onClick={onRetry} variant="outline" className="w-full">
                  Retry Same Case
                </Button>
                <Button
                  onClick={onClose}
                  variant="secondary"
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
