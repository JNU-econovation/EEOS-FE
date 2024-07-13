import { QuestionListDto } from "./dtos/question.dto";
import { https } from "./instance";
import API from "@/constants/API";

export interface PostQuestionParams {
  programId: number;
  teamId: number;
  questionContent: string;
  parentsCommentId: number;
}

export const getQuestionsByTeam = async (programId: number, teamId: number) => {
  const { data } = await https({
    url: API.QUESTION.LIST,
    method: "GET",
    params: { programId, teamId },
  });
  return new QuestionListDto(data?.data);
};

export const postQuestion = async ({
  programId,
  teamId,
  questionContent,
  parentsCommentId = -1,
}: PostQuestionParams) => {
  return await https({
    url: API.QUESTION.CREATE,
    method: "POST",
    data: { programId, teamId, content: questionContent, parentsCommentId },
  });
};
