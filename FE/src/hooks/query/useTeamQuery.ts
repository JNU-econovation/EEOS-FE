import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTeam, deleteTeam, getTeamList } from "@/apis/team";
import { TeamInfo } from "@/types/team";

export const useTeam = (programId?: number) => {
  return useQuery({
    queryKey: ["teams", programId ? programId : "all"],
    queryFn: () => getTeamList(programId),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });
};

export const useCreateTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["teams", "all"],
    mutationFn: (teamName: string) => createTeam(teamName),
    onSettled: (_, __, teamName) => {
      const { teams: prevTeams } = queryClient.getQueryData([
        "teams",
        "all",
      ]) as { teams: TeamInfo[] };
      const newTeam: TeamInfo = { teamId: Date.now(), teamName };
      prevTeams.push(newTeam);
      queryClient.setQueryData(["teams", "all"], { teams: prevTeams });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["teams", "all"]);
    },
  });
};

export const useDeleteTeam = (teamId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["teams", "all"],
    mutationFn: (teamId: number) => deleteTeam(teamId),
    onSettled: () => {
      const { teams: prevTeams } = queryClient.getQueryData([
        "teams",
        "all",
      ]) as { teams: TeamInfo[] };
      const newTeams = prevTeams.filter((team) => team.teamId !== teamId);
      queryClient.setQueryData(["teams", "all"], { teams: newTeams });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["teams", "all"]);
    },
  });
};
