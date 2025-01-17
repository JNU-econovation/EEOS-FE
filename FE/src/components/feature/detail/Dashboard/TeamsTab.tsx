"use client";

import Tab from "@/components/common/tabs/tab/TabCompound/TabCompound";
import { useTeamQuery } from "@/hooks/query/useTeamQuery";

interface SelectedItemProps {
  teamName: string;
  teamId: number;
}

interface TeamsTabProps {
  programId: number;
  children: (selectedItem: SelectedItemProps) => JSX.Element;
}
const TeamsTab = ({ programId, children }: TeamsTabProps) => {
  const { data: teamsQueryData } = useTeamQuery(programId);

  const { teams } = teamsQueryData;
  if (teams.length === 0) return null;

  const teamNameArray = teams.map(({ teamName }) => teamName);

  return (
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
        {({ selectedItem }) =>
          children({
            teamName: selectedItem,
            teamId: teams.find(({ teamName }) => teamName === selectedItem)
              ?.teamId,
          })
        }
      </Tab.Content>
    </Tab>
  );
};

export default TeamsTab;
