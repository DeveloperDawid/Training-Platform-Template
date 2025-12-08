import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Activity, Flame, Star } from "lucide-react";
import { UserStats } from "@/app/lib/statistics/user-stats/types";
import {
  formatTimeFromSeconds,
  formatDate,
} from "@/app/lib/utils/time-formatter";
import { UserXpWithLevel } from "@/app/lib/statistics/user-xp/types";

interface UserStatsSectionProps {
  userStatistics: UserStats;
  userXpWithLevel: UserXpWithLevel;
}

export function UserStatsSection({
  userStatistics,
  userXpWithLevel,
}: UserStatsSectionProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Statistics</h1>
          <p className="text-muted-foreground">
            Track your learning progress and achievements
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          Last active: {formatDate(userStatistics.last_activity_date)}
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level & XP</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Level {userXpWithLevel.current_level || 1}
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              {userXpWithLevel.total_xp || 0} XP total
            </p>
            {userXpWithLevel.current_level_info && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>{userXpWithLevel.current_level_info.title}</span>
                  {userXpWithLevel.next_level_info && (
                    <span>
                      {userXpWithLevel.xp_to_next_level || 0} XP to next
                    </span>
                  )}
                </div>
                {userXpWithLevel.next_level_info && (
                  <Progress
                    value={
                      userXpWithLevel.next_level_info
                        ? Math.round(
                            (((userXpWithLevel.total_xp || 0) -
                              userXpWithLevel.current_level_info.xp_required) /
                              (userXpWithLevel.next_level_info.xp_required -
                                userXpWithLevel.current_level_info
                                  .xp_required)) *
                              100
                          )
                        : 100
                    }
                    className="h-2"
                  />
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sessions
            </CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(userStatistics.total_sessions_mc || 0) +
                (userStatistics.total_sessions_cases || 0) +
                (userStatistics.total_sessions_chat || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {userStatistics.total_sessions_mc || 0} Multiple Choice +{" "}
              {userStatistics.total_sessions_cases || 0} Cases +{" "}
              {userStatistics.total_sessions_chat || 0} Chat Training
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Time</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatTimeFromSeconds(
                (userStatistics.total_time_seconds_mc || 0) +
                  (userStatistics.total_time_seconds_cases || 0) +
                  (userStatistics.total_time_seconds_chat || 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatTimeFromSeconds(userStatistics.total_time_seconds_mc || 0)}{" "}
              MC +{" "}
              {formatTimeFromSeconds(
                userStatistics.total_time_seconds_cases || 0
              )}{" "}
              Cases +{" "}
              {formatTimeFromSeconds(
                userStatistics.total_time_seconds_chat || 0
              )}{" "}
              Chat
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak Days</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userStatistics.streak_days || 0}
            </div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
