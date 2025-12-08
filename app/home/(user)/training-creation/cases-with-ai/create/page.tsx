import React from "react";

import { Brain } from "lucide-react";
import HeaderWithIcon from "@/components/reusable/header-with-icon";
import { CasesWithAIForm } from "./_components/CasesWithAIForm";

const CreateCaseWithAIFeedback = async () => {
  return (
    <div className="max-w-4xl w-full mx-auto space-y-6">
      {/* Header */}

      <HeaderWithIcon
        title="Create Cases with AI-Feedback"
        level={3}
        description="Create and submit your own cases with AI feedback."
        Icon={Brain}
        iconProps="h-8 w-8 text-blue-600"
      />
      <CasesWithAIForm />
    </div>
  );
};

export default CreateCaseWithAIFeedback;
