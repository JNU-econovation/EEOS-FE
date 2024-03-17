import { useQuery } from "@tanstack/react-query";
import { StatusType } from "../types";
import { TeamBuildingStatusDto } from "./dtos";
import { https } from "@/utils/axios";
import API from "@/constants/API";

interface GetTeamBuildingStatusRequest {
  status: StatusType;
}

export const getTeamBuildingValidation = async ({
  status,
}: GetTeamBuildingStatusRequest) => {
  const { data } = await https({
    url: API.TEAM_BUILDING.VALIDATE,
    method: "GET",
    params: { status },
  });

  return new TeamBuildingStatusDto(data?.data);
};

// TODO: option 받는 부분 수정하기
export const useGetIsTeamBuildingCreable = (enabled: boolean) => {
  return useQuery({
    queryKey: [API.TEAM_BUILDING.VALIDATE, "creatable"],
    queryFn: () => getTeamBuildingValidation({ status: "creatability" }),
    enabled,
  });
};

// TODO: option 받는 부분 수정하기
export const useGetIsTeamBuildingJoinable = (enabled: boolean) => {
  return useQuery({
    queryKey: [API.TEAM_BUILDING.VALIDATE, "joinable"],
    queryFn: () => getTeamBuildingValidation({ status: "joinability" }),
    enabled,
  });
};
