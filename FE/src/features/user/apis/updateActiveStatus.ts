import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UserActiveStatusInfoDto } from "./dtos";
import { https } from "@/utils/axios";
import API from "@/constants/API";
import MESSAGE from "@/constants/MESSAGE";
import { ActiveStatus } from "@/types/member";

interface UpdateActiveStatusRequest {
  activeStatus: ActiveStatus;
}

const updateActiveStatus = async (
  body: UpdateActiveStatusRequest,
): Promise<UserActiveStatusInfoDto> => {
  const { data } = await toast.promise(
    https({
      url: API.USER.ACTIVE_STATUS,
      method: "PUT",
      data: body,
    }),
    {
      pending: MESSAGE.EDIT.PENDING,
      success: MESSAGE.EDIT.SUCCESS,
      error: MESSAGE.EDIT.FAILED,
    },
  );
  return new UserActiveStatusInfoDto(data?.data);
};

export const useUpdateActiveStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [API.USER.ACTIVE_STATUS],
    mutationFn: (activeStatus: ActiveStatus) =>
      updateActiveStatus({ activeStatus }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [API.USER.ACTIVE_STATUS] });
    },
  });
};
