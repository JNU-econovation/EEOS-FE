import { useQuery } from "@tanstack/react-query";
import { TeamBuildingResultListDto } from "./dtos";
import { https } from "@/apis/instance";
import API from "@/constants/API";

const getTeamBuildingResult = async (): Promise<TeamBuildingResultListDto> => {
  const { data } = await https({
    url: API.TEAM_BUILDING.RESULT,
    method: "GET",
  });

  return new TeamBuildingResultListDto(data?.data);
};

export const useGetTeamBuildingResult = () => {
  return useQuery({
    queryKey: [API.TEAM_BUILDING.RESULT],
    queryFn: () => getTeamBuildingResult(),
  });
};
