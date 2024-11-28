import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteQuestion,
  getQuestionsByTeam,
  postQuestion,
  PostQuestionParams,
  updateQuestion,
} from "@/apis/question";
import { Comment, QuestionListDto } from "@/apis/dtos/question.dto";
import API from "@/constants/API";
import { UserAttendStatusInfoDto } from "@/apis/dtos/user.dto";

export const useGetQuestions = (programId: number, teamId: number) => {
  return useQuery({
    queryKey: ["question", programId, teamId],
    queryFn: () => getQuestionsByTeam(programId, teamId),
    enabled: (!!programId || programId === 0) && (!!teamId || teamId === 0),
    refetchInterval: 10 * 1000,
    staleTime: 10 * 1000,
  });
};

export const usePostQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postQuestionParams: PostQuestionParams) => {
      return await postQuestion(postQuestionParams);
    },
    onMutate: ({
      isAnonymous,
      programId,
      teamId,
      questionContent,
    }: PostQuestionParams) => {
      queryClient.cancelQueries(["question", programId, teamId]);

      const oldData = queryClient.getQueryData<QuestionListDto>([
        "question",
        programId,
        teamId,
      ]);
      if (!oldData) return;

      const { name: userName } =
        queryClient.getQueryData<UserAttendStatusInfoDto>([
          API.USER.ATTEND_STATUS(programId),
        ]);
      alert(userName);

      const newComment: Comment = {
        commentId: oldData.comments.length + 1,
        teamId,
        writer: isAnonymous ? "익명" : userName,
        accessRight: "edit",
        time: "방금전",
        content: questionContent,
        answers: [],
      };

      queryClient.setQueryData<QuestionListDto>(
        ["question", programId, teamId],
        {
          comments: [...oldData.comments, newComment],
        },
      );

      return oldData;
    },
    onError: (_, { programId, teamId }, oldData) => {
      queryClient.setQueriesData(["question", programId, teamId], oldData);
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
