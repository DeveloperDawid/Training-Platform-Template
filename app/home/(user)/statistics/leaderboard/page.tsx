import { loadXpLeaderboard } from "@/app/lib/statistics/user-xp/server/loaders/user-xp.loader";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Star } from "lucide-react";

export const dynamic = 'force-dynamic';

const LeaderBoardPage = async () => {
  const leaderBoardData = await loadXpLeaderboard(); // All users

  console.log("Leaderboard data:", leaderBoardData.length, "users");
  console.log("First user:", leaderBoardData[0]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <Star className="h-5 w-5 text-gray-300" />;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-700";
      case 2:
        return "bg-gradient-to-r from-muted/50 to-muted border-border";
      case 3:
        return "bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-700";
      default:
        return "bg-background border-border";
    }
  };

  const getPlayerNumber = (index: number) => {
    // Generate player number based on position (1-based)
    return `#${index + 1}`;
  };

  const getAvatarColor = (index: number) => {
    // Cycle through different colors for variety
    const colors = [
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
      "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
      "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300",
    ];
    return colors[index % colors.length];
  };

  const getUserInitials = (name?: string | null) => {
    if (!name) return "??";
    const nameParts = name.trim().split(" ");
    if (nameParts.length >= 2) {
      return (
        nameParts[0][0] + nameParts[nameParts.length - 1][0]
      ).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-2xl">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">XP Leaderboard</h1>
        <p className="text-muted-foreground">
          See how you rank against other learners
        </p>
        <Badge variant="outline" className="text-sm px-3 py-1">
          <Trophy className="h-4 w-4 mr-2" />
          {leaderBoardData.length} Players
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Rankings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderBoardData.map((user, index) => {
              const rank = index + 1;
              const playerNumber = getPlayerNumber(index);
              const userName = user.accounts?.name || `Player ${playerNumber}`;
              const userInitials = getUserInitials(user.accounts?.name);

              return (
                <div
                  key={user.id}
                  className={`rounded-lg p-3 border transition-all hover:shadow-sm ${getRankStyle(
                    rank
                  )}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Rank Icon */}
                      <div className="flex-shrink-0">
                        {rank <= 3 ? (
                          getRankIcon(rank)
                        ) : (
                          <div className="w-6 h-6 flex items-center justify-center text-sm font-semibold text-muted-foreground">
                            {rank}
                          </div>
                        )}
                      </div>

                      {/* User Avatar */}
                      <Avatar className="h-8 w-8">
                        <AvatarFallback
                          className={`${getAvatarColor(
                            index
                          )} font-semibold text-xs`}
                        >
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>

                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm text-foreground">
                            {userName}
                          </h3>
                        </div>

                        {/* Level Info */}
                        {user.current_level_info ? (
                          <p className="text-xs text-muted-foreground">
                            Level {user.current_level} -{" "}
                            {user.current_level_info.title}
                          </p>
                        ) : (
                          <p className="text-xs text-muted-foreground">
                            Level {user.current_level || 1}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* XP Display */}
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">
                        {user.total_xp?.toLocaleString() || 0}
                      </div>
                      <p className="text-xs text-muted-foreground">XP</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {leaderBoardData.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No players yet
              </h3>
              <p className="text-muted-foreground">
                Be the first to start training and earn XP!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderBoardPage;
