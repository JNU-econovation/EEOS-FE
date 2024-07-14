import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteQuestion,
  getQuestionsByTeam,
  postQuestion,
  PostQuestionParams,
  updateQuestion,
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

export const useUpdateQuestion = () => {
  return useMutation({
    mutationKey: ["question", "update"],
    mutationFn: ({
      commentId,
      contents,
    }: {
      commentId: number;
      contents: string;
    }) => updateQuestion(commentId, contents),
  });
};

export const useDeleteQuestion = () => {
  return useMutation({
    mutationKey: ["question", "delete"],
    mutationFn: (commentId: number) => deleteQuestion(commentId),
  });
};
