import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, BarChart3, Target, Trophy } from "lucide-react";
import { McStats } from "@/app/lib/statistics/mc-stats/types";
import { PRODUCTS, PLATFORMS } from "@/lib/config/app-config";

interface MultipleChoiceStatsSectionProps {
  multipleChoiceStatistics: McStats;
}

export function MultipleChoiceStatsSection({
  multipleChoiceStatistics,
}: MultipleChoiceStatsSectionProps) {
  // Check if there's any data
  const hasData = (multipleChoiceStatistics.total_quizzes_completed || 0) > 0;

  const getScoreColor = (score: number | null, hasData: boolean) => {
    if (!hasData || score === null || score === undefined)
      return "text-muted-foreground";
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-destructive";
  };

  const getPerformanceLevel = (score: number | null, hasData: boolean) => {
    if (!hasData || score === null || score === undefined)
      return { label: "No Data", color: "bg-muted text-muted-foreground" };
    if (score >= 90)
      return {
        label: "Excellent",
        color:
          "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      };
    if (score >= 70)
      return {
        label: "Good",
        color:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
      };
    if (score >= 40)
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
        Multiple Choice Statistics
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Main Performance Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Quiz Performance
            </CardTitle>
            <CardDescription>Quiz results and accuracy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Quizzes Completed</span>
              <Badge variant="outline">
                {multipleChoiceStatistics.total_quizzes_completed || 0}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average Score</span>
                <span
                  className={`font-bold ${getScoreColor(
                    multipleChoiceStatistics.average_score,
                    hasData
                  )}`}
                >
                  {hasData && multipleChoiceStatistics.average_score
                    ? `${multipleChoiceStatistics.average_score.toFixed(1)}%`
                    : "No Data"}
                </span>
              </div>
              <Progress
                value={
                  hasData ? multipleChoiceStatistics.average_score || 0 : 0
                }
                className="h-2"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Performance Level</span>
              <Badge
                className={
                  getPerformanceLevel(
                    multipleChoiceStatistics.average_score,
                    hasData
                  ).color
                }
              >
                {
                  getPerformanceLevel(
                    multipleChoiceStatistics.average_score,
                    hasData
                  ).label
                }
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Best Score</span>
              <div className="flex items-center gap-2">
                <Trophy
                  className={`h-4 w-4 ${getScoreColor(
                    multipleChoiceStatistics.best_score,
                    hasData
                  )}`}
                />
                <span
                  className={`font-bold ${getScoreColor(
                    multipleChoiceStatistics.best_score,
                    hasData
                  )}`}
                >
                  {hasData && multipleChoiceStatistics.best_score !== null
                    ? `${multipleChoiceStatistics.best_score}%`
                    : "No Data"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Answer Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Answer Statistics</CardTitle>
            <CardDescription>Questions answered and accuracy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {multipleChoiceStatistics.total_correct_answers || 0}
                </div>
                <div className="text-xs text-muted-foreground">
                  Correct Answers
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {multipleChoiceStatistics.total_questions_answered || 0}
                </div>
                <div className="text-xs text-muted-foreground">
                  Total Questions
                </div>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Accuracy Rate</span>
                <span className="font-bold">
                  {multipleChoiceStatistics.total_questions_answered &&
                  multipleChoiceStatistics.total_questions_answered > 0
                    ? `${(
                        ((multipleChoiceStatistics.total_correct_answers || 0) /
                          multipleChoiceStatistics.total_questions_answered) *
                        100
                      ).toFixed(1)}%`
                    : "0.0%"}
                </span>
              </div>
              <Progress
                value={
                  multipleChoiceStatistics.total_questions_answered &&
                  multipleChoiceStatistics.total_questions_answered > 0
                    ? ((multipleChoiceStatistics.total_correct_answers || 0) /
                        multipleChoiceStatistics.total_questions_answered) *
                      100
                    : 0
                }
                className="h-2 mt-2"
              />
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
            <CardDescription>Quiz accuracy by product type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {PRODUCTS.PRODUCT_A.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {multipleChoiceStatistics.product_a_total || 0 > 0
                    ? `${(
                        ((multipleChoiceStatistics.product_a_correct || 0) /
                          (multipleChoiceStatistics.product_a_total || 1)) *
                        100
                      ).toFixed(1)}%`
                    : "0.0%"}
                </span>
                <Badge variant="outline">
                  {multipleChoiceStatistics.product_a_correct || 0}/
                  {multipleChoiceStatistics.product_a_total || 0}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {PRODUCTS.PRODUCT_B.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {multipleChoiceStatistics.product_b_total || 0 > 0
                    ? `${(
                        ((multipleChoiceStatistics.product_b_correct || 0) /
                          (multipleChoiceStatistics.product_b_total || 1)) *
                        100
                      ).toFixed(1)}%`
                    : "0.0%"}
                </span>
                <Badge variant="outline">
                  {multipleChoiceStatistics.product_b_correct || 0}/
                  {multipleChoiceStatistics.product_b_total || 0}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Other</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {multipleChoiceStatistics.product_other_total || 0 > 0
                    ? `${(
                        ((multipleChoiceStatistics.product_other_correct || 0) /
                          (multipleChoiceStatistics.product_other_total || 1)) *
                        100
                      ).toFixed(1)}%`
                    : "0.0%"}
                </span>
                <Badge variant="outline">
                  {multipleChoiceStatistics.product_other_correct || 0}/
                  {multipleChoiceStatistics.product_other_total || 0}
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
            <CardDescription>Quiz accuracy by platform type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {PLATFORMS.PLATFORM_A.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {multipleChoiceStatistics.platform_a_total || 0 > 0
                    ? `${(
                        ((multipleChoiceStatistics.platform_a_correct || 0) /
                          (multipleChoiceStatistics.platform_a_total || 1)) *
                        100
                      ).toFixed(1)}%`
                    : "0.0%"}
                </span>
                <Badge variant="outline">
                  {multipleChoiceStatistics.platform_a_correct || 0}/
                  {multipleChoiceStatistics.platform_a_total || 0}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {PLATFORMS.PLATFORM_B.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {multipleChoiceStatistics.platform_b_total || 0 > 0
                    ? `${(
                        ((multipleChoiceStatistics.platform_b_correct || 0) /
                          (multipleChoiceStatistics.platform_b_total || 1)) *
                        100
                      ).toFixed(1)}%`
                    : "0.0%"}
                </span>
                <Badge variant="outline">
                  {multipleChoiceStatistics.platform_b_correct || 0}/
                  {multipleChoiceStatistics.platform_b_total || 0}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Other</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {multipleChoiceStatistics.platform_other_total || 0 > 0
                    ? `${(
                        ((multipleChoiceStatistics.platform_other_correct ||
                          0) /
                          (multipleChoiceStatistics.platform_other_total ||
                            1)) *
                        100
                      ).toFixed(1)}%`
                    : "0.0%"}
                </span>
                <Badge variant="outline">
                  {multipleChoiceStatistics.platform_other_correct || 0}/
                  {multipleChoiceStatistics.platform_other_total || 0}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
