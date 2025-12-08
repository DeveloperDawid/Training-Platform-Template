import { loadRandomCaseByUserLevel } from "@/app/lib/cases/server/loaders/cases.loader";
import React, { use } from "react";
import AISimulationClient from "./_components/ai-simulation-client";
import { Brain } from "lucide-react";
import HeaderWithIcon from "@/components/reusable/header-with-icon";
import { loadUserWorkspace } from "@/app/lib/user-workspace/loadUserWorkspace";
import { loadUserLevel } from "@/app/lib/statistics/user-xp/server/loaders/user-xp.loader";

const CasesWithAiPage = () => {
  const {
    account: { id },
  } = use(loadUserWorkspace());
  const userLevel = use(loadUserLevel(id));

  //const randomCase = use(loadRandomCase());
  const randomCase = use(loadRandomCaseByUserLevel(userLevel));

  return (
    <div className="max-w-4xl w-full mx-auto space-y-6">
      {/* Header */}

      <HeaderWithIcon
        title="Cases with AI-Feedback"
        level={3}
        description="Solve support cases and receive AI feedback"
        Icon={Brain}
        iconProps="h-8 w-8 text-blue-600"
      />

      <AISimulationClient
        initialCase={randomCase}
        userLevel={userLevel}
        accountId={id}
      />
    </div>
  );
};

export default CasesWithAiPage;
