"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Case } from "@/app/lib/cases/types";
import {
  DifficultyBadge,
  type DifficultyLevel,
} from "@/components/reusable/difficulty-badge";

interface SupportCaseInfoProps {
  caseData: Case;
}

export default function SupportCaseInfo({ caseData }: SupportCaseInfoProps) {
  // Format problem description to add line breaks before "Product:"
  const formatProblemDescription = (text: string) => {
    return text.replace(/(\S)\s+(Product:)/g, "$1\n\n$2");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Support Case Information
          </CardTitle>
          <DifficultyBadge
            difficulty={caseData.difficulty as DifficultyLevel}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">Product Type:</h4>
            <Badge variant="secondary" className="mr-2">
              {caseData.product_type}
            </Badge>
            <h4 className="font-semibold mt-2">Platform Type:</h4>
            <Badge variant="secondary" className="mr-2">
              {caseData.platform_type}
            </Badge>
          </div>
          <div>
            <h4 className="font-semibold">Customer&apos;s Problem:</h4>
            <p className="text-muted-foreground whitespace-pre-line">
              {formatProblemDescription(caseData.problem_description)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
