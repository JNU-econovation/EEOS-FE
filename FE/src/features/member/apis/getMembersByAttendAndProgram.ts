import { useQuery } from "@tanstack/react-query";
import { AttendStatus, MemberAttendStatusInfo } from "../types";
import { MemberAttendStatusInfoDto } from "./dtos";
import API from "@/constants/API";
import { https } from "@/utils/axios";

interface GetProgramMemebersByAttend {
  status: AttendStatus;
  programId: number;
}

const getMembersByAttendAndProgram = async (
  programId: number,
  attendStatus: AttendStatus,
): Promise<MemberAttendStatusInfoDto[]> => {
  const { data } = await https({
    url: API.MEMBER.ATTEND_STATUS(programId),
    method: "GET",
    params: { attendStatus },
  });

  return data?.data?.members.map(
    (member: MemberAttendStatusInfo) => new MemberAttendStatusInfoDto(member),
  );
};

export const useGetMembersByAttend = ({
  programId,
  status,
}: GetProgramMemebersByAttend) => {
  return useQuery({
    queryKey: [API.MEMBER.ATTEND_STATUS(programId), status],
    queryFn: () => getMembersByAttendAndProgram(programId, status),
  });
};
