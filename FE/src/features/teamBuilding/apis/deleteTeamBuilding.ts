import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { https } from "@/utils/axios";
import API from "@/constants/API";
import MESSAGE from "@/constants/MESSAGE";
import ROUTES from "@/constants/ROUTES";

const deleteTeamBuilding = async () => {
  await toast.promise(
    https({
      url: API.TEAM_BUILDING.DELETE,
      method: "DELETE",
    }),
    {
      pending: MESSAGE.DELETE.PENDING,
      success: MESSAGE.DELETE.SUCCESS,
      error: MESSAGE.DELETE.FAILED,
    },
  );
};

export const useDeleteTeamBuilding = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: [API.TEAM_BUILDING.DELETE],
    mutationFn: () => deleteTeamBuilding(),
    onSuccess: () => {
      router.push(ROUTES.MAIN);
    },
  });
};
