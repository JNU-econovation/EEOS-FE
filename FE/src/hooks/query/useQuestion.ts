import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getQuestionsByTeam,
  postQuestion,
  PostQuestionParams,
} from "@/apis/question";

export const useGetQuestion = (programId: number, teamId: number) => {
  return useQuery({
    queryKey: ["question", programId, teamId],
    queryFn: () => getQuestionsByTeam(programId, teamId),
  });
};

export const usePostQuestion = () => {
  return useMutation({
    mutationKey: ["question", "post"],
    mutationFn: (postQuestionParams: PostQuestionParams) =>
      postQuestion(postQuestionParams),
  });
};
