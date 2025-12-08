import McQuestionDetails from "./_components/McQuestionDetails";
import { loadMcQuestion } from "@/app/lib/multiple-choice/server/loaders/mc_questions.loader";
import HeaderWithIcon from "@/components/reusable/header-with-icon";
import { Brain } from "lucide-react";
import { use } from "react";

interface DetailsPageProps {
  params: Promise<{ id: string }>;
}

const DetailsPage = ({ params }: DetailsPageProps) => {
  const { id } = use(params);

  const mcQuestionData = use(loadMcQuestion(id));

  return (
    <div className="max-w-4xl w-full mx-auto space-y-6">
      <HeaderWithIcon
        title="Details - Cases with AI-Feedback"
        level={3}
        description="Solve support cases and receive AI feedback"
        Icon={Brain}
        iconProps="h-8 w-8 text-blue-600"
      />
      <McQuestionDetails mcQuestion={mcQuestionData} />
    </div>
  );
};

export default DetailsPage;
