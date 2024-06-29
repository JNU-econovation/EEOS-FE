import { useQuery } from "@tanstack/react-query";
import { getTeamList } from "@/apis/team";

export const useTeam = () => {
  return useQuery({
    queryKey: ["team"],
    queryFn: () => getTeamList(1),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });
};
