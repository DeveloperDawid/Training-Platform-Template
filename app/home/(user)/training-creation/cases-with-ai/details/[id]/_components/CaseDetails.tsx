"use client";
import React from "react";
import { Case } from "@/app/lib/cases/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CaseDetailsProps {
  caseData: Case;
}

const CaseDetails = ({ caseData }: CaseDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Title</Label>
          <Input value={caseData.title} disabled className="mt-1" />
        </div>

        <div>
          <Label>Problem Description</Label>
          <Textarea
            value={caseData.problem_description}
            disabled
            rows={4}
            className="mt-1"
          />
        </div>

        <div>
          <Label>Solution</Label>
          <Textarea
            value={caseData.solution}
            disabled
            rows={4}
            className="mt-1"
          />
        </div>

        {caseData.ai_instructions && (
          <div>
            <Label>AI Instructions</Label>
            <Textarea
              value={caseData.ai_instructions}
              disabled
              rows={3}
              className="mt-1 bg-muted/50"
            />
          </div>
        )}

        <div>
          <Label>Product Type</Label>
          <div className="mt-1">
            <Badge variant="outline" className="text-xs">
              {caseData.product_type}
            </Badge>
          </div>
        </div>

        <div>
          <Label>Platform Type</Label>
          <div className="mt-1">
            <Badge variant="outline" className="text-xs">
              {caseData.platform_type}
            </Badge>
          </div>
        </div>

        <div>
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-1 mt-1">
            {caseData.tags?.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {(!caseData.tags || caseData.tags.length === 0) && (
              <span className="text-sm text-muted-foreground">No tags</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <Label>Created At</Label>
            <p className="mt-1">
              {new Date(caseData.created_at).toLocaleString()}
            </p>
          </div>
          <div>
            <Label>Updated At</Label>
            {caseData.updated_at ? (
              <p className="mt-1">
                {new Date(caseData.updated_at).toLocaleString()}
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

export default CaseDetails;
