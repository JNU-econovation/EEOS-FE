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
