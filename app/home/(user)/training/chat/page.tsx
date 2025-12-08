import React, { use } from "react";
import { MessageSquare } from "lucide-react";
import HeaderWithIcon from "@/components/reusable/header-with-icon";
import ChatClient from "./_components/ChatClient";
import { loadRandomCaseByUserLevel } from "@/app/lib/cases/server/loaders/cases.loader";
import { loadUserWorkspace } from "@/app/lib/user-workspace/loadUserWorkspace";
import { loadUserLevel } from "@/app/lib/statistics/user-xp/server/loaders/user-xp.loader";

const CustomerServiceChatPage = () => {
  const { account } = use(loadUserWorkspace());
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
        title="Customer Support Chat Training"
        level={3}
        description="Practice customer support conversations with AI playing the customer role"
        Icon={MessageSquare}
        iconProps="h-8 w-8 text-blue-600"
      />

      {/* Chat Component */}
      <ChatClient case={randomCase} userLevel={userLevel} userId={account.id} />
    </div>
  );
};

export default CustomerServiceChatPage;
