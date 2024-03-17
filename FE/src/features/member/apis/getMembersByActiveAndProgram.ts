import { useQuery } from "@tanstack/react-query";
import { ActiveStatusWithAll, MemberInfo } from "../types";
import { MemberInfoDto } from "./dtos";
import API from "@/constants/API";
import { https } from "@/utils/axios";

interface GetMembersByActiveAndProgram {
  status: ActiveStatusWithAll;
  programId: number;
}

const getMembersByActiveAndProgram = async (
  programId: number,
  activeStatus: ActiveStatusWithAll,
): Promise<MemberInfoDto[]> => {
  const { data } = await https({
    url: API.MEMBER.ACTIVE_STATUS(programId),
    method: "GET",
    params: { activeStatus },
  });

  return data?.data?.members.map(
    (member: MemberInfo) => new MemberInfoDto(member),
  );
};

export const useGetMembersByActiveAndProgram = ({
  programId,
  status,
}: GetMembersByActiveAndProgram) => {
  return useQuery({
    queryKey: [API.MEMBER.ACTIVE_STATUS(programId), status],
    queryFn: () => getMembersByActiveAndProgram(programId, status),
  });
};
