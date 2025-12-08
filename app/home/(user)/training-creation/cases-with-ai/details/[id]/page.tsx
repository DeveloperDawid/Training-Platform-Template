import React, { use } from "react";

import HeaderWithIcon from "@/components/reusable/header-with-icon";
import { Brain } from "lucide-react";

import { loadCase } from "@/app/lib/cases/server/loaders/cases.loader";

import CaseDetails from "./_components/CaseDetails";

interface DetailsCaseWithAIFeedbackProps {
  params: Promise<{ id: string }>;
}

const DetailsCaseWithAIFeedback = ({
  params,
}: DetailsCaseWithAIFeedbackProps) => {
  const { id } = use(params);

  const caseData = use(loadCase(id));

  return (
    <div className="max-w-4xl w-full mx-auto space-y-6">
      <HeaderWithIcon
        title="Details - Cases with AI-Feedback"
        level={3}
        description="Solve support cases and receive AI feedback"
        Icon={Brain}
        iconProps="h-8 w-8 text-blue-600"
      />
      <CaseDetails caseData={caseData} />
    </div>
  );
};

export default DetailsCaseWithAIFeedback;
