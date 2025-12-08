import React, { use } from "react";

import { ListChecks } from "lucide-react";
import HeaderWithIcon from "@/components/reusable/header-with-icon";
import { loadMcQuestion } from "@/app/lib/multiple-choice/server/loaders/mc_questions.loader";
import MultipleChoiceForm from "../../create/_components/MultipleChoiceForm";

interface EditMcQuestionProps {
  params: Promise<{ id: string }>;
}

const EditMcQuestion = ({ params }: EditMcQuestionProps) => {
  const { id } = use(params);

  const mcQuestionData = use(loadMcQuestion(id));

  if (!mcQuestionData) {
    return <div>Multiple choice question not found</div>;
  }

  return (
    <div className="max-w-4xl w-full mx-auto space-y-6">
      {/* Header */}

      <HeaderWithIcon
        title="Edit Multiple Choice Question"
        level={3}
        description="Edit and update your multiple choice question."
        Icon={ListChecks}
        iconProps="h-8 w-8 text-blue-600"
      />
      <MultipleChoiceForm isEditing={true} mcQuestionData={mcQuestionData} />
    </div>
  );
};

export default EditMcQuestion;
