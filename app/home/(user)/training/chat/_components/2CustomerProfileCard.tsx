"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, User, Building2 } from "lucide-react";

import { CustomerProfile } from "./types";
import { Separator } from "@/components/ui/separator";

interface CustomerProfileCardProps {
  profile: CustomerProfile | null;
}

export default function CustomerProfileCard({
  profile,
}: CustomerProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Customer Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        {profile ? (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold flex items-center gap-2">
                <User className="h-4 w-4" /> {profile.name}
              </h4>
            </div>

            <div>
              <h4 className="font-semibold flex items-center gap-2">
                <Building2 className="h-4 w-4" /> {profile.company.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {profile.company.industry} • {profile.company.size} company
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {profile.company.description}
              </p>
              <Separator className="my-4" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium">Personality:</span>
                <Badge variant="secondary" className="ml-2">
                  {profile.personality.type}
                </Badge>
              </div>
              <div>
                <span className="text-sm font-medium">Urgency:</span>
                <Badge
                  variant={
                    profile.company.urgencyLevel === "high"
                      ? "destructive"
                      : profile.company.urgencyLevel === "medium"
                      ? "secondary"
                      : "outline"
                  }
                  className="ml-2"
                >
                  {profile.company.urgencyLevel}
                </Badge>
              </div>
            </div>

            <div className="bg-muted/50 p-3 rounded-lg">
              <h5 className="text-sm font-medium mb-1">Expected Behavior: </h5>

              <p className="text-xs text-muted-foreground">
                <strong>Personality {profile.personality.name}: </strong>
                {profile.personality.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <strong>Communication Style: </strong>
                {profile.personality.communicationStyle}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">
              Customer profile will be generated when you start the chat. Each
              customer has a unique personality and company background.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
