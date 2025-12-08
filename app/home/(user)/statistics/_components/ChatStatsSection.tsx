import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  MessageCircle,
  Clock,
  Users,
  TrendingUp,
  BarChart3,
  Target,
} from "lucide-react";
import { ChatStats } from "@/app/lib/statistics/chat-stats/types";
import { formatTimeFromSeconds } from "@/app/lib/utils/time-formatter";
import { PRODUCTS, PLATFORMS } from "@/lib/config/app-config";

interface ChatStatsSectionProps {
  chatStatistics: ChatStats;
}

export function ChatStatsSection({ chatStatistics }: ChatStatsSectionProps) {
  // Check if there's any data
  const hasData = (chatStatistics.total_chats_completed || 0) > 0;

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
    return { label: "Needs Work", color: "bg-destructive/10 text-destructive" };
  };

  const completionRate = chatStatistics.total_chats_attempted
    ? ((chatStatistics.total_chats_completed || 0) /
        chatStatistics.total_chats_attempted) *
      100
    : 0;

  const performanceLevel = getPerformanceLevel(
    chatStatistics.average_ai_score,
    hasData
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Chat Training Statistics</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Chat Sessions
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {chatStatistics.total_chats_completed || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {chatStatistics.total_chats_attempted || 0} attempted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${getScoreColor(
                chatStatistics.average_ai_score,
                hasData
              )}`}
            >
              {hasData && chatStatistics.average_ai_score !== null
                ? `${chatStatistics.average_ai_score.toFixed(1)}/10`
                : "No Data"}
            </div>
            <Badge variant="secondary" className={performanceLevel.color}>
              {performanceLevel.label}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Conversation Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatTimeFromSeconds(chatStatistics.average_conversation_time)}
            </div>
            <p className="text-xs text-muted-foreground">Per chat session</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {chatStatistics.total_messages_sent || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Avg:{" "}
              {chatStatistics.average_messages_per_chat?.toFixed(1) || "0.0"}{" "}
              per chat
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
            <CardDescription>
              Performance breakdown across all chat sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {chatStatistics.scores_9_10 || 0}
                </div>
                <div className="text-xs text-muted-foreground">
                  Excellent (9-10)
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {chatStatistics.scores_7_8 || 0}
                </div>
                <div className="text-xs text-muted-foreground">Good (7-8)</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-600">
                  {chatStatistics.scores_4_6 || 0}
                </div>
                <div className="text-xs text-muted-foreground">
                  Average (4-6)
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">
                  {chatStatistics.scores_0_3 || 0}
                </div>
                <div className="text-xs text-muted-foreground">
                  Needs Work (0-3)
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Completion Rate</span>
                <span>{completionRate.toFixed(1)}%</span>
              </div>
              <Progress value={completionRate} className="w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Conversation Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Conversation Metrics</CardTitle>
            <CardDescription>Quality and efficiency indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Average Messages/Chat</span>
              <span className="text-sm">
                {chatStatistics.average_messages_per_chat?.toFixed(1) || "0.0"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Shortest Chat</span>
              <Badge variant="outline">
                {chatStatistics.shortest_chat || 0} messages
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Longest Chat</span>
              <Badge variant="outline">
                {chatStatistics.longest_chat || 0} messages
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Messages Sent</span>
              <Badge variant="secondary">
                {chatStatistics.total_messages_sent || 0}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Best Score</span>
              <span
                className={`text-sm font-bold ${getScoreColor(
                  chatStatistics.best_ai_score,
                  hasData
                )}`}
              >
                {hasData && chatStatistics.best_ai_score !== null
                  ? `${chatStatistics.best_ai_score.toFixed(1)}/10`
                  : "No Data"}
              </span>
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
            <CardDescription>
              How well you handle different product categories
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {PRODUCTS.PRODUCT_A.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {chatStatistics.product_a_avg_score?.toFixed(1) || "0.0"}
                  /10
                </span>
                <Badge variant="outline">
                  {chatStatistics.product_a_attempts || 0} chats
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {PRODUCTS.PRODUCT_B.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {chatStatistics.product_b_avg_score?.toFixed(1) || "0.0"}
                  /10
                </span>
                <Badge variant="outline">
                  {chatStatistics.product_b_attempts || 0} chats
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {PRODUCTS.OTHER.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {chatStatistics.product_other_avg_score?.toFixed(1) || "0.0"}
                  /10
                </span>
                <Badge variant="outline">
                  {chatStatistics.product_other_attempts || 0} chats
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
            <CardDescription>
              How well you handle different platform categories
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {PLATFORMS.PLATFORM_A.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {chatStatistics.platform_a_avg_score?.toFixed(1) || "0.0"}
                  /10
                </span>
                <Badge variant="outline">
                  {chatStatistics.platform_a_attempts || 0} chats
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {PLATFORMS.PLATFORM_B.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {chatStatistics.platform_b_avg_score?.toFixed(1) || "0.0"}
                  /10
                </span>
                <Badge variant="outline">
                  {chatStatistics.platform_b_attempts || 0} chats
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {PLATFORMS.OTHER.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {chatStatistics.platform_other_avg_score?.toFixed(1) || "0.0"}
                  /10
                </span>
                <Badge variant="outline">
                  {chatStatistics.platform_other_attempts || 0} chats
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
