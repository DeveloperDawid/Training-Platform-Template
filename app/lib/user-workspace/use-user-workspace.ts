// packages/features/accounts/src/hooks/use-user-workspace.ts
"use client";
import { useContext } from "react";
import { UserWorkspaceContext } from "./user-workspace-context";

export function useUserWorkspace() {
  const ctx = useContext(UserWorkspaceContext);
  if (!ctx) {
    throw new Error(
      "useUserWorkspace must be used within UserWorkspaceContextProvider"
    );
  }
  return ctx;
}
