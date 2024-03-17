import { useQuery } from "@tanstack/react-query";
import { UserInputStatusInfoDto } from "./dtos";
import { https } from "@/utils/axios";
import API from "@/constants/API";

const getInputStatus = async (): Promise<UserInputStatusInfoDto> => {
  const { data } = await https({
    url: API.TEAM_BUILDING.INPUT_STATUS,
    method: "GET",
  });

  return new UserInputStatusInfoDto(data?.data);
};

export const useGetInputStatus = () => {
  return useQuery({
    queryKey: [API.TEAM_BUILDING.INPUT_STATUS],
    queryFn: () => getInputStatus(),
  });
};
