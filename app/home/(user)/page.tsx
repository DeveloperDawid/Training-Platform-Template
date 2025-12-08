import { getSupabaseServerClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Brain,
  MessageSquare,
  ListChecks,
  Trophy,
  TrendingUp,
} from "lucide-react";

export default async function UserDashboard() {
  const supabase = await getSupabaseServerClient();

  // Check if user is authenticated
  const { data } = await supabase.auth.getClaims();

  const user = data!.claims;

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {user.email?.split("@")[0]}!
            </h1>
          </div>
          <Badge variant="secondary" className="text-sm">
            Trainee
          </Badge>
        </div>
      </div>

      {/* Training Modules */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Training Modules</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Quiz Module */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <ListChecks className="h-6 w-6 text-blue-500" />
                <CardTitle>Quiz</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                Test your knowledge with multiple choice questions on various
                topics.
              </CardDescription>
              <Button asChild className="w-full">
                <Link href="/home/training/multiple-choice">Start Quiz</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Support Chat Module */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="h-6 w-6 text-green-500" />
                <CardTitle>Support Chat</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                Practice real support scenarios with AI-powered customers.
              </CardDescription>
              <Button asChild className="w-full">
                <Link href="/home/training/chat">Start Chat</Link>
              </Button>
            </CardContent>
          </Card>

          {/* AI Cases Module */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Brain className="h-6 w-6 text-purple-500" />
                <CardTitle>AI Cases</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                Solve complex support cases with AI evaluation and scoring.
              </CardDescription>
              <Button asChild className="w-full">
                <Link href="/home/training/cases-with-ai">Start Case</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              Achievements
            </CardTitle>
            <CardDescription>Track your accomplishments</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/home/statistics">View Statistics</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Leaderboard
            </CardTitle>
            <CardDescription>Compete with others</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/home/statistics/leaderboard">View Leaderboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
