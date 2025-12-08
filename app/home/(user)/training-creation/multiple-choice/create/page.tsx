import React from "react";

import { ListChecks } from "lucide-react";
import HeaderWithIcon from "@/components/reusable/header-with-icon";
import MultipleChoiceForm from "./_components/MultipleChoiceForm";

const CreateMcQuestion = async () => {
  return (
    <div className="max-w-4xl w-full mx-auto space-y-6">
      {/* Header */}

      <HeaderWithIcon
        title="Create Multiple Choice Questions"
        level={3}
        description="Create and submit your own multiple choice questions."
        Icon={ListChecks}
        iconProps="h-8 w-8 text-blue-600"
      />
      <MultipleChoiceForm />
    </div>
  );
};

export default CreateMcQuestion;
