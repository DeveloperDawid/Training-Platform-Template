import HeaderWithIcon from "@/components/reusable/header-with-icon";
import { ListChecks } from "lucide-react";
import React, { use } from "react";
import MultipleChoiceQuiz from "./_components/0MultipleChoiceQuiz";
import { loadUserWorkspace } from "@/app/lib/user-workspace/loadUserWorkspace";
import { loadUserLevel } from "@/app/lib/statistics/user-xp/server/loaders/user-xp.loader";

const McQuestionsPage = () => {
  const {
    account: { id },
  } = use(loadUserWorkspace());

  const userLevel = use(loadUserLevel(id));

  return (
    <div className="max-w-4xl w-full mx-auto space-y-6">
      <HeaderWithIcon
        title="Multiple Choice Questions"
        level={3}
        description="Answer the following multiple choice questions"
        Icon={ListChecks}
        iconProps="h-8 w-8 text-blue-600"
      />

      <MultipleChoiceQuiz accountId={id} userLevel={userLevel} />
    </div>
  );
};

export default McQuestionsPage;
