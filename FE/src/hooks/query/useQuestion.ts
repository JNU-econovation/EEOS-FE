import { useQuery } from "@tanstack/react-query";
import { getQuestionsByTeam } from "@/apis/question";

export const useGetQuery = (programId: number, teamId: number) => {
  return useQuery({
    queryKey: ["question", programId, teamId],
    queryFn: () => getQuestionsByTeam(programId, teamId),
  });
};
