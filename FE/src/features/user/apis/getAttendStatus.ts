import { useQuery } from "@tanstack/react-query";
import { UserAttendStatusInfoDto } from "./dtos";
import { https } from "@/apis/instance";
import API from "@/constants/API";

const getUserAttendStatus = async (
  programId: number,
): Promise<UserAttendStatusInfoDto> => {
  const { data } = await https({
    url: API.USER.ATTEND_STATUS(programId),
    method: "GET",
  });
  return new UserAttendStatusInfoDto(data?.data);
};

export const useGetUserAttendStatus = (programId: number) => {
  return useQuery({
    queryKey: [API.USER.ATTEND_STATUS(programId)],
    queryFn: () => getUserAttendStatus(programId),
  });
};
