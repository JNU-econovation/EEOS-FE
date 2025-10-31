import { useEffect } from "react";
import Label from "../common/form/input/Label";
import TeamList from "../manage/team/TeamList";
import useTeam from "@/hooks/useTeam";
import type { TeamInputInfo } from "@/types/team";

interface ProgramTeamListProps {
  programId?: number;
  selectedTeamList: TeamInputInfo[];
  handleTeamListChange: (teamList: TeamInputInfo[]) => void;
}
const ProgramTeamList = ({
  programId,
  selectedTeamList,
  handleTeamListChange,
}: ProgramTeamListProps) => {
  const { allOfTeams, joinedTeams, isLoading } = useTeam(programId);

  useEffect(() => {
    if (joinedTeams) {
      handleTeamListChange(
        joinedTeams.teams.map((team) => ({ teamId: team.teamId })),
      );
    }
  }, [joinedTeams]);

  if (isLoading) {
    return <></>;
  }

  const selectTeam = (teamId: number) => {
    const prevSelectedTeamIdArray = selectedTeamList.map((team) => team.teamId);
    const isIncluded = prevSelectedTeamIdArray.includes(teamId);
    const nextSelected = isIncluded
      ? prevSelectedTeamIdArray
          .filter((id) => id !== teamId)
          .map((id) => ({ teamId: id }))
      : [...prevSelectedTeamIdArray, teamId].map((id) => ({ teamId: id }));
    handleTeamListChange(nextSelected);
  };

  const isSelected = (teamId: number) =>
    selectedTeamList.map((team) => team.teamId).includes(teamId);

  return (
    <div>
      <Label label="팀 불러오기" />
      <ul className="mt-2 grid grid-cols-2 gap-4">
        {allOfTeams &&
          allOfTeams.teams.map(({ teamId, teamName }, i) => (
            <div
              key={`${teamId}-${teamName}-${i}`}
              onClick={(e) => {
                e.stopPropagation();
                selectTeam(teamId);
              }}
            >
              <TeamList
                teamId={teamId}
                teamName={teamName}
                type="select"
                isSelected={isSelected(teamId)}
              />
            </div>
          ))}
      </ul>
    </div>
  );
};

export default ProgramTeamList;
