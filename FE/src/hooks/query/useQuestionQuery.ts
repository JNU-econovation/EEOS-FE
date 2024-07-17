import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    enabled: !!programId && (!!teamId || teamId === 0),
    refetchInterval: 10 * 1000,
    staleTime: 10 * 1000,
  });
};

export const usePostQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["question", "post"],
    mutationFn: async (postQuestionParams: PostQuestionParams) => {
      const res = await postQuestion(postQuestionParams);

      const { programId, teamId } = postQuestionParams;
      queryClient.invalidateQueries(["question", programId, teamId]);

      return res;
    },
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["question", "delete"],
    mutationFn: async (commentId: number) => {
      const res = await deleteQuestion(commentId);
      queryClient.invalidateQueries(["question", "get"]);
      return res;
    },
  });
};
