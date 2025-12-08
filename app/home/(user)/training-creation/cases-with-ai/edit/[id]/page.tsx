import React, { use } from "react";

import HeaderWithIcon from "@/components/reusable/header-with-icon";
import { Brain } from "lucide-react";
import CasesWithAIForm from "../../create/_components/CasesWithAIForm";
import { loadCase } from "@/app/lib/cases/server/loaders/cases.loader";

interface EditCaseWithAIFeedbackProps {
  params: Promise<{ id: string }>;
}

const EditCaseWithAIFeedback = ({ params }: EditCaseWithAIFeedbackProps) => {
  const { id } = use(params);

  const caseData = use(loadCase(id));

  return (
    <div className="max-w-4xl w-full mx-auto space-y-6">
      {/* Header */}

      <HeaderWithIcon
        title="Edit Cases with AI-Feedback"
        level={3}
        description="Solve support cases and receive AI feedback"
        Icon={Brain}
        iconProps="h-8 w-8 text-blue-600"
      />
      <CasesWithAIForm isEditing={true} caseData={caseData} />
    </div>
  );
};

export default EditCaseWithAIFeedback;
