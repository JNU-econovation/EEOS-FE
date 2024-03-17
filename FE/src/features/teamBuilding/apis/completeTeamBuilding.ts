import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { https } from "@/utils/axios";
import API from "@/constants/API";
import MESSAGE from "@/constants/MESSAGE";
import ROUTES from "@/constants/ROUTES";

export const completeTeamBuilding = async () => {
  await toast.promise(
    https({
      url: API.TEAM_BUILDING.COMPLETE,
      method: "POST",
    }),
    {
      pending: MESSAGE.COMPLATE.PENDING,
      success: MESSAGE.COMPLATE.SUCCESS,
      error: MESSAGE.COMPLATE.FAILED,
    },
  );
};

export const useCompleteTeamBuilding = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: [API.TEAM_BUILDING.COMPLETE],
    mutationFn: () => completeTeamBuilding(),
    onSuccess: () => {
      router.push(ROUTES.TEAM_BUILDING.RESULT);
    },
  });
};
