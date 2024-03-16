import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TeamBuildingInfoDto } from "./dtos";
import { https } from "@/apis/instance";
import API from "@/constants/API";
import ERROR_CODE from "@/constants/ERROR_CODE";
import ROUTES from "@/constants/ROUTES";

export const getTeamBuilding = async (): Promise<TeamBuildingInfoDto> => {
  const { data } = await https({
    url: API.TEAM_BUILDING.DETAIL,
    method: "GET",
    params: { status: "progress" },
  });

  return new TeamBuildingInfoDto(data?.data);
};

// FIXME: 에러 처리 수정하기
export const useGetTeamBuilding = () => {
  return useQuery({
    queryKey: [API.TEAM_BUILDING.DETAIL],
    queryFn: () => getTeamBuilding(),
    onError: (
      error: AxiosError<{ code: string; message: string; status: string }>,
    ) => {
      const { response } = error;
      const errorCode = response?.data?.code;
      if (errorCode === ERROR_CODE.TEAM_BUILDING.COMPLETED) {
        window.location.href = ROUTES.TEAM_BUILDING.RESULT;
      }
    },
  });
};
