/**
 * 팀빌딩 생성
 */

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { TeamBuildingIdDto } from "./dtos";
import { https } from "@/apis/instance";
import API from "@/constants/API";
import MESSAGE from "@/constants/MESSAGE";
import ROUTES from "@/constants/ROUTES";

export interface CreateTeamBuildingRequest {
  title: string;
  content: string;
  maxTeamSize: number;
  members: { memberId: number }[];
}

const createTeamBuilding = async (
  body: CreateTeamBuildingRequest,
): Promise<TeamBuildingIdDto> => {
  const { data } = await toast.promise(
    https({
      url: API.TEAM_BUILDING.CREATE,
      method: "POST",
      data: body,
    }),
    {
      pending: MESSAGE.CREATE.PENDING,
      success: MESSAGE.CREATE.SUCCESS,
      error: MESSAGE.CREATE.FAILED,
    },
  );

  return new TeamBuildingIdDto(data?.data);
};

export const useCreateTeamBuilding = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: [API.TEAM_BUILDING.CREATE],
    mutationFn: (data: CreateTeamBuildingRequest) => createTeamBuilding(data),
    onSettled: () => {
      router.push(ROUTES.TEAM_BUILDING.DETAIL);
    },
  });
};
