import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import API from "@/constants/API";
import MESSAGE from "@/constants/MESSAGE";
import ROUTES from "@/constants/ROUTES";
import { https } from "@/utils/axios";

const deleteProgram = async (programId: number) => {
  const { data } = await toast.promise(
    https({
      url: API.PROGRAM.DELETE(programId),
      method: "DELETE",
    }),
    {
      pending: MESSAGE.DELETE.PENDING,
      success: MESSAGE.DELETE.SUCCESS,
      error: MESSAGE.DELETE.FAILED,
    },
  );
  return data?.data;
};

export const useDeleteProgram = (programId: number) => {
  const router = useRouter();

  return useMutation({
    mutationKey: [API.PROGRAM.DELETE(programId)],
    mutationFn: () => deleteProgram(programId),
    onSettled: () => {
      router.replace(ROUTES.MAIN);
    },
  });
};
