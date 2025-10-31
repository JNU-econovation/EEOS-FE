import { TeamListDto } from "./dtos/team.dto";
import { https } from "./instance";
import API from "@/constants/API";

/**
 * 팀 리스트 가져오기
 * 인자가 number인 경우에는 programId를 받아서 해당 프로그램의 팀 리스트를 가져옵니다.
 * 인자가 없는 경우에는 모든 팀 리스트를 가져옵니다.
 */
export const getTeamList = async (programId?: number | "none") => {
  programId = programId || "none";
  const { data } = await https({
    url: API.TEAM.LIST,
    method: "GET",
    params: {
      programId,
    },
  });
  return new TeamListDto(data?.data);
};

export const createTeam = async (teamName: string) => {
  if (!teamName) throw new Error("팀 이름을 입력해주세요.");
  const { data } = await https({
    url: API.TEAM.CREATE,
    method: "POST",
    data: { teamName },
  });
  return data?.data;
};

export const deleteTeam = async (teamId: number) => {
  const { data } = await https({
    url: API.TEAM.DELETE(teamId),
    method: "DELETE",
  });
  return data?.data;
};
