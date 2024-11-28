"use client";

import Tab from "@/components/common/tabs/tab/TabCompound/TabCompound";
import Title from "@/components/common/Title/Title";
import { useTeamQuery } from "@/hooks/query/useTeamQuery";
import DashboardContent from "./components/DashboardContent";
import DashboardInput from "./components/DashboardInput";

interface ProgramDashboardSectionProps {
  programId: number;
}
const ProgramDashboardSection = ({
  programId,
}: ProgramDashboardSectionProps) => {
  const { data, isLoading } = useTeamQuery(programId);

  if (isLoading || !data) return null;

  const { teams } = data;
  if (teams.length === 0) return null;

  const teamNameArray = teams.map(({ teamName }) => teamName);

  return (
    <section>
      <Title text="질문 게시판" />
      <Tab<string>
        align="line"
        defaultSelected={`${teams[0].teamName}`}
        nonPickedColor="gray"
        pickedColor="navy"
        tabItemList={teamNameArray}
        tabSize="md"
      >
        <Tab.List>
          {teamNameArray.map((name, index) => (
            <Tab.Item key={`${name}-${index}`} text={name} />
          ))}
        </Tab.List>
        <Tab.Content<string>>
          {({ selectedItem }) => (
            <div className="mt-8 flex flex-col gap-8">
              <DashboardContent
                programId={programId}
                selectedTeamId={
                  teams.find(({ teamName }) => teamName === selectedItem)
                    ?.teamId
                }
              />

              <DashboardInput
                teams={teams}
                programId={programId}
                selectedTeamId={
                  teams.find(({ teamName }) => teamName === selectedItem)
                    ?.teamId
                }
              />
            </div>
          )}
        </Tab.Content>
      </Tab>
    </section>
  );
};

export default ProgramDashboardSection;
