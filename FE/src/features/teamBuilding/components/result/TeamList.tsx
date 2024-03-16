import { TeamBuildingResult } from "../../types";
import { Team } from "./Team";

interface ResultTeamListProps {
  teamList: TeamBuildingResult;
}

export const ResultTeamList = ({ teamList }: ResultTeamListProps) => {
  return (
    <div className="flex h-full w-full flex-col gap-16 overflow-y-scroll scrollbar-hide">
      {teamList.map((members, index) => (
        <Team key={index} index={index} members={members} />
      ))}
    </div>
  );
};
