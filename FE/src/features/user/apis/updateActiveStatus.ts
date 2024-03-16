import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UserActiveStatusInfoDto } from "./dtos";
import { https } from "@/apis/instance";
import API from "@/constants/API";
import MESSAGE from "@/constants/MESSAGE";
import { ActiveStatus } from "@/types/member";

interface UpdateUserActiveStatusRequest {
  activeStatus: ActiveStatus;
}

const updateUserActiveStatus = async (
  body: UpdateUserActiveStatusRequest,
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

export const useUpdateUserActiveStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [API.USER.ACTIVE_STATUS],
    mutationFn: (activeStatus: ActiveStatus) =>
      updateUserActiveStatus({ activeStatus }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [API.USER.ACTIVE_STATUS] });
    },
  });
};
