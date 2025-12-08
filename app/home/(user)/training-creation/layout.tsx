import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldX } from "lucide-react";
import { loadUserWorkspace } from "@/app/lib/user-workspace/loadUserWorkspace";
import { use } from "react";

export default function TrainingCreationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    account: { permissions },
  } = use(loadUserWorkspace());
  const canWriteTasks = permissions.includes("tasks.write");

  if (!canWriteTasks) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <ShieldX className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle className="text-destructive">
              Permission Denied
            </CardTitle>
            <CardDescription>
              You don&apos;t have permission to access the Training Creation
              area.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            Please contact your administrator if you believe this is an error.
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
