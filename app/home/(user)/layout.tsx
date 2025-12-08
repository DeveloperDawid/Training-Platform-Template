import { loadUserWorkspace } from "@/app/lib/user-workspace/loadUserWorkspace";
import { UserWorkspaceContextProvider } from "@/app/lib/user-workspace/user-workspace-context";
import { AppBreadcrumbs } from "@/components/layout/breadcrumbs";
import { UserSidebar } from "@/components/layout/user-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { use } from "react";

export const dynamic = "force-dynamic";

export default function UserHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const workspace = use(loadUserWorkspace());
  return (
    <UserWorkspaceContextProvider value={workspace}>
      <SidebarProvider defaultOpen={true}>
        <UserSidebar />
        <SidebarInset>
          {/* Header with Sidebar Toggle and Breadcrumbs */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="mr-2" />
            <AppBreadcrumbs />
          </header>

          {/* Main Content */}
          <div className="flex flex-1 flex-col p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </UserWorkspaceContextProvider>
  );
}
