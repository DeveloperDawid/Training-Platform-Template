"use client";
import React from "react";
import { McQuestion } from "@/app/lib/multiple-choice/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

interface McQuestionDetailsProps {
  mcQuestion: McQuestion;
}

const McQuestionDetails = ({ mcQuestion }: McQuestionDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Multiple Choice Question Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Question Text</Label>
          <Input value={mcQuestion.question_text} disabled className="mt-1" />
        </div>

        <div>
          <Label>Option 1: Correct Option</Label>
          <Input value={mcQuestion.option_1} disabled className="mt-1" />

          <div>
            <Label>Option 2</Label>
            <Input value={mcQuestion.option_2} disabled className="mt-1" />
          </div>

          <div>
            <Label>Option 3</Label>
            <Input value={mcQuestion.option_3} disabled className="mt-1" />
          </div>

          <div>
            <Label>Option 4</Label>
            <Input value={mcQuestion.option_4} disabled className="mt-1" />
          </div>
        </div>

        <div>
          <Label>Product Type</Label>
          <div className="mt-1">
            <Badge variant="outline" className="text-xs">
              {mcQuestion.product_type}
            </Badge>
          </div>
        </div>

        <div>
          <Label>Platform Type</Label>
          <div className="mt-1">
            <Badge variant="outline" className="text-xs">
              {mcQuestion.platform_type}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <Label>Created At</Label>
            <p className="mt-1">
              {new Date(mcQuestion.created_at).toLocaleString()}
            </p>
          </div>
          <div>
            <Label>Updated At</Label>
            {mcQuestion.updated_at ? (
              <p className="mt-1">
                {new Date(mcQuestion.updated_at).toLocaleString()}
              </p>
            ) : (
              <p className="mt-1">-</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default McQuestionDetails;
