import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Case } from "@/app/lib/cases/types";
import {
  DifficultyBadge,
  type DifficultyLevel,
} from "@/components/reusable/difficulty-badge";

interface ProblemDescriptionProps {
  currentCase: Case;
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  currentCase,
}) => {
  // Format problem description to add line breaks before "Product:"
  const formatProblemDescription = (text: string) => {
    return text.replace(/(\S)\s+(Product:)/g, "$1\n\n$2");
  };

  return (
    <div>
      {/* Case Details */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle>Problem: {currentCase.title}</CardTitle>
            <DifficultyBadge
              difficulty={currentCase.difficulty as DifficultyLevel}
            />
          </div>
          <CardDescription className="pt-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span>Product Type:</span>
                <Badge variant="outline">{currentCase.product_type}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span>Platform Type:</span>
                <Badge variant="outline">{currentCase.platform_type}</Badge>
              </div>

              {currentCase.tags != null && currentCase.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span>Tags:</span>
                  {currentCase.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Problem Description</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {formatProblemDescription(currentCase.problem_description)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProblemDescription;
