import { loadCaseStats } from "@/app/lib/statistics/case-stats/server/loaders/case-stats.loader";
import { loadMcStats } from "@/app/lib/statistics/mc-stats/server/loaders/mc-stats.loader";
import { loadChatStats } from "@/app/lib/statistics/chat-stats/server/loaders/chat-stats.loader";
import { loadUserStats } from "@/app/lib/statistics/user-stats/server/loaders/user-stats.loader";
import { loadUserWorkspace } from "@/app/lib/user-workspace/loadUserWorkspace";
import { UserStatsSection } from "./_components/1UserStatsSection";
import { UserAchievementsSection } from "./_components/2UserAchievementsSection";
import { CaseStatsSection } from "./_components/CaseStatsSection";
import { ChatStatsSection } from "./_components/ChatStatsSection";
import { MultipleChoiceStatsSection } from "./_components/MultipleChoiceStatsSection";
import React, { use } from "react";
import {
  loadUserAchievements,
  loadAllAchievements,
} from "@/app/lib/statistics/user-achievements/server/loaders/user-achievements.loader";
import { loadUserXpWithLevel } from "@/app/lib/statistics/user-xp/server/loaders/user-xp.loader";

const StatisticsPage = () => {
  const {
    account: { id },
  } = use(loadUserWorkspace());

  const userStatistics = use(loadUserStats(id));
  const caseStatistics = use(loadCaseStats(id));
  const chatStatistics = use(loadChatStats(id));
  const multipleChoiceStatistics = use(loadMcStats(id));
  const userAchievements = use(loadUserAchievements(id));
  const allAchievements = use(loadAllAchievements());
  const userXPwithLevel = use(loadUserXpWithLevel(id));
  return (
    <div className="container mx-auto p-6 space-y-8">
      <UserStatsSection
        userStatistics={userStatistics}
        userXpWithLevel={userXPwithLevel}
      />
      <UserAchievementsSection
        userAchievements={userAchievements}
        allAchievements={allAchievements}
      />
      <CaseStatsSection caseStatistics={caseStatistics} />
      <ChatStatsSection chatStatistics={chatStatistics} />
      <MultipleChoiceStatsSection
        multipleChoiceStatistics={multipleChoiceStatistics}
      />
    </div>
  );
};

export default StatisticsPage;
