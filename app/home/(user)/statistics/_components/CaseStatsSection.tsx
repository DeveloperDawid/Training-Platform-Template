import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Trophy, BarChart3, Target } from "lucide-react";
import { CaseStats } from "@/app/lib/statistics/case-stats/types";
import { PRODUCTS, PLATFORMS } from "@/lib/config/app-config";

interface CaseStatsSectionProps {
  caseStatistics: CaseStats;
}

export function CaseStatsSection({ caseStatistics }: CaseStatsSectionProps) {
  // Check if there's any data
  const hasData = (caseStatistics.total_cases_completed || 0) > 0;

  const getScoreColor = (score: number | null, hasData: boolean) => {
    if (!hasData || score === null || score === undefined)
      return "text-muted-foreground";
    if (score >= 9) return "text-green-600";
    if (score >= 7) return "text-blue-600";
    if (score >= 4) return "text-yellow-600";
    return "text-destructive";
  };

  const getPerformanceLevel = (score: number | null, hasData: boolean) => {
    if (!hasData || score === null || score === undefined)
      return { label: "No Data", color: "bg-muted text-muted-foreground" };
    if (score >= 9)
      return {
        label: "Excellent",
        color:
          "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      };
    if (score >= 7)
      return {
        label: "Good",
        color:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
      };
    if (score >= 4)
      return {
        label: "Average",
        color:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
      };
    return {
      label: "Needs Improvement",
      color: "bg-destructive/10 text-destructive",
    };
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">
        Case Training Statistics
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Main Performance Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Case Performance
            </CardTitle>
            <CardDescription>AI-evaluated case solutions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Cases Completed</span>
              <Badge variant="outline">
                {caseStatistics.total_cases_completed || 0}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average Score</span>
                <span
                  className={`font-bold ${getScoreColor(
                    caseStatistics.average_ai_score,
                    hasData
                  )}`}
                >
                  {hasData && caseStatistics.average_ai_score !== null
                    ? `${caseStatistics.average_ai_score.toFixed(1)}/10`
                    : "No Data"}
                </span>
              </div>
              <Progress
                value={
                  hasData ? (caseStatistics.average_ai_score || 0) * 10 : 0
                }
                className="h-2"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Performance Level</span>
              <Badge
                className={
                  getPerformanceLevel(caseStatistics.average_ai_score, hasData)
                    .color
                }
              >
                {
                  getPerformanceLevel(caseStatistics.average_ai_score, hasData)
                    .label
                }
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Best Score</span>
              <div className="flex items-center gap-2">
                <Trophy
                  className={`h-4 w-4 ${getScoreColor(
                    caseStatistics.best_ai_score,
                    hasData
                  )}`}
                />
                <span
                  className={`font-bold ${getScoreColor(
                    caseStatistics.best_ai_score,
                    hasData
                  )}`}
                >
                  {hasData && caseStatistics.best_ai_score !== null
                    ? `${caseStatistics.best_ai_score}/10`
                    : "No Data"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
            <CardDescription>Cases by score ranges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {caseStatistics.scores_9_10 || 0}
                </div>
                <div className="text-xs text-muted-foreground">
                  Excellent (9-10)
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {caseStatistics.scores_7_8 || 0}
                </div>
                <div className="text-xs text-muted-foreground">Good (7-8)</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-600">
                  {caseStatistics.scores_4_6 || 0}
                </div>
                <div className="text-xs text-muted-foreground">
                  Average (4-6)
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">
                  {caseStatistics.scores_0_3 || 0}
                </div>
                <div className="text-xs text-muted-foreground">Poor (0-3)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Product Performance
            </CardTitle>
            <CardDescription>AI case results by product type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {PRODUCTS.PRODUCT_A.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {caseStatistics.product_a_avg_score?.toFixed(1) || "0.0"}
                  /10
                </span>
                <Badge variant="outline">
                  {caseStatistics.product_a_attempts || 0} attempts
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {PRODUCTS.PRODUCT_B.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {caseStatistics.product_b_avg_score?.toFixed(1) || "0.0"}
                  /10
                </span>
                <Badge variant="outline">
                  {caseStatistics.product_b_attempts || 0} attempts
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {PRODUCTS.OTHER.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {caseStatistics.product_other_avg_score?.toFixed(1) || "0.0"}
                  /10
                </span>
                <Badge variant="outline">
                  {caseStatistics.product_other_attempts || 0} attempts
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Platform Performance
            </CardTitle>
            <CardDescription>AI case results by platform type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {PLATFORMS.PLATFORM_A.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {caseStatistics.platform_a_avg_score?.toFixed(1) || "0.0"}
                  /10
                </span>
                <Badge variant="outline">
                  {caseStatistics.platform_a_attempts || 0} attempts
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {PLATFORMS.PLATFORM_B.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {caseStatistics.platform_b_avg_score?.toFixed(1) || "0.0"}
                  /10
                </span>
                <Badge variant="outline">
                  {caseStatistics.platform_b_attempts || 0} attempts
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {PLATFORMS.OTHER.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {caseStatistics.platform_other_avg_score?.toFixed(1) || "0.0"}
                  /10
                </span>
                <Badge variant="outline">
                  {caseStatistics.platform_other_attempts || 0} attempts
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
