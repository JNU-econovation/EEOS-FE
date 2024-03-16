import { useQuery } from "@tanstack/react-query";
import { UserInputStatusInfoDto } from "./dtos";
import { https } from "@/apis/instance";
import API from "@/constants/API";

const getUserInputStatus = async (): Promise<UserInputStatusInfoDto> => {
  const { data } = await https({
    url: API.TEAM_BUILDING.INPUT_STATUS,
    method: "GET",
  });

  return new UserInputStatusInfoDto(data?.data);
};

export const useGetUserInputStatus = () => {
  return useQuery({
    queryKey: [API.TEAM_BUILDING.INPUT_STATUS],
    queryFn: () => getUserInputStatus(),
  });
};
