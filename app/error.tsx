"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-xl font-semibold">
            Something went wrong
          </CardTitle>
          <CardDescription>
            An unexpected error occurred. Please try again or return to the
            homepage.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Error details for development */}
          {process.env.NODE_ENV === "development" && (
            <details className="text-sm">
              <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                Error Details (Development)
              </summary>
              <pre className="mt-2 whitespace-pre-wrap break-all text-xs text-destructive bg-destructive/5 p-2 rounded">
                {error.message}
              </pre>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-1">
                  Digest: {error.digest}
                </p>
              )}
            </details>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={reset} className="flex-1" variant="default">
              <RotateCcw className="mr-2 h-4 w-4" />
              Try again
            </Button>

            <Button asChild variant="outline" className="flex-1">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
