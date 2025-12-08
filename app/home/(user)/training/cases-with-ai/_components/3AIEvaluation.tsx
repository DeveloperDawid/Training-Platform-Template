import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Case } from "@/app/lib/cases/types";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AIEvaluationResultsProps {
  evaluation: {
    score: number;
    feedback: string;
    improvements: string[];
    thoughts?: string; // Optional: AI's thinking process
  };
  currentCase: Case;
}

const AIEvaluationResults = ({
  evaluation,
  currentCase,
}: AIEvaluationResultsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenThoughts, setIsOpenThoughts] = useState(false);

  const getScoreColor = (score: number | null) => {
    if (!score) return "text-muted-foreground";
    if (score >= 9) return "text-green-600";
    if (score >= 7) return "text-blue-600";
    if (score >= 4) return "text-yellow-600";
    return "text-destructive";
  };

  const getScoreIcon = (score: number | null) => {
    if (!score) return <AlertCircle className="h-4 w-4" />;
    if (score >= 8) return <CheckCircle className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          AI Evaluation
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded ${getScoreColor(
              evaluation.score
            )}`}
          >
            {getScoreIcon(evaluation.score)}
            <span className="font-bold">{evaluation.score}/10</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Problem Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {evaluation.feedback}
            </p>
          </div>
          {evaluation.improvements.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Suggested Improvements</h3>
              <ul className="space-y-2">
                {evaluation.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Separator />
          <Accordion
            type="single"
            collapsible
            onValueChange={(val) => {
              setIsOpen(val === "item-1");
              setIsOpenThoughts(val === "item-2");
            }}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="w-full text-center font-semibold mb-2">
                {isOpen ? "Hide Solution Example ▲" : "Show Solution Example ▼"}
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3">
                  <p className="text-sm text-green-800 dark:text-green-300 leading-relaxed">
                    {currentCase.solution}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            {evaluation.thoughts && evaluation.thoughts.trim() !== "" && (
              <AccordionItem value="item-2">
                <AccordionTrigger className="w-full text-center font-semibold mb-2">
                  {isOpenThoughts
                    ? "Hide AI Thoughts  ▲"
                    : "Show AI Thoughts  ▼"}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3">
                    <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed whitespace-pre-wrap">
                      {evaluation.thoughts || "No thoughts available."}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIEvaluationResults;
