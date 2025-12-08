import React, { use } from "react";
import McQuestionsTable from "./_components/mcQuestionsTable";
import { loadAllMcQuestions } from "@/app/lib/multiple-choice/server/loaders/mc_questions.loader";

const ListMcQuestions = () => {
  const mcQuestions = use(loadAllMcQuestions());

  return (
    <>
      <McQuestionsTable mcQuestions={mcQuestions} />
    </>
  );
};

export default ListMcQuestions;
