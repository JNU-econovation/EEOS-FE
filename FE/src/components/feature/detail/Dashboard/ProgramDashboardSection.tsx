"use client";

import Title from "@/components/common/Title/Title";
import DashboardContent from "./components/DashboardContent";
import DashboardInput from "./components/DashboardInput";
import { useGetProgramId } from "@/hooks/usePrograms";
import TeamsTab from "@/components/common/tabs/TeamsTab";

const ProgramDashboardSection = () => {
  const programId = useGetProgramId();

  return (
    <section>
      <Title text="질문 게시판" />
      <div className="mt-4" />
      <TeamsTab programId={programId}>
        {({ teamId, teamName }) => (
          <div className="mt-8 flex flex-col gap-8">
            <DashboardContent programId={programId} selectedTeamId={teamId} />
            <DashboardInput
              programId={programId}
              selectedTeamId={teamId}
              selectedTeamName={teamName}
            />
          </div>
        )}
      </TeamsTab>
    </section>
  );
};

export default ProgramDashboardSection;
