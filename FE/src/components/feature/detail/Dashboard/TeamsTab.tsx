"use client";

import Tab from "@/components/common/tabs/tab/TabCompound/TabCompound";
import { Hyperlink, HyperlinkGray } from "@/components/icons";
import usePresentations from "@/hooks/query/usePresentations";
import { useTeamQuery } from "@/hooks/query/useTeamQuery";
import { useGetAccessType } from "@/hooks/useAccess";
import Link from "next/link";

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
  const { data: presentation } = usePresentations(programId);

  const { teams } = teamsQueryData;
  if (teams.length === 0) return null;

  const teamNameArray = teams.map(({ teamName }) => teamName);

  return (
    <Tab<string>
      align="line"
      defaultSelected={`${teams[0].teamName}`}
      nonPickedColor="white"
      pickedColor="white"
      tabItemList={teamNameArray}
      tabSize="md"
    >
      <Tab.List className="!gap-0 border-b">
        {teamNameArray.map((name, index) => (
          <Tab.NakedItem key={`${name}-${index}`} text={name} value={name}>
            {presentation?.find(
              ({ name: presentationItemName }) => presentationItemName === name,
            )?.download_url ? (
              <Link
                href={
                  presentation?.find(
                    ({ name: presentationItemName }) =>
                      presentationItemName === name,
                  )?.download_url
                    ? presentation.find(({ name }) => name === name)
                        .download_url
                    : "#!"
                }
                target="_blank"
              >
                <Hyperlink />
              </Link>
            ) : (
              <div className="cursor-not-allowed">
                <HyperlinkGray />
              </div>
            )}
          </Tab.NakedItem>
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
