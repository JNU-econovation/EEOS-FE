import { useQuery } from "@tanstack/react-query";
import { UserActiveStatusInfoDto } from "./dtos";
import { https } from "@/apis/instance";
import API from "@/constants/API";

const getActiveStatus = async () => {
  const { data } = await https({
    url: API.USER.ACTIVE_STATUS,
    method: "GET",
  });
  return new UserActiveStatusInfoDto(data?.data);
};

export const useGetActiveStatus = () => {
  return useQuery({
    queryKey: [API.USER.ACTIVE_STATUS],
    queryFn: getActiveStatus,
    suspense: true,
  });
};
