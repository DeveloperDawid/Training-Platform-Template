"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { Brain, MessageSquare, ListChecks, Trophy } from "lucide-react";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-[50vh] flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center gap-6 py-20 px-4">
        <div className="max-w-3xl text-center space-y-6">
          <div className="flex items-center justify-center gap-4">
            <Image
              src="/logo.svg"
              alt="Training Platform"
              width={48}
              height={48}
              className="h-12 w-12"
            />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Support Training Platform
            </h1>
          </div>

          <p className="text-lg text-muted-foreground">
            Train your support skills with interactive modules. Practice on real
            scenarios, get AI feedback, and level up.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            {user && !loading ? (
              <Button size="lg" asChild>
                <Link href="/home">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/auth/sign-up">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Training Modules */}
      <section className="py-10 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Training Modules
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Multiple Choice */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <ListChecks className="h-6 w-6 text-blue-500" />
                  <CardTitle className="text-lg">Quiz</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Test your knowledge with multiple choice questions. Different
                  difficulty levels to match your progress.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Customer Service Chat */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-6 w-6 text-green-500" />
                  <CardTitle className="text-lg">Support Chat</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Practice real support scenarios with AI customers. Get instant
                  feedback on your responses.
                </CardDescription>
              </CardContent>
            </Card>

            {/* AI Case Evaluation */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-6 w-6 text-purple-500" />
                  <CardTitle className="text-lg">AI Cases</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Solve complex support cases with detailed AI evaluation and
                  scoring.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Features</h2>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <h3 className="font-semibold">Level Up</h3>
              <p className="text-sm text-muted-foreground">
                Earn XP and progress through levels
              </p>
            </div>

            <div>
              <ListChecks className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold">Track Progress</h3>
              <p className="text-sm text-muted-foreground">
                See your stats and achievements
              </p>
            </div>

            <div>
              <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold">AI Feedback</h3>
              <p className="text-sm text-muted-foreground">
                Get detailed insights on your performance
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
