import { QuestionListDto } from "./dtos/question.dto";
import { https } from "./instance";
import API from "@/constants/API";

export const getQuestionsByTeam = async (programId: number, teamId: number) => {
  const { data } = await https({
    url: API.QUESTION.LIST,
    method: "GET",
    params: { programId, teamId },
  });
  return new QuestionListDto(data?.data);
};

/**
 * 질문을 등록합니다.
 * - isCheck : 질문을 등록할 때 체크박스를 체크했는지 여부. 체크가 되었다면 1, 아니라면 0
 */
export interface PostQuestionParams {
  programId: number;
  teamId: number;
  questionContent: string;
  parentsCommentId?: number;
  isAnonymous: 0 | 1;
}
export const postQuestion = async ({
  programId,
  teamId,
  questionContent,
  parentsCommentId = -1,
  isAnonymous = 0,
}: PostQuestionParams) => {
  return await https({
    url: API.QUESTION.CREATE,
    method: "POST",
    data: {
      programId,
      teamId,
      content: questionContent,
      parentsCommentId,
      isAnonymous,
    },
  });
};

export const updateQuestion = async (commentId: number, contents: string) => {
  return await https({
    url: API.QUESTION.UPDATE(commentId),
    method: "PUT",
    data: {
      contents,
    },
  });
};

export const deleteQuestion = async (commentId: number) => {
  return await https({
    url: API.QUESTION.DELETE(commentId),
    method: "DELETE",
  });
};
