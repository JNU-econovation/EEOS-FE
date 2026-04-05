import { useTeamQuery } from "./query/useTeamQuery";

const useTeam = (programId: number) => {
  const { data: allOfTeams, isLoading: isAllOfTeamsLoading } = useTeamQuery();
  const { data: joinedTeams, isLoading: isJoinedTeamsLoading } =
    useTeamQuery(programId);

  const isLoading = isAllOfTeamsLoading || isJoinedTeamsLoading;

  return {
    allOfTeams,
    joinedTeams,
    isLoading,
  };
};

export default useTeam;
