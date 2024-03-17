import { useQuery } from "@tanstack/react-query";
import { ActiveStatusWithAll, MemberActiveStatusInfo } from "../types";
import { MemberActiveStatusInfoDto } from "./dtos";
import API from "@/constants/API";
import { https } from "@/utils/axios";

const getMembersByActive = async (
  activeStatus: ActiveStatusWithAll,
): Promise<MemberActiveStatusInfoDto[]> => {
  const { data } = await https({
    url: API.MEMBER.LIST,
    method: "GET",
    params: { activeStatus },
  });

  return data?.data?.members.map(
    (member: MemberActiveStatusInfo) => new MemberActiveStatusInfoDto(member),
  );
};

export const useGetMembersByActive = (activeStatus: ActiveStatusWithAll) => {
  return useQuery({
    queryKey: [API.MEMBER.LIST, activeStatus],
    queryFn: () => getMembersByActive(activeStatus),
  });
};
