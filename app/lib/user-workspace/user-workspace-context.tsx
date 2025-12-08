"use client";
import { createContext } from "react";

export type UserWorkspace = {
  account: {
    id: string;
    role: string;
    permissions: string[];
  };
};

export const UserWorkspaceContext = createContext<UserWorkspace | null>(null);

export function UserWorkspaceContextProvider(
  props: React.PropsWithChildren<{ value: UserWorkspace }>
) {
  return (
    <UserWorkspaceContext.Provider value={props.value}>
      {props.children}
    </UserWorkspaceContext.Provider>
  );
}
